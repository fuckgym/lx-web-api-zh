# 组合/价差订单

组合(combo)或价差(spread)订单可以通过上文描述的同一个 `/iserver/account/{accountId}/orders` 端点提交。对于组合订单,我们必须在请求体中包含 `conidex` 字段而不是 `conid`。`conidex` 字段是组合订单构成的字符串表示。

组合订单的 `conidex` 值采用如下形式:`{spread_conid};;;{leg_conid1}/{ratio},{leg_conid2}/{ratio}`

`spread_conid` 值是与组合各腿(leg)所交易货币相关联的唯一标识符。对于美股组合,`spread_conid` 值就是 USD 的 conid 整数本身。对于以所有其他货币计的组合订单,`spread_conid` 采用 `spread_conid@exchange` 的形式。

*可用货币价差 `conids`:*

货币

价差 ConID

AUD

61227077

CAD

61227082

CHF

61227087

CNH

136000441

GBP

58666491

HKD

61227072

INR

136000444

JPY

61227069

KRW

136000424

MXN

136000449

SEK

136000429

SGD

426116555

USD

28812380

`spread_conid` 后跟三个分号,然后是第一条腿的 `leg_conid`。接着是一个正斜杠 `/`,再后跟前一条腿的*比率(ratio)*。

比率值传达两个信息。第一个是该腿的方向,买入还是卖出,由比率值的符号(正或负)表示。正比率整数表示买入(Buy),负比率整数表示卖出(Sell)。第二个信息是该腿在组合中的相对规模,由整数本身的绝对值表示。为整体组合工具下单时,该绝对值充当乘数。

其余各腿以逗号分隔,并遵循与上述相同的模式:`{leg_conid}/{ratio}`。

请注意,单个组合订单中允许的腿数因交易所而异。

组合订单的定价是将各腿价格求和,并考虑每条腿的方向:`Combo order price = (Price_Leg1 * Ratio_Leg1) + (Price_Leg2 * Ratio_Leg2) + ... + (Cost_LegN * Ratio_LegN)`
