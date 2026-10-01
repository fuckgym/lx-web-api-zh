# 预设分配组合

为了实现特定的分配行为,必须指定各种设置的组合。下表详细说明了必须使用的设置。Interactive Brokers 支持两种形式的分配方法:由 Interactive Brokers 完成计算的分配方法,以及由用户计算后再行指定的一组分配方法。

预设设置基于 TWS 中内置的 Advisor Presets 设置。\
用户每次登录 TWS 时,CPAPI 中建立的预设都会更新以反映 TWS 中的设置。\
在 Web API 中调整的预设不会调整 TWS 中的设置。

#### IB 计算的分配方法

| 预期行为                                                                                       | 比例分配                               | 平仓行为                            |
| ------------------------------------------------------------------------------------------------ | ------------------------------------- | ----------------------------------- |
| 使持仓基于所选方法成比例分布                                                                    | group\_proportional\_allocation=false | group\_auto\_close\_positions=true  |
| 基于所选方法分配股份                                                                              | group\_proportional\_allocation=true  | group\_auto\_close\_positions=true  |
| 基于所选方法分配股份,不优先处理正在平仓的账户                                                     | group\_proportional\_allocation=true  | group\_auto\_close\_positions=false |

#### 用户指定的分配方法

###### 旧称 Allocation Profiles

| 预期行为                                                                                       | 平仓行为                              |
| ------------------------------------------------------------------------------------------------ | ------------------------------------- |
| 基于所选方法分配股份                                                                              | profile\_auto\_close\_positions=true  |
| 基于所选方法分配股份,不优先处理正在平仓的账户                                                     | profile\_auto\_close\_positions=false |
