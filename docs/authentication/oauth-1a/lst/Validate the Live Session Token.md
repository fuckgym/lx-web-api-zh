# 验证实时会话令牌(Live Session Token)

此步骤为实时会话令牌(Live Session Token,LST)的推导过程画上句号,解决了前述文档中指出的关键缺口:在信任本地计算的 LST 并将其用于签署后续 API 请求之前,**验证其是否与 IBKR 自身的计算结果一致**。

这是一个**强制性的安全检查点**,而非可选的完整性检查。只有在此处验证成功后,`computed_lst` 才会成为权威的 `live_session_token`,用于所有后续经身份验证的 API 调用。

#### 前提条件

| 输入              | 来源                       | 描述                                                                                          |
| --------------- | ------------------------ | ------------------------------------------------------------------------------------------ |
| `computed_lst`  | 上一步推导                   | 本地计算的、Base64 编码的实时会话令牌(Live Session Token)                                       |
| `consumer_key`  | 应用程序凭据               | 整个 OAuth 流程中使用的同一 consumer key                                                       |
| `lst_signature` | LST 请求响应               | IBKR 在实时会话令牌请求步骤中随 `dh_response` 一起返回的签名                                       |

#### 计算验证哈希

```python
hex_str_hmac_hash_lst = HMAC.new(
    key=base64.b64decode(computed_lst),
    msg=consumer_key.encode("utf-8"),
    digestmod=SHA1,
).hexdigest()
```

这将计算第二个独立的 HMAC-SHA1 运算——其用途不同于上一步中用于*推导* LST 的 HMAC:

$\text{verification\_hash} = \text{HMAC-SHA1}(\text{key}=\text{base64\_decode}(\text{computed\_lst}),\ \text{message}=\text{consumer\_key})$

| 参数          | 值                                                                                                             | 说明                                                                                                                                                                 |
| ------------- | --------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `key`         | `computed_lst` 的**原始字节**,通过对推导步骤生成的字符串进行 Base64 **解码**获得                                 | 注意与上一步的方向相反:在那一步中,`K` 被*编码*为字节;而在此处,LST 字符串被解码*回*字节,以用作 HMAC 密钥                                                              |
| `msg`         | 应用程序的 `consumer_key`,UTF-8 编码                                                                              | 这与整个 OAuth 流程中用作 `oauth_consumer_key` 的值相同                                                                                                               |
| `digestmod`   | `SHA1`                                                                                                          | 与推导步骤中确立的 SHA-1 用法一致——**而非** SHA-256                                                                                                                   |
| 输出格式      | `.hexdigest()` —— **十六进制字符串**,而非原始字节或 Base64                                                        | 不同于推导步骤的输出编码(Base64)——它必须与 IBKR 用于 `lst_signature` 的格式一致,第 2 步中的比较才有效                                                                  |

> ⚠️ **用途区分——不要混淆这两个 HMAC 运算:**
>
> * **推导步骤(前一篇文档):** 以 *DH 共享密钥*(`K`)为密钥,对*解密后的访问令牌密钥*(`prepend_bytes`)进行 HMAC 运算 → 生成 **LST 本身**。
> * **本步骤:** 以*计算得到的 LST* 为密钥,对*consumer key* 进行 HMAC 运算 → 生成一个**验证值**,用于确认 LST 推导是否正确。

#### 与服务器提供的签名进行比较

```python
if hex_str_hmac_hash_lst == lst_signature:
    live_session_token = computed_lst
```

如果本地计算的十六进制摘要与 `lst_signature`(IBKR 在实时会话令牌请求响应中返回)匹配,则推导被确认正确,`computed_lst` 即晋升为 `live_session_token`——此后应使用该值为经身份验证的 API 请求签名。

> 🔒 **此比较是信任所推导 LST 的唯一关口。** 匹配即以密码学方式确认:
>
> 1. 双方均正确计算了 Diffie-Hellman 共享密钥 `K`。
> 2. 访问令牌密钥已被正确解密(`prepend`/`prepend_bytes`)。
> 3. 所有字节编码的边界情况(奇数长度十六进制、符号位填充)均与 IBKR 服务器端实现的处理方式完全一致。
>
> 不匹配意味着上述**任何**环节都可能失败,此时 `computed_lst` **绝不能**用于后续请求。
