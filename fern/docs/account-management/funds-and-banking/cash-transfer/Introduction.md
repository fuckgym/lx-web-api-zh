# 简介

IBKR 支持 20 多种货币,客户可以灵活地以基础货币和非基础货币余额进行入金或出金。可能适用特定的货币限制,具体取决于个人的居住国家/地区以及所选的入金方式。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。

可以使用 `/gw/api/v1/external-cash-transfers` 来管理外部银行账户与 IBKR 经纪账户之间的资金划转。划转详情(包括方式(`ACH` 和 `WIRE`)、交易类型(`DEPOSIT` 或 `WITHDRAWAL`)、`currency` 和 `amount`)将在请求正文中定义。

作为对 [API 参考文档](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-banking/create-external-cash-transfers)中示例请求的补充,我们在接下来的章节中详细列出了正文参数及其用法。

## 请求参数

| 名称                     | 类型                                                                                                                                                                                        | 描述                                                                                                                                                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| accountId                | String                                                                                                                                                                                      | 资金存入的顾问/经纪商客户账户的 IBKR 账户 ID。                                                                                                                                                                                                                                                                                            |
| instructionType          | DEPOSIT WITHDRAWAL                                                                                                                                                                          | 交易类型。                                                                                                                                                                                                                                                                                                                                                                |
| clientInstructionId      | Number;最多 20 个字符。                                                                                                                                                                  | 与请求关联的唯一标识符。– **clientInstructionId** 不能重复使用。– IBKR 建议 **clientInstructionId** 按顺序编号,例如 1, 2, 3, 4 或 100, 101, 102, 103,而非 777, 589, 123。                                                                                                                                   |
| amount                   | number > 0                                                                                                                                                                                  | 存入客户 IBKR 账户的金额。                                                                                                                                                                                                                                                                                                                                 |
| bankInstructionMethod    | WIRE  ACH SEPA                                                                                                                                                                              | WIRE:通过美联储电汇系统进行的电子资金转账。ACH:包括美国自动清算所、单一欧元支付区、加拿大电子资金转账。                                                                                                                                                                                                               |
| currency                 | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。                                                      | 发送至 IBKR 的资金币种。                                                                                                                                                                                                                                                                                                                                           |
| bankInstructionName      | String;最多 150 个字符。                                                                                                                                                           | 先前创建的指令(已保存的银行/账号)的名称。仅 IBKR 发起的 ACH 需要此字段。                                                                                                                                                                                                                                                                     |
| identifier               | String;最多 64 个字符。                                                                                                                                                            | 银行账号                                                                                                                                                                                                                                                                                                                                                                 |
| sendingInstitution       | String;最多 128 个字符。                                                                                                                                                          | 银行名称                                                                                                                                                                                                                                                                                                                                                                           |
| specialInstruction       | String;最多 128 个字符。                                                                                                                                                          | 与入金相关的任何特殊说明。                                                                                                                                                                                                                                                                                                                               |
| iraContributionType      | ROLLOVER LATE\_ROLLOVER EMPLOYER\_SEP\_CONTRIBUTION DIRECT\_ROLLOVER CONTRIBUTION SPOUSAL\_CONTRIBUTION                                                                                     | ROLLOVER:金额从退休账户中支取并'滚存'至同一或其他退休账户 LATE\_ROLLOVER:逾期滚存 EMPLOYER\_SEP\_CONTRIBUTION:简化雇员养老金 – 雇主缴款 DIRECT\_ROLLOVER:来自合格计划的直接滚存 CONTRIBUTION:常规 IRA 缴款 SPOUSAL\_CONTRIBUTION:配偶 IRA 缴款 |
| iraTaxYearType           | CURRENT PRIOR                                                                                                                                                                               | Current:当前税务年度 Prior:上一税务年度                                                                                                                                                                                                                                                                                                                                     |
| fromIraType              | NONE TRADITIONAL ROLLOVER ROTH SEP EDUCATION TRADITIONAL\_INHERITED ROTH\_INHERITED SEP\_INHERITED RETIREMENT\_SAVINGS\_PLAN SPOUSAL\_RETIREMENT\_SAVINGS\_PLAN TAX\_FREE\_SAVINGS\_ACCOUNT |                                                                                                                                                                                                                                                                                                                                                                                     |
| instructionName          | String                                                                                                                                                                                      | 定期交易的名称。                                                                                                                                                                                                                                                                                                                                                  |
| frequency                | MONTHLY QUARTERLY YEARLY                                                                                                                                                                    | 交易发生的频率。                                                                                                                                                                                                                                                                                                                                    |
| startDate                | YYYY-MM-DD                                                                                                                                                                                  | 定期交易开始的日期。                                                                                                                                                                                                                                                                                                                                        |
| endDate                  | YYYY-MM-DD                                                                                                                                                                                  | 定期交易结束的日期。                                                                                                                                                                                                                                                                                                                                        |
| fedIncomeTaxPercentage   | Number > 0                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                     |
| stateIncomeTaxPercentage | Number > 0                                                                                                                                                                                  |                                                                                                                                                                                                                                                                                                                                                                                     |
| stateCd                  | 2 位州代码。                                                                                                                                                                         |                                                                                                                                                                                                                                                                                                                                                                                     |
| iraWithholdType          | DIRECT\_ROLLOVER ROTH\_DISTRIBUTION NORMAL EARLY DEATH EXCESS\_CY EXCESS\_PY EXCESS\_SC                                                                                                     |                                                                                                                                                                                                                                                                                                                                                                                     |

