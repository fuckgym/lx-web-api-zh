# 税务表格

查看可用的税务表格,并按账户 ID 生成历史或当前税务表格。

### 可用税务表格

`gw/api/v1/tax-documents/available` 可用于根据 `accountId` 查询可用税务表格列表。

* 税务表格可用性
  * 合并版 1099 表格(Form 1099 (Consolidated))将于 2 月 15 日提供上一自然年度的表格。
  * IRA 账户的 1099-R 表格(Form 1099-R)将于 1 月 31 日前提供上一自然年度的表格。
  * IRA 账户的 5498 表格(Form 5498)将于 5 月 31 日前提供上一自然年度的表格。

有关可用税务表格的更多信息,请访问我们的[主网站](https://www.interactivebrokers.com/en/support/tax-overview.php)。

## 示例

```
GET gw/api/v1/tax-documents/available?accountId=U123456&year=2022

{
"data": {
"dataType": "String",
"value": {
"forms": [
{
"isForm": true,
"taxFormName": "1099",
"formats": [
"PDF"
]
}
]
}
}
}
```

### 生成税务文档

[`gw/api/v1/tax-documents`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-reports/create-tax-documents) 可用于为指定税务年度生成 PDF、HTML 或 CSV 格式的税务文档。

## 请求参数

### 模式(Schema)

| 名称      | 类型                      | 说明                                                                      |
| --------- | ------------------------- | ------------------------------------------------------------------------- |
| accountId | string                    | 请求税务表格的 IBKR 账户 ID。                                             |
| year      | YYYY                      | 税务年度                                                                  |
| format    | HTML CSV PDF              | 税务表格的格式                                                            |
| type      | 1099 1099R 1042S 8949 All | 要生成的税务表格类型。                                                    |
| gzip      | true false                | 默认为 false。若设为 true,响应将被压缩(gzip)。                          |

### 示例

| 示例                                                                                                                                                  |
| ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| `POST gw/api/v1/tax-documents`  `{"accountId": "UXXXX", "year": 2023, "type": "ALL,1099,1099R,1042S,8949", "format": "HTML,CSV,PDF", "gzip": false }` |
