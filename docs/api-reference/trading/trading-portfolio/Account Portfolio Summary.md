# 账户投资组合摘要

GET https://localhost:5000/v1/api/portfolio/{accountId}/summary

返回账户价值的详细摘要，并在适当情况下按板块划分。

参考：https://ibkrcampus.com/docs/web-api/api-reference/trading/trading-portfolio/get-portfolio-summary

## 认证

- `Authorization` 请求头 (bearer token, required) — SSO Bearer 令牌。

## 服务器

- `https://localhost:5000`（Client Portal Gateway，默认）
- `https://api.ibkr.com`（生产环境）
- `https://qa.interactivebrokers.com`（沙盒）

## 请求

### 路径参数

- `accountId` (string, required)

### 查询参数

- `model` (string, optional)

## 响应

### 200

包含摘要定义的响应

- `accountcode` (PortfolioSummaryAccountcode, optional) — 所请求账户的账户 ID。 (value)
- `accountready` (PortfolioSummaryAccountready, optional) — 指示账户是否已完全开户且可交易。 (value)
- `accounttype` (PortfolioSummaryAccounttype, optional) — 标识账户所关联的客户类型，例如个人或 LLC。 (value)
- `accruedcash` (PortfolioSummaryAccruedcash, optional) — 账户中所有板块已计提（尚未支付）的现金金额。 (amount)
- `accruedcash-c` (PortfolioSummaryAccruedcashC, optional) — 账户中商品板块已计提（尚未支付）的现金金额。 (amount)
- `accruedcash-s` (PortfolioSummaryAccruedcashS, optional) — 账户中证券板块已计提（尚未支付）的现金金额。 (amount)
- `accrueddividend` (PortfolioSummaryAccrueddividend, optional) — 账户中所有板块已计提（尚未支付）的股息金额。 (amount)
- `accrueddividend-c` (PortfolioSummaryAccrueddividendC, optional) — 账户中商品板块已计提（尚未支付）的股息金额。 (amount)
- `accrueddividend-s` (PortfolioSummaryAccrueddividendS, optional) — 账户中证券板块已计提（尚未支付）的股息金额。 (amount)
- `availablefunds` (PortfolioSummaryAvailablefunds, optional) — 账户中所有板块的可用资金（ELV 减去初始保证金）。 (amount)
- `availablefunds-c` (PortfolioSummaryAvailablefundsC, optional) — 账户中商品板块的可用资金（ELV 减去初始保证金）。 (amount)
- `availablefunds-s` (PortfolioSummaryAvailablefundsS, optional) — 账户中证券板块的可用资金（ELV 减去初始保证金）。 (amount)
- `availabletotrade` (PortfolioSummaryAvailabletotrade, optional) — 账户中所有板块可用于交易的资金（ELV 减去初始保证金）。 (amount)
- `availabletotrade-c` (PortfolioSummaryAvailabletotradeC, optional) — 账户中商品板块可用于交易的资金（ELV 减去初始保证金）。 (amount)
- `availabletotrade-s` (PortfolioSummaryAvailabletotradeS, optional) — 账户中证券板块可用于交易的资金（ELV 减去初始保证金）。 (amount)
- `availabletowithdraw` (PortfolioSummaryAvailabletowithdraw, optional) — 账户中所有板块可出金的资金。 (amount)
- `availabletowithdraw-c` (PortfolioSummaryAvailabletowithdrawC, optional) — 账户中商品板块可出金的资金。 (amount)
- `availabletowithdraw-s` (PortfolioSummaryAvailabletowithdrawS, optional) — 账户中证券板块可出金的资金。 (amount)
- `billable` (PortfolioSummaryBillable, optional) — 账户中所有板块的可计费佣金。 (amount)
- `billable-c` (PortfolioSummaryBillableC, optional) — 账户中商品板块的可计费佣金。 (amount)
- `billable-s` (PortfolioSummaryBillableS, optional) — 账户中证券板块的可计费佣金。 (amount)
- `buyingpower` (PortfolioSummaryBuyingpower, optional) — 账户的购买力（在不追加资金的情况下可买入证券的最大价值）。 (amount)
- `columnprio-c` (PortfolioSummaryColumnprioC, optional) — columnprio-c
- `columnprio-s` (PortfolioSummaryColumnprioS, optional) — columnprio-s
- `cushion` (PortfolioSummaryCushion, optional) — 以小数比率表示的保证金缓冲，(ELV-Maintenance)/ELV。 (value)
- `daytradesremaining` (PortfolioSummaryDaytradesremaining, optional) — 在 4 日模式日内交易者周期内当前仍可用的日内交易次数。 (value)
- `daytradesremainingt+1` (PortfolioSummaryDaytradesremainingt1, optional) — 在 4 日模式日内交易者周期内明天可用的日内交易次数。 (value)
- `daytradesremainingt+2` (PortfolioSummaryDaytradesremainingt2, optional) — 在 4 日模式日内交易者周期内两天后可用的日内交易次数。 (value)
- `daytradesremainingt+3` (PortfolioSummaryDaytradesremainingt3, optional) — 在 4 日模式日内交易者周期内三天后可用的日内交易次数。 (value)
- `daytradesremainingt+4` (PortfolioSummaryDaytradesremainingt4, optional) — 在 4 日模式日内交易者周期内四天后可用的日内交易次数。 (value)
- `daytradingstatus-s` (PortfolioSummaryDaytradingstatusS, optional) — daytradingstatus-s
- `depositoncredithold` (PortfolioSummaryDepositoncredithold, optional) — 指示入金是否处于信用冻结状态。 (value)
- `equitywithloanvalue` (PortfolioSummaryEquitywithloanvalue, optional) — 账户所有板块的含贷款价值权益。 (amount)
- `equitywithloanvalue-c` (PortfolioSummaryEquitywithloanvalueC, optional) — 账户商品板块的含贷款价值权益。 (amount)
- `equitywithloanvalue-s` (PortfolioSummaryEquitywithloanvalueS, optional) — 账户证券板块的含贷款价值权益。 (amount)
- `excessliquidity` (PortfolioSummaryExcessliquidity, optional) — 账户所有板块的剩余流动性（ELV 减去维持保证金）。 (amount)
- `excessliquidity-c` (PortfolioSummaryExcessliquidityC, optional) — 账户商品板块的剩余流动性（ELV 减去维持保证金）。 (amount)
- `excessliquidity-s` (PortfolioSummaryExcessliquidityS, optional) — 账户证券板块的剩余流动性（ELV 减去维持保证金）。 (amount)
- `fullavailablefunds` (PortfolioSummaryFullavailablefunds, optional) — 账户所有板块的完整可用资金。 (amount)
- `fullavailablefunds-c` (PortfolioSummaryFullavailablefundsC, optional) — 账户商品板块的完整可用资金（NLV 减去初始保证金）。 (amount)
- `fullavailablefunds-s` (PortfolioSummaryFullavailablefundsS, optional) — 账户证券板块的完整可用资金（ELV 减去初始保证金）。 (amount)
- `fullexcessliquidity` (PortfolioSummaryFullexcessliquidity, optional) — 账户所有板块的完整剩余流动性（ELV 减去维持保证金）。 (amount)
- `fullexcessliquidity-c` (PortfolioSummaryFullexcessliquidityC, optional) — 账户商品板块的完整剩余流动性（ELV 减去维持保证金）。 (amount)
- `fullexcessliquidity-s` (PortfolioSummaryFullexcessliquidityS, optional) — 账户证券板块的完整剩余流动性（ELV 减去维持保证金）。 (amount)
- `fullinitmarginreq` (PortfolioSummaryFullinitmarginreq, optional) — 账户所有板块的完整初始保证金要求。 (amount)
- `fullinitmarginreq-c` (PortfolioSummaryFullinitmarginreqC, optional) — 账户商品板块的完整初始保证金要求。 (amount)
- `fullinitmarginreq-s` (PortfolioSummaryFullinitmarginreqS, optional) — 账户证券板块的完整初始保证金要求。 (amount)
- `fullmaintmarginreq` (PortfolioSummaryFullmaintmarginreq, optional) — 账户所有板块的完整维持保证金要求。 (amount)
- `fullmaintmarginreq-c` (PortfolioSummaryFullmaintmarginreqC, optional) — 账户商品板块的完整维持保证金要求。 (amount)
- `fullmaintmarginreq-s` (PortfolioSummaryFullmaintmarginreqS, optional) — 账户证券板块的完整维持保证金要求。 (amount)
- `grosspositionvalue` (PortfolioSummaryGrosspositionvalue, optional) — 账户所有板块的总头寸价值（股票与期权多头和空头持仓价值之和）。 (amount)
- `grosspositionvalue-s` (PortfolioSummaryGrosspositionvalueS, optional) — grosspositionvalue-s
- `guarantee` (PortfolioSummaryGuarantee, optional) — 对于在外部清算的账户，账户所有板块的担保价值。 (amount)
- `guarantee-c` (PortfolioSummaryGuaranteeC, optional) — 对于在外部清算的账户，账户商品板块的担保价值。 (amount)
- `guarantee-s` (PortfolioSummaryGuaranteeS, optional) — 对于在外部清算的账户，账户证券板块的担保价值。 (amount)
- `highestseverity` (PortfolioSummaryHighestseverity, optional) — highestseverity
- `indianstockhaircut` (PortfolioSummaryIndianstockhaircut, optional) — 账户所有板块的印度股票折减值。 (amount)
- `indianstockhaircut-c` (PortfolioSummaryIndianstockhaircutC, optional) — 账户商品板块的印度股票折减值。 (amount)
- `indianstockhaircut-s` (PortfolioSummaryIndianstockhaircutS, optional) — 账户证券板块的印度股票折减值。 (amount)
- `initmarginreq` (PortfolioSummaryInitmarginreq, optional) — 账户所有板块的初始保证金要求。 (amount)
- `initmarginreq-c` (PortfolioSummaryInitmarginreqC, optional) — 账户商品板块的初始保证金要求。 (amount)
- `initmarginreq-s` (PortfolioSummaryInitmarginreqS, optional) — 账户证券板块的初始保证金要求。 (amount)
- `leverage-s` (PortfolioSummaryLeverageS, optional) — 账户证券板块的杠杆率（GPV/NLV）。 (value)
- `lookaheadavailablefunds` (PortfolioSummaryLookaheadavailablefunds, optional) — 账户所有板块的前瞻可用资金。 (amount)
- `lookaheadavailablefunds-c` (PortfolioSummaryLookaheadavailablefundsC, optional) — 账户商品板块的前瞻可用资金。 (amount)
- `lookaheadavailablefunds-s` (PortfolioSummaryLookaheadavailablefundsS, optional) — 账户证券板块的前瞻可用资金。 (amount)
- `lookaheadexcessliquidity` (PortfolioSummaryLookaheadexcessliquidity, optional) — 账户所有板块的前瞻剩余流动性。 (amount)
- `lookaheadexcessliquidity-c` (PortfolioSummaryLookaheadexcessliquidityC, optional) — 账户商品板块的前瞻剩余流动性。 (amount)
- `lookaheadexcessliquidity-s` (PortfolioSummaryLookaheadexcessliquidityS, optional) — 账户证券板块的前瞻剩余流动性。 (amount)
- `lookaheadinitmarginreq` (PortfolioSummaryLookaheadinitmarginreq, optional) — 账户所有板块的前瞻初始保证金要求（截至下一个保证金周期）。 (amount)
- `lookaheadinitmarginreq-c` (PortfolioSummaryLookaheadinitmarginreqC, optional) — 账户商品板块的前瞻初始保证金要求（截至下一个保证金周期）。 (amount)
- `lookaheadinitmarginreq-s` (PortfolioSummaryLookaheadinitmarginreqS, optional) — 账户证券板块的前瞻初始保证金要求（截至下一个保证金周期）。 (amount)
- `lookaheadmaintmarginreq` (PortfolioSummaryLookaheadmaintmarginreq, optional) — 账户所有板块的前瞻维持保证金要求（截至下一个保证金周期）。 (amount)
- `lookaheadmaintmarginreq-c` (PortfolioSummaryLookaheadmaintmarginreqC, optional) — 账户商品板块的前瞻维持保证金要求（截至下一个保证金周期）。 (amount)
- `lookaheadmaintmarginreq-s` (PortfolioSummaryLookaheadmaintmarginreqS, optional) — 账户证券板块的前瞻维持保证金要求（截至下一个保证金周期）。 (amount)
- `lookaheadnextchange` (PortfolioSummaryLookaheadnextchange, optional) — 下一个保证金周期开始时间的 Unix 纪元时间戳（以秒为单位）。 (value)
- `maintmarginreq` (PortfolioSummaryMaintmarginreq, optional) — 账户所有板块的维持保证金要求。 (amount)
- `maintmarginreq-c` (PortfolioSummaryMaintmarginreqC, optional) — 账户商品板块的维持保证金要求。 (amount)
- `maintmarginreq-s` (PortfolioSummaryMaintmarginreqS, optional) — 账户证券板块的维持保证金要求。 (amount)
- `netliquidation` (PortfolioSummaryNetliquidation, optional) — 账户所有板块的净清算价值（NLV）。 (amount)
- `netliquidation-c` (PortfolioSummaryNetliquidationC, optional) — 账户商品板块的净清算价值（现金与商品期权价值之和）。 (amount)
- `netliquidation-s` (PortfolioSummaryNetliquidationS, optional) — 账户证券板块的净清算价值（现金、股票、证券期权、债券价值之和）。 (amount)
- `netliquidationuncertainty` (PortfolioSummaryNetliquidationuncertainty, optional) — 与盘后价格变动相关的净清算价值不确定性。 (amount)
- `nlvandmargininreview` (PortfolioSummaryNlvandmargininreview, optional) — 指示账户的 NLV 和/或保证金数值是否正在审核中。 (value)
- `pasharesvalue` (PortfolioSummaryPasharesvalue, optional) — 账户所有板块的个人账户股份价值。 (amount)
- `pasharesvalue-c` (PortfolioSummaryPasharesvalueC, optional) — 账户商品板块的个人账户股份价值。 (amount)
- `pasharesvalue-s` (PortfolioSummaryPasharesvalueS, optional) — 账户证券板块的个人账户股份价值。 (amount)
- `physicalcertificatevalue` (PortfolioSummaryPhysicalcertificatevalue, optional) — 账户所有板块的实物凭证价值。 (amount)
- `physicalcertificatevalue-c` (PortfolioSummaryPhysicalcertificatevalueC, optional) — 账户商品板块的实物凭证价值。 (amount)
- `physicalcertificatevalue-s` (PortfolioSummaryPhysicalcertificatevalueS, optional) — 账户证券板块的实物凭证价值。 (amount)
- `postexpirationexcess` (PortfolioSummaryPostexpirationexcess, optional) — 账户所有板块预计到期时的剩余流动性。 (amount)
- `postexpirationexcess-c` (PortfolioSummaryPostexpirationexcessC, optional) — 账户商品板块预计到期时的剩余流动性。 (amount)
- `postexpirationexcess-s` (PortfolioSummaryPostexpirationexcessS, optional) — 账户证券板块预计到期时的剩余流动性。 (amount)
- `postexpirationmargin` (PortfolioSummaryPostexpirationmargin, optional) — 账户所有板块预计到期时的保证金要求。 (amount)
- `postexpirationmargin-c` (PortfolioSummaryPostexpirationmarginC, optional) — 账户商品板块预计到期时的保证金要求。 (amount)
- `postexpirationmargin-s` (PortfolioSummaryPostexpirationmarginS, optional) — 账户证券板块预计到期时的保证金要求。 (amount)
- `previousdayequitywithloanvalue` (PortfolioSummaryPreviousdayequitywithloanvalue, optional) — 账户所有板块前一交易日的含贷款价值权益（截至美国东部时间 16:00）。 (amount)
- `previousdayequitywithloanvalue-s` (PortfolioSummaryPreviousdayequitywithloanvalueS, optional) — 账户证券板块前一交易日的含贷款价值权益（截至美国东部时间 16:00）。 (amount)
- `regtequity` (PortfolioSummaryRegtequity, optional) — 账户所有板块按 Reg-T 规则计算的权益价值。 (amount)
- `regtequity-s` (PortfolioSummaryRegtequityS, optional) — 账户证券板块按 Reg-T 规则计算的权益价值。 (amount)
- `regtmargin` (PortfolioSummaryRegtmargin, optional) — 账户所有板块按 Reg-T 规则计算的保证金。 (amount)
- `regtmargin-s` (PortfolioSummaryRegtmarginS, optional) — 账户证券板块按 Reg-T 规则计算的保证金。 (amount)
- `segmenttitle-c` (PortfolioSummarySegmenttitleC, optional) — '-c' 后缀字符所指的商品账户板块的人类可读标题。 (value)
- `segmenttitle-s` (PortfolioSummarySegmenttitleS, optional) — '-s' 后缀字符所指的证券账户板块的人类可读标题。 (value)
- `sma` (PortfolioSummarySma, optional) — 所有账户板块的 Reg-T 特别备忘账户价值，反映当账户持仓市值增加时所延展的信贷。 (amount)
- `sma-s` (PortfolioSummarySmaS, optional) — 证券账户板块的 Reg-T 特别备忘账户价值，反映当账户持仓市值增加时所延展的信贷。 (amount)
- `totalcashvalue` (PortfolioSummaryTotalcashvalue, optional) — 账户所有板块的总现金价值（现金余额加期货 PnL）。 (amount)
- `totalcashvalue-c` (PortfolioSummaryTotalcashvalueC, optional) — 商品账户板块的期货 PnL 现金价值。 (amount)
- `totalcashvalue-s` (PortfolioSummaryTotalcashvalueS, optional) — 证券账户板块中的现金余额。 (amount)
- `totaldebitcardpendingcharges` (PortfolioSummaryTotaldebitcardpendingcharges, optional) — 账户所有板块的借记卡待处理扣款总额。 (amount)
- `totaldebitcardpendingcharges-c` (PortfolioSummaryTotaldebitcardpendingchargesC, optional) — 账户商品板块的借记卡待处理扣款总额。 (amount)
- `totaldebitcardpendingcharges-s` (PortfolioSummaryTotaldebitcardpendingchargesS, optional) — 账户证券板块的借记卡待处理扣款总额。 (amount)
- `tradingtype-s` (PortfolioSummaryTradingtypeS, optional) — 内部使用的标识符，用于反映账户针对各资产类别的交易能力。 (value)
- `whatifpmenabled` (PortfolioSummaryWhatifpmenabled, optional) — 指示投资组合保证金账户是否已启用 'whatif' 订单预览功能。 (value)

