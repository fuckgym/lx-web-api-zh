## 模型投资组合(Model Portfolio)投资 / 剥离 / 再平衡 API - 集成指南

**受众:** 与 IBKR 的模型投资组合(Model Portfolio)Web API 进行集成的客户端开发者(财务顾问工具)。

**范围:** 本指南说明*各端点如何协同工作*,以创建模型、将客户账户投资于该模型、执行由此产生的交易并验证结果。它不重复字段级的 schema——那些内容位于 OpenAPI 参考文档中。在有用之处,本指南会指出仅从 schema 本身不易察觉的特殊行为、顺序规则和已知问题。

**基础 URL:** `https://api.ibkr.com/v1/api/...`

**公共请求头(所有 FA 微服务调用):**

```
Accept: application/json
Content-Type: application/json
```

完整的投资/剥离/再平衡流程涉及两个不同的 API 面:

| API 面                | 路径前缀                 | 职责                                                                                                                                       |
| --------------------- | --------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| FA Model 微服务        | `/v1/api/fa/...`      | 模型的 CRUD、目标计算、预设(preset)、计算哪些股份需要移动(以划转和/或订单的形式)                                      |
| IServer 交易 API      | `/v1/api/iserver/...` | 实际对交易会话进行身份验证,并为投资/剥离/再平衡的"分配(allocation)"环节提交由此产生的**订单**                          |

FA 微服务返回的一切(划转、分配)都只是一个*计划*。在你显式地 (a) 通过 `/model/submit-transfers` 提交缓存的划转,和/或 (b) 通过 IServer 订单端点提交订单之前,不会有任何交易发生,资金也不会移动。

### 1. 核心概念

在将各端点串联起来之前,先了解领域模型会有所帮助:

* **Independent / "Core"** - 账户投资组合中*未*分配给任何模型的部分。实际上,每个账户都有 `account.Core`,外加其参与的每个模型对应的 `account.<ModelName>`。
* **Model(模型)** - 一个具名的目标配置(`positionTargets` + `cashTargets`,以 NLV 的比例表示,总和为 `1.0`)。模型可以是:
  * **动态型**(`isStatic:false`)——目标是百分比,可漂移。
  * **静态型**(`isStatic:true`)——必须经过引导(bootstrap)才会被识别为静态。
* **已引导(Bootstrapped)** - 只有在至少一个账户完成投资后,模型才拥有真实的模型百分比/NLV。在此之前,`summary`/`positions` 返回零值且 `bootstrapped:false`。如果尚未引导,`invest-divest` 会在处理请求的过程中静默地引导动态模型。
* **目标百分比 vs. 实际百分比(模型百分比)** - 目标百分比是你*想要*的;实际百分比(又称 Model %、MI %)是模型当前持有的。`instrumentImbalance` 是两者之间的(加权)差值。失衡公式见第 8 节。
* **NLV** - 净清算价值(Net Liquidation Value),始终以相关主体(主账户、账户或模型)的*基础货币*表示。
* **完整主账户 vs. 部分主账户** - 对于部分主账户(partial master),某些模型操作(投资/剥离/再平衡)可能被阻止。如果不确定,请使用 `/is-full-master` 检查。
* **单一货币约束** - 模型的 `positionTargets` + `cashTargets` 必须全部以同一种货币交易/结算。混合货币的目标集会被拒绝。
* **transfersInstructionId** - 一个服务端缓存键。任何计算一组移动操作的端点(`invest-divest`、`tws-invest-divest`、`rebalance/*`)都会返回此 ID。它本身*不是*执行——你必须随后调用 `/model/submit-transfers`(用于划转环节)和/或 IServer 订单(用于分配/订单环节)才能真正使其生效。重复提交相同的 `transfersInstructionId` 会报错。

---

### 2. FA 预设——它们会改变"投资"的实际行为

`GET/POST /fa-preset/get` 和 `/fa-preset/save` 控制*规划*端点(`invest-divest`、`tws-invest-divest`、`rebalance/*`)以何种方式满足目标:买入新股份、将现有的 Independent 份额划转进模型、内部对敲(cross trades)等。**在规划一笔投资之前,务必先获取预设**,如果默认行为不符合你的需求,请显式设置它们。

