# 经过身份验证请求的标准结构

这是前面五个步骤所记录的整个 OAuth 1.0a / Diffie-Hellman 握手过程的最终成果。在派生并验证了**实时会话令牌（Live Session Token，LST）**之后，此函数展示了用于调用 IBKR 实际交易/投资组合 API 端点的**通用经过身份验证的请求模式**——本示例中为 `/portfolio/accounts`，不过该函数的编写足够通用，可服务于任何经过身份验证的 IBKR 端点。

这标志着签名方法相对于之前每个步骤的转变：OAuth 握手步骤（Request Token、Access Token、Live Session Token 请求）均使用应用程序私钥以 **RSA-SHA256** 对请求签名，而**此后所有经过身份验证的 API 调用都改用 HMAC-SHA256，并以实时会话令牌作为密钥**。这是预期且正确的行为，应将其记录为一次性握手阶段与集成持续运行阶段之间的明确分界线。

#### 前提条件

| 要求                                | 说明                                                                                                           |
| ----------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **`live_session_token`**            | 前面派生/验证步骤中得到的已验证 LST                                                                            |
| **`access_token`**                  | 从 `/oauth/access_token` 端点或 Interactive Brokers 自助服务门户（Self Service Portal）获取的访问令牌（`aToken`） |
| **consumer\_key**                   | 在注册 API 应用时由 IBKR 颁发                                                                                  |
| **realm**                           | 对于 TESTCONS，请使用 "test\_realm"。对于所有其他 consumer key，请使用 "limited\_poa"                           |
| **`method`, `endpoint`, `baseUrl`** | 由调用方提供的值，用于标识具体的 API 调用（例如 `GET`、`/portfolio/accounts`）                                  |
| **`query_params`, `content`**       | 可选的由调用方提供的查询字符串参数和 JSON 请求体                                                               |

> **通用函数设计：** 与之前每个步骤都针对单一固定端点不同，此函数以 `method` 和 `endpoint` 作为参数，使其成为握手完成后**所有**经过身份验证的 IBKR API 通信的可复用核心。应将其记录为本库大多数使用者实际调用的主要持续集成点——握手步骤是一次性（或不频繁）的设置成本，而此函数则在每次 API 交互时运行。

#### 构造请求 URL

```python
url = f'https://{baseUrl}{endpoint}'
```

与前面步骤中固定的 OAuth 端点 URL 不同，`endpoint` 由调用方提供，使此函数可以指向 IBKR API 网关上的任意路径（例如 `/portfolio/accounts`、`/iserver/account/orders` 等）。

#### 组装 OAuth 参数

```python
oauth_params = {
    "oauth_consumer_key": consumer_key,
    "oauth_nonce": hex(random.getrandbits(128))[2:],
    "oauth_signature_method": "HMAC-SHA256",
    "oauth_timestamp": str(int(datetime.now().timestamp())),
    "oauth_token": access_token
}
```

**此参数集明显比之前所有步骤精简**——它省略了 `oauth_callback` 和 `oauth_verifier`（仅与初始握手相关），并且至关重要的是，它将 `oauth_signature_method` 声明为 **`HMAC-SHA256`** 而非 `RSA-SHA256`。

| 参数                     | 用途                                                                                                                                                      |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `oauth_consumer_key`     | 标识应用程序，与之前所有步骤相同                                                                                                                          |
| `oauth_nonce`            | 一如既往，每次请求新生成                                                                                                                                  |
| `oauth_signature_method` | **`HMAC-SHA256`**——标志着从非对称（RSA）签名转向对称（HMAC）签名，此时客户端和服务器已共享 LST 作为共同密钥                                               |
| `oauth_timestamp`        | 每次请求新生成                                                                                                                                            |
| `oauth_token`            | **访问令牌**，而非 Request Token——它标识的是本次及以后所有 API 调用所对应的已授权用户会话                                                                 |

#### 构建签名基字符串

