# 客户费用

IBKR 为财务顾问和经纪商提供了就其服务收取费用的能力。财务顾问/经纪商可以按账户逐一配置费用,也可以使用客户费用模板来管理费用。客户费用可在客户注册流程中设置并进行更新。费用计划将定义在 `accounts` 中。

* 顾问管理(Advisor Managed):需要在客户注册期间使用 `advisorWrapFees` 或 `feesTemplateName` 定义费用计划。
* 经纪商客户(Broker Clients):`feesTemplateName` 为可选项。如果注册期间未设置费用模板,默认的客户费用模板将自动应用于该账户。

费用配置自生效日期(effective date)起生效。客户费用的生效日期可通过调用 [`/api/v1/accounts/{{accountId}}/details`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-accounts/get-accounts-details) 获取。

* 如果账户开立日期晚于生效日期,费用配置将在开立日期 1 天后生效。
* 如果请求批准日期晚于生效日期,费用配置将在请求批准日期 1 天后生效。
* 在 effectiveDate(基于上述要点)到达且账户完成注资之前,不会进行费用计算。

## 费用模板

该 API 可用于查看和管理现有账户的费用模板。

* 客户费用模板让多个账户的客户费用计划维护变得轻松。费用模板可以直接在 Portal > Administration & Tools > Fees & Invoicing > Fee Templates 中创建和更新。
  * [顾问费用](https://ibkrguides.com/advisorportal/homemenu/feesandinvoicing.htm)
  * [经纪商](https://ibkrguides.com/brokerportal/homemenu/feesandinvoicing.htm)

### 为现有账户设置费用模板

`applyFeeTemplate` 可用于将预定义的费用模板分配给现有账户。在请求正文中,需定义 `accountId` 和 `templateName`。`templateName` 表示要应用的费用模板名称,该数据区分大小写,且必须与门户中现有模板的名称完全一致。

* 对于经纪商客户,在美东时间 17:00 之前提交的费用变更将在当天处理,并自下一个营业日的午夜起生效。
  * 如果对现有账户(批准后)应用开票(invoicing),客户需要直接在 Account Management/Client Portal 中核实/确认费用上调。
  * 如果加价计划(markup schedule)发生变更(上调或下调),费用将被自动处理(无需客户确认)。
* 对于顾问客户,如果费用上调或费用类型发生变更,客户需要直接在 Account Management/Client Portal 中核实/确认费用上调。
  * 客户在美东时间下午 5:45 之前确认的费用模板将在当天处理。
  * 客户在美东时间下午 5:45 之后确认的费用模板将在下一个营业日处理。
  * 如果费用下调,费用将被自动处理(无需客户确认)。

## 示例

```
PATCH /gw/api/v1/accounts
 {
  "accountManagementRequests": {
   "applyFeeTemplate": {
      "accountId": "U10032411",
      "templateName": "FeePerTradeUnit100"
    }
  }
}
```