| 预设                                        | 为 `true` 时的效果                                                                                                                                                                                                                                                              |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `preferTransferFromIndependent`             | 如果账户已在 Independent(Core)部分持有该工具,则将这些股份划转进模型,而不是生成 BUY 订单。这就是在 invest-divest 响应中得到 `positionTransfers` 条目还是 `allocations` 条目的区别。 |
| `closeDivestIndependentPosition`            | 剥离时,完全平掉任何匹配的 Independent 持仓,而不是留下残余。                                                                                                                                                                                       |
| `preferCrossWithIndependent`                | 优先与账户的 Independent 侧进行内部对敲,而非下达外部订单。                                                                                                                                                                                              |
| `fullyInvestExistingLongPositions`          | 将现有的 Independent 多头持仓视为可全额用于投资以达到目标。                                                                                                                                                                                                   |
| `avoidNegativeCashInIndependent`            | 避免会使 Independent 现金变为负数的操作。                                                                                                                                                                                                                           |
| `useToleranceRange`                         | 对失衡在容差范围内(约为目标的 target%/100)的工具跳过生成分配,而不是对每一股都进行再平衡。                                                                                                                           |
| `useNonBaseCcy`                             | 在为投资提供资金时,允许使用非基础货币的现金余额。                                                                                                                                                                                                           |
| `keepModelOpen`                             | UI/会话提示——使模型保持在"打开"的编辑状态。                                                                                                                                                                                                                           |
| `roundAllocationQuantityToExchangeBoardLot` | 将股份分配数量取整到交易所的每手(board lot)股数。                                                                                                                                                                                                                          |

**工作流影响:** 在案例 1A 中,第一次 `invest-divest` 调用(`preferTransferFromIndependent:false`)为 CSCO 生成了**BUY 订单分配**。将该预设改为 `true` 并重新运行完全相同的 `invest-divest` 请求后,计划变更为将 CSCO 从 Independent **划转持仓**进模型。`invest-divest` 请求本身没有任何变化——变的只是预设。请始终将预设视为粘性的、账户级的配置,它会悄然重塑后续每一次规划调用的输出。

---

### 3. 端点目录(按角色分组)

| 类别                 | 端点                                                 | 用途                                                                                                                                                                      |
| -------------------- | ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **模型定义** | `POST /fa/model/save`                                | 创建或更新模型的名称/描述/目标。如果模型名已存在,则更新;否则创建。                                                              |
|                      | `POST /fa/model/delete`                              | 删除模型及其目标。                                                                                                                                              |
|                      | `POST /fa/model/save-ccy`                            | 更改模型的基础货币。                                                                                                                                              |
| **模型发现**  | `POST /fa/model/list`                                | 列出主账户的所有模型,并附带轻量级状态(bootstrapped、NLV、mismatch 等)。                                                                                 |
|                      | `POST /fa/model/summary`                             | 针对单个具名模型的同样的轻量级状态。                                                                                            |
| **模型洞察**    | `POST /fa/model/positions`                           | 模型中每个工具的目标百分比 / 实际百分比 / 失衡 / NLV(模型级别,而非按账户)。                                                                             |
|                      | `POST /fa/model/accounts-details`                    | 对投资于某模型的账户进行按账户细分(成本基础、NLV、失衡、未实现盈亏)。50 个账户上限;参见第 9 节。                                               |
|                      | `POST /fa/model/invest-divest-positions`             | 用于*驱动*投资/剥离界面的按账户视图——显示每个账户的 NLV 中有多少位于 Independent(持仓 vs. 现金)、该模型以及其他模型中。 |
|                      | `POST /fa/model/imbalance`                           | 每个模型的聚合模型失衡百分比(计算开销大;与 `/model/list` 是分开的调用)。当 `numAccounts > 50` 时不支持。                                    |
| **首选项**      | `POST /fa/fa-preset/get` / `POST /fa/fa-preset/save` | 读写第 2 节所述的 FA 预设。                                                                                                                                   |
| **规划操作**   | `POST /fa/model/invest-divest`                       | 计算将账户移动到某个模型中目标金额/百分比所需的划转/分配(CP 风格,每次调用每个账户仅一个模型)。                                 |
|                      | `POST /fa/model/tws-invest-divest`                   | 同样的思路,但为 TWS 风格:一个账户/组/列表可以在单次调用中面向**多个模型**,并返回 `batchNumber` 用于排定执行顺序。                           |
|                      | `POST /fa/model/rebalance/to-existing-targets`       | 重新计算分配,使模型回到其**当前已保存**的目标。                                                                                              |
|                      | `POST /fa/model/rebalance/to-new-targets`            | 针对**全新的完整目标集**重新计算分配(目标之和必须为 1.0);同时将新目标持久化到模型,与 `/model/save` 相同。                  |
|                      | `POST /fa/model/rebalance/to-specific-targets`       | 形状与 `to-new-targets` 相同,但仅限于你列出的合约——没有"总和为 1.0"的校验。用于"只再平衡这一两行"。                        |
|                      | `POST /fa/model/cash-analyzer`                       | 检测/规划清理滞留在多币种模型中的非模型货币现金。                                                                                             |
| **执行计划**   | `POST /fa/model/submit-transfers`                    | 将缓存在某个 `transfersInstructionId` 下的现金/持仓划转传送给后台。**不**提交订单。                                                 |
|                      | `POST /iserver/account/{modelCode}/orders`           | 为计划的分配环节提交实际的**订单**(参见第 5 节)。                                                                                                    |
| **实用工具**        | `POST /fa/is-full-master`                            | 判断调用方的主账户是完整主账户还是部分主账户(部分主账户可能被阻止某些操作)。                                                     |

