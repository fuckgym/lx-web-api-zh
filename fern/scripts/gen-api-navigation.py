# Build the manual API navigation (openapi/api-nav.json) from the translated
# spec copy. Endpoints are referenced as "METHOD /path" (fern's API Reference
# layout format) with explicit ASCII slugs, grouped under Chinese sections so
# URLs read like /api-reference/trading/fa-allocation-management/create-allocation-group.
import yaml, json, re

PATH = "openapi/openapi.zh.yaml"
OUT = "openapi/api-nav.json"

with open(PATH, encoding="utf-8") as f:
    spec = yaml.safe_load(f)

HTTP = ("get", "post", "put", "delete", "patch")

# group title -> (group slug, [tag names in display order]); tag names are the
# Chinese names used in the spec and shown as sidebar titles
GROUPS = [
    ("认证", "authentication", ["OAuth 1.0a 授权", "SSO 浏览器会话", "SSO 会话", "授权令牌"]),
    ("交易", "trading", ["交易账户", "交易警报", "交易合约", "事件合约",
                       "FA 分配管理", "FA 模型组合", "FYI 与通知",
                       "行情数据", "交易订单", "投资组合", "投资组合分析",
                       "市场扫描器", "交易会话", "自选列表"]),
    ("账户管理", "account-management", ["账户管理 账户", "账户管理 银行业务",
                                     "账户管理 报表", "账户管理 实用工具"]),
    ("交易前合规", "pre-trade-compliance", ["交易前合规限制"]),
    ("第三方", "third-parties", ["第三方 现金余额", "第三方 税务凭证"]),
    ("实用工具", "utilities", ["实用工具 Echo"]),
    ("WebSocket", "websocket", ["交易 WebSocket"]),
    # flat group: endpoints hang directly off the group section (no tag
    # subsection). generate-docs-yml.mjs routes this group into the
    # flex-web-service tab instead of the API Reference tab.
    ("Flex Web Service", "flex-web-service", ["Flex Web Service"]),
]

# groups whose (single) tag's endpoints are emitted directly under the group
FLAT_GROUPS = {"Flex Web Service"}

# tag name -> subsection slug (clean, no group prefix duplication issues)
TAG_SLUGS = {
    "OAuth 1.0a 授权": "oauth-1-0a",
    "SSO 浏览器会话": "sso-browser-sessions",
    "SSO 会话": "sso-sessions",
    "授权令牌": "token",
    "交易账户": "accounts",
    "交易警报": "alerts",
    "交易合约": "contracts",
    "事件合约": "event-contracts",
    "FA 分配管理": "fa-allocation-management",
    "FA 模型组合": "fa-model-portfolios",
    "FYI 与通知": "fyis-and-notifications",
    "行情数据": "market-data",
    "交易订单": "orders",
    "投资组合": "portfolio",
    "投资组合分析": "portfolio-analyst",
    "市场扫描器": "scanner",
    "交易会话": "session",
    "自选列表": "watchlists",
    "账户管理 账户": "accounts",
    "账户管理 银行业务": "banking",
    "账户管理 报表": "reports",
    "账户管理 实用工具": "utilities",
    "交易前合规限制": "restrictions",
    "第三方 现金余额": "cash-balances",
    "第三方 税务凭证": "tax-vouchers",
    "实用工具 Echo": "echo",
    "交易 WebSocket": "websocket",
}

def kebab(s):
    s = re.sub(r"(?<=[a-z0-9])([A-Z])", r"-\1", s)
    return re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")

ops_by_tag = {}
for path, item in (spec.get("paths") or {}).items():
    for m, op in item.items():
        if m in HTTP and isinstance(op, dict):
            for t in op.get("tags") or []:
                ops_by_tag.setdefault(t, []).append((m.upper() + " " + path, op, m))

layout = []
covered = 0
unmatched_tags = []
for group_title, group_slug, tag_names in GROUPS:
    if group_title in FLAT_GROUPS:
        ops = ops_by_tag.get(tag_names[0], [])
        if not ops:
            unmatched_tags.append(tag_names[0])
            continue
        ep_items = []
        for ref, op, m in ops:
            oid = op.get("operationId") or ""
            suffix = oid.split("_", 1)[1] if "_" in oid else oid
            slug = kebab(suffix) or kebab(oid)
            ep_items.append({"endpoint": ref, "slug": slug})
            covered += 1
        layout.append({"section": group_title, "slug": group_slug, "contents": ep_items})
        continue
    contents = []
    for tag in tag_names:
        ops = ops_by_tag.get(tag, [])
        if not ops:
            unmatched_tags.append(tag)
            continue
        seen = {}
        ep_items = []
        for ref, op, m in ops:
            oid = op.get("operationId") or ""
            suffix = oid.split("_", 1)[1] if "_" in oid else oid
            slug = kebab(suffix) or kebab(oid)
            if slug in seen:
                seen[slug] += 1
                slug = f"{slug}-{seen[slug]}"
            else:
                seen[slug] = 1
            ep_items.append({"endpoint": ref, "slug": slug})
            covered += 1
        contents.append({
            "section": tag,
            "slug": TAG_SLUGS.get(tag, kebab(tag)),
            "contents": ep_items,
        })
    layout.append({"section": group_title, "slug": group_slug, "contents": contents})

stray = set(ops_by_tag) - {t for g in GROUPS for t in g[2]}

with open(OUT, "w", encoding="utf-8") as f:
    json.dump(layout, f, ensure_ascii=False, indent=1)

def group_endpoint_count(group):
    first = group["contents"][0] if group["contents"] else {}
    if "endpoint" in first:  # flat group: endpoints directly under the section
        return len(group["contents"])
    return sum(len(s["contents"]) for s in group["contents"])


total = sum(group_endpoint_count(g) for g in layout)
print(f"groups: {len(layout)} | tags: {sum(len(g['contents']) for g in layout)} | endpoints: {total} (spec ops: {covered})")
if unmatched_tags:
    print("tags without ops:", unmatched_tags)
if stray:
    print("ops in tags not mapped to a group:", stray)