```python
params_string = "&".join([f"{k}={v}" for k, v in sorted(oauth_params.items())])
base_string = f"{method}&{quote_plus(url)}&{quote(params_string)}"
```

遵循与 Request Token 和 Access Token 步骤相同的结构模式：将排序后的 `key=value` 键值对用 `&` 连接，再组合成 `METHOD&URL&PARAMS`，其中 URL 使用 `quote_plus()` 编码，参数字符串使用 `quote()` 编码。

> **查询参数不包含在签名基字符串中：** 注意 `query_params`（在第 6 步中单独传给最终的 `requests` 调用）**不会**包含在此签名基字符串中。根据 OAuth 1.0a 核心规范，随请求一起发送的查询字符串参数通常需要与 OAuth 参数一起包含在签名基字符串中。

#### 使用 HMAC-SHA256 对基字符串签名

```python
bytes_hmac_hash = HMAC.new(
    key=base64.b64decode(live_session_token),
    msg=base_string.encode("utf-8"),
    digestmod=SHA256
).digest()

b64_str_hmac_hash = base64.b64encode(bytes_hmac_hash).decode("utf-8")
oauth_params["oauth_signature"] = quote_plus(b64_str_hmac_hash)
```

签名的计算方式如下：

$\text{signature} = \text{HMAC-SHA256}(\text{key}=\text{base64\_decode}(\text{live\_session\_token}),\ \text{message}=\text{base\_string})$

| 参数        | 值                                                                      |
| ----------- | ----------------------------------------------------------------------- |
| `key`       | 实时会话令牌的原始字节，通过对其进行 Base64 解码获得                    |
| `msg`       | 来自第 3 步的 UTF-8 编码签名基字符串                                    |
| `digestmod` | `SHA256`                                                                |

得到的摘要先进行 Base64 编码，再进行百分号编码（`quote_plus`），以便安全地放入 `Authorization` 请求头——与本系列之前的所有签名步骤一致。

> **这正是 LST 真正投入使用之时。** 本系列此前的所有文档都在为这一行代码做铺垫：`live_session_token` 一旦从 Base64 解码回原始字节，就成为每个经过身份验证请求的**对称签名密钥**。

#### 构造 Authorization 请求头

```python
oauth_params["realm"] = realm
oauth_header = "OAuth " + ", ".join([f'{k}="{v}"' for k, v in sorted(oauth_params.items())])
headers = {"Authorization": oauth_header}
headers["User-Agent"] = "python/3.12"
headers["Accept"] = "*/*"
headers["Connection"] = "keep-alive"
```

`realm` 仅在签名计算完成之后才被添加到 `oauth_params` 中（因此会被渲染为带引号的形式）。

**本步骤引入的新请求头：**

| 请求头                   | 用途                                                                                                                                                                                                                        |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Accept: */*`            | 表示接受任何响应内容类型——对于通用的多端点函数而言是合理的默认值，不过如果 IBKR 的 API 仅支持 JSON，针对特定端点使用更精确的 `Accept: application/json` 可能更好                                                            |
| `Connection: keep-alive` | 请求持久连接复用——考虑到此函数在会话期间可能会针对同一主机反复调用，这是合理的选择                                                                                                                                          |

#### 执行请求

```python
try:
    with s.request(method=method, url=url, headers=headers, params=query_params, json=content, stream=True) as req:
        if print_data == "y":
            print(pretty_request_response(req))
        if not req.ok:
            logger.error(f"Request to {url} failed: {req.status_code} - {req.text}")
            raise IBKRApiError(f"Request failed with status {req.status_code}: {req.text}")
        return req
except requests.exceptions.RequestException as e:
    logger.exception(f"Failed to submit request to {url}")
    raise IBKRApiError(f"Request submission failed: {e}") from e
```

这是运行层面最重要的步骤，因为它在**每次**经过身份验证的 API 调用时都会执行，而不是在设置阶段仅执行一次。
