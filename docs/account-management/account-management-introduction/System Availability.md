# 系统可用性

<table>
  <thead>
    <tr>
      <th>
        服务类型
      </th>

      <th>
        停机时间
      </th>
    </tr>
  </thead>

  <tbody>
    <tr>
      <td>
        **客户注册与账户维护**\

        /gw/api/v1/accounts\*\

        /gw/api/v1/statements\*\

        /gw/api/v1/tax-documents\*\

        /gw/api/v1/enumerations\*
      </td>

      <td>
        每天 6pm ET–6:01pm ET 之间。\

        周日和周二 6pm ET 至 6:30pm ET 之间
      </td>
    </tr>

    <tr>
      <td>
        **资金与银行**\

        /gw/api/v1/bank-instructions\*\

        /gw/api/v1/client-instructions\*\

        /gw/api/v1/instruction\*\

        /gw/api/v1/external-asset-transfers\*\

        /gw/api/v1/external-cash-transfers\*\

        /gw/api/v1/internal\*
      </td>

      <td>
        每天 11:45pm ET-12:30am ET 之间\

        周六（任意时间），周日的下午 3 点（ET）之前
      </td>
    </tr>
  </tbody>
</table>

系统状态：[https://www.interactivebrokers.com/en/software/systemStatus.php](https://www.interactivebrokers.com/en/software/systemStatus.php)

### 限速

Interactive Brokers 对 Account Management Web API 实施全局请求限速：

* 每个端点 **每秒 10 次请求**
* 每个主账户 **每分钟 600 次请求**（10 次请求 × 60 秒）

##### 认证范围

Account Management API 的认证在主账户级别运作，这区别于交易 API 的用户级认证结构。

##### 超出限速

如果你的应用超出了这些既定的限速，API 将返回 **429 HTTP 状态码**（请求过多 / Too Many Requests）。
