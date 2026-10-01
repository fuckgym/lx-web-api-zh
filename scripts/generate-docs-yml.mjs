import { readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Generate docs.yml by walking fern/docs. Paths in docs.yml are relative to the fern folder.
const FERN = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const DOCS = join(FERN, "docs");

const q = (s) => '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
const isPageName = (n) => /\.(md|mdx)$/i.test(n);
const pageTitle = (n) => n.replace(/\.(md|mdx)$/i, "");

// Introduction first, then case-insensitive alphabetical
function sortEntries(dir) {
  const names = readdirSync(dir, { withFileTypes: true });
  const pages = names.filter((e) => e.isFile() && isPageName(e.name)).map((e) => e.name);
  const dirs = names.filter((e) => e.isDirectory()).map((e) => e.name);
  const cmp = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });
  pages.sort((a, b) => {
    const ia = /^introduction\.mdx?$/i.test(a) ? 0 : 1;
    const ib = /^introduction\.mdx?$/i.test(b) ? 0 : 1;
    return ia !== ib ? ia - ib : cmp(a, b);
  });
  dirs.sort(cmp);
  return { pages, dirs };
}

function emit(dir, rel, indent, out) {
  const pad = "  ".repeat(indent);
  const { pages, dirs } = sortEntries(dir);
  for (const p of pages) {
    out.push(`${pad}- page: ${q(pageTitle(p))}`);
    out.push(`${pad}  path: ${q("docs/" + rel + "/" + p)}`);
  }
  for (const d of dirs) {
    out.push(`${pad}- section: ${q(d)}`);
    out.push(`${pad}  contents:`);
    emit(join(dir, d), rel + "/" + d, indent + 1, out);
  }
}

const lines = [];
lines.push("# fern docs configuration");
lines.push("# - content lives under docs/ (copied from web-api-docs-zh and web-api-zh)");
lines.push("# - regenerate this file: node scripts/generate-docs-yml.mjs");
lines.push("");
lines.push("title: IBKR Web API 文档");
lines.push("");
lines.push("instances:");
lines.push(`  - url: ${q("ibkr-web-api-docs.docs.buildwithfern.com")}`);
lines.push("");
lines.push("navigation:");

// Tab 1: Introduction — introduction / quick-start / getting started / feedback
lines.push("  - tab: Introduction");
lines.push("    layout:");
lines.push("    - page: Introduction");
lines.push(`      path: ${q("docs/introduction/Introduction.md")}`);
lines.push("    - section: quick-start");
lines.push("      contents:");
for (const p of sortEntries(join(DOCS, "introduction", "quick-start")).pages) {
  lines.push(`        - page: ${q(pageTitle(p))}`);
  lines.push(`          path: ${q("docs/introduction/quick-start/" + p)}`);
}
lines.push("    - page: Getting Started");
lines.push(`      path: ${q("docs/introduction/Getting Started.md")}`);
lines.push("    - page: Feedback");
lines.push(`      path: ${q("docs/introduction/Feedback.md")}`);
lines.push("");

// Tab 2: Documentation — each top-level dir is a section, api-reference as sibling
lines.push("  - tab: Documentation");
lines.push("    layout:");
for (const d of ["account-management", "api", "authentication", "changelog", "flex-web-service", "trading", "v1", "api-reference"]) {
  lines.push(`    - section: ${q(d)}`);
  lines.push("      contents:");
  emit(join(DOCS, d), d, 3, lines);
}
lines.push("");

writeFileSync(join(FERN, "docs.yml"), lines.join("\n"), "utf8");
console.log("docs.yml written:", lines.length, "lines");