---

### 4. 端到端工作流:投资单个账户(仅做多)

这是案例 1A 的参考流程。它将上述端点组合成六个逻辑阶段。

```
1. Define the model -> 2. Verify creation -> 3. Presets check -> 4. Plan & execute the investment -> 5. Verify result
```

#### 阶段 1 - 定义模型

`POST /fa/model/save`,带 `positionTargets`(按 `conid`)和 `cashTargets`(按 `ccy`),所有比例之和为 `1.0`。示例:45% CSCO / 45% INTC / 10% USD 现金储备。

* 如果 `success:false`,检查 `error`——常见原因:目标中混用货币、目标之和不等于 1.0,或模型名在删除的同一天被重用。

#### 阶段 2 - 验证创建

使用 `/fa/model/summary`(单个模型)和/或 `/fa/model/list`(所有模型)确认模型已存在。刚创建时模型**尚未引导**(`bootstrapped:false`、`nlv:"0"`、`numAccounts:0`)——这是正常现象;引导会在第一次投入资金时自动发生。

使用 `/fa/model/positions` 交叉核对目标是否正确落地(`sortField:""`、`limit:-1` 以获取完整的未排序列表)。在任何账户投资之前,每行的 `actual` 都是 `0`,而 `target` 会回显你保存的内容。

#### 阶段 3 - 检查/设置 FA 预设

调用 `/fa-preset/get`,判断默认值是否适合本次投资。在参考案例中,默认的 `preferTransferFromIndependent:false` 本会为 CSCO 生成**BUY 订单**,即便账户的 Independent 部分已经持有 CSCO 股份。要把这些股份划转进模型而不是再买入,请调用 `/fa-preset/save` 并设置 `preferTransferFromIndependent:true`。

此时你可能还需要 `/fa/model/invest-divest-positions`——它按账户显示当前有多少 NLV 位于 Independent 持仓、Independent 现金、该模型以及其他模型中。这是用于决定投资多少以及从 Independent 划转是否合理的参考信息。

#### 阶段 4 - 规划并执行投资

