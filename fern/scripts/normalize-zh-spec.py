# One-time transform of the COPIED translated spec (openapi/openapi.zh.yaml):
# tag names -> English camelCase (derived from operationId prefixes) so URLs are
# ASCII; the original Chinese tag label is kept in x-fern-display-name.
import yaml, re, sys, collections

PATH = "openapi/openapi.zh.yaml"

with open(PATH, encoding="utf-8") as f:
    spec = yaml.safe_load(f)

HTTP = ("get", "post", "put", "delete", "patch")
prefixes = collections.defaultdict(collections.Counter)
for item in (spec.get("paths") or {}).values():
    for m, op in item.items():
        if m in HTTP and isinstance(op, dict):
            for t in op.get("tags") or []:
                oid = op.get("operationId") or ""
                if "_" in oid:
                    prefixes[t][oid.split("_", 1)[0]] += 1

tag_map = {}
for zh, ctr in prefixes.items():
    tag_map[zh] = ctr.most_common(1)[0][0]

for t in spec.get("tags") or []:
    if t.get("name") in tag_map:
        t["x-fern-display-name"] = t["name"]
        t["name"] = tag_map[t["name"]]

# Tag names stay Chinese (they are the sidebar titles); URL segments come from
# the explicit slugs in the docs.yml api layout (gen-api-navigation.py), so no
# tag renaming is needed here.
for item in (spec.get("paths") or {}).values():
    for m, op in item.items():
        if m in HTTP and isinstance(op, dict):
            op["tags"] = list(op.get("tags") or [])

# Disambiguate duplicate summaries so endpoint references by title are unique
SUMMARY_OVERRIDES = {
    "tradingContracts_getContractSymbols": "按代码搜索标的（GET）",
    "tradingContracts_getContractSymbolsFromBody": "按代码搜索标的（POST）",
    "accountManagementBanking_bulkExternalAssetTransfers_2": "创建多个外部资产转移（Fop、DWAC 与复杂资产转移）（v2）",
    "accountManagementBanking_createExternalCashTransfersQuery": "查看现金余额（银行业务）",
}
for item in (spec.get("paths") or {}).values():
    for m, op in item.items():
        if m in HTTP and isinstance(op, dict):
            oid = op.get("operationId")
            if oid in SUMMARY_OVERRIDES:
                op["summary"] = SUMMARY_OVERRIDES[oid]

with open(PATH, "w", encoding="utf-8") as f:
    yaml.safe_dump(spec, f, allow_unicode=True, sort_keys=False, width=10**9)

print("tag mapping:")
for k, v in tag_map.items():
    print(f"  {k} -> {v}")
