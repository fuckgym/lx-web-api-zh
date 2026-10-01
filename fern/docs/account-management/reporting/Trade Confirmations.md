# 交易确认书(Trade Confirmations)

所有成交都会生成实时交易确认书。

### 可用的交易确认书

可以使用 `gw/api/v1/trade-confimations/available` 根据给定的 `accountId` 查看交易确认书可用的日期。该端点只会返回账户发生过交易的日期,且最多返回 2 年内的可用日期。

对于每日(daily)报告,响应将返回从第一个可用日期到最后一个可用日期。

## 示例

```
GET gw/api/v1/trade-confirmations/available?accountId=U123456

{
    "data": {
        "dataType": "String",
        "value":["20230428","20230731","20231031","20240102","20240430","20240731","20241031","20241231","20250411","20250430"]
    }
}
```

### 生成交易确认书

[`gw/api/v1/trade-confirmations`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/create-trade-confirmations) 可用于为给定时间段生成 PDF 格式的标准交易确认书。`startDate` 和 `endDate` 用于设定该时间段。

* 每次请求的最大范围为 365 天。
* 交易确认书仅适用于发生过交易的日期。

其他格式(Excel、CSV、HTML)可在 IBKR [Portal](https://www.ibkrguides.com/clientportal/performanceandstatements/statements.htm) 中下载。

## 请求参数

### Schema(模式)

| 名称                    | 类型                                      | 描述                                                                                                                                                                                                                                                                                                                                             |
| ----------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountId               | string                                    | 请求对账单所针对的 IBKR accountId。                                                                                                                                                                                                                                                                                                              |
| accountIds              | Array of strings                          | accountId 数组                                                                                                                                                                                                                                                                                                                                   |
| startDate               | YYYYMMDD                                  | 起始日期                                                                                                                                                                                                                                                                                                                                         |
| endDate                 | YYYYMMDD                                  | 要包含的最后报告日期。                                                                                                                                                                                                                                                                                                                           |
| multiAccountFormat      | consolidate concatenate customConsolidate | **consolidate:**单一对账单,以合并格式包含所有子账户的汇总数据。  **concatenate:**将所有子账户作为独立章节包含在内,格式类似于选择多个账户  **customConsolidate**:单一对账单,以合并格式包含自定义子账户组的汇总数据。                                                                                                                            |
| cryptoConsolIfAvailable | true false                                | 默认为 false。如果请求中包含任何属于加密货币板块(crypto segment)的账户,将把请求转换为加密货币合并(Crypto Consolidated)                                                                                                                                                                                                                         |
| mimeType                | application/pdf                           | 对账单的输出格式。                                                                                                                                                                                                                                                                                                                               |
| language                | en tw cn fr de es it ru ja pt             | 两位字符的 ISO 语言代码 默认:"en"  tw= 繁体中文 cn= 简体中文 fr= 法语 de= 德语 es= 西班牙语 it= 意大利语 ru= 俄语 ja= 日语 pt = 葡萄牙语                                                                                                                                                                                                        |
| gzip                    | true false                                | 默认为 false。如果设置为 true,响应将被压缩(gzip)。                                                                                                                                                                                                                                                                                             |

### 示例

```
POST gw/api/v1/trade-confirmations{ accountId: "U12345", startDate: "20230401", endDate: "20230425", mimeType: "application/pdf" }
{
    "data": {
        "dataType": "byte[]",
        "mimeType": "application/pdf",
        "encoding": "base64",
        "value": "BaseEncoded64String"
    },
    "accept": "*/*"
}
```

### 示例

| startDate | endDate  | 示例                                                                                                                                     |
| --------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| YYYYMMDD  | YYYYMMDD | `POST gw/api/v1/trade-confirmations`  `{ accountId: "U12345", startDate: "20230401", endDate: "20230425", mimeType: "application/pdf" }` |
