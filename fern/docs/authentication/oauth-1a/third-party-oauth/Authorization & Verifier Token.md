# 授权与验证令牌

这是 IBKR OAuth 1.0a 流程的第二步。在上一步中获得未经授权的**请求令牌**(Request Token,即 `rToken`)后,应用程序现在必须引导资源所有者(最终用户)前往 IBKR 的授权端点进行授权。在成功登录并同意后,IBKR 会签发一个 **`oauth_verifier`** —— 应用程序必须捕获该值,并在最后一步将其与请求令牌一起交换为**访问令牌**(Access Token)和**实时会话令牌**(Live Session Token)。

#### 前提条件

在实现此流程之前,请确保您已具备:

| 要求                        | 描述                                                                          |
| --------------------------- | ----------------------------------------------------------------------------- |
| **`rToken`**                | 由 `/oauth/request_token` 返回的未经授权的请求令牌                            |
| **`redirect_uri`**          | IBKR 将与此授权请求相关联的 URI                                               |
| **用户的 IBKR 凭据**        | 最终用户必须拥有有效的 IBKR 登录凭据才能完成授权                              |

#### 构建授权 URL

```python
url = f'https://interactivebrokers.com/authorize?oauth_token={rToken}&redirect_uri={redirect_uri}'
```

授权 URL 是针对 IBKR 的 `/authorize` 端点构建的一个简单的查询字符串 GET 请求,其中包含:

| 查询参数        | 用途                                                                                                                  |
| --------------- | --------------------------------------------------------------------------------------------------------------------- |
| `oauth_token`   | 流程第 1 步中获取的请求令牌 —— 用于标识此请求所对应的待处理授权请求                                                   |
| `redirect_uri`  | 授权完成后用户将被重定向到的 URI                                                                                      |

#### 引导用户进行授权

在参考实现中,该 URL 通过控制台输出呈现,由用户手动访问:

```python
verifier = input(f"Please log in to {url} and paste the 'oauth_verifier' value here: ")
```

**此步骤的端到端流程:**

1. 用户在浏览器中打开 `url`。
2. IBKR 提示用户使用其 IBKR 凭据登录。
3. IBKR 显示一个同意页面,描述您的应用程序(通过请求令牌 / Consumer Key 关联来识别)所请求的访问权限。
4. 用户批准后,IBKR 会生成一个 **`oauth_verifier`** 值,并将其直接显示在确认页面上。
5. 应构建一个 HTTP 端点/webhook,以便自动从 oauth\_callback 中以查询参数形式捕获 `oauth_verifier`。

验证令牌应保留到下一步生成访问令牌时为止,届时即可丢弃该验证令牌。