1. `POST /fa/model/invest-divest`,带 `accountList: [{account, amtToInvest}]`。

   * 这是一个**轮询**端点——参见第 5 节。*最终*响应(当 `subscriptionStatus:1` 时)包含:
     * `transfersInstructionId`——阶段 4b/4c 所用的缓存键。
     * `cashTransfers[]`——从 `Core` 移入模型的现金。
     * `positionTransfers[]`——从 Independent 划转进模型的股份(仅当相关预设,例如 `preferTransferFromIndependent`,使得以划转代替交易时才会填充)。
     * `allocations[]`——反而需要下达**新订单**的工具(因为没有预设指示划转,或账户没有持有该股份)。
   * *同一个*投资调用对一个工具返回 `positionTransfer`、对另一个工具返回 `allocation` 是完全正常的——该决定是按工具做出的,取决于账户的 Independent 部分是否已持有该工具以及预设的设置。

2. **4a - 提交划转。** 使用第 1 步的 `transfersInstructionId` 调用 `POST /fa/model/submit-transfers`。这会提交不需要新市场订单的现金 + 持仓划转。这是一个即发即忘(fire-and-forget)式的提交——成功意味着基础现金划转已成功(其他划转仍可能需要通过 `error` 逐个检查)。

3. **4b - 提交订单。** 对于 `allocations[]` 中的每个条目,必须通过 **IServer 交易 API**(而非 FA 微服务)下单。详细的子流程(身份验证、屏蔽预防性对话框、获取模型分配代码、提交订单)参见第 5 节。在将投资视为完成之前,请等待订单成交——部分成交会在后续验证调用中表现为失衡。

#### 阶段 5 - 验证投资

* `/fa/model/accounts-details`(带 `calcPnls:true`)——按账户的成本基础、NLV、未实现盈亏,以及超出目标范围的工具数量。
* `/fa/model/summary`——模型现在为 `bootstrapped:true`,拥有真实 NLV 且 `numAccounts:1`。
* `/fa/model/positions`——每个工具的实际值 vs. 目标值,现在已填充。
* `/fa/model/invest-divest-positions`——确认 `accountModelNlv` 已反映新的投资。

---

### 5. 通过 IServer 提交订单("分配"环节)

FA 微服务从不直接与交易所通信——对于 `invest-divest` / `tws-invest-divest` / `rebalance/*` 返回的任何 `allocations[]` 条目,你必须通过交易网关提交真实订单。这是一个独立的身份验证上下文(基于 OAuth 2.0 的 IServer 会话),并且与所有 IBKR 交易使用的订单提交接口相同,只是针对模型有以下补充:

1. **对交易会话进行身份验证:** `POST /iserver/auth/ssodh/init`

2. **屏蔽订单预防性对话框**(无人值守/API 提交时需要):`POST /iserver/questions/suppress`,并带上标准的消息 ID 列表。

3. **获取模型→账户分配代码**(任何模型订单的前提条件):`GET /iserver/account/allocation/models` 返回一个从模型名到内部分配代码字符串的映射。在下模型订单之前,每个会话都需要执行一次此步骤——交易网关正是通过它将 `isModel:true` 的订单解析到正确的 FA 账户分组。

4. **提交订单**,以*模型*作为账户上下文:`POST /iserver/account/{modelCode}/orders` 使之成为"模型订单"的关键字段:
   * `"acctId": "<model name>"`、`"isModel": true`
   * `conidex` = 要分配的工具的 conid
   * `jsonPayload.allocation_profile`——`alloc_type: "SHARE"`,并附上一组 `{account, amount}` 对(分配给每个底层账户的数量)。此处分配的 `quantity` 应与规划调用中相应 `allocations[]` 条目所报告的 `quantity` 一致。

响应会给出 `order_id` / `local_order_id` 和初始 `order_status`(例如 `PreSubmitted`)。在将投资/剥离/再平衡视为完成之前,**请等待成交**——后续的验证调用(`/model/positions`、`/model/accounts-details`)反映的是*实际*持仓,而非挂起的订单。

---

### 6. 轮询模式(`subscriptionKey` / `subscriptionStatus`)

一些规划端点(`invest-divest`、`rebalance/*`、`tws-invest-divest`)可能需要比单次请求/响应往返更长的时间,因为它们可能需要引导模型、获取 CCP 快照或计算大型分配集合。它们使用一个简单的轮询约定:

