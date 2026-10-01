# Open Banking

我们的 Open Banking 集成提供了一种简化方式,用于管理银行连接以及您的银行账户与 IBKR 经纪账户之间的划转。我们与 Plaid 合作,由其处理安全的银行身份验证和连接管理。

我们提供的是**混合集成方式**,而非完全的直接 API 集成:

* **银行连接管理**由我们的合作伙伴 Plaid 处理
* **划转执行**通过我们的 API 端点完成
* **常设指令**在您的 IBKR 账户内管理

## 添加 Open Banking 指令

使用[单点登录](/web-api/account-management/single-sign-on)将用户连接到 IBKR 门户,以便在其账户中添加新的 Open Banking 指令。

plaintext

**使用场景:** 首次设置或添加其他银行账户

**流程:**

1. 托管机构将调用 `/api/v1/sso-browser-sessions`,并提供终端用户的 `credential` 和 `ip`。
2. IBKR 返回一个带 SID(唯一令牌)的响应 URL。
   * SID 仅在 60 秒内有效,且只能从原始请求中包含的 IP 访问。
3. 托管机构在 URL 后追加 `ACTION=TransferFunds&type=DEPOSIT&method=OPEN_BANKING&currency=<GBPorEUR>`
4. 托管机构在用户浏览器中打开该 URL,新窗口打开后用户将进入 IBKR 入金页面,可在该页面添加 Open Banking 指令

## 示例

```
https://www.clientam.com/sso/resolver?ACTION=TransferFunds&type=DEPOSIT&method=OPEN_BANKING&currency=<GBPorEUR>&SID=<TokenHere>
```

## 发起 Open Banking 入金

当 Open Banking 常设指令已经就绪时,可通过调用 `/gw/api/v1/external-cash-transfers` 端点,经由 Plaid 发起入金。

**前提条件:**

* 用户的 IBKR 账户中必须已存在 Open Banking 常设指令
* 银行账户必须事先已完成连接
* 托管机构已将 URI 提供给 IBKR API 代表。

**流程:**

* 托管机构调用 `/gw/api/v1/external-cash-transfers` 端点,向 IBKR 提供入金详情。
* IBKR 返回唯一的 URL 地址
* 托管机构在用户浏览器中打开该 URL。用户将进入 Plaid 界面。
* 用户完成身份验证并确认入金
* 资金划转随即发起

## 请求参数

| 名称                  | 类型                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | 描述                                                                                                                                                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| accountId             | String                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | 资金存入的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                         |
| instructionType       | DEPOSIT                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | 交易类型。                                                                                                                                                                                                                             |
| clientInstructionId   | Number;最多 20 个字符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 与请求关联的唯一标识符。– **clientInstructionId** 不能重复使用。– IBKR 建议 **clientInstructionId** 按顺序编号,例如 1, 2, 3, 4 或 100, 101, 102, 103,而非 777, 589, 123。 |
| amount                | number > 0                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | 存入客户 IBKR 账户的金额。                                                                                                                                                                                              |
| bankInstructionMethod | OPEN\_BANKING                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | WIRE:通过美联储电汇系统进行的电子资金转账。ACH:包括美国自动清算所、单一欧元支付区、加拿大电子资金转账。                                                                                                                                             |
| currency              | 货币代码(3 位)。可用货币可参见[**此处**](https://nam02.safelinks.protection.outlook.com/?url=https%3A%2F%2Fwww.interactivebrokers.com%2Fen%2Fsupport%2Ffund-my-account.php\&data=05%7C02%7Cdam%40interactivebrokers.com%7Cf880a2adb1ab47c5b4bf08de4d51a5fe%7C7abd04ef837d48e69ba869d84f65a110%7C0%7C0%7C639033210317202011%7CUnknown%7CTWFpbGZsb3d8eyJFbXB0eU1hcGkiOnRydWUsIlYiOiIwLjAuMDAwMCIsIlAiOiJXaW4zMiIsIkFOIjoiTWFpbCIsIldUIjoyfQ%3D%3D%7C0%7C%7C%7C\&sdata=VdOJ46KLbNX4BLWWxnwlcd7UZ9dHDgTtyRX%2FQozIm3I%3D\&reserved=0)。 | 发送至 IBKR 的资金币种。                                                                                                                                                                                                        |
| bankInstructionName   | String;最多 150 个字符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                | 先前创建的指令(已保存的银行/账号)的名称。仅 IBKR 发起的 ACH 需要此字段。                                                                                                                                  |
| identifier            | String;最多 64 个字符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | 银行账号                                                                                                                                                                                                                              |
| serviceProvider       | PLAID                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | 服务提供商的名称。                                                                                                                                                                                                                    |
| linkDisplayName       | String;最多 128 个字符。                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 在 Plaid 界面上显示的客户名称                                                                                                                                                                                                       |
| completeRedirectUri   | URI 地址                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | 返回 URL(已在 Plaid 控制面板中预先配置)                                                                                                                                                                                                   |

### 示例

```
{
    "instructionType": "DEPOSIT",
    "instruction": {
        "clientInstructionId": 43454545,
        "accountId": "U1234567",
        "currency": "EUR",
        "amount": 1300,
        "bankInstructionMethod": "OPEN_BANKING",
        "openBanking": {
            "serviceProvider": "PLAID",
            "plaidOptions": {
                "linkDisplayName": "Test displayname",
                "completionRedirectUri": "wonderdust://complete"
            }
        },
        "bankInstructionName": "Test Bank"
    }
}
```

## 示例响应

```
{
    "status": 202,
    "instructionSetId": 882059,
    "instructionResult": {
        "depositDetails": {
            "openBanking": {
                "serviceProvider": "PLAID",
                "providerResponse": {
                    "paymentId": "payment-id-sandbox-dc9f2de9-6c6d-4c04-b09c-c7fb8314afc7",
                    "hostedlinkUrl": "https://secure.plaid.com/hl/ls16p0n6orpq489p4s37o3rr16pqq9n3p2",
                    "linkToken": "link-sandbox-61c5a1be-cd93-4c9f-82b8-ee61cdd4a8c7"
                }
            }
        },
        "ibReferenceId": 320905649,
        "clientInstructionId": 601361111111301,
        "instructionType": "DEPOSIT",
        "instructionStatus": "PENDING",
        "instructionId": 703819361
    }
}
```

## 发起出金

当您向 IBKR 账户添加 Open Banking 指令时,IBKR 会自动创建一组**常设出金指令**。这一一次性设置可实现后续划转的无缝进行。这意味着提交出金请求无需用户与 Plaid 或 IBKR 交互。

* `bankInstructionMethod` 将是以下之一:
  * `LVP`(IB-UK)
  * `SEPA`

**前提条件:**

* IBKR 账户中必须已设置常设出金指令

## 示例

```
POST /gw/api/v1/external-cash-transfers

{ "instructionType": "WITHDRAWAL", 
 "instruction": {    "clientInstructionId": 7013048,
    "accountId": "U46377",
    "bankInstructionName": "Test Withdrawal",
    "bankInstructionMethod": "SEPA",
    "amount": "123.45",
    "currency": "EUR",
    "dateTimeToOccur": "2023-11-20T09:12:13Z"
  }
```

**提示**:可以使用 `/gw/api/v1/bank-instructions/query` 端点,按 `accountId` 和 `bankInstructionMethod` 查看已存档的银行指令列表。响应将返回对应的 `bankInstructionName`、`bankRoutingNumber`、`currency` 以及 `bankAccountNumber` 的后 4 位。
