# 协议与披露文件

Fully-Disclosed（完全披露）客户和 Advisor（财务顾问）客户需要签署 IBKR 客户协议与披露文件。

* **Full Integration（完全集成）**：托管券商（hosting firm）将在其界面中展示 IBKR 协议与披露文件，并收集电子签名。
* **Hybrid（混合）**：最终用户通过 IBKR 白标平台（White Branded Platform）签署 IBKR 协议

本节介绍为使用 Full Integration 的客户处理协议与披露文件的方法。

### 下载 IBKR 协议与披露文件

使用 [`/gw/api/v1/forms`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/list-forms) 端点拉取。

## 请求参数

| 名称              | 类型              | 说明                                                                                                                                             |
| ----------------- | ----------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| getDocs（必填）   | T F               | T= True（将拉取文档）F= False（不拉取文档）                                                                                                      |
| fromDate（必填）  | YYYY-MM-DD        | 查看自 fromDate 起更新的表格                                                                                                                     |
| toDate（必填）    | YYYY-MM-DD        | 查看 fromDate 与 toDate 之间更新的表格                                                                                                           |
| formNo            | String            | 表格编号。若提供；每次请求仅支持单个 formNo。若省略，端点将返回所有符合给定条件的表格。                                                          |
| projection        | DOCS NONE PAYLOAD | 决定输出内容                                                                                                                                     |

### 提交协议与披露文件

[`/gw/api/v1/accounts/documents`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/create-accounts-documents) 端点提供了一种机制，可每天一次将协议与披露文件提交给 IBKR，而无需随每份申请一起提交。我们会将这些文档存储在服务器上，并用于当天提交的新申请请求。

* 文档需要每天提交一次（在提交申请之前）。PDF 将按原样展示并提交——不会对实际 PDF 文件做任何更改/编辑。
* 此端点不会处理任何税务表格（Tax Form）文档。税务表格文档应随每份申请一起提交
* 如果在上午提交，你只需为每位申请人附上税务表格附件。否则，你需要随每份申请（Create Account）附上 PDF。

## Schema

| 名称               | 类型                                                                         | 说明                                                                                                                                                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| fileName           | String                                                                       | 提交给 IBKR 的 PDF 文档的文件名。`documents` 请求中包含的 `fileName` 必须与签名请求中所包含的 PDF 文件的 `fileName` 一致。  可接受的格式：.jpeg、.jpg、.pdf、.png 最大大小：10 MB                                                                      |
| fileLength         | String                                                                       | PDF 表格的长度。                                                                                                                                                                                                                                        |
| sha1Checksum       | String                                                                       | SHA-1 是一种用于验证文件未被更改的加密算法。具体做法是在文件传输前生成一次校验和，待文件到达目的地后再次生成校验和进行比对。                                                                                                                           |
| formNumber         | String                                                                       | 使用 `/gw/api/v1/accounts/{accountId}/tasks` 查看审批所需的表格列表。                                                                                                                                                                                   |
| execTimestamp      | YYYYMMDDHHMMSS                                                               | 协议提交给 IBKR 的时间戳。                                                                                                                                                                                                                             |
| execLoginTimestamp | YYYYMMDDHHMMSS                                                               | 协议提交给 IBKR 的时间戳。                                                                                                                                                                                                                             |
| mimeType           | application/pdf application/pdf image/png  image/jpeg (Includes .jpeg, .jpg) | 文件的格式。                                                                                                                                                                                                                                           |
| data               | String                                                                       | 包含以 base64 编码的文档。                                                                                                                                                                                                                             |

## 示例

```
{
        "processDocuments":
            {
                "documents": [
                    {
                        "attachedFile": {
                            "fileName": "Form3024.pdf",
                            "fileLength": 432177,
                            "sha1Checksum": "03D899BA757F617C907A1F021D7046AC1DAC8707"
                        },
                        "payload": {
                            "mimeType": "application/pdf",
                            "data": pm.collectionVariables.get('form3024')
                        },
                        "formNumber": 3024,
                        "execLoginTimestamp": 20210929123113,
                        "execTimestamp": 20210929123113
                    }
                ],
                "inputLanguage": "en",
                "translation": false
            }
    }
```

### IBKR 协议与披露文件的处理

* 托管券商将在其界面中展示 IBKR 协议与披露文件，并收集电子签名。
  * 为每份表格分别收集签名，或将所有表格显示在单个页面上、在底部设置一个签名框，并将该签名传入每份表格对应的 `documents` 部分。
  * 作为参考的 IBKR 申请示例![](https://www.ibkrguides.com/dameca/Resources/Images/image20.png)
* 所收集的签名将包含在 `documents` 的 `signedBy` 部分中。
* 托管券商将在提交给 IBKR 用于客户注册的申请负载（payload）中，提供曾向用户展示的 IBKR 协议的副本。
  * 不应对 PDF 做任何更改（我们使用 sha1checksum 验证表格，如果发现更改，将触发错误且该表格将不被接受。
* 如果某份表格更新了，托管券商有 7 个自然日的宽限期来更新该表格。