## 错误

### 401 未授权错误

缺失、无效或无法解析的 Authorization 令牌。

- `status` (long, optional)
- `error` (string, optional)
- `message` (string, optional)

### 500 服务器内部错误

服务器内部错误，当传入的请求无法处理时返回。其中有时可能包含部分错误请求的情形。例如，传入的 accountId 有误，而只能在处理请求的较后阶段才被检测出来。错误中包含问题的原因。

- `error` (string, optional) — 错误原因

### 503 服务不可用错误

服务不可用。例如，若因某些内部服务不可用导致请求耗时超过 10 秒，请求将被中止并返回此状态

- `error` (string, optional) — 错误原因
- `statusCode` (long, optional) — 模拟的响应状态码

## 类型

### PortfolioSummaryAccountcode

所请求账户的账户 ID。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccountready

指示账户是否已完全开户且可交易。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccounttype

标识账户所关联的客户类型，例如个人或 LLC。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccruedcash

账户中所有板块已计提（尚未支付）的现金金额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccruedcashC

账户中商品板块已计提（尚未支付）的现金金额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccruedcashS

账户中证券板块已计提（尚未支付）的现金金额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccrueddividend

账户中所有板块已计提（尚未支付）的股息金额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccrueddividendC

账户中商品板块已计提（尚未支付）的股息金额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAccrueddividendS

