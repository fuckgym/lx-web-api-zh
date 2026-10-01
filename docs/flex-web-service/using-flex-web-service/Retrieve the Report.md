# 获取报告

接下来,您将向 [/GetStatement endpoint](/docs/web-api/api-reference/get-statement) 发起 GET 请求,同样传入您的访问令牌。不过,此时必须将上一个端点获得的参考代码(ReferenceCode)作为 `q` 查询参数传入:

`https://ndcdyn.interactivebrokers.com/AccountManagement/FlexWebService/GetStatement?t={AccessToken}&q={ReferenceCode}&v=3`

根据请求的规模,您可能需要在 [/SendRequest endpoint](/docs/web-api/api-reference/send-request) 调用与 [/GetStatement endpoint](/docs/web-api/api-reference/get-statement) 调用之间等待更长的时间,以便完整报告生成完毕。

请注意,给定的 Flex Query 模板可以随时间推移生成多份报告,每份报告都填充生成时刻的数据,因此需要使用该 ReferenceCode 标识符来检索特定的实例,即推测为紧邻之前生成的那一份。

返回的值将使用 `"Content-Type": "text/plain;charset=UTF-8"` 构建。
