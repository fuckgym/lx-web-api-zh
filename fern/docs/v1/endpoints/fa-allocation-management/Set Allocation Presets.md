# 设置分配预设

为特定事件设置分配组的预设行为。

`POST /iserver/account/allocation/presets`

#### 请求对象

###### 请求体参数

**default\_method\_for\_all:** 字符串。必填\
为所有未设置值的分配组设置要使用的默认分配方法。

**group\_auto\_close\_positions:** 布尔值。必填

**profiles\_auto\_close\_positions:** 布尔值。必填

**strict\_credit\_check:** 布尔值。必填

**group\_proportional\_allocation:** 布尔值。必填

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/presets" 
json_content = {
  "default_method_for_all": "E",
  "group_auto_close_positions": true,
  "profiles_auto_close_positions": true,
  "strict_credit_check": false,
  "group_proportional_allocation": false
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/presets \
--request POST \
--header 'Content-Type:application/json' \
--data '{
  "default_method_for_all": "E",
  "group_auto_close_positions": true,
  "profiles_auto_close_positions": true,
  "strict_credit_check": false,
  "group_proportional_allocation": false
}'
```

#### 响应对象

**success:** 布尔值。\
确认预设已正确设置。

```
{
  "success": true
}
```
