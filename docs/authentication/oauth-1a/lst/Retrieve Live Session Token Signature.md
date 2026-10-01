# 获取实时会话令牌签名

此步骤是 IBKR OAuth 流程中涉及密码学运算最多的环节。它将 **Diffie-Hellman（DH）密钥交换**与 OAuth 1.0a 风格的签名请求相结合，以获取计算**实时会话令牌（Live Session Token，LST）**所需的材料——该令牌最终用于对所有后续经过身份验证的 IBKR API 调用进行签名（取代上一步中的 Access Token Secret）。

该函数**不会**计算最终的实时会话令牌本身。它执行请求/响应交换，并返回完成该计算所需的原始组件（`dh_random`、`prepend`、`dh_response`、`lst_signature`、`lst_expiration`），具体计算方法在下一步中说明。

#### 前提条件

| 要求                            | 说明                                                                                                                                          |
| ------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| **`access_token`**              | 从 `/oauth/access_token` 端点或 Interactive Brokers 自助服务门户（Self Service Portal）获取的访问令牌（Access Token，`aToken`）                |
| **`access_token_secret`**       | 从同一步骤获取的 Access Token Secret（`aTokenSecret`）——此处以加密形式使用                                                                    |
| **`encryption_key`**            | 你的 RSA **私钥加密密钥（private encryption key）**——与 `signature_key` 不同；用于解密访问令牌密钥                                            |
| **`signature_key`**             | 你的 RSA **私钥签名密钥（private signing key）**——即第三方 OAuth 工作流前面步骤中使用的同一密钥，用于对本请求的基字符串（base string）进行签名 |
| **`dh_generator` / `dh_prime`** | Diffie-Hellman 域参数。IBKR 将生成子（generator）固定为 `2`；素数由 IBKR 指定，必须与其服务器端的值完全一致                                    |
| **Consumer Key**                | 在注册 API 应用时由 IBKR 颁发                                                                                                                 |
| **Realm**                       | 对于 TESTCONS，请使用 "test\_realm"。对于所有其他 consumer key，请使用 "limited\_poa"                                                          |

#### 生成 Diffie-Hellman 挑战

```python
dh_random = random.getrandbits(256)
dh_challenge = hex(pow(base=dh_generator, exp=dh_random, mod=dh_prime))[2:]
```

此处计算的是标准 Diffie-Hellman 密钥交换中客户端一侧的值：

$\text{dh\_challenge} = generator^{\text{dh\_random}} \bmod \text{dh\_prime}$

| 值             | 说明                                                                                                                         |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `dh_random`    | 本地生成的保密的 256 位随机整数——客户端的 DH 私有值。**绝不能被传输或记录到日志。**                                          |
| `dh_generator` | 根据 IBKR 的规范固定为 `2`                                                                                                   |
| `dh_prime`     | 由 IBKR 共享/指定的大素数，用于定义 DH 群组                                                                                  |
| `dh_challenge` | 客户端的 DH 公开值，随本请求发送给 IBKR。以十六进制编码传输，并去除了 `0x` 前缀（`[2:]`）                                     |

> **关键秘密材料：** `dh_random` 会由该函数返回，必须予以保留（保存在内存中，若需持久化则必须安全存储）——在下一步中，它是根据 IBKR 返回的 `dh_response` 计算最终实时会话令牌所必需的输入。

#### 解密 Access Token Secret 以生成基字符串前缀（Prepend）

```python
bytes_decrypted_secret = PKCS1_v1_5_Cipher.new(
    key=encryption_key
).decrypt(
    ciphertext=base64.b64decode(access_token_secret),
    sentinel=None,
)
prepend = bytes_decrypted_secret.hex()
base_string = prepend
```

这是 IBKR OAuth 模型所独有的一步，在此前的 Request Token / Access Token 步骤中没有对应操作。

**流程：**

1. 将 `access_token_secret`（以字符串形式从 Access Token 响应中接收）进行 Base64 解码，得到原始密文字节。
2. 使用私钥 `encryption_key` 以 **PKCS#1 v1.5** 加密填充进行解密（注意：这是加密/解密填充，与在其他地方使用的 PKCS#1 v1.5 *签名*填充不同）。
3. 将解密后得到的字节转换为十六进制字符串——这就是 `prepend`。
4. `prepend` 被放置在即将成为签名基字符串的内容的最前面——位于标准 `METHOD&URL&PARAMS` 结构**之前**。

#### 构造签名基字符串

