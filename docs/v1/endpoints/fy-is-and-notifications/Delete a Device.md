# 删除设备

从我们保存的通知设备列表中删除特定设备。

`DELETE /fyi/deliveryoptions/{{ deviceId }}`

#### 请求对象

###### Path 参数

**deviceId:** String。必填\
要删除的设备的标识符,该设备位于 IB 保存的列表中。\
可从 [/fyi/deliveryoptions](/web-api/v1/endpoints/fy-is-and-notifications/get-delivery-options) 获取。

#### Python

```python
request_url = f"{baseUrl}/fyi/deliveryoptions/1" 
requests.delete(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/deliveryoptions/1 \ 
--request DELETE
```

#### 响应对象

不会返回任何响应消息。您只会收到一个带有 200 OK 状态码的空字符串,表示账户已成功删除。
