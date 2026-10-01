# 获取通知列表

获取可用通知的列表。

`GET /fyi/notifications`

#### 请求对象

###### 查询参数

**max:** 字符串。\
指定要接收的通知数量上限。\
最多可请求 10 条通知。

#### Python

```python
request_url = f"{baseUrl}/fyi/notifications?max=10" 
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/notifications?max=10 \ 
--request GET
```

#### 响应对象

**D:** 字符串。\
通知日期

**ID:** 字符串。\
引用该通知的唯一标识。

**FC:** 字符串。\
FYI 代码,可用于在设置中查明相应免责声明是否已被接受

**MD:** 字符串。\
通知的内容。

**MS:** 字符串。\
通知的标题。

**R:** 字符串。\
返回该通知是否已被阅读。\
值格式:0:禁用;1:启用。

```
[{
  "R": 0,
  "D": "1702469440.0",
  "MS": "IBKR FYI: Option Expiration Notification",
  "MD": "One or more option contracts in your portfolio are set to expire shortly.    
 - QQQ 15DEC2023 385 P in Account(Qty): U****7890(6)   
 - QQQ 15DEC2023 387 P in Account(Qty): D****0685(-6)   
    
Please use the Option Rollover tool to roll existing contracts into contracts with an expiration, strike and price condition of your preference.",
  "ID": "2023121370119463",
  "HT": 0,
  "FC": "OE"
}]
```
