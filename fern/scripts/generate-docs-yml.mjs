import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Generate docs.yml by walking fern/docs. Paths in docs.yml are relative to the fern folder.
const FERN = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const DOCS = join(FERN, "docs");

const q = (s) => '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
const isPageName = (n) => /\.(md|mdx)$/i.test(n);
const pageTitle = (n) => n.replace(/\.(md|mdx)$/i, "");
const cmp = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });

// Introduction first, then case-insensitive alphabetical
function sortEntries(dir) {
  const names = readdirSync(dir, { withFileTypes: true });
  const pages = names.filter((e) => e.isFile() && isPageName(e.name)).map((e) => e.name);
  const dirs = names.filter((e) => e.isDirectory()).map((e) => e.name);
  pages.sort((a, b) => {
    const ia = /^introduction\.mdx?$/i.test(a) ? 0 : 1;
    const ib = /^introduction\.mdx?$/i.test(b) ? 0 : 1;
    return ia !== ib ? ia - ib : cmp(a, b);
  });
  dirs.sort(cmp);
  return { pages, dirs };
}

// Pin slugs for pages whose auto-generated slug is unpredictable (version
// tokens like "2.0"/"1.0a"); inbound content links target these values.
const SLUG_OVERRIDES = {
  "authentication/oauth-2/OAuth 2.0 Registration Process.md": "oauth-2-0-registration-process",
  "authentication/oauth-1a/OAuth 1.0a Request Structure.md": "oauth-1-0-a-request-structure",
};

function emit(dir, rel, indent, out) {
  const pad = "  ".repeat(indent);
  const { pages, dirs } = sortEntries(dir);
  for (const p of pages) {
    out.push(`${pad}- page: ${q(pageTitle(p))}`);
    out.push(`${pad}  path: ${q("docs/" + rel + "/" + p)}`);
    const slug = SLUG_OVERRIDES[rel + "/" + p];
    if (slug) out.push(`${pad}  slug: ${q(slug)}`);
  }
  for (const d of dirs) {
    out.push(`${pad}- section: ${q(d)}`);
    out.push(`${pad}  contents:`);
    emit(join(dir, d), rel + "/" + d, indent + 1, out);
  }
}

// Top-level tabs, mirroring the original IBKR docs navbar. Every tab referenced
// in navigation MUST be declared here, or the docs runtime throws
// "Tab <id> is not defined in the tabs config."
const TABS = [
  ["introduction", "Introduction"],
  ["authentication", "Authentication"],
  ["account-management", "Account Management"],
  ["trading", "Trading"],
  ["api-reference", "API Reference"],
  ["v1", "Web API v1.0 Documentation"],
  ["flex-web-service", "Flex Web Service"],
  ["changelog", "Changelog"],
];

// Directories that become their own tab (same order as TABS minus introduction)
const TAB_DIRS = [
  ["authentication", "authentication"],
  ["account-management", "account-management"],
  ["trading", "trading"],
  ["v1", "v1"],
  ["flex-web-service", "flex-web-service"],
  ["changelog", "changelog"],
];

// Quick Start section inside the Introduction tab, in the original site's order
const QUICK_START_ORDER = [
  "Installation",
  "Initializing Brokerage Session",
  "Placing Orders",
  "Requesting Positions",
  "Obtaining Market Data",
  "Troubleshooting",
];

// URLs of the removed fern starter pages; redirected so old links keep working
const REDIRECTS = ["welcome", "customization", "navigation", "editing-your-docs", "support", "writing-content"];

