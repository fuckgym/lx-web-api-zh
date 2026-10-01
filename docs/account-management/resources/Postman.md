# Postman

为了有效地探索和理解我们的 API 端点，我们推荐使用 Postman。这款行业标准工具可以帮助你可视化请求和响应，从而提高开发效率。

下载我们准备好的资源以快速上手：

* IBKR Postman Collection

* IBKR Production Environment Settings

* IBKR QA Environment Settings

### 设置说明

#### 1. 安装 Postman

下载并安装适用于你操作系统的最新版本 [Postman](https://www.postman.com/downloads/)。

#### 2. 导入资源

将我们的 collection 和 environment 文件导入你的 Postman 工作区：

* 打开 Postman
* 点击左上角的"Import"
* 上传已下载的 collection 和 environment 文件

#### 3. 配置环境变量

为了让 API 正常运作，请在所选环境中更新以下关键变量：

| 变量               | 描述                 | 你的值                 |
| ------------------ | -------------------- | --------------------- |
| `clientPrivateKey` | 你的 RSA 私钥          | *\[你的私钥]*            |
| `clientPublicKey`  | 你的 RSA 公钥          | *\[你的公钥]*            |
| `clientId`         | 你的客户 ID             | *\[你的客户 ID]*         |

### 重要提示

**需要 API 凭据**：该 collection 和 environment 仅在具备有效 API 凭据的情况下才能使用。如果你还没有凭据，请通过 [am-api@interactivebrokers.com](mailto:am-api@interactivebrokers.com) 联系我们的支持团队。

### 后续步骤

配置完成后，你就可以探索所有可用的端点、测试请求并查看响应，从而更好地理解我们 API 的功能。
