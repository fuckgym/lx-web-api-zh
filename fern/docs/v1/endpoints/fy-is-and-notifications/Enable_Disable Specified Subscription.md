# 启用/禁用指定订阅

配置您想要启用/禁用的 typecode。

`POST /fyi/settings/{{ typecode }}`

#### 请求对象

###### 路径参数

**typecode:** String。必填\
用于表示特定 FYI 模板类型的代码。\
更多详情请参见 [Typecode](/v1/endpoints/fy-is-and-notifications/fyi-typecodes) 部分。

###### 正文参数

**enabled:** bool。必填\
启用或禁用该订阅。\
可用 typecode 请参见 [FYI Typecodes](/v1/endpoints/fy-is-and-notifications/fyi-typecodes)\
值格式:true:启用;false:禁用

#### Python

```python
request_url = f"{baseUrl}/fyi/settings/SM"
json_content ={"enabled":true}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/settings/SM \
--request POST \
--data '{"enabled":true}'
```

#### 响应对象

**V:** int。\
返回 1 表示消息已确认。

**T:** int。\
返回完成此次编辑所花费的时间(毫秒)。

```
{
  "V": 1,
  "T": 10
}
```
