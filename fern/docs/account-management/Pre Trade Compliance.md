# 交易前合规(Pre Trade Compliance)

`/api/v1/restrictions` 可用于对某个账户或用户、或整个账户系列(包括所有客户/子账户)应用与交易相关的规则和限制。PTC 限制、规则和关联的更新可通过 RESTful Web API 发送给 IBKR。

* `/api/v1/restrictions`:该服务用于通过 API 应用限制,并管理交易前合规(Pre-Trade Compliance)的规则或关联。

* `/api/v1/restrictions`/`verify`:该服务用于验证 CSV 文件中包含的内容是否完好无误。

限制将以 [CSV 格式](https://www.ibkrguides.com/pretradecompliance/upload-restrictions.htm)发送,所用格式与在 IBKR Hosted Platform 内上传 CSV 文件时使用的格式相同。

* [可用限制](https://guides.interactivebrokers.com/pretrade/pretrade.htm#usersguidebook/PreTradeCompliance/rules.htm?TocPath=_____10)
* [关于交易前合规](https://guides.interactivebrokers.com/pretrade/pretrade.htm#usersguidebook/PreTradeCompliance/aboutPTC.htm?TocPath=_____1)

## 请求参数

| 名称               | 值                          | 描述                                                                                                                                                              |
| ------------------ | --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| userName required  | String                      | 发起该请求的用户的 IBKR 用户 ID。该用户 ID 必须拥有 'Pre Trade Compliance' 的访问权限。                                                                            |
| requestId required | 非负整数值。                | 与请求关联的唯一标识符。每个请求的 requestId 都必须唯一。如果 requestId 此前已被处理,将抛出错误。                                                                  |
| payload required   | String                      | 以 base64 编码的 CSV 文件。                                                                                                                                       |

|                                                                                                                                                                                                                                                                                                         |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **JSON 请求** `const body = {  "userName": pm.environment.get('userName'),  "requestId": Date.now(),  "payload": "UkVTVFJfQURELCBBUElBVVRILTcyOCwgUlVMRV9CRUdJTiwgcnVsZV90eXBlPUNMT1NJTkdPTkxZLCB0aWY9R1RDLCBSVUxFX0VORA==" } pm.collectionVariables.set('signedRequest', utils.signRequest(body));` |

## 响应参数

| 名称      | 值                         | 描述                                                                                                                                                         |
| --------- | -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| success   | Boolean                    | 指示文件内容是否有效。true:表示文件有效。false:表示文件无效且无法处理。                                                                                      |
| requestId | 非负整数值                 | 已处理的 reqId。                                                                                                                                             |
| message   | String                     | 如果 success=false,该消息将包含关于错误的一些信息。                                                                                                          |

### JSON 响应

|                                                                                       |
| ------------------------------------------------------------------------------------- |
| \{  `"success": "<true\|false>",  "requestId":"<String>",  "message":"<string>"  } }` |

### 示例

|                                                                             |
| --------------------------------------------------------------------------- |
| **成功** `{"success":true,"requestId":20211635375984312,"message":"OK"}` |
