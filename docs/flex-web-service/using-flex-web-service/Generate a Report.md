# 生成报告

首先，你将向 [/SendRequest 端点](/docs/web-api/api-reference/send-request) 发起 GET 请求，并将你的访问令牌与所需 Flex Query 模板的查询 ID 作为查询参数传入：

`https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/SendRequest?t={CurrentToken}&q={QueryID}&v=3`

**重要提示：** [/SendRequest 端点](/docs/web-api/api-reference/send-request) 有 1 秒 1 次请求的限速限制。每分钟最多可提交 10 次请求。

```
requestBase = "https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService"
token = 528191644107458877539776
queryId = 800969
flex_version = 3

## Optional values:
# period = "5"             # This would retrieve 5 days of data.
# fromDate = "20260801"    # Starting date of the request range
# toDate = "20260807"      # Ending date of the request range
```

默认情况下，请求将使用 Client Portal 中预定义的日期范围。不过，可以声明 `q` 参数来检索今天之前的数据，或者可以请求 `fd` 和 `td` 参数以指定特定的日期范围。

```
send_path = "/SendRequest"
send_params = {
    "t":token, 
    "q":queryId, 
    "v":flex_version

    # "p": period             # Period cannot be used with date range.

    # "fd": fromDate,         # Must be submitted with `td`.
    # "td": toDate            # Must be submitted with `fd`.
}

flexReq = requests.get(url=requestBase+send_slug, params=send_params)
```

成功的请求将返回 `<Status>Success</Status>`，并附带一个 `<ReferenceCode>`，用于在后续请求中标识所生成的报告。应忽略响应体中返回的 `<url>`。

失败的请求将返回 `<Status>Fail</Status>`，并附带一个 `<ErrorMessage>` 值，说明失败的原因。
