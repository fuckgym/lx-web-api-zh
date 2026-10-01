# 账户更新

返回当前登录用户有权访问的经纪账户的详细信息。当用户与 websocket 的连接首次建立时会发送一条初始消息,此后每当账户详情发生变更时都会发送补充消息。

**topic:** String。\
返回给定请求的主题。

**args:** Object。\
返回包含 pnl 数据的对象。

**accounts:** Array。\
显示当前用户可访问的所有账户。

**acctProps:** Object。\
返回详细说明账户属性的对象。

**acctId:** Object。\
返回特定的分配组或账户信息。

**hasChildAccounts:** bool。\
返回所列账户下是否挂有任何子账户。

\*\*supportsCashQty:\*\*bool。\
返回该账户是否支持现金数量(cash quantity)订单。

**noFXConv:** bool。\
返回该账户是否支持外汇转换。

**isProp:** bool。

**supportsFractions:** bool。\
返回该账户是否支持碎股交易。

**allowCustomerTime:** bool。\
返回该账户是否以客户的当地时间返回数据。

**aliases:** Object。\
返回一系列账户及其关联的别名。

**allowFeatures:**  Object。\
显示该账户允许使用的功能。

**showGFIS:** bool。\
确定该账户能否显示数据。

**showEUCostReport:** bool。\
确定该账户是否接收欧盟成本报告(EU Cost Report)。

**allowEventContract:** bool。\
确定该账户能否接收事件合约。

**allowFXConv:** bool。\
确定该账户是否允许外汇转换。

**allowFinancialLens:** bool。\
确定该账户是否支持 Financial Lens(仅限 Client Portal)。

**allowMTA:** bool。\
确定该账户是否支持移动交易提醒(Mobile Trading Alerts)。

**allowTypeAhead:** bool。\
确定该账户是否支持 Type Ahead(仅限 Client Portal)。

**allowEventTrading:** bool。\
确定该账户是否支持 Event Trader(仅限 Client Portal)。

**snapshotRefreshTimeout:** int。\
确定该账户能否支持快照刷新(仅限 Client Portal)。

**liteUser:** bool。\
返回该账户是否为 IBKR Lite 账户。

**showWebNews:** bool。\
返回该账户是否

**research:** bool。\
确定该账户是否支持研究订阅。

**debugPnl:** bool。\
确定该账户是否启用 PnL 调试(仅限 Client Portal)。

**showTaxOpt:** bool。\
确定该账户是否支持税务优化器(Tax Optimizer)(仅限 Client Portal)。

**showImpactDashboard:** bool。\
确定该账户是否应在启动时显示 Impact Dashboard(仅限 Client Portal)。

**allowDynAccount:** bool。\
确定该账户是否支持动态账户结构(Dynamic Account Structures)(仅限 Client Portal)。

**allowCrypto:** bool。\
确定该账户是否支持加密货币交易。

**allowedAssetTypes:** String。\
返回所有受支持的资产或证券类型。

**chartPeriods:** 由数组组成的对象。\
返回每种受支持资产类型所支持的交易时段。

**groups:** Array。\
列出该账户所属的所有组。

**profiles:** Array。\
列出该账户所属的所有配置文件(profile)。

**selectedAccount:** String。\
返回当前选定的账户。

**serverInfo:** Object。\
返回服务器信息的描述。

**sessionId:** String。\
返回会话标识符。

**isFT:** bool。\
返回该账户是否为碎股交易账户。

**isPaper:** bool。\
返回当前活动账户是否为模拟交易(paper trading)账户。

```
{
    "topic":"act",
    "args":{
       "accounts":[],
       "acctProps":{
          "All":{
             "hasChildAccounts":hasChildAccounts,
             "supportsCashQty":supportsCashQty,
             "noFXConv":noFXConv,
             "isProp":isProp,
             "supportsFractions":supportsFractions,
             "allowCustomerTime":allowCustomerTime
          }
       },
       "aliases":{},
       "allowFeatures":{
          "showGFIS":showGFIS,
          "showEUCostReport":showEUCostReport,
          "allowEventContract":allowEventContract,
          "allowFXConv":allowFXConv,
          "allowFinancialLens":allowFinancialLens,
          "allowMTA":allowMTA,
          "allowTypeAhead":allowTypeAhead,
          "allowEventTrading":allowEventTrading,
          "snapshotRefreshTimeout":snapshotRefreshTimeout,
          "liteUser":liteUser,
          "showWebNews":showWebNews,
          "research":research,
          "debugPnl":debugPnl,
          "showTaxOpt":showTaxOpt,
          "showImpactDashboard":showImpactDashboard,
          "allowDynAccount":allowDynAccount,
          "allowCrypto":allowCrypto,
          "allowedAssetTypes":"allowedAssetTypes"
       },
       "chartPeriods":{
          "STK":[],
          "CFD":[],
          "OPT":[],
          "FOP":[],
          "WAR":[],
          "IOPT":[],
          "FUT":[],
          "CASH":[],
          "IND":[],
          "BOND":[],
          "FUND":[],
          "CMDTY":[],
          "PHYSS":[],
          "CRYPTO":[]
       },
       "groups":[],
       "profiles":[],
       "selectedAccount":"selectedAccount",
       "serverInfo":{
          "serverName":"serverName",
          "serverVersion":"serverVersion"
       },
       "sessionId":"sessionId",
       "isFT":isFT,
       "isPaper":isPaper
    }
 }
```
