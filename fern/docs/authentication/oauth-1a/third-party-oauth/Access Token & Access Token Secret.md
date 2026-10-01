# Access Token(访问令牌)与 Access Token Secret(访问令牌密钥)

这是与 Interactive Brokers API 进行初始 OAuth 1.0a 握手的第三步,也是最后一步。在用户授权同意步骤中获得已授权的 Request Token(rToken)和 oauth\_verifier(vToken)之后,应用程序现在将这些凭据交换为永久性的 Access Token 和 Access Token Secret。

从结构上看,这一步与 Request Token 步骤高度相似(相同的签名方法、相同的头部构造模式),但有两个关键区别:参数集中加入了 oauth\_token 和 oauth\_verifier,以及响应载荷中包含一个额外的密钥组件。

术语说明:在 IBKR 的 OAuth 模型中,此处返回的 oauth\_token\_secret 与标准 OAuth 1.0a 不同,并不直接用作后续请求的签名密钥。IBKR 要求通过进一步的基于 Diffie-Hellman 的推导来生成实时会话令牌(Live Session Token,LST),该令牌用于对所有后续经过身份验证的 API 调用进行签名。本步骤的文档中应对此予以明确说明,以防止集成方直接误用 aTokenSecret。这一区别至关重要,必须向下游实现者显著标示——将 aTokenSecret 当作 HMAC 签名密钥使用(如标准 OAuth 1.0a 那样)会导致对 IBKR 端点的静默身份验证失败。

#### 前提条件

在执行此步骤之前,请确保已具备:

| 要求                | 描述                                                                             |
| ------------------- | -------------------------------------------------------------------------------- |
| **`rToken`**        | 从 `/oauth/request_token` 获取的 Request Token                                   |
| **`vToken`**        | 用户授权后获得的 `oauth_verifier`                                                |
| **Consumer Key**    | 在 API 应用注册时由 IBKR 颁发                                                    |
| **RSA Private Key** | 用于对 OAuth 基本字符串进行签名(`signature_key`)                                |
| **Realm**           | 对于 TESTCONS,使用 "test\_realm"。对于所有其他 consumer key,使用 "limited\_poa" |

#### 构造端点 URL

```python
url = f'https://api.ibkr.com/v1/api/oauth/access_token'
```

Access Token 端点与 Request Token 端点使用相同的主机,仅路径不同。与前一步一样,此调用通过 `POST` 发起。

#### 组装 OAuth 参数

```python
oauth_params = {
    "oauth_callback": "oob",
    "oauth_consumer_key": consumer_key,
    "oauth_nonce": hex(random.getrandbits(128))[2:],
    "oauth_signature_method": "RSA-SHA256",
    "oauth_timestamp": str(int(datetime.now().timestamp())),
    "oauth_token": rToken,
    "oauth_verifier": vToken,
}
```

此参数集在 Request Token 步骤的参数集基础上,增加了两个必需字段:

| 新参数           | 用途                                                                                                                                  |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `oauth_token`    | 先前颁发的 Request Token——标识本次交换对应的是哪个已授权会话                                                                          |
| `oauth_verifier` | 在授权步骤中从用户处获得的验证码——证明用户确实为这个特定令牌授予了同意                                                                |

> **Nonce/时间戳警告:**按照规范要求,此请求会生成**全新的** nonce 和时间戳。请勿复用 Request Token 步骤中的值——每个经过签名的请求都必须携带自己唯一的 nonce/时间戳对,即使是在同一个整体授权流程中。

#### 构建签名基本字符串

```python
params_string = "&".join([f"{k}={v}" for k, v in sorted(oauth_params.items())])
base_string = f"POST&{quote_plus(url)}&{quote(params_string)}"
```

这与 Request Token 步骤中建立的模式完全一致:

1. 参数按键名的字母顺序排序。
2. 拼接为原始的 `key=value&key=value...` 字符串。
3. URL 通过 `quote_plus()` 编码,参数字符串通过 `quote()` 编码。
4. 组合成 `METHOD&URL&PARAMS` 的基本字符串格式。

#### 使用 RSA-SHA256 对基本字符串进行签名

```python
encoded_base_string = base_string.encode("utf-8")
sha256_hash = SHA256.new(data=encoded_base_string)
bytes_pkcs115_signature = PKCS1_v1_5_Signature.new(
    rsa_key=signature_key
).sign(msg_hash=sha256_hash)
b64_str_pkcs115_signature = base64.b64encode(bytes_pkcs115_signature).decode("utf-8")
```

与 Request Token 步骤的流程完全相同:对基本字符串计算 SHA-256 摘要,使用应用程序的 RSA 私钥以 PKCS#1 v1.5 填充方式进行签名,然后进行 Base64 编码以便传输。

#### 完成签名并进行编码

```python
oauth_params["oauth_signature"] = quote_plus(b64_str_pkcs115_signature)
oauth_params["realm"] = realm
```

与之前一样,签名在插入头部之前会先进行百分号编码,而 `realm` 仅附加在 `Authorization` 头部中——它仍然被排除在签名基本字符串之外。

#### 构造 Authorization 头部

```python
oauth_header = "OAuth " + ", ".join([f'{k}="{v}"' for k, v in sorted(oauth_params.items())])
headers = {"authorization": oauth_header}
headers["User-Agent"] = "python/3.11"
```

构造模式与 Request Token 步骤完全相同。有关 `User-Agent` 硬编码的注意事项,请参见前文文档——对于生产环境,同样建议将该值参数化。

#### 执行请求

```python
request_request = requests.post(url=url, headers=headers)
print(pretty_request_response(request_request))
```

与 Request Token 调用一样,不发送任何请求体——所有身份验证材料都通过 `Authorization` 头部携带。

#### 解析 Access Token 与密钥

```python
if request_request.status_code == 200:
    aToken = request_request.json()["oauth_token"]
    aTokenSecret = request_request.json()["oauth_token_secret"]
```

**成功时会返回两个凭据:**

| 字段                                  | 用途                                                                                                                          |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `oauth_token` (`aToken`)              | **Access Token**——用于代表已授权用户对所有后续 API 请求进行身份验证                                                            |
| `oauth_token_secret` (`aTokenSecret`) | 一个密钥组件,作为**实时会话令牌推导**步骤(Diffie-Hellman 交换)的必需输入——参见下方说明                                        |

> 🔒 **关键安全处理:**`aTokenSecret` 必须被当作高度敏感的材料来对待。应当:
>
> * 绝不写入日志,包括调试输出中(如果任何详细级别下都会记录响应体,`pretty_request_response` 应对该字段进行脱敏)。
> * 绝不以明文形式持久存储——如需存储,必须加密。
> * 若架构允许在事后丢弃,则仅在完成实时会话令牌推导所需的期间内将其保存在内存中。
