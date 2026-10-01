# 删除分配组

移除一个已存在的分配组。该分配组将不再可访问。

`POST /iserver/account/allocation/group/delete`

#### 请求对象

###### Body 参数

**name:** String。必填\
用于指代您的分配组的名称。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/allocation/group/delete"
json_content = {
  "name":"Group_1_NetLiq",
}
requests.post(url=request_url, json=json_content
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/allocation/group/delete \
--request POST
--header 'Content-Type:application/json' \
--data '{
  "name":"Group_1_NetLiq",
}'
```

#### 响应对象

**success:** bool。\
确认分配组已正确设置。

```
{
  "success": true
}
```
