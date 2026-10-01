# FYI 通知

#### 未读 FYI

要获取未读通知/免责声明的数量,应调用以下 API `GET /fyi/unreadnumber`,它返回一个整数,可用于向用户展示以使其知晓。例如,假设我们有 `1` 条未读、总计 `3` 条通知/免责声明。

`GET https://api.ibkr.com/v1/api/fyi/unreadnumber`

响应:

```{
  "BN":  1
}
```

#### 所有近期 FYI

可以通过调用 `GET /fyi/notifications` 获取所有近期通知的列表。响应中的 `R` 表示该通知是否已读。

响应还包含标题(`MS`)、通知代码/"FYI 代码"(`FC`)、唯一标识符(`ID`)以及详细的 HTML 格式消息(`MD`)。

`GET https://api.ibkr.com/v1/api/fyi/notifications`

返回:

```[
  {
    "R": 0,
    "D": "1710847062.0",
    "MS": "FYI: Changes in Analyst Ratings",
    "MD": "<html>Some investors use analysts ratings to stay informed about their investments. Analysts have changed their ratings for one or more companies in which you hold positions.    <br />The following summary displays the affected companies, the current number of analysts by rating category and, in parentheses, the recent change in the number of analysts rating the company within each rating category.  <br /> - JWN@NYSE: Buy: 1(0), Outperform: 1(0), Hold: 12(-1), Underperform: 5(0), Sell: 0(0). Held in: D****000 <br /> - RF@NYSE: Buy: 4(+1), Outperform: 5(0), Hold: 17(-1), Underperform: 1(0), Sell: 0(0). Held in: D****000 <br /> <br />   Note: Current ratings are from Reuters and may not reflect all rating changes from other sources such as Street Insider and Briefing.</html>",
    "ID": "2024031947509444",
    "HT": 0,
    "FC": "PF"
  },
...
]
```

#### 将 FYI 标记为已读

FYI 通知可以通过 `PUT /fyi/notifications/{notificationID}` 标记为已读。

请注意,同一类别下可以有多条通知(按 `fyi code` 分组)。

#### 管理 FYI 订阅

`GET https://api.ibkr.com/v1/api/fyi/settings`

```[
  {
    "FC": "PF",
    "H": 0,
    "A": 1,
    "FD": "Notify me of recent activity affecting my portfolio holdings.",
    "FN": "Portfolio FYIs"
  },
  {
    "FC": "PT",
    "H": 0,
    "A": 1,
    "FD": "Notify me of potential account configuration changes needed and useful features based on my position transfers.",
    "FN": "Position Transfer"
  } 
]
```

#### FYI 免责声明

只有在用户接受相应免责声明后,才应向用户显示通知的详细消息。

使用 `GET /fyi/settings` 查看哪些免责声明已接受、哪些未接受。`H` 表示免责声明的接受状态。有关 fyi 设置的更多内容将在下文介绍。

```[
  {
    "FC": "PF",
    "H": 0,
    "A": 1,
    "FD": "Notify me of recent activity affecting my portfolio holdings.",
    "FN": "Portfolio FYIs"
  },
  {
    "FC": "PT",
    "H": 0,
    "A": 1,
    "FD": "Notify me of potential account configuration changes needed and useful features based on my position transfers.",
    "FN": "Position Transfer"
  } 
]
```

接受免责声明的补充文本可通过调用 `GET /fyi/disclaimer/{typecode}` 获取。

```{
  "FC": "PF",
  "DT": "This communication is provided for information purposes only and is not intended as a recommendation or a solicitation to buy, sell or hold any investment product. Customers are solely responsible for their own trading decisions."
}
```

然后调用 `PUT /fyi/disclaimer/{typecode}` 接受免责声明。一旦免责声明被确认,不应在同一类型的通知中再次强制显示。
