# 启用/停用设备选项

选择启用还是停用某个特定设备。

`POST /fyi/deliveryoptions/device`

#### 请求对象

###### 请求体参数

**devicename:** 字符串。必填\
设备的易读名称。

**deviceId:** 字符串。必填\
特定设备的 ID 代码。

**uiName:** 字符串。必填\
用于界面系统的标题。

**enabled:** 布尔值。必填\
指定该设备应启用还是停用。

#### Python

```python
request_url = f"{baseUrl}/fyi/deliveryoptions/device"
json_content = {
    "deviceName": "iPhone",
    "deviceId": "apn://mtws@1234E5E67D8A9012EC3E45D6E7D89A01F2345CDBBB678B9BE0FB12345AF6D789",
    "uiName": "apn://mtws@1234E5E67D8A9012EC3E45D6E7D89A01F2345CDBBB678B9BE0FB12345AF6D789",
    "enabled": True
}
requests.post(url=request_url, json=json_content)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/deliveryoptions/device \
--request POST \
--data '{
    "deviceName": "iPhone",
    "deviceId": "apn://mtws@1234E5E67D8A9012EC3E45D6E7D89A01F2345CDBBB678B9BE0FB12345AF6D789",
    "uiName": "apn://mtws@1234E5E67D8A9012EC3E45D6E7D89A01F2345CDBBB678B9BE0FB12345AF6D789",
    "enabled": True
}'
```

#### 响应对象

**V:** 整数。\
返回 1,表示消息已被确认。

**T:** 整数。\
返回完成此次编辑所耗费的时间(毫秒)。

```
{
  "V": 1,
  "T": 10
}
```