账户中证券板块已计提（尚未支付）的股息金额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailablefunds

账户中所有板块的可用资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailablefundsC

账户中商品板块的可用资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailablefundsS

账户中证券板块的可用资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailabletotrade

账户中所有板块可用于交易的资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailabletotradeC

账户中商品板块可用于交易的资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailabletotradeS

账户中证券板块可用于交易的资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailabletowithdraw

账户中所有板块可出金的资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailabletowithdrawC

账户中商品板块可出金的资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryAvailabletowithdrawS

账户中证券板块可出金的资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryBillable

账户中所有板块的可计费佣金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryBillableC

账户中商品板块的可计费佣金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryBillableS

账户中证券板块的可计费佣金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryBuyingpower

账户的购买力（在不追加资金的情况下可买入证券的最大价值）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryColumnprioC

columnprio-c

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryColumnprioS

columnprio-s

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryCushion

以小数比率表示的保证金缓冲，(ELV-Maintenance)/ELV。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDaytradesremaining

在 4 日模式日内交易者周期内当前仍可用的日内交易次数。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDaytradesremainingt1

在 4 日模式日内交易者周期内明天可用的日内交易次数。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDaytradesremainingt2

在 4 日模式日内交易者周期内两天后可用的日内交易次数。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDaytradesremainingt3