1. **首次调用:** 完全省略 `subscriptionKey`,或将其作为空字符串 `""` 发送,以*启动*异步计算。
2. **立即响应**可能返回"未就绪":`subscriptionStatus: 0`,并带有一个标识进行中任务的 `subscriptionKey`(例如 `"1"`)。
3. **轮询:** 重新发送*完全相同的请求载荷*,但这次将 `subscriptionKey` 设为之前获得的值。重复此过程,直到 `subscriptionStatus: 1`,此时响应正文包含完整结果(划转、分配等)。

不涉及重度计算的其他端点(`/model/save`、`/model/summary`、`/fa-preset/get`、`/is-full-master` 等)总是立即返回 `subscriptionStatus:1`——无需轮询。

---

### 7. 再平衡——三种变体,一种响应结构

三个再平衡端点都返回相同的响应结构(`allocations`、`allocationTotals`、`positionTransfers`、`miPositionTransfers`、`contractsAllocEnabled`、`contractsCashQtyEnabled`、`contractsFracEligible`、`accountsCanTradeFractions`、`errors`、`warnings`),并返回一个 `transfersInstructionId`,你可以像处理 invest-divest 计划一样,将其提供给 `/model/submit-transfers` / IServer 订单提交。它们的区别仅在于针对什么目标进行再平衡:

| 端点                                   | 使用的目标                                                                                                          | 校验                                                                                  |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| `/model/rebalance/to-existing-targets` | 模型上当前已保存的目标                                                                                              | 模型必须已经完成引导                                                          |
| `/model/rebalance/to-new-targets`      | 你在请求中提供的全新完整目标集(并且会像 `/model/save` 一样**持久化**到模型) | 目标之和必须为 `1.0`;至少需要一个持仓目标和一个现金目标        |
| `/model/rebalance/to-specific-targets` | **部分**目标集——仅触及你列出的 conid                                                       | 没有"总和为 1.0"或完整性校验——这是"只再平衡这些行"的选项 |

当用户在 UI 中选择一或两行、只想纠正这些行而不影响模型其余分配时,使用 `to-specific-targets`。

---

### 8. 多模型 / 批量投资(`tws-invest-divest`)

`/model/tws-invest-divest` 适用于单个账户(或账户组/列表)需要**在单次调用中投资多个模型**的流程——例如,"为该账户向模型 A 投入 1 万美元、向模型 B 投入 2 万美元"。`modelList[]` 中的每个条目可以独立指定 `targetAmt`、`targetPercent`(完全剥离时用 `0.00`)或 `amtToInvest`(负值表示剥离)。

#### 投资对象——账户、列表还是组

`tws-invest-divest` 在请求的顶层接受以下三种互斥形态之一的投资目标:

| 形态                          | 字段          | 示例                                                   | 语义                                                                                                                                                                          |
| ----------------------------- | ------------- | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 单个 U 账户                   | `account`     | `"account": "DUXXXX123"`                               | 仅投资这一个账户。                                                                                                                                                      |
| 显式的 U 账户列表             | `accountList` | `"accountList": ["DUXXXX123","DUXXXX124","DUXXXX125"]` | 投资列表中的每个账户。每个模型的投资金额会在所列账户之间**平均分配**。                                                             |
| FA 交易前分配组               | `group`       | `"group": "Group1"` 或 `"group": "All"`                | 投资指定 FA 分配组中的每个账户。`"All"` 面向主账户下的所有账户。每个模型的金额会在组内账户之间**平均分配**。 |

无论你传入 `accountList` 还是 `group`,给定模型的投资金额都会在解析出的账户集之间平均分配——你无法在 `tws-invest-divest` 上指定按账户的金额。如果需要按账户的金额,请使用 `/invest-divest`(参见下面的对比)。

#### `tws-invest-divest` 与 `invest-divest` 的对比

