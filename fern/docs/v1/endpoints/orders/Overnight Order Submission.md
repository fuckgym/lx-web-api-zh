# 隔夜订单提交

通过 WebAPI 进行交易时,用户既可以向[隔夜市场](https://www.interactivebrokers.com/en/trading/us-overnight-trading.php)提交 OVERNIGHT 专属订单,也可以提交 OVERNIGHT+DAY 订单。这是通过在[下单](/v1/endpoints/orders/place-order)时提交相应的订单有效期(Time-In-Force)值来实现的。

#### Overnight

隔夜(Overnight)订单使用 "OVT" 有效期值提交。

```
{ "tif": "OVT" }
```

#### Overnight+DAY

Overnight+DAY 订单使用 "OND" 有效期值提交。

```
{ "tif": "OND" }
```
