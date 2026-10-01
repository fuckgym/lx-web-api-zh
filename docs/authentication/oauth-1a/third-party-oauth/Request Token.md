# 请求令牌(Request Token)

本指南介绍了为 Interactive Brokers(IBKR)Web API 定制的 OAuth 1.0a 流程中 Request Token 步骤的实现。与通常使用 HMAC-SHA1 进行签名的标准 OAuth 1.0a 实现不同,此实现使用 **RSA-SHA256** 非对称签名,这是 IBKR 身份验证模型所要求的。

这是 IBKR 流程中三个 OAuth 1.0a 步骤中的第一步:

1. Request Token(本文档所介绍的)
2. Authorize Token(用户同意授权,通常带外完成)
3. Access Token / 实时会话令牌(Live Session Token)交换

#### 前提条件

在实现此流程之前,请确保已具备:

| 要求                | 描述                                                                                                 |
| ------------------- | ---------------------------------------------------------------------------------------------------- |
| **Consumer Key**    | 在 API 应用注册时由 IBKR 颁发                                                                        |
| **RSA Private Key** | 用于对 OAuth 基本字符串进行签名(`signature_key`)                                                    |
| **Realm**           | 对于 TESTCONS,使用 "test\_realm"。对于所有其他 consumer key,使用 "limited\_poa"                    |
| **Base URL**        | IBKR 的 API 网关主机名(`baseUrl`)                                                                   |
| **依赖项**          | `pycryptodome`(用于 `SHA256`、`PKCS1_v1_5_Signature`)、`requests`、标准库 `base64`、`urllib.parse` |

#### 构造端点 URL

Request Token 端点始终通过 HTTPS 以 `POST` 方式访问。

```python
url = f'https://api.ibkr.com/v1/api/oauth/request_token'
```

#### 组装 OAuth 参数

```python
oauth_params = {
    "oauth_callback": "oob",
    "oauth_consumer_key": consumer_key,
    "oauth_nonce": hex(random.getrandbits(128))[2:],
    "oauth_signature_method": "RSA-SHA256",
    "oauth_timestamp": str(int(datetime.now().timestamp()))
}
```

| 参数                     | 用途                                                                                                   |
| ------------------------ | ------------------------------------------------------------------------------------------------------ |
| `oauth_callback`         | 设置为字面字符串 `"oob"`(带外,out-of-band)——IBKR 在此流程中不使用基于重定向的回调                     |
| `oauth_consumer_key`     | 您注册的应用程序的 consumer key                                                                        |
| `oauth_nonce`            | 每个请求唯一且不可猜测的值;此处生成为 128 位随机十六进制字符串                                         |
| `oauth_signature_method` | 必须为 `RSA-SHA256`——**这偏离了 OAuth 1.0a 核心规范默认的 HMAC-SHA1**                                  |
| `oauth_timestamp`        | Unix 时间戳(秒),服务器用其拒绝过期请求                                                                |

#### 构建签名基本字符串

```python
params_string = "&".join([f"{k}={v}" for k, v in sorted(oauth_params.items())])
base_string = f"POST&{quote_plus(url)}&{quote(params_string)}"
```

OAuth 1.0a 签名基本字符串遵循以下格式:

```
HTTP_METHOD & percent_encoded(URL) & percent_encoded(sorted_parameter_string)
```

**实现细节:**

1. 参数按键名的字母顺序排序。
2. 参数字符串在编码**之前**以 `&` 连接 `key=value` 对构建——注意这是原始拼接,而不是对键/值对分别进行 URL 编码。
3. 然后使用 `quote()` 对整个参数字符串进行百分号编码。
4. URL 使用 `quote_plus()` 进行百分号编码。
5. 三个组成部分用字面量 `&` 字符连接。

关于 NONCE 值的说明:标准 OAuth 1.0a 规定每个键和值应先分别进行百分号编码*再*拼接,并且保留字符使用 `%20` 风格的编码(通过 `quote()`,而非 `quote_plus()`)。此实现使用 `quote_plus()`(将空格编码为 `+`)对 URL 进行编码,并使用 `quote()` 对拼接后的参数字符串进行编码。请确认这与 IBKR 服务端的预期一致——编码不一致是签名验证失败最常见的原因。**在未针对 IBKR 端点进行测试的情况下,不要偏离此模式**,因为该模式已经过对其实现的验证。

#### 使用 RSA-SHA256 对基本字符串进行签名

```python
encoded_base_string = base_string.encode("utf-8")
sha256_hash = SHA256.new(data=encoded_base_string)
bytes_pkcs115_signature = PKCS1_v1_5_Signature.new(
    rsa_key=signature_key
).sign(msg_hash=sha256_hash)
b64_str_pkcs115_signature = base64.b64encode(bytes_pkcs115_signature).decode("utf-8")
```

**流程:**

1. 将基本字符串编码为 UTF-8 字节。
2. 计算 SHA-256 摘要。
3. 使用您的 RSA 私钥(`signature_key`——一个 `Crypto.PublicKey.RSA` 密钥对象)以 **PKCS#1 v1.5** 填充方式对摘要进行签名。
4. 将原始签名字节进行 Base64 编码,得到可传输的字符串。

#### 完成签名并进行编码

```python
oauth_params["oauth_signature"] = quote_plus(b64_str_pkcs115_signature)
oauth_params["realm"] = realm
```

Base64 签名在插入 OAuth 参数集之前会先进行百分号编码(`quote_plus`),因为它可能包含在 HTTP 头部值中无效的字符(`+`、`/`、`=`)。

`realm` 参数在此阶段添加——它**不是**签名基本字符串的一部分,但**会**包含在最终的 `Authorization` 头部中,这符合 OAuth 1.0a 中 realm 作用域界定的惯例。

#### 构造 Authorization 头部

```python
oauth_header = "OAuth " + ", ".join([f'{k}="{v}"' for k, v in sorted(oauth_params.items())])
headers = {"authorization": oauth_header}
headers["User-Agent"] = "python/3.11"
```

头部遵循标准的 OAuth scheme 格式:

```
Authorization: OAuth key1="value1", key2="value2", ...
```

参数按字母顺序排序(符合惯例,但由于签名已经计算完成,此阶段并非严格必需)。
**User-Agent 说明:**IBKR 的 API 网关可能会强制校验 User-Agent。在生产部署中,请更新此值以反映您实际的运行时/客户端,而不要硬编码 `"python/3.11"`——将其固定为您实际的解释器/环境版本,或在 IBKR 集成准则允许的范围内设置自定义的标识字符串。

#### 执行请求并获取 oauth\_token 响应

```python
request_request = requests.post(url=url, headers=headers)
print(pretty_request_response(request_request))
if request_request.status_code == 200:
    rToken = request_request.json()["oauth_token"]
```

该请求以**无请求体**的方式发送——所有身份验证数据都存放在 `Authorization` 头部中。
返回的 Request Token 应保存下来供后两步使用,不过在获取 Access Token 之后应将其丢弃。
