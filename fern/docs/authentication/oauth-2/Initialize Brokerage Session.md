# 初始化经纪会话

本指南介绍在建立 Bearer 会话令牌之后，如何向 IBKR 的 Client Portal API 发起**经过身份验证的请求**。与前面的 OAuth2 步骤不同，这不是一次令牌签发交换，而是后续所有经过身份验证的 API 调用所使用的模式。此处以 `/iserver/auth/ssodh/init` 端点为例进行演示，该端点用于激活（初始化）经纪会话，这是交易或账户数据类端点可用之前所必需的。

这是 IBKR OAuth2 身份验证流程的最后一步，其前序步骤为：

1. Access Token（访问令牌）
2. Bearer Token / SSO Session（Bearer 令牌 / SSO 会话）
3. Initialize Brokerage Session（初始化经纪会话，即此处记录的经过身份验证的请求）

#### 前提条件

在实现此流程之前，请确保您已具备：

| 要求                       | 描述                                                                                                                              |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| **Bearer Token**           | 从 Bearer Token / SSO Session 步骤获得的会话令牌（`bearerToken`）；以标准 `Bearer` 凭据形式呈现 |
| **Client Portal Base URL** | IBKR 的 Client Portal API 主机（`clientPortalUrl`）                                                                                |

#### 构造端点 URL

经过身份验证的 Client Portal 端点通过 HTTPS 访问，并使用目标端点要求的 HTTP 方法。`/iserver/auth/ssodh/init` 端点特别要求使用 `POST`。

```python
request_url = "https://api.ibkr.com/v1/api/iserver/auth/ssodh/init"
```

#### 组装标准请求头

```python
req_headers = {
    "Host": "api.ibkr.com",
    "User-Agent": "python/3.x",
    "Accept": "*/*",
    "Connection": "keep-alive",
    "Authorization": f"Bearer {bearer_token}",
    "Content-Type": "application/json"
}
```

| 请求头           | 用途                                                                                                                                                                     |
| --------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Host`          | 显式固定为 `api.ibkr.com`；虽然与 URL 的主机重复，但出于防御性考虑仍予以设置，因为它还会被用作会话级别的默认值                                 |
| `User-Agent`    | 标识调用方客户端；**请将其更新为您实际的运行时/环境**，而不要硬编码占位值，以符合 IBKR 的集成指南 |
| `Accept`        | 设为 `*/*`，接受 IBKR 返回的任何响应内容类型                                                                                                              |
| `Connection`    | 设为 `keep-alive`，以便在连续的经过身份验证的调用之间复用底层 TCP 连接，并与持久的 `session` 对象配合使用                       |
| `Authorization` | 设为 `Bearer <bearer_token>` —— 即从 Bearer Token 步骤获得的 SSO 会话令牌，**而不是**前面步骤中的 OAuth2 access token                           |

#### 构造请求体

```python
req_content = {"compete": True, "publish": True}
```

| 字段     | 用途                                                                                                                                                                          |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compete` | 设为 `true` 时，指示 IBKR 接管（竞争）经纪会话，即使该账户已有另一个活跃会话，而不是让初始化失败   |
| `publish` | 设为 `true` 时，指示 IBKR 发布会话状态更新，下游消费者（例如流式 `websocket` 连接）可以订阅这些更新。此字段*必须*设为 true |

#### 执行请求

```python
endpoint = "/iserver/auth/ssodh/init"
req_content = {"compete": True, "publish": True}

requests.post(url=endpoint, headers=req_headers, json=req_content)

```