在 4 日模式日内交易者周期内三天后可用的日内交易次数。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDaytradesremainingt4

在 4 日模式日内交易者周期内四天后可用的日内交易次数。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDaytradingstatusS

daytradingstatus-s

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryDepositoncredithold

指示入金是否处于信用冻结状态。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryEquitywithloanvalue

账户所有板块的含贷款价值权益。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryEquitywithloanvalueC

账户商品板块的含贷款价值权益。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryEquitywithloanvalueS

账户证券板块的含贷款价值权益。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryExcessliquidity

账户所有板块的剩余流动性（ELV 减去维持保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryExcessliquidityC

账户商品板块的剩余流动性（ELV 减去维持保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryExcessliquidityS

账户证券板块的剩余流动性（ELV 减去维持保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullavailablefunds

账户所有板块的完整可用资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullavailablefundsC

账户商品板块的完整可用资金（NLV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullavailablefundsS

账户证券板块的完整可用资金（ELV 减去初始保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullexcessliquidity

账户所有板块的完整剩余流动性（ELV 减去维持保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullexcessliquidityC

账户商品板块的完整剩余流动性（ELV 减去维持保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullexcessliquidityS

账户证券板块的完整剩余流动性（ELV 减去维持保证金）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullinitmarginreq

账户所有板块的完整初始保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullinitmarginreqC

账户商品板块的完整初始保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullinitmarginreqS

账户证券板块的完整初始保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullmaintmarginreq

账户所有板块的完整维持保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullmaintmarginreqC

账户商品板块的完整维持保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryFullmaintmarginreqS

账户证券板块的完整维持保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryGrosspositionvalue

账户所有板块的总头寸价值（股票与期权多头和空头持仓价值之和）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryGrosspositionvalueS

grosspositionvalue-s

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryGuarantee

对于在外部清算的账户，账户所有板块的担保价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryGuaranteeC

对于在外部清算的账户，账户商品板块的担保价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryGuaranteeS

对于在外部清算的账户，账户证券板块的担保价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryHighestseverity

highestseverity

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryIndianstockhaircut

账户所有板块的印度股票折减值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryIndianstockhaircutC

账户商品板块的印度股票折减值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryIndianstockhaircutS

账户证券板块的印度股票折减值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryInitmarginreq

账户所有板块的初始保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryInitmarginreqC

账户商品板块的初始保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryInitmarginreqS

账户证券板块的初始保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLeverageS

账户证券板块的杠杆率（GPV/NLV）。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadavailablefunds

账户所有板块的前瞻可用资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadavailablefundsC

