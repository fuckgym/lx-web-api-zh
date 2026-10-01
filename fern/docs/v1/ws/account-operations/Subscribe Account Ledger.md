# 订阅账户账簿

#### 订阅账户账簿主题

###### 主题：

**sld**\
订阅指定账户的账户账簿（account ledger）消息流，内容按货币排序。

###### 主题目标：

**accountId:** 必填。\
必须传入要订阅其账簿数据的账户 ID。

###### 参数：

\{\
**keys:** 字符串数组。\
传入特定的账簿货币键，以仅接收这些货币的数据消息。打开订阅时不传任何命名键，则会传送包含所选账户中所有货币值的账簿消息。\
示例值："LedgerListEUR"、"LedgerListUSD"、"LedgerListBASE"（对应账户的基础货币）

**fields:** 字符串数组。\
传入特定的账簿字段名称，以仅接收 keys 参数中所指定货币的这些数据点。打开订阅时不传任何命名字段，则会传送指定货币的所有可用数据点。\
示例值："cashBalance"、"exchangeRate"\
}

```
sld+DU1234567+{
    "keys":["LedgerListBASE","LedgerListEUR"],
    "fields":["cashBalance","exchangeRate"]
}
```

#### 账户账簿主题消息

每隔 10 秒发布一条新消息，直到 sld 主题被取消订阅。仅当某个货币在上一个时间间隔内发生了变化时，消息才会传送该货币的字段数据。如果未发生变化，sld 消息中该货币的条目将为"空白"，仅包含货币键和时间戳。\
注意，JSON 数字类型的所有货币值都会在小数点后带小数部分；如果数值足够大，还可能在 E 后附带指数部分。

\{\
**result:** JSON 对象数组，每个对象包含账户中一种货币的键值对集合。\
\[\
\{\
**key:** String。\
格式为 "LedgerListXXX" 的货币标识符字符串，其中 XXX 是所请求账户中某种货币的三字符货币代码，或 "LedgerListBASE"，对应账户的基础货币。\
始终返回。

**timestamp:** Number（仅整数）。\
反映该货币的值集被获取时的时间戳。\
始终返回。

**acctCode:** String。\
包含随附数据所述货币头寸的账户。

**cashbalance:** Number。\
**cashBalanceFXSegment:** Number。\
**commodityMarketValue:** Number。\
**corporateBondsMarketValue:** Number。\
**dividends:** Number。\
**exchangeRate:** Number。\
**funds:** Number。\
**marketValue:** Number。\
**optionMarketValue:** Number。\
**interest:** Number。\
**issueOptionsMarketValue:** Number。\
**moneyFunds:** Number。\
**netLiquidationValue:** Number。\
**realizedPnl:** Number。\
**unrealizedPnl:** Number。\
**secondKey:** String。\
**settledCash:** Number。\
**stockMarketValue:** Number。\
**tBillsMarketValue:** Number。\
**tBondsMarketValue:** Number。\
**warrantsMarketValue:** Number。

**severity:** Number（仅整数）。\
仅限内部使用。\
},\
…\
]\
}

```
{
  "result": [
    {
      "acctCode": "DU1234567",
      "cashbalance": 2.0201311791131118E8,
      "cashBalanceFXSegment": 0.0,
      "commodityMarketValue": 0.0,
      "corporateBondsMarketValue": 0.0,
      "key": "LedgerListBASE",
      "dividends": 0.0,
      "exchangeRate": 1.0,
      "funds": 0.0,
      "marketValue": 0.0,
      "optionMarketValue": 0.0,
      "interest": 396687.69214935537,
      "issueOptionsMarketValue": 0.0,
      "moneyFunds": 0.0,
      "netLiquidationValue": 2.0280151634374067E8,
      "realizedPnl": 0.0,
      "unrealizedPnl": 249013.5397937378,
      "secondKey": "BASE",
      "settledCash": 2.0201311791131118E8,
      "severity": 0,
      "stockMarketValue": 391710.74028015137,
      "tBillsMarketValue": 0.0,
      "tBondsMarketValue": 0.0,
      "warrantsMarketValue": 0.0,
      "timestamp": 1700248325
    },
    {
      "key": "LedgerListCAD",
      "timestamp": 1700248325
    },
    {
      "key": "LedgerListUSD",
      "timestamp": 1700248325
    },
    {
      "key": "LedgerListEUR",
      "timestamp": 1700248325
    },
    {
      "key": "LedgerListCHF",
      "timestamp": 1700248325
    }
  ],
  "topic": "sld+DU1234567"
}
```
