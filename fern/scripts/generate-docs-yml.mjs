import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// Generate docs.yml by walking fern/docs. Paths in docs.yml are relative to the fern folder.
const FERN = new URL("..", import.meta.url).pathname.replace(/^\/([A-Za-z]:)/, "$1");
const DOCS = join(FERN, "docs");

const q = (s) => '"' + s.replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"';
const isPageName = (n) => /\.(md|mdx)$/i.test(n);
const pageTitle = (n) => n.replace(/\.(md|mdx)$/i, "");
const cmp = (a, b) => a.localeCompare(b, "en", { sensitivity: "base" });

// Reproduce fern's slugification of the original English titles/dir names so
// URLs stay stable now that nav titles are Chinese. Boundaries: lower→upper,
// acronym followed by lowercase ("IDs"→"i-ds", "OAuth"→"o-auth"), digit↔letter
// ("oauth-1a"→"oauth-1-a"); separators collapse to a single hyphen.
function fernSlug(s) {
  return s
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/([A-Za-z])(\d)/g, "$1 $2")
    .replace(/(\d)([A-Za-z])/g, "$1 $2")
    .replace(/'/g, "")
    .replace(/[^A-Za-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .toLowerCase();
}

// Introduction first, then case-insensitive alphabetical (by filename, so the
// sidebar order is unchanged from the English-titled version)
function sortEntries(dir) {
  const names = readdirSync(dir, { withFileTypes: true });
  const pages = names.filter((e) => e.isFile() && isPageName(e.name)).map((e) => e.name);
  const dirs = names.filter((e) => e.isDirectory()).map((e) => e.name);
  pages.sort((a, b) => {
    const ia = /^introduction\.mdx?$/i.test(a) ? 0 : 1;
    const ib = /^introduction\.mdx?$/i.test(b) ? 0 : 1;
    return ia !== ib ? ia - ib : cmp(a, b);
  });
  dirs.sort(cmp);
  return { pages, dirs };
}

// Chinese nav titles for pages whose md H1 differs from what should show in
// the sidebar, or whose filename-derived title is still English. Keys are
// docs-relative paths ("tab/dir/File.md"); untranslated pages keep the
// filename-derived title.
const ZH_PAGES = {
  // introduction
  "introduction/Introduction.md": "简介",
  "introduction/Getting Started.md": "快速入门",
  "introduction/quick-start/Installation.md": "安装",
  "introduction/quick-start/Initializing Brokerage Session.md": "初始化经纪会话",
  "introduction/quick-start/Placing Orders.md": "下单",
  "introduction/quick-start/Requesting Positions.md": "请求持仓",
  "introduction/quick-start/Obtaining Market Data.md": "获取市场数据",
  "introduction/quick-start/Troubleshooting.md": "故障排除",
  "introduction/Feedback.md": "反馈",
  // authentication
  "authentication/Introduction.md": "简介",
  "authentication/Authentication Frequently Asked Questions.md": "身份验证常见问题解答",
  "authentication/Managing Multiple Sessions.md": "管理多个会话",
  "authentication/Session Authentication.md": "会话身份验证",
  "authentication/Trading Session Management.md": "交易会话管理",
  "authentication/Using a Paper Account.md": "使用模拟账户",
  "authentication/cpgw/Client Portal Gateway FAQ.md": "Client Portal Gateway 常见问题",
  "authentication/cpgw/Client Portal Gateway Request Structure.md": "Client Portal Gateway 请求结构",
  "authentication/cpgw/How To Modify The Client Portal Gateway Port.md": "如何修改 Client Portal Gateway 端口",
  "authentication/cpgw/Installation & Authentication.md": "安装与身份验证",
  "authentication/cpgw/Limitations of the Client Portal Gateway.md": "Client Portal Gateway 的局限性",
  "authentication/oauth-1a/Introduction.md": "简介",
  "authentication/oauth-1a/OAuth 1.0a Request Structure.md": "OAuth 1.0a 请求结构",
  "authentication/oauth-1a/Standard Structure for Authenticated Requests.md": "经过身份验证请求的标准结构",
  "authentication/oauth-1a/first-party-oauth/First Party OAuth Workflow.md": "第一方 OAuth 工作流程",
  "authentication/oauth-1a/first-party-oauth/Registration Process.md": "注册流程",
  "authentication/oauth-1a/lst/Compute the Live Session Token.md": "计算实时会话令牌",
  "authentication/oauth-1a/lst/Retrieve Live Session Token Signature.md": "获取实时会话令牌签名",
  "authentication/oauth-1a/lst/Validate the Live Session Token.md": "验证实时会话令牌",
  "authentication/oauth-1a/third-party-oauth/Access Token & Access Token Secret.md": "访问令牌与访问令牌密钥",
  "authentication/oauth-1a/third-party-oauth/Authorization & Verifier Token.md": "授权与验证令牌",
  "authentication/oauth-1a/third-party-oauth/Registration Process.md": "注册流程",
  "authentication/oauth-1a/third-party-oauth/Request Token.md": "请求令牌",
  "authentication/oauth-1a/third-party-oauth/Third Party OAuth Workflow.md": "第三方 OAuth 工作流程",
  "authentication/oauth-2/Introduction.md": "简介",
  "authentication/oauth-2/Access Token.md": "访问令牌",
  "authentication/oauth-2/Bearer Token.md": "Bearer 令牌",
  "authentication/oauth-2/Initialize Brokerage Session.md": "初始化经纪会话",
  "authentication/oauth-2/OAuth 2.0 Registration Process.md": "OAuth 2.0 注册流程",
  // account-management
  "account-management/Callback Notifications.md": "回调通知",
  "account-management/Legacy Documentation.md": "旧版文档",
  "account-management/Pre Trade Compliance.md": "交易前合规",
  "account-management/Single Sign On.md": "单点登录",
  "account-management/account-information/Introduction.md": "简介",
  "account-management/account-information/Client Fees.md": "客户费用",
  "account-management/account-information/Login Messages.md": "登录消息",
  "account-management/account-information/Update Information.md": "更新信息",
  "account-management/account-management-introduction/Introduction.md": "简介",
  "account-management/account-management-introduction/Setup Process.md": "设置流程",
  "account-management/account-management-introduction/Support.md": "支持",
  "account-management/account-management-introduction/System Availability.md": "系统可用性",
  "account-management/account-types/Introduction.md": "简介",
  "account-management/account-types/Individual Savings Account For Uk Residents.md": "英国居民个人储蓄账户",
  "account-management/client-registration/Introduction.md": "简介",
  "account-management/client-registration/Account Statuses.md": "账户状态",
  "account-management/client-registration/Agreements And Disclosures.md": "协议与披露文件",
  "account-management/client-registration/Data For Client Registration.md": "客户注册所需数据",
  "account-management/client-registration/KYC Documents.md": "KYC 文件",
  "account-management/client-registration/registration-tasks/Introduction.md": "简介",
  "account-management/client-registration/registration-tasks/Complete Registration Tasks.md": "完成注册任务",
  "account-management/client-registration/registration-tasks/View Registration Tasks.md": "查看注册任务",
  "account-management/funds-and-banking/Introduction.md": "简介",
  "account-management/funds-and-banking/Bank Instructions.md": "银行指令",
  "account-management/funds-and-banking/Bulk Transactions.md": "批量交易",
  "account-management/funds-and-banking/Internal Transfer.md": "内部划转",
  "account-management/funds-and-banking/Position Transfers.md": "持仓划转",
  "account-management/funds-and-banking/cash-transfer/Introduction.md": "简介",
  "account-management/funds-and-banking/cash-transfer/Open Banking.md": "开放银行",
  "account-management/funds-and-banking/cash-transfer/Recurring Transactions.md": "经常性交易",
  "account-management/reporting/Introduction.md": "简介",
  "account-management/reporting/Activity Statements.md": "活动对账单",
  "account-management/reporting/Tax Forms.md": "税务表格",
  "account-management/reporting/Trade Confirmations.md": "交易确认书",
  "account-management/resources/Introduction.md": "简介",
  "account-management/resources/Developer Tool Kit.md": "开发者工具包",
  "account-management/resources/Flowchart.md": "流程图",
  "account-management/resources/Postman.md": "Postman",
  "account-management/resources/Registration Options.md": "注册选项",
  "account-management/resources/Sample Applications.md": "示例应用",
  "account-management/resources/Test Cases.md": "测试用例",
  "account-management/resources/sample-responses/Introduction.md": "简介",
  "account-management/resources/sample-responses/Error Handling.md": "错误处理",
  "account-management/schema/Introduction.md": "简介",
  "account-management/schema/Accounts.md": "账户",
  "account-management/schema/Associatedindividual.md": "关联个人",
  "account-management/schema/Customer.md": "客户",
  "account-management/schema/Documents.md": "文档",
  "account-management/schema/Users.md": "用户",
  // trading
  "trading/financial-advisors/Model Portfolios.md": "模型投资组合",
  "trading/fy-is-and-alerts/FYIs.md": "FYI 通知",
  "trading/fy-is-and-alerts/Types of Notification Messages.md": "通知消息的类型",
  "trading/getting-started/Introduction.md": "简介",
  "trading/getting-started/Trading Access for Individuals.md": "个人客户的交易权限",
  "trading/getting-started/Trading Access for Organizations.md": "组织机构的交易访问权限",
  "trading/getting-started/Trading Access for Third Parties.md": "第三方交易接入",
  "trading/getting-started/Trading API Support.md": "Trading API 支持",
  "trading/instrument-discovery/Introduction.md": "简介",
  "trading/instrument-discovery/Contract IDs.md": "合约 ID",
  "trading/instrument-discovery/Finding Derivative Products.md": "查找衍生品",
  "trading/instrument-discovery/Finding Event Contracts.md": "查找事件合约",
  "trading/instrument-discovery/Finding Options Chains.md": "查找期权链",
  "trading/market-data/Introduction.md": "简介",
  "trading/market-data/Streaming Top-of-Book Data.md": "流式获取盘口最优价数据",
  "trading/market-data/Top-of-Book Snapshots.md": "盘口顶档快照",
  "trading/orders/Introduction.md": "订单",
  "trading/orders/Canceling Orders.md": "取消订单",
  "trading/orders/Modifying Orders.md": "修改订单",
  "trading/orders/Monitoring Live Orders.md": "监控实时订单",
  "trading/orders/New Order Example.md": "新订单示例",
  "trading/orders/Order Reply Messages.md": "订单回复消息",
  "trading/orders/Order Reply Suppression.md": "订单回复抑制",
  "trading/orders/Orders for Combos_Spreads.md": "组合/价差订单",
  "trading/orders/Submitting Bracket Orders.md": "提交条件单",
  "trading/orders/Suppressible MessageIds.md": "可屏蔽的 MessageId",
  "trading/portfolio-and-positions/Querying Currency Balances.md": "查询货币余额",
  "trading/portfolio-and-positions/Querying Equity and Margin.md": "查询权益与保证金",
  "trading/portfolio-and-positions/Querying Your Accounts.md": "查询你的账户",
  "trading/usage-and-availability/Pacing Limitations.md": "访问频率限制",
  "trading/usage-and-availability/Scheduled Server Maintenance.md": "计划内服务器维护",
  // v1
  "v1/Introduction.md": "简介",
  "v1/Pacing Limitations.md": "访问频率限制",
  "v1/Regular Server Maintenance.md": "定期服务器维护",
  "v1/WebAPI Basics Tutorial.md": "WebAPI 基础教程",
  "v1/endpoints/Introduction.md": "简介",
  "v1/endpoints/accounts/Account Profit and Loss.md": "账户盈亏",
  "v1/endpoints/accounts/Receive Brokerage Accounts.md": "接收经纪账户",
  "v1/endpoints/accounts/Search Dynamic Account.md": "搜索动态账户",
  "v1/endpoints/accounts/Set Dynamic Account.md": "设置动态账户",
  "v1/endpoints/accounts/Signatures and Owners.md": "签名与持有人",
  "v1/endpoints/accounts/Switch Account.md": "切换账户",
  "v1/endpoints/alerts/Introduction.md": "简介",
  "v1/endpoints/alerts/Activate or deactivate an alert.md": "启用或停用警报",
  "v1/endpoints/alerts/Delete an alert.md": "删除警报",
  "v1/endpoints/alerts/Get a list of available alerts.md": "获取可用警报列表",
  "v1/endpoints/alerts/Get details of a specific alert.md": "获取特定警报的详情",
  "v1/endpoints/alerts/Get MTA Alert.md": "获取 MTA 警报",
  "v1/endpoints/contract/All Conids by Exchange.md": "按交易所获取所有 Conid",
  "v1/endpoints/contract/Contract information by Contract ID.md": "按 Contract ID 获取合约信息",
  "v1/endpoints/contract/Currency Exchange Rate.md": "货币汇率",
  "v1/endpoints/contract/Currency Pairs.md": "货币对",
  "v1/endpoints/contract/Find all Info and Rules for a given contract.md": "查找给定合约的所有信息与规则",
  "v1/endpoints/contract/Search Algo Params by Contract ID.md": "按合约 ID 搜索算法参数",
  "v1/endpoints/contract/Search Bond Filter Information.md": "债券搜索筛选条件信息",
  "v1/endpoints/contract/Search Contract by Symbol.md": "按符号搜索合约",
  "v1/endpoints/contract/Search Contract Rules.md": "搜索合约规则",
  "v1/endpoints/contract/Search SecDef information by conid.md": "按 conid 搜索 SecDef 信息",
  "v1/endpoints/contract/Search Strikes by Underlying Contract ID.md": "按标的 Contract ID 搜索行权价",
  "v1/endpoints/contract/Search the security definition by Contract ID.md": "按合约 ID 搜索证券定义",
  "v1/endpoints/contract/Security Future by Symbol.md": "按标的代码查询证券期货",
  "v1/endpoints/contract/Security Stocks by Symbol.md": "按代码搜索股票证券",
  "v1/endpoints/contract/Trading Schedule (NEW).md": "交易时间表(NEW)",
  "v1/endpoints/contract/Trading Schedule by Symbol.md": "按 Symbol 查询交易时间表",
  "v1/endpoints/event-contracts/Introduction.md": "简介",
  "v1/endpoints/event-contracts/Categorization.md": "分类",
  "v1/endpoints/event-contracts/Contract details.md": "合约详情",
  "v1/endpoints/event-contracts/Contract Rules.md": "合约规则",
  "v1/endpoints/event-contracts/Executions and Netting.md": "成交与轧差",
  "v1/endpoints/event-contracts/Markets and Strikes.md": "市场与行权价",
  "v1/endpoints/event-contracts/Order Submission.md": "订单提交",
  "v1/endpoints/event-contracts/Trading schedule.md": "交易时间表",
  "v1/endpoints/fa-allocation-management/Add Allocation Group.md": "添加分配组",
  "v1/endpoints/fa-allocation-management/Allocatable Sub-Accounts.md": "可分配子账户",
  "v1/endpoints/fa-allocation-management/Allocation Method Codes.md": "分配方法代码",
  "v1/endpoints/fa-allocation-management/Allocation Preset Combinations.md": "预设分配组合",
  "v1/endpoints/fa-allocation-management/Delete Allocation Group.md": "删除分配组",
  "v1/endpoints/fa-allocation-management/List All Allocation Groups.md": "列出所有分配组",
  "v1/endpoints/fa-allocation-management/Modify Allocation Group.md": "修改分配组",
  "v1/endpoints/fa-allocation-management/Retrieve Allocation Presets.md": "获取分配预设",
  "v1/endpoints/fa-allocation-management/Retrieve Single Allocation Group.md": "检索单个分配组",
  "v1/endpoints/fa-allocation-management/Set Allocation Presets.md": "设置分配预设",
  "v1/endpoints/fy-is-and-notifications/Delete a Device.md": "删除设备",
  "v1/endpoints/fy-is-and-notifications/Enable_Disable Device Option.md": "启用/停用设备选项",
  "v1/endpoints/fy-is-and-notifications/Enable_Disable Email Option.md": "启用/禁用电子邮件选项",
  "v1/endpoints/fy-is-and-notifications/Enable_Disable Specified Subscription.md": "启用/禁用指定订阅",
  "v1/endpoints/fy-is-and-notifications/FYI Typecodes.md": "FYI 类型代码",
  "v1/endpoints/fy-is-and-notifications/Get a list of notifications.md": "获取通知列表",
  "v1/endpoints/fy-is-and-notifications/Get a List of Subscriptions.md": "获取订阅列表",
  "v1/endpoints/fy-is-and-notifications/Get Delivery Options.md": "获取推送选项",
  "v1/endpoints/fy-is-and-notifications/Get disclaimer for a certain kind of fyi.md": "获取特定类型 FYI 的免责声明",
  "v1/endpoints/fy-is-and-notifications/Mark Disclaimer Read.md": "将免责声明标记为已读",
  "v1/endpoints/fy-is-and-notifications/Mark Notification Read.md": "将通知标记为已读",
  "v1/endpoints/fy-is-and-notifications/Unread Bulletins.md": "未读公告",
  "v1/endpoints/market-data/Historical Market Data.md": "历史市场数据",
  "v1/endpoints/market-data/HMDS Period & Bar Size.md": "HMDS 周期与 Bar 大小",
  "v1/endpoints/market-data/Live Market Data Snapshot.md": "实时市场数据快照",
  "v1/endpoints/market-data/Market Data Availability.md": "市场数据可用性",
  "v1/endpoints/market-data/Market Data Fields.md": "市场数据字段",
  "v1/endpoints/market-data/Market Data Update Frequency.md": "市场数据更新频率",
  "v1/endpoints/market-data/Regulatory Snapshot.md": "监管快照",
  "v1/endpoints/market-data/Unavailable Historical Data.md": "不可用的历史数据",
  "v1/endpoints/market-data/Unsubscribe (All).md": "取消订阅(全部)",
  "v1/endpoints/market-data/Unsubscribe (Single).md": "取消订阅(单个)",
  "v1/endpoints/option-chains/Introduction.md": "简介",
  "v1/endpoints/option-chains/Final Steps.md": "最后步骤",
  "v1/endpoints/option-chains/Step One_ Instantiate the Option Chain.md": "第一步:实例化期权链",
  "v1/endpoints/option-chains/Step Two_ Find Potential Strikes.md": "第二步:查找潜在行权价",
  "v1/endpoints/option-chains/Step Three_ Validate The Contract.md": "第三步:验证合约",
  "v1/endpoints/order-monitoring/Live Orders.md": "实时订单",
  "v1/endpoints/order-monitoring/Order Status Value.md": "订单状态值",
  "v1/endpoints/order-monitoring/Order Status.md": "订单状态",
  "v1/endpoints/order-monitoring/Trades.md": "成交记录",
  "v1/endpoints/orders/Bracket Orders & OCA Groups.md": "条件单与 OCA 组",
  "v1/endpoints/orders/Cancel Order.md": "取消订单",
  "v1/endpoints/orders/Cash Quantity Orders in the Web API.md": "Web API 中的现金数量订单",
  "v1/endpoints/orders/Combo _ Spread Orders.md": "组合/价差订单",
  "v1/endpoints/orders/Modify Order.md": "修改订单",
  "v1/endpoints/orders/Order Error Details.md": "订单错误详情",
  "v1/endpoints/orders/Overnight Order Submission.md": "隔夜订单提交",
  "v1/endpoints/orders/Place Order Reply Confirmation.md": "确认下单回复",
  "v1/endpoints/orders/Place Order.md": "下单",
  "v1/endpoints/orders/Preview Order _ WhatIf Order.md": "预览订单/WhatIf 订单",
  "v1/endpoints/orders/Reset Suppressed Messages.md": "重置已屏蔽的消息",
  "v1/endpoints/orders/Respond to a Server Prompt.md": "响应服务器提示",
  "v1/endpoints/orders/Suppress Messages.md": "屏蔽消息",
  "v1/endpoints/orders/Suppressible MessageIds.md": "可屏蔽的 MessageId",
  "v1/endpoints/portfolio/Combination Positions.md": "组合持仓",
  "v1/endpoints/portfolio/Invalidate Backend Portfolio Cache.md": "使后端投资组合缓存失效",
  "v1/endpoints/portfolio/Portfolio Accounts.md": "投资组合账户",
  "v1/endpoints/portfolio/Portfolio Allocation (All).md": "投资组合配置(全部)",
  "v1/endpoints/portfolio/Portfolio Allocation (Single).md": "投资组合配置(单个)",
  "v1/endpoints/portfolio/Portfolio Ledger.md": "投资组合账本",
  "v1/endpoints/portfolio/Portfolio Subaccounts (Large Account Structures).md": "投资组合子账户(大型账户结构)",
  "v1/endpoints/portfolio/Portfolio Subaccounts.md": "投资组合子账户",
  "v1/endpoints/portfolio/Portfolio Summary.md": "投资组合摘要",
  "v1/endpoints/portfolio/Position & Contract Info.md": "持仓与合约信息",
  "v1/endpoints/portfolio/Positions (NEW).md": "持仓(NEW)",
  "v1/endpoints/portfolio/Positions by Conid.md": "按 Conid 查询持仓",
  "v1/endpoints/portfolio/Positions.md": "持仓",
  "v1/endpoints/portfolio/Specific Account's Portfolio Information.md": "特定账户的投资组合信息",
  "v1/endpoints/portfolio-analyst/Account Performance.md": "账户表现",
  "v1/endpoints/portfolio-analyst/All Periods.md": "所有周期",
  "v1/endpoints/portfolio-analyst/Transaction History.md": "交易历史",
  "v1/endpoints/scanner/Iserver Market Scanner.md": "Iserver 市场扫描器",
  "v1/endpoints/scanner/Iserver Scanner Parameters.md": "Iserver 扫描器参数",
  "v1/endpoints/session/Introduction.md": "简介",
  "v1/endpoints/session/Authentication Status.md": "身份验证状态",
  "v1/endpoints/session/Initialize Brokerage Session.md": "初始化经纪会话",
  "v1/endpoints/session/Logout of the current session.md": "注销当前会话",
  "v1/endpoints/session/Ping the server.md": "向服务器发送 Ping",
  "v1/endpoints/session/Re-authenticate the Brokerage Session (Deprecated).md": "重新验证经纪会话(已弃用)",
  "v1/endpoints/session/Validate SSO.md": "验证 SSO",
  "v1/endpoints/watchlists/Introduction.md": "简介",
  "v1/endpoints/watchlists/Create a Watchlist.md": "创建自选列表",
  "v1/endpoints/watchlists/Delete a Watchlist.md": "删除自选列表",
  "v1/endpoints/watchlists/Get All Watchlists.md": "获取所有自选列表",
  "v1/endpoints/watchlists/Get Watchlist Information.md": "获取自选列表信息",
  "v1/requirements-limitations/Introduction.md": "简介",
  "v1/requirements-limitations/Canadian Residents Restricted From Programmatically Trading Canadian Products.md": "加拿大居民被限制以编程方式交易加拿大产品",
  "v1/requirements-limitations/Supported Two Factor Authentication (2FA).md": "支持的双因素认证(2FA)",
  "v1/ws/Introduction.md": "简介",
  "v1/ws/Solicited and Unsolicited Messages.md": "主动请求消息与非请求消息",
  "v1/ws/Subscribing to Websocket Topics.md": "订阅 Websocket 主题",
  "v1/ws/account-operations/Subscribe Account Ledger.md": "订阅账户账簿",
  "v1/ws/account-operations/Subscribe Account Summary.md": "订阅账户摘要",
  "v1/ws/account-operations/Unsubscribe Account Ledger.md": "取消订阅账户账簿",
  "v1/ws/account-operations/Unsubscribe Account Summary.md": "取消订阅账户摘要",
  "v1/ws/connection-guide/Introduction.md": "简介",
  "v1/ws/connection-guide/Establishing the Websocket with Client Portal Gateway.md": "通过 Client Portal Gateway 建立 Websocket 连接",
  "v1/ws/connection-guide/Establishing the Websocket with OAuth.md": "通过 OAuth 建立 WebSocket 连接",
  "v1/ws/connection-guide/Request Session Information.md": "请求会话信息",
  "v1/ws/connection-guide/Retrieve the Session Token.md": "获取会话令牌",
  "v1/ws/connection-guide/Send a Websocket Topic.md": "发送 WebSocket 主题",
  "v1/ws/market-data/Cancel Historical Market Data.md": "取消历史市场数据",
  "v1/ws/market-data/Cancel Market Data.md": "取消市场数据",
  "v1/ws/market-data/Cancel Price Ladder Subscription.md": "取消价格阶梯订阅",
  "v1/ws/market-data/Historical Market Data Request.md": "历史市场数据请求",
  "v1/ws/market-data/Market Data Request.md": "市场数据请求",
  "v1/ws/market-data/Subscribe to BookTrader Price Ladder.md": "订阅 BookTrader 价格阶梯",
  "v1/ws/miscellaneous-operations/Exercise Options.md": "行权期权",
  "v1/ws/order-position-operations/Cancel Live Order Updates.md": "取消实时订单更新",
  "v1/ws/order-position-operations/Cancel Profit & Loss.md": "取消损益",
  "v1/ws/order-position-operations/Cancel Trades data.md": "取消成交数据",
  "v1/ws/order-position-operations/Request Live Order Updates.md": "请求实时订单更新",
  "v1/ws/order-position-operations/Request Profit & Loss.md": "请求盈亏",
  "v1/ws/order-position-operations/Request Trades data.md": "请求成交数据",
  "v1/ws/session/Introduction.md": "简介",
  "v1/ws/session/Maintain Session (Ping).md": "维持会话(Ping)",
  "v1/ws/unsolicited-messages/Introduction.md": "简介",
  "v1/ws/unsolicited-messages/Account Updates.md": "账户更新",
  "v1/ws/unsolicited-messages/Authentication Status.md": "认证状态",
  "v1/ws/unsolicited-messages/Bulletins.md": "公告",
  "v1/ws/unsolicited-messages/Notifications.md": "通知",
  "v1/ws/unsolicited-messages/System Connection Messages.md": "系统连接消息",
  // flex-web-service
  "flex-web-service/Introduction.md": "简介",
  "flex-web-service/Error Codes.md": "错误代码",
  "flex-web-service/using-flex-web-service.md": "使用 Flex Web Service",
  "flex-web-service/client-portal-configuration/client-portal-configuration.md": "简介",
  "flex-web-service/client-portal-configuration/Create a Flex Query.md": "创建 Flex Query",
  "flex-web-service/client-portal-configuration/Enable and Create Access Token.md": "启用并创建访问令牌",
  "flex-web-service/client-portal-configuration/Including Audit Trail Fields.md": "包含审计追踪字段",
  "flex-web-service/using-flex-web-service/Generate a Report.md": "生成报告",
  "flex-web-service/using-flex-web-service/Retrieve the Report.md": "获取报告",
  // changelog
  "changelog/Changelog.md": "更新日志",
};

// Chinese nav titles for sections (dirs). Keys are docs-relative dir paths.
const ZH_SECTIONS = {
  "introduction/quick-start": "快速开始",
  "authentication/cpgw": "Client Portal 网关",
  "authentication/oauth-1a": "OAuth 1.0a",
  "authentication/oauth-1a/first-party-oauth": "第一方 OAuth",
  "authentication/oauth-1a/lst": "实时会话令牌(LST)",
  "authentication/oauth-1a/third-party-oauth": "第三方 OAuth",
  "authentication/oauth-2": "OAuth 2.0",
  "account-management/account-information": "账户信息",
  "account-management/account-management-introduction": "账户管理简介",
  "account-management/account-types": "账户类型",
  "account-management/client-registration": "客户注册",
  "account-management/client-registration/registration-tasks": "注册任务",
  "account-management/funds-and-banking": "资金与银行",
  "account-management/funds-and-banking/cash-transfer": "现金转账",
  "account-management/reporting": "报表",
  "account-management/resources": "资源",
  "account-management/resources/sample-responses": "示例响应",
  "account-management/schema": "数据模型",
  "trading/financial-advisors": "财务顾问",
  "trading/fy-is-and-alerts": "FYI 与警报",
  "trading/getting-started": "快速开始",
  "trading/instrument-discovery": "合约发现",
  "trading/market-data": "市场数据",
  "trading/orders": "订单",
  "trading/portfolio-and-positions": "投资组合与持仓",
  "trading/usage-and-availability": "用量与可用性",
  "v1/endpoints": "端点",
  "v1/endpoints/accounts": "账户",
  "v1/endpoints/alerts": "警报",
  "v1/endpoints/contract": "合约",
  "v1/endpoints/event-contracts": "事件合约",
  "v1/endpoints/fa-allocation-management": "FA 分配管理",
  "v1/endpoints/fy-is-and-notifications": "FYI 与通知",
  "v1/endpoints/market-data": "市场数据",
  "v1/endpoints/option-chains": "期权链",
  "v1/endpoints/order-monitoring": "订单监控",
  "v1/endpoints/orders": "订单",
  "v1/endpoints/portfolio": "投资组合",
  "v1/endpoints/portfolio-analyst": "投资组合分析",
  "v1/endpoints/scanner": "扫描器",
  "v1/endpoints/session": "会话",
  "v1/endpoints/watchlists": "自选列表",
  "v1/requirements-limitations": "要求与限制",
  "v1/ws": "WebSocket",
  "v1/ws/account-operations": "账户操作",
  "v1/ws/connection-guide": "连接指南",
  "v1/ws/market-data": "市场数据",
  "v1/ws/miscellaneous-operations": "其他操作",
  "v1/ws/order-position-operations": "订单与持仓操作",
  "v1/ws/session": "会话",
  "v1/ws/unsolicited-messages": "非请求消息",
  "flex-web-service/client-portal-configuration": "Client Portal 配置",
  "flex-web-service/using-flex-web-service": "使用 Flex Web Service",
};

// Pin slugs where the auto-generated slug is unpredictable (version tokens
// like "2.0"/"1.0a") or where scraped content links target a known value;
// inbound content links depend on these staying stable.
const SLUG_OVERRIDES = {
  "authentication/oauth-2/OAuth 2.0 Registration Process.md": "oauth-2-0-registration-process",
  "authentication/oauth-1a/OAuth 1.0a Request Structure.md": "oauth-1-0-a-request-structure",
};

function emit(dir, rel, indent, out) {
  const pad = "  ".repeat(indent);
  const { pages, dirs } = sortEntries(dir);
  for (const p of pages) {
    const key = rel + "/" + p;
    const en = pageTitle(p);
    out.push(`${pad}- page: ${q(ZH_PAGES[key] ?? en)}`);
    out.push(`${pad}  path: ${q("docs/" + key)}`);
    out.push(`${pad}  slug: ${q(SLUG_OVERRIDES[key] ?? fernSlug(en))}`);
  }
  for (const d of dirs) {
    const key = rel + "/" + d;
    out.push(`${pad}- section: ${q(ZH_SECTIONS[key] ?? d)}`);
    out.push(`${pad}  slug: ${q(fernSlug(d))}`);
    out.push(`${pad}  contents:`);
    emit(join(dir, d), key, indent + 1, out);
  }
}

// Top-level tabs, mirroring the original IBKR docs navbar. Every tab referenced
// in navigation MUST be declared here, or the docs runtime throws
// "Tab <id> is not defined in the tabs config." Tab slugs double as URL roots,
// so they stay ASCII even though display names are Chinese.
const TABS = [
  ["introduction", "简介"],
  ["authentication", "身份验证"],
  ["account-management", "账户管理"],
  ["trading", "交易"],
  ["api-reference", "API 参考"],
  ["v1", "Web API v1.0 文档"],
  ["flex-web-service", "Flex Web Service"],
  ["changelog", "更新日志"],
];

// Directories that become their own tab of plain docs pages (same order as
// TABS minus introduction). The api-reference, flex-web-service and changelog
// tabs are emitted explicitly below.
const TAB_DIRS = [
  ["authentication", "authentication"],
  ["account-management", "account-management"],
  ["trading", "trading"],
  ["v1", "v1"],
];

// Quick Start section inside the Introduction tab, in the original site's order
const QUICK_START_ORDER = [
  "Installation",
  "Initializing Brokerage Session",
  "Placing Orders",
  "Requesting Positions",
  "Obtaining Market Data",
  "Troubleshooting",
];

// URLs of the removed fern starter pages; redirected so old links keep working
const REDIRECTS = ["welcome", "customization", "navigation", "editing-your-docs", "support", "writing-content"];

const lines = [];
lines.push("# fern docs configuration");
lines.push("# - content lives under docs/ (copied from web-api-docs-zh and web-api-zh)");
lines.push("# - regenerate this file: node scripts/generate-docs-yml.mjs");
lines.push("");
lines.push("title: IBKR Web API 文档");
lines.push("");
lines.push("logo:");
lines.push("  href: /");
lines.push("  light: assets/logo-light.svg");
lines.push("  dark: assets/logo-dark.svg");
lines.push("  height: 28");
lines.push("");
lines.push("navbar-links:");
lines.push("  - type: outlined");
lines.push("    text: IBKR 官网");
lines.push("    href: https://www.interactivebrokers.com");
lines.push("  - type: filled");
lines.push("    text: 问题反馈");
lines.push("    href: mailto:API-Feedback@interactivebrokers.com");
lines.push("");
lines.push("colors:");
lines.push("  accent-primary:");
lines.push(`    light: ${q("#1e40af")}`);
lines.push(`    dark: ${q("#60a5fa")}`);
lines.push("");
// Move the search bar into the top header instead of the sidebar.
lines.push("layout:");
lines.push("  searchbar-placement: header");
lines.push("");
lines.push("tabs:");
for (const [id, name] of TABS) {
  lines.push(`  ${id}:`);
  lines.push(`    display-name: ${q(name)}`);
  lines.push(`    slug: ${q(id)}`);
}
lines.push("");
lines.push("instances:");
lines.push(`  - url: ${q("web-api-zh.docs.buildwithfern.com")}`);
lines.push("");
// Render the tabs as the horizontal top navbar (fern default is the sidebar).
lines.push("theme:");
lines.push("  tabs:");
lines.push("    placement: header");
lines.push("    style: default");
lines.push("    alignment: left");
// Compact Previous/Next links instead of the large footer cards.
lines.push("  footer-nav: minimal");
lines.push("");
lines.push("redirects:");
for (const p of REDIRECTS) {
  lines.push(`  - source: /${p}`);
  lines.push("    destination: /introduction");
}
lines.push("");
lines.push("navigation:");

// Tab 1: Introduction — introduction / getting started / quick start / feedback
lines.push("  - tab: introduction");
lines.push("    layout:");
lines.push("    - page: 简介");
lines.push(`      path: ${q("docs/introduction/Introduction.md")}`);
lines.push("      slug: introduction");
lines.push("    - page: 快速入门");
lines.push(`      path: ${q("docs/introduction/Getting Started.md")}`);
lines.push("      slug: getting-started");
lines.push("    - section: 快速开始");
lines.push("      slug: quick-start");
lines.push("      contents:");
{
  const qsDir = join(DOCS, "introduction", "quick-start");
  const remaining = new Set(readdirSync(qsDir).filter((n) => isPageName(n)));
  const resolve = (title) => {
    const file = [...remaining].find((n) => pageTitle(n) === title);
    if (!file) throw new Error(`quick-start page missing: ${title}`);
    remaining.delete(file);
    return file;
  };
  for (const title of QUICK_START_ORDER) {
    const file = resolve(title);
    const key = "introduction/quick-start/" + file;
    lines.push(`        - page: ${q(ZH_PAGES[key] ?? title)}`);
    lines.push(`          path: ${q("docs/introduction/quick-start/" + file)}`);
    lines.push(`          slug: ${q(SLUG_OVERRIDES[key] ?? fernSlug(title))}`);
  }
  for (const p of [...remaining].sort(cmp)) {
    const key = "introduction/quick-start/" + p;
    lines.push(`        - page: ${q(ZH_PAGES[key] ?? pageTitle(p))}`);
    lines.push(`          path: ${q("docs/introduction/quick-start/" + p)}`);
    lines.push(`          slug: ${q(SLUG_OVERRIDES[key] ?? fernSlug(pageTitle(p)))}`);
  }
}
lines.push("    - page: 反馈");
lines.push(`      path: ${q("docs/introduction/Feedback.md")}`);
lines.push("      slug: feedback");
lines.push("");

// Docs tabs: one per top-level category directory
for (const [tabId, dir] of TAB_DIRS) {
  lines.push(`  - tab: ${tabId}`);
  lines.push("    layout:");
  emit(join(DOCS, dir), dir, 2, lines);
  lines.push("");
}

// Tab 8: API Reference — endpoint pages generated from the translated
// Chinese OpenAPI spec, manually organized into Chinese groups/tags with
// ASCII slugs (openapi/api-nav.json, built by gen-api-navigation.py).
// skip-slug drops the redundant "api-reference" URL segment of the api layer.
// The Flex Web Service group is excluded here: its endpoints render as an api
// block inside the flex-web-service tab (a sibling of this tab), since they
// belong to that product rather than the main Web API reference.
const API_NAV = JSON.parse(readFileSync(join(FERN, "openapi", "api-nav.json"), "utf8"));
const FLEX_GROUP = API_NAV.find((g) => g.slug === "flex-web-service");
const API_REFERENCE_NAV = API_NAV.filter((g) => g !== FLEX_GROUP);

function emitApiLayout(nodes, indent, out) {
  const pad = "  ".repeat(indent);
  for (const n of nodes) {
    if (n.section) {
      out.push(`${pad}- section: ${q(n.section)}`);
      out.push(`${pad}  slug: ${q(n.slug)}`);
      out.push(`${pad}  contents:`);
      emitApiLayout(n.contents, indent + 1, out);
    } else {
      out.push(`${pad}- endpoint: ${q(n.endpoint)}`);
      out.push(`${pad}  slug: ${q(n.slug)}`);
    }
  }
}

lines.push("  - tab: api-reference");
lines.push("    layout:");
lines.push("    - api: API 参考");
lines.push("      skip-slug: true");
lines.push("      specs:");
lines.push("        - type: openapi");
lines.push("          path: openapi/openapi.zh.yaml");
lines.push("      layout:");
emitApiLayout(API_REFERENCE_NAV, 3, lines);
lines.push("");

// The Flex Web Service tab keeps its guide pages and gains an api block with
// the two Flex endpoints, so they render as endpoint pages (with playground)
// inside this tab instead of the API Reference tab.
lines.push("  - tab: flex-web-service");
lines.push("    layout:");
emit(join(DOCS, "flex-web-service"), "flex-web-service", 2, lines);
lines.push("    - api: API 端点");
lines.push("      skip-slug: true");
lines.push("      specs:");
lines.push("        - type: openapi");
lines.push("          path: openapi/openapi.zh.yaml");
lines.push("      layout:");
emitApiLayout(FLEX_GROUP.contents, 3, lines);
lines.push("");

// Tab: changelog
lines.push("  - tab: changelog");
lines.push("    layout:");
emit(join(DOCS, "changelog"), "changelog", 2, lines);
lines.push("");

writeFileSync(join(FERN, "docs.yml"), lines.join("\n"), "utf8");
console.log("docs.yml written:", lines.length, "lines");
