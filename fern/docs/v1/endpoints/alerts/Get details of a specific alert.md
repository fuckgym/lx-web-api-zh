# 获取特定警报的详情

通过提供分配的订单 ID 来请求特定警报的详情。

`GET /iserver/account/alert/{{ order_id }}`

###### 路径参数

**order\_id:** *int*\*\*。\*\* 必填\
原始警报创建时返回的警报 ID，或从可用警报列表中获取的 ID。

###### 查询参数

**type:** *String*。必填\
必须始终传 'Q'。

#### Python

```python
request_url = f"{baseUrl}/iserver/account/alert/9876543210?type=Q"
requests.get(url=request_url)
```

#### Abap

```abap
curl \
--url {{baseUrl}}/iserver/account/alert/9876543210?type=Q \
--request GET
```

#### 响应对象

**account:** String。\
请求方的账户 ID。

**order\_id:** int。\
警报的跟踪 ID。可用于修改或删除警报。

**alertName:** String。\
警报的人类可读名称。

**tif:** String。\
对该警报生效的有效期（Time in Force）。

**expire\_time:** String。\
返回 GTD 订单中使用的 UTC 格式日期。

**alert\_active:** int。\
返回警报是处于激活还是禁用状态。

**alert\_repeatable:** int。\
返回警报是否可以多次发送。

**alert\_email:** String。\
返回为 sendMessage 功能指定的电子邮件地址。

**alert\_send\_message:** int。\
返回该警报是否会发送电子邮件。

**alert\_message:** String。\
返回警报触发后将报告的内容正文。

**alert\_show\_popup:** int。\
返回该警报是否会触发 TWS 弹出消息。

**alert\_play\_audio:** int。\
返回该警报是否播放音频。

**order\_status:** String。\
始终返回 "Presubmitted"。

**alert\_triggered:** int。\
返回警报是否已被触发。

**fg\_color:** String。\
始终返回 "#FFFFFF"。可以忽略。

**bg\_color:** String。\
始终返回 "#000000"。可以忽略。

**order\_not\_editable:** bool。\
返回订单是否可编辑。

**itws\_orders\_only:** int。\
返回该警报是否会触发移动通知。

**alert\_mta\_currency:** String。\
返回为 MTA 警报设置的货币。仅对警报类型 8 和 9 有效。

**alert\_mta\_defaults:** String。\
返回当前的 MTA 默认值。

**tool\_id:** int。\
仅用于 MTA 警报的跟踪 ID。对标准警报返回 'null'。

**time\_zone:** String。\
针对特定时间条件返回。

**alert\_default\_type:** int。\
返回为警报设置的默认类型。在 Client Portal 中配置。

**condition\_size:** int。\
返回警报中条件的总数。

**condition\_outside\_rth:** int。\
返回该警报是否会在常规交易时段之外触发。

**conditions:** JSON 对象数组。\
返回所有条件，格式为 \[ \{Condition1}, \{Condition2}, \{…} ]。

**condition\_type:** int。\
返回所设置条件的类型。

**conidex:** String。\
返回格式为 "conid\@exchange" 的完整 conidex。

**contract\_description\_1:** String。\
包含相关描述（如适用）。

**condition\_operator:** String。\
返回为警报设置的条件。

**condition\_trigger\_method:** int。\
返回所设置的 triggerMethod 值。

**condition\_value:** String。\
返回所设置的值。

**condition\_logic\_bind:** String\
返回所设置的 logic\_bind 值。

**condition\_time\_zone:**\
返回所设置的 timeZone 值。

```
{
  "account": "U1234567",
  "order_id": 9876543210,
  "alert_name": "AAPL Price",
  "tif": "GTD",
  "expire_time": "20231231-12:00:00",
  "alert_active": 1,
  "alert_repeatable": 0,
  "alert_email": null,
  "alert_send_message": 0,
  "alert_message": "MTA TEST!",
  "alert_show_popup": 0,
  "alert_play_audio": null,
  "order_status": "Submitted",
  "alert_triggered": false,
  "fg_color": "#FFFFFF",
  "bg_color": "#0000CC",
  "order_not_editable": false,
  "itws_orders_only": 0,
  "alert_mta_currency": null,
  "alert_mta_defaults": null,
  "tool_id": null,
  "time_zone": null,
  "alert_default_type": null,
  "condition_size": 1,
  "condition_outside_rth": 0,
  "conditions": [
    {
      "condition_type": 1,
      "conidex": "265598@SMART",
      "contract_description_1": "AAPL",
      "condition_operator": "<=",
      "condition_trigger_method": "0",
      "condition_value": "183.34",
      "condition_logic_bind": "n",
      "condition_time_zone": null
    }
  ]
}
```
