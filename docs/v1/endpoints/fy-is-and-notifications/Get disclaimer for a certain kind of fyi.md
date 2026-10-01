# 获取特定类型 FYI 的免责声明

根据指定的 typecode 接收额外的免责声明。

`GET /fyi/disclaimer/{typecode}`

#### 请求对象

###### 路径参数

**typecode:** String。必填\
用于表示特定 FYI 模板类型的代码。\
更多详情请参阅 [FYI 类型代码](/web-api/v1/endpoints/fy-is-and-notifications/fyi-typecodes)部分。

#### Python

```python
request_url = f"{baseUrl}/fyi/disclaimer/SM"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/disclaimer/SM\
--request GET
```

#### 响应对象

**FC:** String。\
返回给定免责声明的 Typecode。

**DT:** String。\
返回免责声明消息

```
{
  "FC": "SM",
  "DT": "This communication is provided for information purposes only and is not intended as a recommendation or a solicitation to buy, sell or hold any investment product. Customers are solely responsible for their own trading decisions."
}
```