账户商品板块的前瞻可用资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadavailablefundsS

账户证券板块的前瞻可用资金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadexcessliquidity

账户所有板块的前瞻剩余流动性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadexcessliquidityC

账户商品板块的前瞻剩余流动性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadexcessliquidityS

账户证券板块的前瞻剩余流动性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadinitmarginreq

账户所有板块的前瞻初始保证金要求（截至下一个保证金周期）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadinitmarginreqC

账户商品板块的前瞻初始保证金要求（截至下一个保证金周期）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadinitmarginreqS

账户证券板块的前瞻初始保证金要求（截至下一个保证金周期）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadmaintmarginreq

账户所有板块的前瞻维持保证金要求（截至下一个保证金周期）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadmaintmarginreqC

账户商品板块的前瞻维持保证金要求（截至下一个保证金周期）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadmaintmarginreqS

账户证券板块的前瞻维持保证金要求（截至下一个保证金周期）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryLookaheadnextchange

下一个保证金周期开始时间的 Unix 纪元时间戳（以秒为单位）。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryMaintmarginreq

账户所有板块的维持保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryMaintmarginreqC

账户商品板块的维持保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryMaintmarginreqS

账户证券板块的维持保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryNetliquidation

账户所有板块的净清算价值（NLV）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryNetliquidationC

账户商品板块的净清算价值（现金与商品期权价值之和）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryNetliquidationS

账户证券板块的净清算价值（现金、股票、证券期权、债券价值之和）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryNetliquidationuncertainty

与盘后价格变动相关的净清算价值不确定性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryNlvandmargininreview

指示账户的 NLV 和/或保证金数值是否正在审核中。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPasharesvalue

账户所有板块的个人账户股份价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPasharesvalueC

账户商品板块的个人账户股份价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPasharesvalueS

账户证券板块的个人账户股份价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPhysicalcertificatevalue

账户所有板块的实物凭证价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPhysicalcertificatevalueC

账户商品板块的实物凭证价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPhysicalcertificatevalueS

账户证券板块的实物凭证价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPostexpirationexcess

账户所有板块预计到期时的剩余流动性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPostexpirationexcessC

账户商品板块预计到期时的剩余流动性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPostexpirationexcessS

账户证券板块预计到期时的剩余流动性。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPostexpirationmargin

账户所有板块预计到期时的保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPostexpirationmarginC

账户商品板块预计到期时的保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPostexpirationmarginS

账户证券板块预计到期时的保证金要求。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPreviousdayequitywithloanvalue

账户所有板块前一交易日的含贷款价值权益（截至美国东部时间 16:00）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryPreviousdayequitywithloanvalueS

账户证券板块前一交易日的含贷款价值权益（截至美国东部时间 16:00）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryRegtequity

账户所有板块按 Reg-T 规则计算的权益价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryRegtequityS

账户证券板块按 Reg-T 规则计算的权益价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryRegtmargin

账户所有板块按 Reg-T 规则计算的保证金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryRegtmarginS

账户证券板块按 Reg-T 规则计算的保证金。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummarySegmenttitleC

'-c' 后缀字符所指的商品账户板块的人类可读标题。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummarySegmenttitleS

'-s' 后缀字符所指的证券账户板块的人类可读标题。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummarySma

所有账户板块的 Reg-T 特别备忘账户价值，反映当账户持仓市值增加时所延展的信贷。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummarySmaS

证券账户板块的 Reg-T 特别备忘账户价值，反映当账户持仓市值增加时所延展的信贷。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTotalcashvalue

账户所有板块的总现金价值（现金余额加期货 PnL）。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTotalcashvalueC

商品账户板块的期货 PnL 现金价值。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTotalcashvalueS

证券账户板块中的现金余额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTotaldebitcardpendingcharges

账户所有板块的借记卡待处理扣款总额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTotaldebitcardpendingchargesC

账户商品板块的借记卡待处理扣款总额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTotaldebitcardpendingchargesS

账户证券板块的借记卡待处理扣款总额。 (amount)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryTradingtypeS

内部使用的标识符，用于反映账户针对各资产类别的交易能力。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

### PortfolioSummaryWhatifpmenabled

指示投资组合保证金账户是否已启用 'whatif' 订单预览功能。 (value)

- `amount` (double, optional) — 与对应键相关联的数值数据。
- `currency` (double, optional) — 'amount' 字段值所使用的计价货币。
- `isNull` (boolean, optional) — 指示对应键的值不存在（而非值为零）。
- `severity` (long, optional) — severity
- `timestamp` (long, optional) — 返回数据的 Unix 纪元时间戳（以毫秒为单位）。
- `value` (string, optional) — 对应键的字符串和布尔（非数值）数据。

## 示例

**响应**

```json
{
  "accountcode": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "DU123456"
  },
  "accountready": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "true"
  },
  "accounttype": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "LLC"
  },
  "accruedcash": {
    "amount": 880036.375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "accruedcash-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "accruedcash-s": {
    "amount": 880036.375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "accrueddividend": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "accrueddividend-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "accrueddividend-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availablefunds": {
    "amount": 205266944,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availablefunds-c": {
    "amount": 468839.75,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availablefunds-s": {
    "amount": 204798112,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availabletotrade": {
    "amount": 204680368,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availabletotrade-c": {
    "amount": 500449.375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availabletotrade-s": {
    "amount": 204179920,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availabletowithdraw": {
    "amount": 204676912,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availabletowithdraw-c": {
    "amount": 496993.75,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "availabletowithdraw-s": {
    "amount": 204179920,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "billable": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "billable-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "billable-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "buyingpower": {
    "amount": 821079744,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "columnprio-c": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "2"
  },
  "columnprio-s": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "1"
  },
  "cushion": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "0.994598"
  },
  "daytradesremaining": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "-1"
  },
  "daytradesremainingt+1": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "-1"
  },
  "daytradesremainingt+2": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "-1"
  },
  "daytradesremainingt+3": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "-1"
  },
  "daytradesremainingt+4": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "-1"
  },
  "daytradingstatus-s": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": ": : false: 205505601.94: :false"
  },
  "depositoncredithold": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "null"
  },
  "equitywithloanvalue": {
    "amount": 205505520,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "equitywithloanvalue-c": {
    "amount": 471830.0625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "equitywithloanvalue-s": {
    "amount": 205033696,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "excessliquidity": {
    "amount": 205300432,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "excessliquidity-c": {
    "amount": 471830.0625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "excessliquidity-s": {
    "amount": 204828608,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullavailablefunds": {
    "amount": 205252848,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullavailablefunds-c": {
    "amount": 454742.59375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullavailablefunds-s": {
    "amount": 204798112,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullexcessliquidity": {
    "amount": 205287616,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullexcessliquidity-c": {
    "amount": 459014.46875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullexcessliquidity-s": {
    "amount": 204828608,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullinitmarginreq": {
    "amount": 282575.34375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullinitmarginreq-c": {
    "amount": 46990.5,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullinitmarginreq-s": {
    "amount": 235584.84375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullmaintmarginreq": {
    "amount": 247882.796875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullmaintmarginreq-c": {
    "amount": 42718.640625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "fullmaintmarginreq-s": {
    "amount": 205164.171875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "grosspositionvalue": {
    "amount": 659611.375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "grosspositionvalue-s": {
    "amount": 659611.375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "guarantee": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "guarantee-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "guarantee-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "highestseverity": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "null"
  },
  "indianstockhaircut": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "indianstockhaircut-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "indianstockhaircut-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "initmarginreq": {
    "amount": 268478.1875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "initmarginreq-c": {
    "amount": 32893.3515625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "initmarginreq-s": {
    "amount": 235584.84375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "leverage-s": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "0.0"
  },
  "lookaheadavailablefunds": {
    "amount": 205266944,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadavailablefunds-c": {
    "amount": 468839.75,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadavailablefunds-s": {
    "amount": 204798112,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadexcessliquidity": {
    "amount": 205300432,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadexcessliquidity-c": {
    "amount": 471830.0625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadexcessliquidity-s": {
    "amount": 204828608,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadinitmarginreq": {
    "amount": 268478.1875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadinitmarginreq-c": {
    "amount": 32893.3515625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadinitmarginreq-s": {
    "amount": 235584.84375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadmaintmarginreq": {
    "amount": 235067.203125,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadmaintmarginreq-c": {
    "amount": 29903.05078125,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadmaintmarginreq-s": {
    "amount": 205164.171875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "lookaheadnextchange": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "1712157300"
  },
  "maintmarginreq": {
    "amount": 235067.203125,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "maintmarginreq-c": {
    "amount": 29903.05078125,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "maintmarginreq-s": {
    "amount": 205164.171875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "netliquidation": {
    "amount": 206415536,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "netliquidation-c": {
    "amount": 501733.09375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "netliquidation-s": {
    "amount": 205913808,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "netliquidationuncertainty": {
    "amount": 70.94000244140625,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "nlvandmargininreview": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "false"
  },
  "pasharesvalue": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "pasharesvalue-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "pasharesvalue-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "physicalcertificatevalue": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "physicalcertificatevalue-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "physicalcertificatevalue-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "postexpirationexcess": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "postexpirationexcess-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "postexpirationexcess-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "postexpirationmargin": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "postexpirationmargin-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "postexpirationmargin-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "previousdayequitywithloanvalue": {
    "amount": 205044656,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "previousdayequitywithloanvalue-s": {
    "amount": 205044656,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "regtequity": {
    "amount": 205913808,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "regtequity-s": {
    "amount": 205913808,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "regtmargin": {
    "amount": 329761.1875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "regtmargin-s": {
    "amount": 329761.1875,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "segmenttitle-c": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "US Commodities"
  },
  "segmenttitle-s": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "US Securities"
  },
  "sma": {
    "amount": 205584048,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "sma-s": {
    "amount": 205584048,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "totalcashvalue": {
    "amount": 205646432,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "totalcashvalue-c": {
    "amount": 501733.09375,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "totalcashvalue-s": {
    "amount": 205144704,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "totaldebitcardpendingcharges": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "totaldebitcardpendingcharges-c": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "totaldebitcardpendingcharges-s": {
    "amount": 0,
    "currency": 1.1,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": null
  },
  "tradingtype-s": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "STKNOPT"
  },
  "whatifpmenabled": {
    "amount": 0,
    "currency": null,
    "isNull": false,
    "severity": 0,
    "timestamp": 1712156105000,
    "value": "true"
  }
}
```

