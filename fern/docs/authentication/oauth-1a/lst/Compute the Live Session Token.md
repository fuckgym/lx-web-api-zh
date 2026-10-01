# 计算实时会话令牌(Compute the Live Session Token)

这是 IBKR OAuth 1.0a / Diffie-Hellman 握手中的最后一个计算步骤。本步骤利用前几步收集到的值——客户端的 DH 私有指数(`dh_random`)、服务器的公开 DH 值(`dh_response`)以及解密后的 Access Token Secret(`prepend`)——计算出**共享的 Diffie-Hellman 密钥**,并用它通过 HMAC-SHA1 推导出**实时会话令牌(Live Session Token,LST)**。

得到的 `computed_lst` 是用于对**所有后续经过身份验证的 IBKR API 请求**进行签名的凭据,取代 OAuth 握手步骤本身所使用的基于 RSA 签名的身份验证方式。

> **范围说明:**本文档仅涵盖 LST 的*计算*。一个关键的后续步骤——**使用 IBKR 返回的 `lst_signature` 值验证 `computed_lst`**——将在下一部分文档中处理。

#### 前提条件

本步骤使用前一个实时会话令牌*请求*步骤的输出:

| 输入          | 来源                                       | 描述                                                          |
| ------------- | ------------------------------------------ | ------------------------------------------------------------- |
| `prepend`     | 解密后的 Access Token Secret(十六进制字符串)| 来自 LST 请求文档的第 2 步                                   |
| `dh_random`   | 客户端的 DH 私有指数                       | 在 LST 请求文档的第 1 步中本地生成                            |
| `dh_response` | 服务器的公开 DH 值(十六进制字符串)       | 由 IBKR 在 LST 请求响应中返回                                 |
| `dh_prime`    | DH 群素数                                  | 与生成原始挑战所用的域参数相同                                |

#### 将 Prepend 转换为字节

```python
prepend_bytes = bytes.fromhex(prepend)
```

`prepend` 值——即解密后的 Access Token Secret 的十六进制字符串表示——被转换回原始字节。它将作为第 5 步中 HMAC 计算的**消息**输入,在此阶段并不作为密钥材料。

#### 计算 Diffie-Hellman 共享密钥

```python
a = dh_random
B = int(dh_response, 16)
p = dh_prime
K = pow(B, a, p)
```

这完成了在 LST 请求步骤中开始的 Diffie-Hellman 密钥交换:

$K = B^{a} \bmod p$

| 变量     | 含义                                                                                      |
| -------- | ----------------------------------------------------------------------------------------- |
| `a`      | 客户端的 DH 私有指数(`dh_random`)——严格保密,绝不传输                                    |
| `B`      | 服务器的公开 DH 值,由从 IBKR 收到的十六进制字符串 `dh_response` 解析而来                 |
| `p`      | 共享的 DH 素数(域参数)                                                                  |
| `K`      | 最终得到的**共享密钥整数**,仅客户端与 IBKR 知晓                                           |

> **这是整个交换的密码学核心。**由于客户端从不传输 `dh_random`(`a`),IBKR 也从不传输其私有指数,双方可以各自独立推导出相同的值 `K`,而该值从不在网络上传输——这正是标准的 Diffie-Hellman 安全特性。在此流程的剩余部分中,`K` 必须被当作绝密材料对待:绝不写入日志,并且一旦不再需要用于下方的 HMAC 计算,就立即从内存中丢弃。

#### 将共享密钥转换为字节串

```python
hex_str_K = hex(K)[2:]

if len(hex_str_K) % 2:
    print("adding leading 0 for even number of chars")
    hex_str_K = "0" + hex_str_K

hex_bytes_K = bytes.fromhex(hex_str_K)
```

Python 的 `hex()` 函数会生成一个可变长度的十六进制字符串,此处通过 `[2:]` 去除 `0x` 前缀。由于 `bytes.fromhex()` 要求十六进制字符数为偶数(每个字节 = 2 个十六进制数字),因此当字符串长度为奇数时,会在转换前在左侧填充一个 `"0"` 字符。

#### 应用符号位填充

```python
if len(bin(K)[2:]) % 8 == 0:
    hex_bytes_K = bytes(1) + hex_bytes_K
```

这一步处理了一个微妙但重要的密码学编码问题:**大整数的符号表示**。

当 `K` 的位长度恰好是 8 的整数倍时(即它恰好填满整个字节,没有前导零位),如果某些系统将该字节串视为有符号大端整数(例如 Java 或其他环境中的某些 BigInteger 实现),结果字节串的最高有效位可能会被解释为**符号位**。为了保证 `K` 在转换为字节时始终被无歧义地解释为**正数/无符号**值,只要检测到这种边界情况,就会在前面添加一个空字节(`0x00`)。

> **为什么这对互操作性很重要:**这个填充步骤的存在,正是为了确保此处生成的 `K` 的字节表示与 IBKR 服务器端计算的结果**逐字节完全一致**(后者可能使用具有不同"大整数转字节"惯例的其他语言/库,例如 Java 的 `BigInteger.toByteArray()`,它总是包含一个符号位)。此处任何不匹配——哪怕多出或缺失一个字节——都会导致后续的 HMAC 计算悄无声息地产生偏差,生成一个会被 IBKR 服务器拒绝的 LST。这是 DH 交换中难以诊断的跨实现错误的常见来源,值得在公开文档中明确指出。

#### 计算 HMAC-SHA1 哈希

```python
bytes_hmac_hash_K = HMAC.new(
    key=hex_bytes_K,
    msg=prepend_bytes,
    digestmod=SHA1,
).digest()
```

实时会话令牌通过 **HMAC-SHA1** 计算推导得出:

$\text{LST} = \text{HMAC-SHA1}(\text{key}=K_{\text{bytes}}, \text{message}=\text{prepend\_bytes})$

| 参数        | 值                                                                  |
| ----------- | ------------------------------------------------------------------- |
| `key`       | DH 共享密钥 `K` 经过符号位填充后的字节表示                          |
| `msg`       | 解密后的 Access Token Secret 字节(`prepend_bytes`)                 |
| `digestmod` | `SHA1`                                                              |

> **SHA 使用区别:**值得注意的是,这是整个 IBKR OAuth 流程中**唯一**使用 **SHA-1** 的地方,而 Request Token、Access Token 和 LST 请求步骤中的所有 RSA 签名操作均使用 **SHA-256**。

#### 对最终的实时会话令牌进行编码

```python
computed_lst = base64.b64encode(bytes_hmac_hash_K).decode("utf-8")
```

原始的 HMAC 摘要字节被 Base64 编码为字符串。这个 `computed_lst` 值就是最终的**实时会话令牌(Live Session Token)**——此后用于对访问 IBKR 交易端点的经过身份验证的 API 请求进行签名的凭据(通常通过 `HMAC-SHA1` 请求签名,与整个握手过程中使用的 `RSA-SHA256` 签名不同)。
