# 验证 SSO

验证 SSO 用户的当前会话。

此端点仅对 Client Portal Gateway 和 OAuth 2.0 客户端有效。

#### Abap

```abap
GET /sso/validate
```

#### Python

```python
request_url = f"{baseUrl}/sso/validate"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/sso/validate \
--request GET
```

#### 响应对象:

**USER\_ID:** int。\
内部用户标识符。

**USER\_NAME:** String。\
当前会话登录的用户名。

**RESULT:** bool。\
确认验证是否成功。\
会话验证成功为 true;否则为 false。

**AUTH\_TIME:** int。\
以 epoch 时间返回身份验证的时间。

**SF\_ENABLED:** bool。\
仅供内部使用。

**IS\_FREE\_TRIAL:** bool。\
返回该账户是试用账户还是已注资账户。

**CREDENTIAL:** String。\
返回账户的底层用户名。

**IP:** String。\
仅供内部使用。\
不反映用户的 IP 地址。

**EXPIRES:** int。\
返回距离过期的时间(毫秒)。

**QUALIFIED\_FOR\_MOBILE\_AUTH:** bool。\
返回客户是否需要双因素身份验证。

**LANDING\_APP:** String。\
用于 Client Portal(仅供内部使用)

**IS\_MASTER:** bool。\
返回该账户是主账户(true)还是子账户(false)。

**lastAccessed:** int。\
返回用户上次访问的时间(epoch 时间)。

**loginType:** int。\
返回登录类型。\
1 表示实盘(Live),2 表示模拟(Paper)

**PAPER\_USER\_NAME:** 返回该账户的模拟用户名。

**features:** object。\
返回所支持的功能,例如债券和期权交易。

```
{
  "USER_ID": 123456789,
  "USER_NAME": "user1234",
  "RESULT": true,
  "AUTH_TIME": 1702580846836,
  "SF_ENABLED": false,
  "IS_FREE_TRIAL": false,
  "CREDENTIAL": "user1234",
  "IP": "12.345.678.901",
  "EXPIRES": 415890,
  "QUALIFIED_FOR_MOBILE_AUTH": null,
  "LANDING_APP": "UNIVERSAL",
  "IS_MASTER": false,
  "lastAccessed": 1702581069652,
  "LOGIN_TYPE": 2,
  "PAPER_USER_NAME": "user1234",
  "features": {
    "env": "PROD",
    "wlms": true,
    "realtime": true,
    "bond": true,
    "optionChains": true,
    "calendar": true,
    "newMf": true
  },
  "region": "NJ"
}
```
