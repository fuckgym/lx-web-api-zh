# 请求盈亏

#### 盈亏请求

###### 主题:

**spl**\
将用户订阅到实时盈亏信息。

###### 参数:

不要传递任何参数

```
spl+{}
```

#### 订单更新响应

**topic:** String。\
返回给定请求的主题。

**args:** Object。\
返回包含 pnl 数据的对象。

**acctId.Core:** Object。\
指定所请求数据的账户。

**rowType:** int。\
该请求的行值。随着账户数量增加而递增。

**dpl:** float。\
每日盈亏值。

**nl:** float。\
账户中的净清算价值(Net Liquidity)。

**upl:** float。\
当日未实现盈亏。

**uel:** float。\
账户中未经四舍五入的超额流动性(Excess Liquidity)。

**mv:** float\
账户中持有股票的市值。

```
{ 
   "topic": "spl" , 
    "args": { 
        "acctId.Core": { 
            "rowType":rowType, 
            "dpl":dpl, 
            "nl":nl,
            "upl":upl,
            "uel": uel,
            "mv": mv
        }
    }
}
```