```python
method = 'POST'
url = f'https://{baseUrl}/oauth/live_session_token'
oauth_params = {
    "oauth_consumer_key": consumer_key,
    "oauth_nonce": hex(random.getrandbits(128))[2:],
    "oauth_timestamp": str(int(datetime.now().timestamp())),
    "oauth_token": access_token,
    "oauth_signature_method": "RSA-SHA256",
    "diffie_hellman_challenge": dh_challenge,
}

params_string = "&".join([f"{k}={v}" for k, v in sorted(oauth_params.items())])
base_string += f"{method}&{quote_plus(url)}&{quote_plus(params_string)}"
```

**本请求的参数集：**

| 参数                       | 用途                                                                                                                              |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `oauth_consumer_key`       | 与前面步骤相同                                                                                                                    |
| `oauth_nonce`              | 每次请求新生成——不要复用此前步骤中的值                                                                                            |
| `oauth_timestamp`          | 每次请求新生成                                                                                                                    |
| `oauth_token`              | 上一步获取的**访问令牌**（`aToken`）——注意它与流程前面使用的 Request Token 不同                                                   |
| `oauth_signature_method`   | `RSA-SHA256`，与流程其余部分保持一致                                                                                              |
| `diffie_hellman_challenge` | 第 1 步中计算得到的 DH 公开值——这是 IBKR 特有的参数，**并非**标准 OAuth 1.0a 参数                                                |

这是整个流程中最重要的结构性区别：签名基字符串会**以十六进制编码的解密密钥（`prepend`）作为前缀**，然后再附加标准的 `METHOD&URL&PARAMS` 字符串。该前缀**不进行 URL 编码**，也**不会**通过 `&` 与基字符串的其余部分分隔——它是直接的字符串拼接。

#### 使用 RSA-SHA256 对基字符串签名

```python
encoded_base_string = base_string.encode("utf-8")
sha256_hash = SHA256.new(data=encoded_base_string)
bytes_pkcs115_signature = PKCS1_v1_5_Signature.new(
    rsa_key=signature_key
).sign(msg_hash=sha256_hash)
b64_str_pkcs115_signature = base64.b64encode(bytes_pkcs115_signature).decode("utf-8")
oauth_params['oauth_signature'] = quote_plus(b64_str_pkcs115_signature)
```

**流程：**

1. 将基字符串编码为 UTF-8 字节。
2. 计算 SHA-256 摘要。
3. 使用你的 RSA 私钥（`signature_key`——一个 `Crypto.PublicKey.RSA` 密钥对象）以 **PKCS#1 v1.5** 填充对该摘要进行签名。
4. 将原始签名字节进行 Base64 编码，得到可传输的字符串。

#### 构造 Authorization 请求头

```python
oauth_header = f"OAuth realm={realm}, " + ", ".join([f'{k}="{v}"' for k, v in sorted(oauth_params.items())])
headers = {"Authorization": oauth_header}
headers["User-Agent"] = "python/3.11"
```

该请求头遵循标准的 OAuth scheme 格式：

```
Authorization: OAuth key1="value1", key2="value2", ...
```

参数按字母顺序排序（与惯例一致，不过由于签名已经计算完成，此阶段并非严格要求）。
**User-Agent 注意事项：** IBKR 的 API 网关可能会强制校验 User-Agent。在生产部署中，请更新此值以反映你实际的运行时/客户端，而不要硬编码 `"python/3.11"`——应将其固定为你实际的解释器/环境版本，或在 IBKR 集成指南允许的范围内设置自定义的标识字符串。

#### 执行请求

```python
lst_request = requests.post(url=url, headers=headers)
print(pretty_request_response(lst_request))
```

这是一个仅包含请求头的 `POST` 请求，没有请求体。

#### 解析响应

```python
response_data = lst_request.json()
dh_response = response_data["diffie_hellman_response"]
lst_signature = response_data["live_session_token_signature"]
lst_expiration = response_data["live_session_token_expiration"]

return dh_random, prepend, dh_response, lst_signature, lst_expiration
```

**响应字段：**

| 字段                            | 用途                                                                                                                            |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `diffie_hellman_response`       | IBKR 的 DH 公开值——密钥交换中服务器一侧的值，计算共享密钥时需要用到                                                             |
| `live_session_token_signature`  | IBKR 提供的签名，使客户端能够在信任派生出的 LST 之前**验证其完整性/真实性**                                                     |
| `live_session_token_expiration` | 所得实时会话令牌的过期时间戳——应当对其进行跟踪，以便应用程序知道何时需要重新运行此流程                                          |

计算实时会话令牌的下一阶段将需要来自实时会话令牌签名请求的以下信息：

* `dh_random` — 客户端的 DH 私有指数（第 1 步）
* `prepend` — 解密后的密钥十六进制字符串（第 2 步）
* `dh_response` — 服务器的 DH 公开值（本步骤）
* `lst_signature` — 用于验证计算得到的 LST
* `lst_expiration` — 用于会话生命周期管理