const lines = [];
lines.push("# fern docs configuration");
lines.push("# - content lives under docs/ (copied from web-api-docs-zh and web-api-zh)");
lines.push("# - regenerate this file: node scripts/generate-docs-yml.mjs");
lines.push("");
lines.push("title: IBKR Web API 文档");
lines.push("");
// Header decoration: logo, announcement strip and right-side navbar links.
lines.push("logo:");
lines.push("  href: /");
lines.push("  light: assets/logo-light.svg");
lines.push("  dark: assets/logo-dark.svg");
lines.push("  height: 28");
lines.push("");
lines.push("announcement:");
lines.push(`  message: ${q("IBKR Web API 中文文档 — 覆盖账户管理、交易、身份验证、API Reference 与 Flex Web Service")}`);
lines.push("");
lines.push("navbar-links:");
lines.push("  - type: outlined");
lines.push("    text: IBKR 官网");
lines.push("    href: https://www.interactivebrokers.com");
lines.push("  - type: filled");
lines.push("    text: 问题反馈");
lines.push("    href: mailto:API-Feedback@interactivebrokers.com");
lines.push("");
lines.push("colors:");
lines.push("  accent-primary:");
lines.push(`    light: ${q("#1e40af")}`);
lines.push(`    dark: ${q("#60a5fa")}`);
lines.push("");
// Move the search bar into the top header instead of the sidebar.
lines.push("layout:");
lines.push("  searchbar-placement: header");
lines.push("");
lines.push("tabs:");
for (const [id, name] of TABS) {
  lines.push(`  ${id}:`);
  lines.push(`    display-name: ${q(name)}`);
  lines.push(`    slug: ${q(id)}`);
}
lines.push("");
lines.push("instances:");
lines.push(`  - url: ${q("web-api-zh.docs.buildwithfern.com")}`);
lines.push("");
// Render the tabs as the horizontal top navbar (fern default is the sidebar).
lines.push("theme:");
lines.push("  tabs:");
lines.push("    placement: header");
lines.push("    style: default");
lines.push("    alignment: left");
// Compact Previous/Next links instead of the large footer cards.
lines.push("  footer-nav: minimal");
lines.push("");
lines.push("redirects:");
for (const p of REDIRECTS) {
  lines.push(`  - source: /${p}`);
  lines.push("    destination: /introduction");
}
lines.push("");
lines.push("navigation:");

// Tab 1: Introduction — introduction / getting started / quick start / feedback
lines.push("  - tab: introduction");
lines.push("    layout:");
lines.push("    - page: Introduction");
lines.push(`      path: ${q("docs/introduction/Introduction.md")}`);
lines.push("    - page: Getting Started");
lines.push(`      path: ${q("docs/introduction/Getting Started.md")}`);
lines.push("    - section: Quick Start");
lines.push("      contents:");
{
  const qsDir = join(DOCS, "introduction", "quick-start");
  const remaining = new Set(readdirSync(qsDir).filter((n) => isPageName(n)));
  const resolve = (title) => {
    const file = [...remaining].find((n) => pageTitle(n) === title);
    if (!file) throw new Error(`quick-start page missing: ${title}`);
    remaining.delete(file);
    return file;
  };
  for (const title of QUICK_START_ORDER) {
    lines.push(`        - page: ${q(title)}`);
    lines.push(`          path: ${q("docs/introduction/quick-start/" + resolve(title))}`);
  }
  for (const p of [...remaining].sort(cmp)) {
    lines.push(`        - page: ${q(pageTitle(p))}`);
    lines.push(`          path: ${q("docs/introduction/quick-start/" + p)}`);
  }
}
lines.push("    - page: Feedback");
lines.push(`      path: ${q("docs/introduction/Feedback.md")}`);
lines.push("");

// Tabs 2..7: one per top-level category directory
for (const [tabId, dir] of TAB_DIRS) {
  lines.push(`  - tab: ${tabId}`);
  lines.push("    layout:");
  emit(join(DOCS, dir), dir, 2, lines);
  lines.push("");
}

// Tab 8: API Reference — endpoint pages generated from the translated
// Chinese OpenAPI spec, manually organized into Chinese groups/tags with
// ASCII slugs (openapi/api-nav.json, built by gen-api-navigation.py).
// skip-slug drops the redundant "api-reference" URL segment of the api layer.
const API_NAV = JSON.parse(readFileSync(join(FERN, "openapi", "api-nav.json"), "utf8"));

function emitApiLayout(nodes, indent, out) {
  const pad = "  ".repeat(indent);
  for (const n of nodes) {
    if (n.section) {
      out.push(`${pad}- section: ${q(n.section)}`);
      out.push(`${pad}  slug: ${q(n.slug)}`);
      out.push(`${pad}  contents:`);
      emitApiLayout(n.contents, indent + 1, out);
    } else {
      out.push(`${pad}- endpoint: ${q(n.endpoint)}`);
      out.push(`${pad}  slug: ${q(n.slug)}`);
    }
  }
}

lines.push("  - tab: api-reference");
lines.push("    layout:");
lines.push("    - api: API 参考");
lines.push("      skip-slug: true");
lines.push("      specs:");
lines.push("        - type: openapi");
lines.push("          path: openapi/openapi.zh.yaml");
lines.push("      layout:");
emitApiLayout(API_NAV, 3, lines);
lines.push("    - section: Flex Web Service");
lines.push("      contents:");
lines.push("        - page: Trigger report generation");
lines.push("          path: docs/api-reference-flex/Trigger report generation.md");
lines.push("        - page: Retrieve generated report");
lines.push("          path: docs/api-reference-flex/Retrieve generated report.md");
lines.push("");

writeFileSync(join(FERN, "docs.yml"), lines.join("\n"), "utf8");
console.log("docs.yml written:", lines.length, "lines");
