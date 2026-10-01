# 获取推送选项

用于向电子邮件和其他设备发送 FYI 通知的选项

`GET /fyi/deliveryoptions`

#### 请求对象

不应发送任何参数或正文内容。

#### Python

```python
request_url = f"{baseUrl}/fyi/deliveryoptions"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/fyi/deliveryoptions \
--request GET
```

#### 响应对象

**M:** int。\
电子邮件选项是否已启用。\
值格式:0:电子邮件已禁用;1:电子邮件已启用。

**E:** 数组。\
返回一个包含设备信息的数组。\
\[\{\
**NM:** String。\
返回人类可读的设备名称。

**I:** String。\
返回设备标识符。

**UI:** String。\
返回设备的唯一 ID。

**A:** String。\
设备是否已启用。\
值格式:0:已禁用;1:已启用。\
}]

```
{
  "E": [
    {
      "NM": "iPhone",
      "I": "apn://mtws@1234E5E67D8A9012EC3E45D6E7D89A01F2345CDBBB678B9BE0FB12345AF6D789",
      "UI": "apn://mtws@1234E5E67D8A9012EC3E45D6E7D89A01F2345CDBBB678B9BE0FB12345AF6D789",
      "A": 1
    }
  ],
  "M": 1
}
```
