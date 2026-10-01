# 货币汇率

获取指定货币对的汇率。

`GET /iserver/exchangerate`

#### 请求对象

###### Query 参数

**Source:** String。必填\
指定要请求数据的基准货币。\
有效结构:"AUD"

**Target:** String。必填\
指定要请求数据的报价货币。\
有效结构:"USD"

#### Python

```python
request_url = f"{baseUrl}/iserver/exchangerate?target=AUD&source=USD"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/exchangerate?target=AUD&source=USD \
--request GET
```

#### 响应对象

**rate:** float。\
返回该货币对的汇率。

```
{
    "rate": 0.67005002
}
```
