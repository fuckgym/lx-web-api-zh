# 批量交易

## 内部资金划转(批量)

可以使用 `/v1/clients/{client-id}/internal-cash-transfers:bulk` 在符合条件的前提下,在 IBKR 账户之间进行内部现金划转。

* 单个指令集中最多可包含 100 个划转请求。
* 每 30-60 秒批量处理一次,除非指定了 `dateTimeToOccur`。划转将按 `dateTimeToOccur` 指定的时间处理。如需即时划转,请使用 [`internal_cash_transfer`](/web-api/account-management/funds-and-banking/internal-transfer)。

## 请求参数

| 名称                | 类型                                                                                                                                   | 描述                                                                                                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| sourceAccountId     | String                                                                                                                                 | 资金转出账户。                                                                                                                                                                                                         |
| clientInstructionId | Number;最多 20 个字符。                                                                                                             | 与请求关联的唯一标识符。– **clientInstructionId** 不能重复使用。– IBKR 建议 **clientInstructionId** 按顺序编号,例如 1, 2, 3, 4 或 100, 101, 102, 103,而非 777, 589, 123。 |
| instructionType     | INTERNAL\_CASH\_TRANSFER                                                                                                               | 交易类型。                                                                                                                                                                                                                             |
| amount              | number > 0                                                                                                                             | 划转的现金金额。                                                                                                                                                                                                                |
| targetAccountId     | String                                                                                                                                 | 资金转入账户。                                                                                                                                                                                                         |
| currency            | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 发送至 IBKR 的资金币种。                                                                                                                                                                                                        |
| dateTimeToOccur     | 2016-04-13T23:15:00+04:00(UTC 加 4 小时)  2016-04-13T23:15:00-04:00(UTC 减 4 小时)                                           | 划转应发生的日期。\*此字段为可选。                                                                                                                                                                                   |
| clientNote          | String;最多 64 个字符。                                                                                                      | 与内部现金划转请求关联的备注。备注将显示在客户对账单上。此字段为可选。                                                                                                                 |

### 示例

`[POST] /v1/clients/{client-id}/internal-cash-transfers:bulk { "instructionType": "INTERNAL_CASH_TRANSFER", "instructions": [ { "clientInstructionId": 1, "sourceAccountId": "U345", "targetAccountId": "U87440", "amount": 123.45, "currency": "GBP", "dateTimeToOccur": "2018-03-20T09:12:13Z" }, { "clientInstructionId": 2, "sourceAccountId": "U345", "targetAccountId": "U87440", "amount": 123.45, "currency": "GBP", "dateTimeToOccur": "2018-03-20T09:12:13Z" }, { "clientInstructionId": 3, "sourceAccountId": "U399192", "targetAccountId": "U87440", "amount": 123.45, "currency": "GBP", "dateTimeToOccur": "2018-03-20T09:12:13Z" }, { "clientInstructionId": 4, "sourceAccountId": "U399192", "targetAccountId": "U87440", "amount": 123.45, "currency": "GBP", "dateTimeToOccur": "2018-03-20T09:12:13Z" } ] }`

## 内部持仓划转(批量)

可以使用 `/v1/clients/{client-id}/internal-asset-transfers:bulk` 在符合条件的前提下,在 IBKR 账户之间进行内部持仓划转。

* 单个指令集中最多可包含 100 个划转请求。
* 我们的系统每 5 分钟处理 200 个请求,这是一个异步过程。如果提交了包含 600 个划转请求的批量请求,则需要 15 分钟才能处理完成(共 3 个批次)。如果每天提交超过 1000 个内部持仓划转请求,用户可能需支付额外费用。

## 请求参数

| 名称                | 类型                                                                                                                                   | 描述                                                                                                                                                                                                                                      |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| clientInstructionId | Number;最多 20 个字符。                                                                                                             | 与请求关联的唯一标识符。– **clientInstructionId** 不能重复使用。– IBKR 建议 **clientInstructionId** 按顺序编号,例如 1, 2, 3, 4 或 100, 101, 102, 103,而非 777, 589, 123。 |
| instructionType     | INTERNAL\_POSITION\_TRANSFER                                                                                                           | 交易类型                                                                                                                                                                                                                              |
| securityId          | String                                                                                                                                 | 所划转证券的 CUSIP/ISIN 编号。                                                                                                                                                                                             |
| transferQuantity    | Number                                                                                                                                 | 转入/转出的股份数量                                                                                                                                                                                                        |
| assetType           | STK                                                                                                                                    | 产品类型。非 STK 产品(如期权、债券)的内部划转仅支持使用 CONID(而非 ISIN)。使用 CONID 提交内部划转时,我们不要求指定 asset\_type。                                |
| securityIdType      | CUSIP ISIN CASH                                                                                                                        | 用于确定所提供的 securityId 类型。为 ISIN 或 CUSIP。                                                                                                                                                                       |
| conId               | String                                                                                                                                 | Interactive Brokers 分配的唯一合约 ID。                                                                                                                                                                                              |
| currency            | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 所划转资产的币种。                                                                                                                                                                                                        |
| country             | Alpha-3 代码(ISO)                                                                                                                     | 对手方经纪商所在的国家。                                                                                                                                                                                                      |
| sourceAccountId     | String                                                                                                                                 | 资金转出账户。                                                                                                                                                                                                         |
| targetAccountId     | String                                                                                                                                 | 资金转入账户。                                                                                                                                                                                                           |