### **入金**

将现金存入经纪账户用于交易。入金流程和资金到账时间会因方式而异。请注意,与 [IBKR Hosted Portal](https://www.ibkrguides.com/clientportal/transferandpay/deposit.htm) 中支持的选项相比,通过 Web API 可用的方式较为有限。

#### 电汇入金

电汇入金是为经纪账户入金最快的方式。电汇入金到账时间为即时至四个工作日,具体取决于您的银行。非美国银行通常处于该区间的较长一端。资金到账后立即计入账户。

* 费用:由您的银行决定,通常**会收取费用**。
* 交易限制:资金到达 IBKR 后立即可用于交易。
* 提款限制:资金在**三个工作日**后可供提款。

完成银行电汇需经过两个步骤:

步骤 1:创建入金通知,使 IBKR 知悉即将到账的资金。如果我们未能从您在银行设置的电汇模板中收到您的 IBKR 账号 / 账户名称,这一重要步骤有助于确保您的资金被正确路由。

步骤 2:联系银行申请银行电汇,并向银行提供 IBKR 的电汇指引。

* IBKR 的电汇指引会因账户所关联的**币种**和**账户 ID** 而异。电汇指引可通过 `/api/v1/enumerations/wire-instructions` 获取。

## 示例

```
POST /gw/api/v1/external-cash-transfers
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "clientInstructionId": 7013045,
    "accountId": "U46377",
    "currency": "USD",
    "amount": 100,
    "bankInstructionMethod": "WIRE",
    "sendingInstitution": "Chase Bank",
    "identifier": "123456",
    "specialInstruction": "My Deposit",
    "bankInstructionName": "Instruction",
  }
}
```

#### ACH 入金

拥有[关联银行账户](/account-management/funds-and-banking/bank-instructions)的美国居民可以通过在 IBKR 发起的 ACH 无缝地将资金存入其 IBKR 经纪账户。

* 费用:免费
* 交易限制:对于初始入金,第一笔入金需在客户门户(Client Portal)发起入金四个工作日后方可用于交易。后续入金可能立即可用(取决于账户存续时间、入金历史和账户余额)。否则需四个工作日后方可交易。
* 提款限制:资金在五个工作日后可提款至原银行账户。如果您希望将资金提款至原银行账户以外的账户,限制期为 44 个工作日。

有关 ACH 的更多信息可参见[此处](https://www.interactivebrokers.com/lib/cstools/faq/#/content/47455653)。

## 示例

```
POST /gw/api/v1/external-cash-transfers
{
  "instructionType": "DEPOSIT",
  "instruction": {
    "clientInstructionId": 7013045,
    "accountId": "U46377",
    "currency": "USD",
    "amount": 100,
    "bankInstructionMethod": "ACH",
    "bankInstructionName": "My Checking Account",
  }
}
```

### **出金**

如果已存有常设银行指令,则可以通过 Web API 发起出金请求。

* 提款限额为 10 万美元。超过 10 万美元的出金请求需通过 IBKR 托管门户提交。
* IBKR 每个日历月允许两次免费出金请求。在第二次出金(任何类型)之后,IBKR 将对后续任何出金收取下述费用。
* 有关处理时间和费用的信息可参见[此处](https://www.interactivebrokers.com/en/pricing/other-fees.php)。

#### 电汇出金

目前,IBKR 基础设施仅支持在 IBKR Hosted 内创建电汇出金指令(不支持通过 API 创建)。指令创建后,可针对该常设指令通过 API 提交后续的出金请求。

###### *通过 IBKR Portal 添加电汇指令*

* 加入 Streamlined 计划的[顾问](https://ibkrguides.com/advisorportal/addadvauth.htm?Highlight=streamline)和[经纪商](https://www.ibkrguides.com/brokerportal/clientserviceprogram.htm)可以在 IBKR Portal Broker 中代表客户创建和管理银行指令。
* 终端用户可以直接在 IBKR Portal 的 **Transfer & Pay > [Transfer Funds](https://www.ibkrguides.com/clientportal/transferandpay/enterwithdrawal.htm)** 下创建银行指令。或者,使用[单点登录(SSO)](/account-management/single-sign-on)将用户连接到 IBKR Portal,并设置深链接(deep link)。

## 示例

```
POST /gw/api/v1/external-cash-transfers

{ "instructionType": "WITHDRAWAL", 
 "instruction": {    "clientInstructionId": 7013048,
    "accountId": "U46377",
    "bankInstructionName": "Test Withdrawal",
    "bankInstructionMethod": "WIRE",
    "amount": "123.45",
    "currency": "USD",
    "dateTimeToOccur": "2023-11-20T09:12:13Z"
  }
```

#### ACH 出金

拥有[关联银行账户](/account-management/funds-and-banking/bank-instructions)的美国居民可以通过 ACH 将资金从 IBKR 经纪账户无缝提款至银行账户。

## 示例

```
POST /gw/api/v1/external-cash-transfers

{
  "instructionType": "WITHDRAWAL",
  "instruction": {
    "clientInstructionId": 7013048,
    "accountId": "U46377",
    "bankInstructionName": "Test Withdrawal",
    "bankInstructionMethod": "ACH",
    "amount": "500.12",
    "currency": "USD",
    "dateTimeToOccur": "2023-11-20T09:12:13Z"
  }
}
```

## 电汇指引

`/api/v1/enumerations/wire-instructions` 可用于获取将资金存入您的 IBKR 交易账户所需的银行详情和电汇指引。响应将包含收款银行信息、账户详情,以及确保入金正确入账所需的任何特定参考代码。

| 名称        | 值                                                                                                                                  | 描述                                      | 用法    |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ | -------- |
| `accountId` | IBKR 客户账户号码                                                                                                             |                                                  | 必填 |
| currency    | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 需要电汇指引的币种。 | 必填 |

**重要说明:**

* 电汇指引可能会变更,且会因币种而异
* 建议在向 IBKR 入金之前调用该端点,以确保您掌握最新、最准确的电汇详情

## 示例

```
POST /api/v1/enumerations/wire-instructions?currency=USD&accountId=U123456
{
    "enumerationsType": "wire-instructions",
    "jsonData": [
        {
            "currency": "USD",
            "accountNameAndBeneficiary": "Interactive Brokers LLC, One Pickwick Plaza, Greenwich, Connecticut, 06830, United States",
            "accountNumber": "12345678(Account Number)",
            "routingNumber": "12345678(ABA Code)",
            "bankSWIFTCode": "CHASUS33XXX",
            "bankTitleAndAddress": "JPMORGAN CHASE BANK, N.A., 383 Madison Avenue, New York, 10017, United States",
            "alternateAccountInfo": "",
            "paymentReference": "U123456/ IBLLC Test Test Account"
        }
    ]
}
```
