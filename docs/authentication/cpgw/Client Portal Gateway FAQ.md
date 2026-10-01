# Client Portal Gateway 常见问题

## 为什么我的浏览器显示连接不安全?为什么我的请求因 SSL 证书无效而被拒绝?

在访问 Client Portal Gateway 登录页面时,您可能会看到浏览器发出的关于缺少有效 SSL 证书的警告。这属于正常现象。API 网关并未内置有效证书。虽然并非必需,但用户可以自行签署一个新证书用于 localhost 连接。

**注意:** 不安全的连接仅存在于用户与其自身 localhost 之间。只有本地计算机上的连接是不安全的,而从 localhost 发送到 Interactive Brokers 的请求将保持安全连接。

## 我可以自动化 Client Portal Gateway 的身份验证过程吗?

Interactive Brokers 不支持 Client Portal Gateway 的自动化身份验证过程。

## 使用 Client Portal Gateway 时,我需要多久通过浏览器登录一次?

客户必须每天通过 Client Portal Gateway 重新进行身份验证。

## 运行 Client Portal Gateway 时,为什么收到 "Server listen failed Address already in use"?

出现此错误是因为另一个进程正在占用监听端口。
Mac 设备通常有其他软件在端口 5000 上运行,因此建议[更改 Client Portal Gateway 的默认端口](/web-api/authentication/cpgw/how-to-modify-the-client-portal-gateway-port)。