**SDK 代码**

```python success
import requests

url = "https://localhost:5000/v1/api/portfolio/DU123456/summary"

headers = {"Authorization": "Bearer <token>"}

response = requests.get(url, headers=headers)

print(response.json())
```

```javascript success
const url = 'https://localhost:5000/v1/api/portfolio/DU123456/summary';
const options = {method: 'GET', headers: {Authorization: 'Bearer <token>'}};

try {
  const response = await fetch(url, options);
  const data = await response.json();
  console.log(data);
} catch (error) {
  console.error(error);
}
```

```go success
package main

import (
	"fmt"
	"net/http"
	"io"
)

func main() {

	url := "https://localhost:5000/v1/api/portfolio/DU123456/summary"

	req, _ := http.NewRequest("GET", url, nil)

	req.Header.Add("Authorization", "Bearer <token>")

	res, _ := http.DefaultClient.Do(req)

	defer res.Body.Close()
	body, _ := io.ReadAll(res.Body)

	fmt.Println(res)
	fmt.Println(string(body))

}
```

```ruby success
require 'uri'
require 'net/http'

url = URI("https://localhost:5000/v1/api/portfolio/DU123456/summary")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Get.new(url)
request["Authorization"] = 'Bearer <token>'

response = http.request(request)
puts response.read_body
```

```java success
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;

HttpResponse<String> response = Unirest.get("https://localhost:5000/v1/api/portfolio/DU123456/summary")
  .header("Authorization", "Bearer <token>")
  .asString();
```

```php success
<?php
require_once('vendor/autoload.php');

$client = new \GuzzleHttp\Client();

$response = $client->request('GET', 'https://localhost:5000/v1/api/portfolio/DU123456/summary', [
  'headers' => [
    'Authorization' => 'Bearer <token>',
  ],
]);

echo $response->getBody();
```

```csharp success
using RestSharp;

var client = new RestClient("https://localhost:5000/v1/api/portfolio/DU123456/summary");
var request = new RestRequest(Method.GET);
request.AddHeader("Authorization", "Bearer <token>");
IRestResponse response = client.Execute(request);
```

```swift success
import Foundation

let headers = ["Authorization": "Bearer <token>"]

let request = NSMutableURLRequest(url: NSURL(string: "https://localhost:5000/v1/api/portfolio/DU123456/summary")! as URL,
                                        cachePolicy: .useProtocolCachePolicy,
                                    timeoutInterval: 10.0)
request.httpMethod = "GET"
request.allHTTPHeaderFields = headers

let session = URLSession.shared
let dataTask = session.dataTask(with: request as URLRequest, completionHandler: { (data, response, error) -> Void in
  if (error != nil) {
    print(error as Any)
  } else {
    let httpResponse = response as? HTTPURLResponse
    print(httpResponse)
  }
})

dataTask.resume()
```