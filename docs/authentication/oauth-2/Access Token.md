# 访问令牌（Access Token）

本指南介绍为 Interactive Brokers（IBKR）Web API 定制的 OAuth 2.0 流程中访问令牌（Access Token）步骤的实现。与传输静态客户端密钥（client secret）的标准 OAuth 2.0 客户端凭据许可（client credentials grant）不同，本实现使用**经签名的 JWT 客户端断言**（client assertion，遵循 RFC 7523——JWT Bearer 许可扩展），其构造为紧凑 JWS 并使用 **RSA-SHA256** 签名。

这是 IBKR 流程中两个 OAuth 2.0 步骤中的第一步：

1. 访问令牌（Access Token）（本文档所述）
2. Bearer Token / SSO 会话建立（用访问令牌换取网关会话——另一独立流程）

#### 前提条件

在实现此流程之前，请确保你已具备：

| 要求                              | 说明                                                                                                                |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Client ID**（`clientId`）       | 在注册 API 应用时由 IBKR 颁发；在 JWT 声明中同时用作 `iss` 和 `sub`                                                 |
| **Client Key ID**（`clientKeyId`）| 标识应使用哪个已注册的公钥来验证 JWT 签名；在 JWT 请求头中作为 `kid` 发送                                           |
| **RSA 私钥**                      | 用于对 JWT 签名（`jwtPrivateKey`）；从 PEM 文件加载，并通过 `Crypto.PublicKey.RSA.import_key()` 导入                |
| **Scope**                         | 为访问令牌请求的以空格分隔的 scope 字符串（例如 `sso-sessions.write`）                                              |
| **OAuth2 基础 URL**               | IBKR 的 OAuth2 令牌端点主机（`oauth2Url`）                                                                          |
| **Audience**                      | 固定的字面路径值 `/token`——**并非**完整限定的 URL                                                                   |
| **依赖项**                        | `pycryptodome`（提供 `RSA`、`SHA256`、`PKCS1_v1_5`）、`requests`，以及标准库 `base64`、`json`、`time`、`math`        |

#### 构造端点 URL

访问令牌端点始终通过 HTTPS 使用 `POST` 访问，内容类型为 `application/x-www-form-urlencoded`。

```python
url = f'{oauth2Url}/api/v1/token'
headers = {
    "Content-Type": "application/x-www-form-urlencoded"
}
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
    'iss': f'{clientId}',
    'sub': f'{clientId}',
    'aud': f'{audience}',
    'exp': now + 20,
    'iat': now - 10
}
```

| 字段          | 用途                                                                                                                                                                 |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `alg`         | 必须为 `RS256`——IBKR 的 JWT 验证器所期望的签名算法标识                                                                                                               |
| `typ`         | 标准 JWT 类型请求头，始终为 `"JWT"`                                                                                                                                  |
| `kid`         | 标识 IBKR 应使用哪个已注册公钥（按 `clientKeyId`）来验证签名                                                                                                         |
| `iss` / `sub` | 均设置为你的 `clientId`——对于此许可类型，IBKR 要求断言同时自我标识为签发者（issuer）和主体（subject）                                                                |
| `aud`         | 字面字符串 `"/token"`——**注意这是一个路径片段，而非完整的端点 URL**；偏离此值将导致签名/声明验证失败                                                                 |
| `exp`         | 断言的过期时间——有意设置得较短（自生成起 20 秒），因为此 JWT 用于验证单次令牌请求，而非会话                                                                          |
| `iat`         | 签发时间，回拨 10 秒以容忍客户端与 IBKR 服务器之间轻微的时钟偏差                                                                                                     |

**实现说明：** `compute_client_assertion()` 是一个共享辅助函数，之后在 Bearer Token 步骤中也会复用，它会根据目标 `url` 构建不同的声明集（`ip`、`credential`、24 小时的 `exp`）。与本步骤相关的只是匹配 `{oauth2Url}/api/v1/token` 的分支。

#### 对请求头与声明进行 Base64URL 编码

```python
def base64_encode(val):
    return base64.b64encode(val).decode().replace('+', '-').replace('/', '_').rstrip('=')

json_header = json.dumps(header, separators=(',', ':')).encode()
encoded_header = base64_encode(json_header)
json_claims = json.dumps(claims, separators=(',', ':')).encode()
encoded_claims = base64_encode(json_claims)
payload = f"{encoded_header}.{encoded_claims}"
```

**实现细节：**

1. `header` 和 `claims` 在编码前都会序列化为紧凑 JSON（不含空白字符），以确保确定性的字节表示。
2. 编码使用 **base64url**（遵循 RFC 4648 §5），而非标准 base64——`+` 和 `/` 分别替换为 `-` 和 `_`，并去除末尾的 `=` 填充。这是 JWS 紧凑序列化规范的要求，标准的 `base64.b64encode` 输出必须按所示方式手动转换。
3. 请求头与声明片段用字面 `.` 连接，形成未签名的 `payload`。

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
3. 使用你的 RSA 私钥（`jwtPrivateKey`——一个 `Crypto.PublicKey.RSA` 密钥对象）以 **PKCS#1 v1.5** 填充对该摘要签名。
4. 使用与请求头/声明相同的编码辅助函数对原始签名字节进行 Base64URL 编码——**而非**标准 base64。

#### 组装客户端断言（JWS）

```python
assertion = payload + "." + encoded_signature
```

将 `encoded_header`、`encoded_claims` 和 `encoded_signature` 用 `.` 分隔符连接，即得到紧凑 JWS 序列化：

```
base64url(header) . base64url(claims) . base64url(signature)
```

这一完整字符串就是令牌请求中提交的 `client_assertion` 值。它是**自包含且无状态的**——不需要单独的签名请求或 nonce 交换，这一点与 OAuth 1.0a 的 Request Token 流程不同。

#### 构造令牌请求体

```python
form_data = {
    'client_assertion_type': 'urn:ietf:params:oauth:client-assertion-type:jwt-bearer',
    'client_assertion': assertion,
    'grant_type': 'client_credentials',
    'scope': scope
}
```

| 字段                    | 用途                                                                                                                                                 |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `client_assertion_type` | 固定 URN，按 RFC 7523 将该断言标识为 JWT-bearer 凭据                                                                                                 |
| `client_assertion`      | 上一步生成的经签名的 JWS                                                                                                                             |
| `grant_type`            | 固定值 `client_credentials`——IBKR 直接依据该断言签发访问令牌，不涉及授权码或用户重定向                                                               |
| `scope`                 | 请求的 scope 字符串（例如 `sso-sessions.write`），用于约束所得访问令牌的用途                                                                         |

与 OAuth 1.0a 的 Request Token 步骤不同，此处**不使用 `Authorization` 请求头**——所有凭据都通过表单体中经签名的断言来传递。

#### 执行请求并获取 access\_token

```python
token_request = requests.post(url=url, headers=headers, data=form_data)
print(web_header_print(token_request))

if token_request.status_code == 200:
    access_token = token_request.json()["access_token"]
```

该请求以标准表单编码的 `POST` 发送；`form_data` 中的签名断言承载了所有身份验证材料。
返回的 `access_token` 应保留供后续的 Bearer Token / SSO 会话步骤使用——它在该请求的 `Authorization` 请求头中作为 `Bearer` 凭据传递，并且**不是**长期有效的凭据；应将其视为仅用于紧随其后的会话建立交换。
