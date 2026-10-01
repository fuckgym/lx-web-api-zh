# 将免责声明标记为已读

将免责声明消息标记为已读。

`PUT /fyi/disclaimer/{typecode}`

#### 请求对象

###### Path 参数

**typecode:** String。必填\
用于标识特定 FYI 模板类型的代码。\
更多详情请参阅 [Typecode](/v1/endpoints/fy-is-and-notifications/fyi-typecodes) 部分。

#### Python

```python
request_url = f"{baseUrl}/fyi/disclaimer/CT"
json_content = {}
requests.put(url=request_url, json=json_content
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/disclaimer/CT \
--request PUT \
--data ''
```

#### 响应对象

**V:** int。\
返回 1,表示消息已确认。

**T:** int。\
返回完成此次修改所耗的时间(毫秒)。

```
{
  "V": 1,
  "T": 10
}
```
