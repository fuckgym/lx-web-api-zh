# 获取订阅列表

返回当前可用的通知订阅选项。

`GET /fyi/settings`

#### 请求对象

不应发送任何参数或正文内容。

#### Python

```python
request_url = f"{baseUrl}/fyi/settings"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/settings \
--request GET
```

#### 响应对象

**A:** int。\
返回该订阅是否可被修改。\
仅在该订阅可被修改时返回。\
修改方法请参见 /fyi/settings/\{typecode}。

**FC:** String。\
用于启用或禁用通知的 FYI 代码。

**H:** int。\
表示该通知是否已被阅读的声明。\
值格式:0:未读;1:已读

**FD:** String。\
返回该主题的详细描述。

**FN:** String。\
返回该通知的人类可读标题。

```
[
  {
    "FC": "M8",
    "H": 0,
    "A": 1,
    "FD": "Notify me when I establish position subject to US dividend tax withholding 871(m) rules.",
    "FN": "871(m) Trades"
  },
  {
    "FC": "AA",
    "H": 0,
    "A": 1,
    "FD": "Notifications related to account activity such as funding, application, trading and market data permission status",
    "FN": "Account Activity"
  },
  {...}
]
```
