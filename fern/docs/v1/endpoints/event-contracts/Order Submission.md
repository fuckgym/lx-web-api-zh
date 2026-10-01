# 订单提交

通过 Web API 提交事件合约订单的方式与[提交任何其他品种的订单](/web-api/v1/endpoints/orders/place-order)类似。

但必须注意 CME Group 产品与 ForecastEx 品种之间运作机制的差异:

* CME Group 品种可以买入和卖出,其运作方式与普通的期货期权相同。
* ForecastEx 品种不能卖出,只能买入。要退出或减少持仓,必须买入方向相反的事件合约,IB 会自动将相反的持仓相互对冲。
* 两种情况下均不允许卖空。

## ForecastEx

在 ForecastEx 交易的情境下,开仓与平仓都必须通过买入另一侧(right)来完成。在本场景中,我们通过买入一月合约的 YES 一侧来建立持仓。第一个请求负载对此进行了演示。

不过,如果在买入 YES 之后想要平仓,我们会使用第二个请求负载来买入 NO 一侧。

#### Python

```python
import requests

url = f"{baseUrl}/iserver/account/{accountId}/orders"

// Opening Order (BUY to open 1 YES contract) 
payload = {
  "orders": [
    {
      "side": "BUY",
      "quantity": 1,
      "conid": 773659700,             //YES contract expiring JAN 04 '27
      "orderType": "MKT",
      "listingExchange": "FORECASTEX",
      "tif": "DAY"
    }
  ]
}

// Closing Order (BUY to close 1 NO contract)
payload = {
  "orders": [
    {
      "side": "BUY",
      "quantity": 1,
      "conid": 773659707,             //NO contract expiring JAN 04 '27
      "orderType": "MKT",
      "listingExchange": "FORECASTEX",
      "tif": "DAY"
    }
  ]
}

response = requests.post(url=url, data=payload)
print(response.text)
```

#### Python

```python
curl \
--url {baseUrl}/iserver/account/{accountId}/orders \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "orders": [
    {
      "side": "BUY",
      "quantity": 1,
      "conid": 773659700,
      "orderType": "MKT",
      "listingExchange": "FORECASTEX",
      "tif": "DAY"
    }
  ]
}'
```

## CME Group

对于在 CME 上市的合约,我们只需将 `side` 值从 BUY 改为 SELL 即可平掉持仓。

#### Python

```python
import requests

url = f"{baseUrl}/iserver/account/{accountId}/orders"

// Closing Order (BUY to close 1 NO contract)
payload = {
  "orders": [
    {
      "side": "BUY",
      "quantity": 1,
      "conid": 861917649,       // US Payroll Employment 
      "orderType": "MKT",
      "listingExchange": "CME",
      "tif": "DAY"
    }
  ]
}

response = requests.post(url=url, data=payload)
print(response.text)
```

#### Python

```python
curl \
--url {baseUrl}/iserver/account/{accountId}/orders \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "orders": [
    {
      "side": "BUY",
      "quantity": 1,
      "conid": 861917649,       //US Payroll Employment
      "orderType": "MKT",
      "listingExchange": "CME",
      "tif": "DAY"
    }
  ]
}'
```