### 示例

提交请求有 2 种方式(securityId **或** conId)

***方式 1:使用 securityId(CUSIP 或 ISIN)***

```
POST /v1/clients/{client-id}/internal-asset-transfers:bulk

{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instructions": [
    {
      "clientInstructionId": 7013005,
      "sourceAccountId": "U399192",
      "targetAccountId": "U87440",
      "transferQuantity": 6,
      "tradingInstrument": {
        "tradingInstrumentDescription": {
          "securityIdType": "ISIN",
          "securityId": "45229200101",
          "assetType": "STK"
        },
      }
    },
    {
      "clientInstructionId": 7013006,
      "sourceAccountId": "U399192",
      "targetAccountId": "U87440",
      "transferQuantity": 6,
      "tradingInstrument": {
        "tradingInstrumentDescription": {
          "securityIdType": "ISIN",
          "securityId": "459200101",
          "assetType": "STK"
        },
        "currency": "USD"
      }
    },
    {
      "clientInstructionId": 7013043,
      "sourceAccountId": "U399192",
      "targetAccountId": "U87440",
      "transferQuantity": 6,
      "tradingInstrument": {
        "tradingInstrumentDescription": {
          "securityIdType": "ISIN",
          "securityId": "45229200101",
          "assetType": "STK"
        },
      },
    }
  ]
}
```

***方式 2:使用 conId***

```
POST /v1/clients/{client-id}/internal-asset-transfers:bulk

{
  "instructionType": "INTERNAL_POSITION_TRANSFER",
  "instructions": [
    {
      "clientInstructionId": 7013005,
      "sourceAccountId": "U399192",
      "targetAccountId": "U87440",
      "transferQuantity": 6,
      "tradingInstrument": {
        "conid": 21323,
        "currency": "USD"
      }
    },
    {
      "clientInstructionId": 7013006,
      "sourceAccountId": "U399192",
      "targetAccountId": "U87440",
      "transferQuantity": 6,
        "tradingInstrument": {
        "conid": 111222,
        "currency": "USD"
      }
    },
    {
      "clientInstructionId": 7013043,
      "sourceAccountId": "U399192",
      "targetAccountId": "U87440",
      "transferQuantity": 6,
      "tradingInstrument": {
        "conid": 21323,
        "currency": "USD"
      },
    }
  ]
}
```

## 外部资产划转(批量)

可以使用 `/v1/clients/{client-id}/external-asset-transfers:bulk` 提交多个外部持仓划转请求。

* 单个指令集中最多可包含 100 个划转请求。

## 请求参数

要在单次 API 调用中提交多个划转请求,请将每个划转指令作为单独的对象包含在 `instructions` 数组中。每个指令必须包含唯一的 `clientInstructionId`,以便与其他指令区分。

下面的示例使用 **Free of Payment(FOP)** 划转演示了此模式。相同的结构适用于所有受支持的划转类型:**ACATS**、**COMPLEX\_ASSET\_TRANSFER**、**FOP** 和 **ATON**。

完整的 schema 详情请参阅[持仓划转(Position Transfers)](/web-api/account-management/funds-and-banking/position-transfers)部分。

### 示例

以下为 FOP 示例 -

```
POST /gw/api/v2/external-asset-transfers
{
  "instructionType": "FOP",
  "instruction": {
    "clientInstructionId": 222222,
    "direction": "IN",
    "accountId": "U46377",
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "quantity": 1000,
    "positions": [
      {
        "tradingInstrumentDescription": {
          "securityIdType": "CUSIP",
          "securityId": "46090E103",
          "assetType": "STK"
        },
        "quantity": 2
      },
      {
        "tradingInstrumentDescription": {
          "securityIdType": "CUSIP",
          "securityId": "46090E101",
          "assetType": "STK"
        },
        "quantity": 2
      }
    ],      "currency": "USD"
    }
  }
{
  "instructionType": "FOP",
  "instruction": {
    "clientInstructionId": 1111111,
    "direction": "IN",
    "accountId": "U46377",
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "quantity": 1000,
    "positions": [
      {
        "tradingInstrumentDescription": {
          "securityIdType": "CUSIP",
          "securityId": "46090E103",
          "assetType": "STK"
        },
        "quantity": 2
      },
      {
        "tradingInstrumentDescription": {
          "securityIdType": "CUSIP",
          "securityId": "46090E101",
          "assetType": "STK"
        },
        "quantity": 2
      }
    ],      "currency": "USD"
    }
  }
}
```
