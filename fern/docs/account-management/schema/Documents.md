# 文档（Documents）

包括在 IBKR 开设经纪账户所需的表单。这包括任何[协议与披露文件](/web-api/account-management/client-registration/agreements-and-disclosures)、税务表格（Tax Form），以及诸如身份证明和地址证明文件等补充文档。

所需表单会因账户配置和账户类型而异。

* NonQI / OWD
  * 税务表格（Tax Form）
  * 若 Trulioo 结果为 NoMatch，则需身份证明 / 地址证明。
* Fully-Disclosed / Advisor
  * 税务表格（Tax Form）
  * 若 Trulioo 结果为 NoMatch，则需身份证明 / 地址证明。
  * 客户类型（个人 Individual、联合 Joint、IRA 等）
  * 功能权限（保证金 Margin、投资组合保证金 Portfolio Margin）
  * 交易权限（美国股票、美国期权等）
  * 账户所关联的 IBKR 实体（例如 IBLLC-US、IB-CAN、IB-UK、IB-IE 等）

## 架构（Schema）

| 名称                 | 类型                                                                                                                                                                                                                                                                                                           | 基于 form\_no 的用法         | 描述                                                                                                                                                                                                                                                                                                                                                                                                                            |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fileName             | String                                                                                                                                                                                                                                                                                                         | 全部                         | 提交给 IBKR 的 PDF 文档的文件名。`documents` 请求中包含的 `fileName` 必须与签名请求中包含的 PDF 文件的 `fileName` 一致。可接受的格式：.jpeg、.jpg、.pdf、.png 最大大小：10 MB                                                                                                                                                                                                                     |
| fileLength           | String                                                                                                                                                                                                                                                                                                         | 全部                         | 与文档关联的文件长度。                                                                                                                                                                                                                                                                                                                                                                                                           |
| sha1Checksum         | String                                                                                                                                                                                                                                                                                                         | 全部                         | SHA-1 是一种用于验证文件未被篡改的加密算法。具体做法是在文件传输前生成一次校验和，然后在文件到达目的地后再次生成校验和进行比对。                                                                                                                                                                                                                                                                      |
| formNumber           | String                                                                                                                                                                                                                                                                                                         | 全部                         | 使用 `/gw/api/v1/accounts/{accountId}/tasks` 查看审批所需的表单列表。                                                                                                                                                                                                                                                                                                       |
| execTimestamp        | YYYYMMDDHHMMSS                                                                                                                                                                                                                                                                                                 | 全部                         | 客户签署协议的时间戳（即客户签署协议的时间）。                                                                                                                                                                                                                                                                                                                                                                                        |
| execLoginTimestamp   | YYYYMMDDHHMMSS                                                                                                                                                                                                                                                                                                 | 全部                         | 该会话的登录时间戳（客户登录并确认协议的时间。                                                                                                                                                                                                                                                                                                                                                                                            |
| signedBy             | String                                                                                                                                                                                                                                                                                                         | 全部                         | `signedBy` 必须与提交的姓名匹配（`first + middle` 首字母（如适用）+ `last`）。\*数据区分大小写和空格。                                                                                                                                                                                                                                                                                         |
| proofOfIdentityType  | **除 IB-CAN 外的所有实体** Driver License Passport Alien ID Card National ID Card  **仅限 IB-CAN** Bank Statement Evidence of Ownership of Property Credit Card Statement Utility Bill Brokerage Statement T4 Statement CRA Assessment                                                                 | 8001 8205 8053 8057          | 所提交文档的描述，用于满足身份证明要求。                                                                                                                                                                                                                                                                                                                                                              |
| proofOfAddressType   | Bank Statement Brokerage Statement Homeowner Insurance Policy Bill Homeowner Insurance Policy Document Renter Insurance Policy bill Renter Insurance Policy Document Security System Bill Government Issued Letters Utility Bill Current Lease Evidence of Ownership of Property Driver License Other Document | 8002 8001 8205 8053 8057     | 所提交文档的描述，用于满足地址证明要求。                                                                                                                                                                                                                                                                                                                                                             |
| validAddress         | true false                                                                                                                                                                                                                                                                                                     | 8001                         | 如果提供 `Driver License` 作为 `proofOfIdentityType` 且 `validAddress`=true，则单份文档即可同时满足身份证明和地址证明。 ]                                                                                                                                                                                                                                                                |
| externalIndividualId | String                                                                                                                                                                                                                                                                                                         |                              | 协议签署个人在外部实体处的标识符。必须是申请中列出的个人。对于 INDIVIDUAL 申请将被忽略，因为协议必须由账户持有人签署。对于通过 ECA 创建的 JOINT 账户，提交 POI/POA 时必填。对于通过 ECA 创建的 JOINT 持有人，需要提供正在为其提交 POI/POA 的账户持有人的外部 ID。 |
| expirationDate       | YYYY-MM-DD                                                                                                                                                                                                                                                                                                     | Drivers License OR  Passport | 提供身份证件的到期日。                                                                                                                                                                                                                                                                                                                                                                                                                   |
| mimeType             | application/pdf application/pdf image/png  image/jpeg (Includes .jpeg, .jpg)                                                                                                                                                                                                                                   |                              | 文件的格式。                                                                                                                                                                                                                                                                                                                                                                                                                        |
| data                 | String                                                                                                                                                                                                                                                                                                         |                              | 包含以 base64 编码的文档。                                                                                                                                                                                                                                                                                                                                                                                                          |

## 示例

```
"documents": [
{
"signedBy": [
"Jane M Doe"
],
"attachedFile": {
"fileName": "Form5002.pdf",
"fileLength": 119331,
"sha1Checksum": "06c13ef0c01e831c1b9f0c2c0550812a4c242b3a",
"payload": {
                         "mimeType": "application/pdf",
                         "data": "<DocumentEncodedInBase64>"         }

                   
},
"formNumber": 5002,
"isValidAddress": false,
"execLoginTimestamp": 20240307114436,
"execTimestamp": 20240307114436
},
{
"signedBy": [
"Jane M Doe"
],
"attachedFile": {
"fileName": "POIandPOA.pdf",

"fileLength": 170163,
"sha1Checksum": "76bd4f17da8c8ed0d9ff752b5ffc0a1e38c16bd1"
},
"formNumber": 8001,
"expirationDate": "2029-10-29",
"proofOfIdentityType": "Drivers License",
"isValidAddress": true,
"execLoginTimestamp": 20240307114436,
"execTimestamp": 20240307114436
} ],
```
