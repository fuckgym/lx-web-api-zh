import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Rewrite links that point into the original site's URL space so they resolve
// on this site. Exact-match overrides first, then generic prefix stripping.
const DOCS = join(new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1"), "docs");

const EXTERNAL = "https://ibkrcampus.com";

// old target base (normalized: no trailing slash) -> new target base
const SPECIAL = {
  // tab roots: land on each tab's introduction page
  "/web-api/account-management": "/account-management/account-management-introduction/introduction",
  "/web-api/trading": "/trading/getting-started/introduction",
  "/web-api/api-reference": "/api-reference",
  // pages whose scrape-time filename differs from the original slug
  "/web-api/account-management/schema/associated-individual": "/account-management/schema/associatedindividual",
  "/account-management/schema/associated-individual": "/account-management/schema/associatedindividual",
  // section landing pages that only exist as Introduction.md here
  "/web-api/account-management/funds-and-banking/cash-transfer/cash-transfer":
    "/account-management/funds-and-banking/cash-transfer/introduction",
  "/account-management/funds-and-banking/cash-transfer/cash-transfer":
    "/account-management/funds-and-banking/cash-transfer/introduction",
  "/web-api/account-management/resources/sample-responses/sample-responses":
    "/account-management/resources/sample-responses/introduction",
  // original api-reference pages that are not part of this content; link out
  "/docs/web-api/api-reference/send-request": `${EXTERNAL}/docs/web-api/api-reference/send-request`,
  "/docs/web-api/api-reference/get-statement": `${EXTERNAL}/docs/web-api/api-reference/get-statement`,
  // pages that moved or were renamed relative to the original site
  "/docs/web-api/flex-web-service/retrieve-the-report": "/flex-web-service/using-flex-web-service/retrieve-the-report",
  "/web-api/api/web-api/initializing-brokerage-session": "/introduction/quick-start/initializing-brokerage-session",
  "/web-api/api-reference/trading/trading-session/initialize-session":
    "/api-reference/trading/session/initialize-session",
  "/web-api/api-reference/trading/trading-session/get-session-token":
    "/v1/ws/connection-guide/retrieve-the-session-token",
  "/web-api/api-reference/trading/trading-portfolio/get-uncached-positions":
    "/api-reference/trading/portfolio/get-uncached-positions",
  "/web-api/api-reference/trading/trading-orders/suppress-order-replies":
    "/api-reference/trading/orders/suppress-order-replies",
  "/web-api/api-reference/trading/trading-accounts/get-brokerage-accounts":
    "/api-reference/trading/accounts/get-brokerage-accounts",
  "/web-api/authentication/sessions": "/authentication/managing-multiple-sessions",
  "/web-api/authentication/oauth-2/register": "/authentication/oauth-2/oauth-2-0-registration-process",
  "/web-api/authentication/oauth-1a/request-requirements":
    "/authentication/oauth-1-a/oauth-1-0-a-request-structure",
  "/authentication/oauth-1a/request-requirements":
    "/authentication/oauth-1-a/oauth-1-0-a-request-structure",
  "/authentication/oauth-1-a/request-requirements":
    "/authentication/oauth-1-a/oauth-1-0-a-request-structure",
  // links to api-reference content now target the OpenAPI-generated pages
  // (manual layout: /api-reference/{group}/{tag}/{endpoint-slug})
  "/api-reference/api-reference/投资组合/tradingportfolio-getuncachedpositions":
    "/api-reference/trading/portfolio/get-uncached-positions",
  "/api-reference/api-reference/交易会话/tradingsession-initializesession":
    "/api-reference/trading/session/initialize-session",
  "/api-reference/api-reference/交易账户/tradingaccounts-getbrokerageaccounts":
    "/api-reference/trading/accounts/get-brokerage-accounts",
  "/api-reference/api-reference/交易订单/tradingorders-suppressorderreplies":
    "/api-reference/trading/orders/suppress-order-replies",
  "/api-reference/api-reference/trading-accounts/trading-accounts-get-brokerage-accounts":
    "/api-reference/trading/accounts/get-brokerage-accounts",
  "/api-reference/api-reference/trading-orders/trading-orders-suppress-order-replies":
    "/api-reference/trading/orders/suppress-order-replies",
  "/api-reference/api-reference/trading-portfolio/trading-portfolio-get-uncached-positions":
    "/api-reference/trading/portfolio/get-uncached-positions",
  "/api-reference/api-reference/trading-session/trading-session-initialize-session":
    "/api-reference/trading/session/initialize-session",
  // fern slugs the "oauth-1a" directory as "oauth-1-a" (digit-letter boundary);
  // first-pass rewrites already stripped the site prefix, so map those too
  "/authentication/oauth-1a": "/authentication/oauth-1-a",
};

// targets whose #fragment anchors do not exist on the mapped page
const DROP_FRAGMENT = new Set([
  "/web-api/account-management/funds-and-banking/cash-transfer/cash-transfer",
  "/account-management/funds-and-banking/cash-transfer/cash-transfer",
  "/web-api/authentication/oauth-1a/request-requirements",
  "/authentication/oauth-1a/request-requirements",
]);

// any root-relative link target; mapTarget decides whether it changes
const LINK_RE = /\]\((\/[^)\s]+)\)/g;

function mapTarget(raw) {
  const hashIdx = raw.indexOf("#");
  let base = hashIdx >= 0 ? raw.slice(0, hashIdx) : raw;
  const frag = hashIdx >= 0 ? raw.slice(hashIdx) : "";

  if (base.startsWith("/general/")) return EXTERNAL + raw; // external original-site content

  base = base.replace(/\/+$/, "");
  let next = SPECIAL[base];
  if (next == null) {
    for (const prefix of ["/docs/web-api", "/web-api"]) {
      if (base === prefix || base.startsWith(prefix + "/")) {
        next = base.slice(prefix.length) || "/";
        break;
      }
    }
  }
  if (next == null && base.startsWith("/authentication/oauth-1a/")) {
    next = "/authentication/oauth-1-a" + base.slice("/authentication/oauth-1a".length);
  }
  if (next == null || next === raw) return null;
  if (frag && !DROP_FRAGMENT.has(base)) return next + frag;
  return next;
}

let changedFiles = 0;
const changes = [];

function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      walk(p);
    } else if (/\.(md|mdx)$/i.test(e.name)) {
      const src = readFileSync(p, "utf8");
      let touched = false;
      const out = src.replace(LINK_RE, (full, target) => {
        const next = mapTarget(target);
        if (next == null || next === target) return full;
        touched = true;
        changes.push(`${e.name}: ${target} -> ${next}`);
        return `](${next})`;
      });
      if (touched) {
        writeFileSync(p, out, "utf8");
        changedFiles++;
      }
    }
  }
}

walk(DOCS);
console.log(`files changed: ${changedFiles}, links rewritten: ${changes.length}`);
for (const c of changes) console.log("  " + c);