| 维度                           | `/fa/model/tws-invest-divest`                                                                                | `/fa/model/invest-divest`                                         |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------- |
| 每次请求的模型数               | **多个**——`modelList[]` 可在单次调用中面向多个模型                                           | **一个**——每次调用单个模型                                 |
| 按模型指定金额                 | `modelList[]` 中每个条目使用 `targetAmt` / `targetPercent` / `amtToInvest` 之一                              | `accountList[{account, amtToInvest}]` 中每个账户一个金额   |
| 模型货币                       | 单个模型内的工具可以横跨**多种货币**                                           | 仅限**单一货币**模型                                   |
| 按账户的金额控制               | 无——每个模型一个金额,在账户集(单个账户 / `accountList` / `group`)之间平均分配 | 有——`accountList` 中每个账户携带自己的 `amtToInvest` |
| 组 / "All" 支持                | 有——具名 FA 分配组或 `"All"`                                                                   | 无——必须逐个列出账户                         |

**如何选择:**

* 当你需要模型内包含多币种工具、希望单个账户/列表/组同时投资多个模型,或者你已经在按 FA 分配组的思路思考时,选择 `tws-invest-divest`。
* 当每个账户需要*不同*的投资金额时,选择 `invest-divest`,因为 `tws-invest-divest` 在使用列表或组时会把一个金额平均分给所有目标账户。

#### 响应中的批次顺序

响应与 `invest-divest` 类似,但会给每个 `cashTransfers` / `positionTransfers` / `allocations` 条目标上 `batchNumber`。**提交时请遵循批次顺序**——批次的先后安排是:平仓/释放订单先于转换执行,转换又先于开仓/支出订单执行,这与多币种模型(Multi Currency Model)转换必须遵循的顺序一致,以避免出现瞬时负现金。

---

### 9. 辅助 / 维护端点

* **`/model/delete`**——同时删除模型及其目标。注意:模型**不能在删除的同一天以相同名称重新创建**——你必须至少等待一天。
* **`/is-full-master`**——如果不确定主账户类型,可在尝试投资/剥离/再平衡之前防御性地调用此端点;部分主账户可能完全无法执行这些操作。
* **`/model/cash-analyzer`**——针对多币种模型,检测滞留在 `account.Model` 分区中的不需要的非模型货币现金余额,并返回清理它们所需的现金划转 / 外汇转换订单。如果保证金账户在非基础货币上出现负数,还会给出 `marginWarning:true`。如果省略 `accountList`,它会扫描主账户的全部账簿。

---

### 10. 设计时需要绕开的限制与约束

| 约束                                      | 详情                                                                                                                                                                                                                                                                                                                                                                          |
| ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 先查询分配代码                             | 在通过 Web API 与模型投资组合交互之前,确保**先**查询 `GET /iserver/account/allocation/models`。这有助于减少 `POST /iserver/account/{modelCode}/orders` 等端点返回的 HTTP 400 错误。                                                                                                                                  |
| 50 账户上限                               | 一旦模型的 `numAccounts > 50`,`/model/imbalance` 和 `/model/accounts-details` 会返回精简/空白的数据(imbalance 变为不支持;accounts-details 去掉成本基础/未实现盈亏,只返回代码/别名/NLV/Independent 现金)。`/model/positions` **没有**此限制——它在不在内存中保存按账户快照的情况下进行聚合。                     |
| 每个模型单一货币                           | 模型上的所有 `positionTargets` + `cashTargets` 必须共用一种交易货币。违反时,`/model/save` 和再平衡操作都会拒绝。                                                                                                                                                                                                                        |
| 目标之和必须为 1.0                        | 在 `/model/save` 和 `/model/rebalance/to-new-targets` 上强制执行;在 `/model/rebalance/to-specific-targets` 上**不**强制执行。                                                                                                                                                                                                                                    |
| transfersInstructionId 一次性使用          | 向 `/model/submit-transfers` 重复提交相同的 `transfersInstructionId` 会被视为错误(重复)。                                                                                                                                                                                                                                                |
| 公司行动 / 不匹配的工具                    | 如果模型持仓因公司行动而偏离了其已保存的目标 conid,`/model/list`、`/model/summary` 和 `/model/positions` 上会显示 `mismatch:true`(`mismatchType`:`1` = 在目标中但不在 MI 中,`2` = 在 MI 中但不在目标中)。在目标被重新审核之前,规划/投资调用会拒绝并报 "Corporate Actions have changed instruments..."(公司行动已改变工具……)错误。 |
