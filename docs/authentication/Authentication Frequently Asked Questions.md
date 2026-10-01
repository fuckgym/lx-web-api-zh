# 身份验证常见问题解答

## 如何判断我的经纪会话是否已通过身份验证?

端点 **iserver/auth/status** 可用于确定会话当前的身份验证状态。使用 Web API Gateway 登录后,您可以请求此端点来确定您的会话是否已完全通过身份验证。如果会话已完全通过身份验证,此端点的响应将显示 `"authenticated": true` 。

## 会话的身份验证状态可以保持多久?

会话的身份验证状态最长可保持 24 小时,并在纽约(美国)、瑞士楚格(Zug)或香港时间的午夜重置,具体取决于距离您最近的连接点。

如果大约 6 分钟内没有发送新请求,或未至少每 5 分钟维持一次 [/tickle 端点](/web-api/v1/endpoints/session/ping-the-server),会话将会超时。

IBKR 服务器的日常维护可能导致连接在上述 24 小时之前断开。我们建议在维护时间过后将会话从网关断开并重新启动,以尽量减少可能出现的任何问题。有关服务器重置时间和系统状态更新的信息,请参阅 [System Status](https://www.interactivebrokers.com/en/software/systemStatus.php) 页面。

## 如何防止会话超时?

如果在 5 分钟内未收到任何请求,Web API 经纪会话将会超时。为防止会话超时,应定期调用 **/tickle** 端点。建议大约每分钟调用一次此端点。

如果经纪会话已超时,但会话仍连接到 IBKR 后端,则 **/auth/status** 的响应将返回 'connected':true 和 'authenticated':false。调用 [/iserver/auth/ssodh/init](/web-api/v1/endpoints/session/initialize-brokerage-session) 端点将初始化一个新的经纪会话。
