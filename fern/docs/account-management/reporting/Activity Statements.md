# 活动对账单

活动对账单（Activity Statement）显示给定时间段内账户活动的摘要，包括净资产值、盈亏（PnL）数据和交易明细。该 API 可用于查看可用对账单并生成 PDF 格式的对账单。

### 可用对账单

`gw/api/v1/statements/available` 可用于根据 `accountId` 查询可用对账单列表。该端点将返回最长 2 年以及年初至今的日线、月线和年度对账单可用记录。

* 对账单自账户注资之日起可用。
* 大宗商品（commodities）的报告窗口于美东时间（EST）下午 5:15 关闭，证券（securities）为美东时间晚上 8:20。对账单将在（美东时间）午夜前后可用。

对于日线，响应将返回最早可用日期至最晚可用日期。

## 示例

```
GET gw/api/v1/statements/available?accountId=U123456

{
    "data": {
        "dataType": "String",
        "value": {
            "daily": {
                "endDate": "20241007",
                "startDate": "20220101"
            },
            "monthly": [
                "202201",
                "202202",
                "202203",
                "202204",
                "202205",
                "202206",
                "202207",
                "202208",
                "202209",
                "202210",
                "202211",
                "202212",
                "202301",
                "202302",
                "202303",
                "202304",
                "202305",
                "202306",
                "202307",
                "202308",
                "202309",
                "202310",
                "202311",
                "202312",
                "202401",
                "202402",
                "202403",
                "202404",
                "202405",
                "202406",
                "202407",
                "202408",
                "202409"
            ],
            "annual": [
                "2022",
                "2023"
            ]
        }
    }
}
```

### 生成对账单

[`gw/api/v1/statements`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/create-statements) 可用于生成给定时间段内 PDF 格式的标准对账单。`startDate` 和 `endDate` 用于设置时间段。

* 每次请求的最大范围为 365 天。
* 对账单仅自账户注资之日起可用。

其他格式（Excel、CSV、HTML）和自定义对账单可在 IBKR [Portal](https://www.interactivebrokers.com/clientportal/performanceandstatements/statements.htm) 中下载。

## 请求参数

### Schema

| 名称                    | 类型                                      | 说明                                                                                                                                                                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountId               | string                                    | 请求对账单的 IBKR accountId。                                                                                                                                                                                                                                                                                                                    |
| accountIds              | Array of strings                          | accountId 的数组                                                                                                                                                                                                                                                                                                                                 |
| startDate               | YYYYMMDD                                  | 起始日期                                                                                                                                                                                                                                                                                                                                         |
| endDate                 | YYYYMMDD                                  | 要包含的最后报告日期。                                                                                                                                                                                                                                                                                                                           |
| multiAccountFormat      | consolidate concatenate customConsolidate | **consolidate:** 单份对账单，以合并格式汇总所有子账户的数据。  **concatenate:** 将所有子账户作为独立章节包含在内，格式类似于选择多个账户  **customConsolidate**: 单份对账单，以合并格式汇总自定义子账户组的数据。                                                                                                                                |
| cryptoConsolIfAvailable | true false                                | 默认为 false。如果请求包含任何带加密货币（crypto）板块的账户，将把请求转换为加密货币合并（Crypto Consolidated）对账单                                                                                                                                                                                                                             |
| mimeType                | application/pdf                           | 对账单的输出格式。                                                                                                                                                                                                                                                                                                                               |
| language                | en tw cn fr de es it ru ja pt             | 两位字符的 ISO 语言代码  默认值："en"  tw= 繁体中文 cn= 简体中文 fr= 法语 de= 德语 es= 西班牙语 it= 意大利语 ru= 俄语 ja= 日语 pt = 葡萄牙语                                                                                                                                                                                                     |
| gzip                    | true false                                | 默认为 false。若设置为 true，响应将被压缩（gzip）。                                                                                                                                                                                                                                                                                              |

### 示例

| 期间              | startDate | endDate  | 示例                                                                                                                            |
| ----------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------- |
| 年度              | YYYY      | YYYY     | `POST gw/api/v1/statements`  `{ accountId: "U12345", startDate: "2023", endDate: "2023", mimeType: "application/pdf" }`         |
| 月度              | YYYYMM    | YYYYMM   | `POST gw/api/v1/statements`  `{ accountId: "U12345", startDate: "202304", endDate: "202304", mimeType: "application/pdf" }`     |
| 自定义日期范围    | YYYYMMDD  | YYYYMMDD | `POST gw/api/v1/statements`  `{ accountId: "U12345", startDate: "20230401", endDate: "20230425", mimeType: "application/pdf" }` |
