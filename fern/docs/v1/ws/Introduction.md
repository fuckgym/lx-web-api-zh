# 简介

Websocket 主题暴露的数据与 HTTP 端点传递的底层数据相同。需要经纪会话(brokerage session)的功能(即 /iserver URI 之后的全部功能)在通过 websocket 访问时同样需要经纪会话。在尝试使用 websocket 的这些功能之前,请确保您已拥有处于活动状态的经纪会话。有关 Web API 入门的信息,请参阅[身份验证](/authentication/introduction)部分。

需要经纪会话的 websocket 主题:smd(实时市场数据)、smh(历史市场数据)、sbd(实时价格阶梯数据)、sor(订单更新)、str(成交)、act(主动推送的账户属性信息)、sts(主动推送的经纪会话身份验证状态)、blt(主动推送的公告)、ntf(主动推送的通知)。

不需要经纪会话的 websocket 主题:spl(盈亏更新)、ssd(账户摘要更新)、sld(账户账目更新)、system(主动推送的与连接相关的消息)。

websocket 的 URL 为:**wss\://localhost:5000/v1/api/ws**
