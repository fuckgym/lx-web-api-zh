# Bearer Token（持有者令牌）

本指南介绍为 Interactive Brokers（IBKR）Web API 定制的 OAuth 2.0 流程中 Bearer Token 步骤的实现。此步骤在 IBKR 的 `sso-sessions` 端点，将上一步获得的 OAuth2 **访问令牌**（access token）兑换为**网关会话令牌**（在响应中称为 `access_token`，但功能上是一个 SSO 会话凭据）。与访问令牌步骤一样，身份验证通过使用 **RSA-SHA256** 签名的 **JWT 客户端断言**来传递，但其声明集、传输方式和请求头结构与上一步有明显差异。

这是 IBKR 流程中两个 OAuth 2.0 步骤中的第二步：

1. 访问令牌（Access Token）（前提条件——生成此处用作 Bearer 凭据的 `access_token`）
2. Bearer Token / SSO 会话建立（本文档所述）

#### 前提条件

在实现此流程之前，请确保你已具备：

| 要求                              | 说明                                                                                                                                 |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| **访问令牌（Access Token）**      | 从访问令牌步骤获得的 OAuth2 访问令牌；在 `Authorization` 请求头中用作 `Bearer` 凭据                                                  |
| **Client ID**（`clientId`）       | 在注册 API 应用时由 IBKR 颁发；在 JWT 声明中用作 `iss`                                                                               |
| **Client Key ID**（`clientKeyId`）| 标识应使用哪个已注册的公钥来验证 JWT 签名；在 JWT 请求头中作为 `kid` 发送                                                            |
| **RSA 私钥**                      | 用于对 JWT 签名（`jwtPrivateKey`）；与访问令牌步骤中使用的密钥相同                                                                   |
| **Credential**                    | 用于验证会话的账户的用户名；包含在 JWT 声明中                                                                                        |
| **客户端 IP 地址**                | 发起请求的客户端的公网 IP；作为声明必需。参考实现通过调用 `api.ipify.org` 自动检测该地址                                             |
| **网关基础 URL**                  | IBKR 的 API 网关主机（`gatewayUrl`）                                                                                                 |
| **依赖项**                        | `pycryptodome`（提供 `RSA`、`SHA256`、`PKCS1_v1_5`）、`requests`，以及标准库 `base64`、`json`、`time`、`math`                        |

#### 构造端点 URL

Bearer Token（SSO 会话）端点始终通过 HTTPS 使用 `POST` 访问。

```python
url = f'{gatewayUrl}/api/v1/sso-sessions'
```

#### 组装 JWT 请求头与声明

```python
now = math.floor(time.time())
header = {
    'alg': 'RS256',
    'typ': 'JWT',
    'kid': f'{clientKeyId}'
}
claims = {
    'ip': ip,
    'credential': f'{credential}',
    'iss': f'{clientId}',
    'exp': now + 86400,
    'iat': now
}
```

| 字段         | 用途                                                                                                                                                      |
| ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alg`        | 必须为 `RS256`，与访问令牌步骤一致                                                                                                                        |
| `typ`        | 标准 JWT 类型请求头，始终为 `"JWT"`                                                                                                                       |
| `kid`        | 标识 IBKR 应使用哪个已注册公钥（按 `clientKeyId`）来验证签名                                                                                              |
| `ip`         | 客户端当前的公网 IP 地址；IBKR 会将其与发起请求进行比对验证，因此必须准确且为最新                                                                         |
| `credential` | 为其建立会话的用户名                                                                                                                                      |
| `iss`        | 设置为你的 `clientId`——注意与访问令牌步骤不同，此步骤的断言中**没有 `sub` 或 `aud` 声明**                                                                 |
| `exp`        | 过期时间设置为 24 小时（`now + 86400`）——此断言授权的会话比请求访问令牌时使用的短效断言存活时间更长                                                       |
| `iat`        | 签发时间，在此分支中设置为当前时间，不作回拨                                                                                                              |

**实现说明：** 此声明集由访问令牌步骤中所记录的同一个 `compute_client_assertion()` 辅助函数生成，并按目标 `url` 分支。构建此断言时，请确认你的实现路由到 `{gatewayUrl}/api/v1/sso-sessions` 分支，而不是令牌端点分支。

#### 对请求头与声明进行 Base64URL 编码

```python
json_header = json.dumps(header, separators=(',', ':')).encode()
encoded_header = base64_encode(json_header)
json_claims = json.dumps(claims, separators=(',', ':')).encode()
encoded_claims = base64_encode(json_claims)
payload = f"{encoded_header}.{encoded_claims}"
```

此处复用了与访问令牌步骤相同的 `base64_encode()` 辅助函数和 base64url 编码规则（去除填充、替换 `-`/`_`）——详情参见该指南。此处的一致性很重要：步骤之间任何 JSON 序列化或编码上的偏差都会产生一个结构上有效但无法验证的 JWS。

#### 使用 RSA-SHA256 对负载签名

```python
md = SHA256.new(payload.encode())
signer = PKCS1_v1_5.new(jwtPrivateKey)
signature = signer.sign(md)
encoded_signature = base64_encode(signature)
```

**流程：**

1. 将 `payload`（`encoded_header.encoded_claims`）编码为 UTF-8 字节。
2. 计算 SHA-256 摘要。
3. 使用整个流程中一直使用的同一把 RSA 私钥，以 **PKCS#1 v1.5** 填充对该摘要签名。
4. 对原始签名字节进行 Base64URL 编码。

#### 组装客户端断言（JWS）

```python
assertion = payload + "." + encoded_signature
```

与访问令牌步骤一样，这将生成完整的紧凑 JWS：

```
base64url(header) . base64url(claims) . base64url(signature)
```

与访问令牌步骤不同，此断言**不会**被包裹在 `client_assertion` 表单字段中——而是作为**原始请求体**传输，如下所示。

#### 构造 Authorization 请求头与请求体

```python
headers = {
    "Authorization": "Bearer " + access_token,
    "Content-Type": "application/jwt"
}
signed_request = assertion
```

| 字段            | 用途                                                                                                                                                                          |
| --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Authorization` | 设置为 `Bearer <access_token>`——即上一步获取的 OAuth2 访问令牌，以标准 bearer 凭据形式出示                                                                                    |
| `Content-Type`  | 设置为 `application/jwt`，**而非** `application/x-www-form-urlencoded`——此端点期望以原始紧凑 JWS 作为整个请求体，不包含任何外围表单字段                                       |

**这在结构上与访问令牌步骤不同**：后者将断言作为表单编码体中的一个字段传递，并且完全不需要 `Authorization` 请求头。而此处需要同时提供 `Authorization` 请求头**和** JWT 请求体——将 bearer 令牌验证与签名断言负载结合在一起。

#### 执行请求并获取会话 access\_token

```python
bearer_request = requests.post(url=url, headers=headers, data=signed_request)
print(web_header_print(bearer_request))

if bearer_request.status_code == 200:
    return bearer_request.json()["access_token"]
return
```

请求体是原始 JWS 字符串（`data=signed_request`），以 `Content-Type: application/jwt` 发送。
成功时，响应 JSON 中包含一个 `access_token` 字段——**切勿将其与上一步的 OAuth2 访问令牌混淆**；该值代表已建立的 SSO 网关会话，是后续经过身份验证的 Client Portal / 流式请求（例如通过 `websocket`）所使用的凭据。
非 200 响应在参考实现中返回 `None`；生产代码应检查响应体和状态码以获取可操作的错误详情，而不是静默失败。
