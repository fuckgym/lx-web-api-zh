# 持仓划转

使用 `/gw/api/v1/external-asset-transfers` 端点在 IBKR 经纪账户与外部账户之间划转持仓。可用的划转方式将因居住国家/地区以及所划转资产的币种而异。

## FOP

FOP (Free of Payment -US) 是一种用于划转美国证券、股票、ETF 和固定收益产品的方式。交收通过存管信托公司(Depository Trust Company,DTC)进行。

发起 FOP 划转时,您的全部资产将从第三方经纪商划转至您的账户(转入),或从您的 IBKR 账户划转至第三方经纪商。账户名称、纳税人识别号(Tax Identification Number)和客户类型(即个人、联名)必须与第三方经纪商账户完全一致,划转才能进行。

**转入划转**(将持仓划转至 IBKR):划转由转出方经纪商发起。可使用 API 创建通知,使 IBKR 知悉即将转入的划转。如果未收到证券,IBKR 的 FOP 接收通知将在 5 个工作日后过期。通知一旦过期,IBKR 将不再接收这些股票。

**转出划转**(将持仓划出 IBKR 账户):从您的账户划转至另一家属于 DTC 会员的美国银行或经纪商(转出划转)。

有关 FOP 的更多信息,请参阅此[链接](https://ibkrguides.com/adminportal/transferandpay/foptrans.htm)。

### Schema

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| clientInstructionId | Number;最多 20 个字符。 | 与请求关联的唯一标识符。 – **clientInstructionId** 不能重复使用。 – IBKR 希望 **clientInstructionId** 按顺序编号,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。 |
| instructionType | FOP | 交易类型。 |
| direction | IN  OUT | 指示这是转入还是转出划转。  **IN** = 转入 IBKR  **OUT**= 划转至第三方经纪商。 |
| accountId | String | 发起划转的客户账户的 IBKR 账号。 |
| contraBrokerAccountId | String | 在第三方经纪商处的客户账号。 |
| contraBrokerDtcCode | 取值请使用 [`/gw/api/v1/enumerations/{enumerationType}`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)。 | 第三方机构的 DTC 号码。 |
| securityId | String | 所划转证券的 CUSIP/ISIN 号码。 |
| quantity | Number | 转入/转出的股票数量 |
| asset\_type | BILL BOND CASH  FUND  OPT  STK  WAR | 产品类型。 |
| securityIdType | CUSIP  ISIN  CASH | 用于确定所提供的 securityId 的类型。为 ISIN 或 CUSIP。 |
| conId | String | 由 Interactive Brokers 分配的唯一合约 ID。 |
| currency | USD | 所划转资产的币种。 |

### 示例

提交请求有两种方式(securityId **或** conId)

***方式 1:使用 securityId(CUSIP 或 ISIN)***

```
POST /gw/api/v2/external-asset-transfers
{
  "instructionType": "FOP",
  "instruction": {
    "clientInstructionId": 7013039,
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

***方式 2:使用 conId***

```
POST /gw/api/v2/external-asset-transfers

{
  "instructionType": "fop",
  "instruction": {
    "clientInstructionId": 7013038,
    "direction": "IN",
    "accountId": "U46377",
    "contraBrokerAccountId": "12345678A",
    "contraBrokerDtcCode": "534",
    "quantity": 1000,
    "positions": [
      {
        "conid": 272093,
        "quantity": 1
      },
      {
        "conid": 272092223,
        "quantity": 1
      }
    ],
  }
}
```

## DWAC

DWAC (Deposit Withdrawal at Custodian,托管机构存入/提取)可用于划转持有在过户代理机构处的新股或股票证书。当个人持有因股票期权或员工持股计划而获得的公司发行股票时,通常会使用这种方式。

DWAC(Deposit/Withdrawal at Custodian,托管机构存入/提取)是一种在过户代理机构与您的账户之间划转证券的电子方式,由 DTC(Depository Trust Company,存管信托公司)提供支持。

有关 DWAC 的更多信息,请参阅此[链接](https://ibkrguides.com/adminportal/transferandpay/dwactrans.htm)。

### Schema

| 名称 | 值 | 描述 |
| --- | --- | --- |
| clientInstructionId | Number;最多 20 个字符。 | 与请求关联的唯一标识符。 – **clientInstructionId** 不能重复使用。 – IBKR 希望 **clientInstructionId** 按顺序编号,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。 |
| instructionType | DWAC | 交易类型。 |
| direction | IN  OUT | 指示这是转入还是转出划转。  **IN** = 转入 IBKR  **OUT**= 划转至第三方经纪商。 |
| accountId | String;最多 32 个字符。 | 发起划转的客户账户的 IBKR 账号。 |
| contraBrokerAccountId | String;最多 20 个字符。 | 在第三方经纪商处的客户账号。 |
| contraBrokerTaxId | String;最多 25 个字符。 | 与对手方(Contra)关联的纳税人识别号(Tax ID)。 |
| securityId | String | 所划转证券的 CUSIP/ISIN 号码。 |
| quantity | Number | 转入/转出的股票数量 |
| assetType | BILL  BOND  CASH  FUND  OPT  STK  WAR | 产品类型。 |
| securityIdType | CUSIP  ISIN  CASH | 用于确定所提供的 securityId 的类型。为 ISIN 或 CUSIP。 |
| conId | String | 由 Interactive Brokers 分配的唯一合约 ID。 |
| currency | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 所划转资产的币种。 |
| referenceId | String | 由 Interactive Brokers 分配的唯一合约 ID。 |
| accountTitle | String;最多 140 个字符。 | IBKR 接收账户的账户名称。 |

### 示例

```
POST /gw/api/v1/external-asset-transfers

{
  "instructionType": "DWAC",
  "instruction": {
    "clientInstructionId": 7013036,
    "direction": "IN",
    "accountId": "U1001095",
    "contraBrokerAccountId": "12345678A",
    "contraBrokerTaxId": "123456789",
    "quantity": 1000,
    "accountTitle": "Special Company Holding LLC",
    "referenceId": "refId",
    "tradingInstrument": {
      "conId": 12123,
      "currency": "USD"
    }
  }
}
```

## ACATS

ACATS 是一套将客户账户中的资产从一家美国经纪公司或银行转移至另一家的自动化、标准化流程系统。ACATS 支持 USD 现金、美国股票、期权、固定收益产品、美国共同基金以及非美国股票。

美国的自动客户账户转移服务(Automated Customer Account Transfer Service,ACATS)通过美国国家证券清算公司(National Securities Clearing Corporation,NSCC),将持有一家经纪商处的美国股票、权证、期权、美国共同基金、美国债券和现金转移至我们这里。API 目前仅支持 **FULL**(全部)划转。部分划转可在 IBKR Portal 中办理。

* **处理时间:** 美国证券和 USD 现金的划转需要 4 至 8 天,且可立即进行交易。提款限制请参阅"更多信息"。非美国证券可能需要更长时间。
* **费用**:IBKR 将转嫁您当前经纪商收取的任何费用。相关说明请参阅"更多信息"。

有关 ACATS 的更多信息,请参阅此[链接](https://ibkrguides.com/adminportal/transferandpay/acatstrans.htm)。

### Schema

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| clientInstructionId | Number;最多 20 个字符。 | 与请求关联的唯一标识符。 – **clientInstructionId** 不能重复使用。 – IBKR 希望 **clientInstructionId** 按顺序编号,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。 |
| instructionType | EXTERNAL\_POSITION\_TRANSFER | 交易类型。 |
| type | FULL | 该值始终为 FULL。 |
| subType | ACATS | 用于发起划转的方式。[详情](https://www.interactivebrokers.com/en/index.php?f=1544\&p=transfer):划转方式概述。 |
| brokerId | 取值请使用 [`/gw/api/v1/enumerations/{enumerationType}`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)。 | 转出机构的 DTC 号码。 |
| brokerName | 取值请使用 [`/gw/api/v1/enumerations/{enumerationType}`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)。 | 转出机构的名称。 |
| accountAtBroker | String | 在转出机构处的客户账号。 |
| accountId | String | 发起划转的客户账户的 IBKR 账号。 |
| signature | String | 签名应与申请人的名字、中间名首字母(如适用)、姓氏、姓氏后缀(如适用)一致。\*数据区分大小写和空格。 |
| sourceIRAType | | 如果划转发生在**两个** IRA 账户之间,请指定 IRA 类型。 |

### 示例

```
POST /gw/api/v1/external-asset-transfers

{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013060,
    "type": "FULL",
    "subType": "ACATS",
    "brokerId": "0226",
    "brokerName": "Wall Street Financial Group",
    "accountAtBroker": "SOL12345",
    "sourceIRAType": "RO",
    "accountId": "U1225448",
    "signature": "John Tester"
  }
}
```

## ATON

ATON 是一种电子划转方式,支持在加拿大的金融机构之间转移客户账户。ATON 支持划转加拿大股票、加拿大期权、加拿大现金、美国股票、美国期权、美国权证和美国现金。

通过 ATON(Account Transfer on Notification,通知式账户划转,即加拿大版的 ACATS),您可以将持有一家经纪商处的美国或加拿大股票、期权和现金转移至我们这里。

* **处理时间:** 大多数资产在 3 至 8 个工作日内完成划转,但具体时间因您的经纪商而异。
* **费用**:您当前的经纪商可能会对转出划转收取费用。相关说明请参阅"更多信息"。

有关 ATON 的更多信息,请参阅此[链接](https://ibkrguides.com/adminportal/transferandpay/atontrans.htm)。

### Schema

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| clientInstructionId | Number;最多 20 个字符。 | 与请求关联的唯一标识符。 – **clientInstructionId** 不能重复使用。 – IBKR 希望 **clientInstructionId** 按顺序编号,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。 |
| instructionType | EXTERNAL\_POSITION\_TRANSFER | 交易类型。 |
| type | FULL | 该值始终为 FULL。 |
| subType | ACATS | 用于发起划转的方式。[详情](https://www.interactivebrokers.com/en/index.php?f=1544\&p=transfer):划转方式概述。 |
| brokerId | 取值请使用 [`/gw/api/v1/enumerations/{enumerationType}`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)。 | 转出机构的 DTC 号码。 |
| brokerName | 取值请使用 [`/gw/api/v1/enumerations/{enumerationType}`](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/get-enumerations)。 | 转出机构的名称。 |
| accountAtBroker | String | 在转出机构处的客户账号。 |
| accountId | String | 发起划转的客户账户的 IBKR 账号。 |
| signature | String | 签名应与申请人的名字、中间名首字母(如适用)、姓氏、姓氏后缀(如适用)一致。\*数据区分大小写和空格。 |

### 示例

```
POST /gw/api/v1/external-asset-transfers

{
  "instructionType": "EXTERNAL_POSITION_TRANSFER",
  "instruction": {
    "clientInstructionId": 7013060,
    "type": "FULL",
    "subType": "ATON",
    "brokerId": "3265",
    "brokerName": "Wall Street Financial Group",
    "accountAtBroker": "SOL12345",
    "accountId": "U1225448",
    "signature": "John Tester"
  }
}
```

## COMPLEX\_ASSET\_TRANSFER

基础 FOP (Free of Payment,免费划付)是一种从通常位于美国以外的金融机构划转资产的方式,可用于划转全球股票、固定收益产品、结构化产品和期权。

对于基础 FOP,IBKR 将与加拿大、欧洲、中东/非洲、亚太地区的金融机构就结算指示进行协调,以便在免费划付(free-of-payment)基础上划转全球股票、固定收益产品、结构化产品和期权。

为加快划转流程,请通过 API 将划转请求的结算指示传递给 IBKR。结算数据将包含在 `nonDisclosedDetail.` 中。该服务仅可按需申请;如有意使用,请联系您的 IBKR 代表。

* **转入划转**(将持仓划转至 IBKR):划转由转出方经纪商发起。可使用 API 创建通知,使 IBKR 知悉即将转入的划转。
* **转出划转**(将持仓划出 IBKR 账户):从您的账户划转至另一家银行或经纪商。

### Schema

| 名称 | 类型 | 描述 |
| --- | --- | --- |
| clientInstructionId | Number;最多 20 个字符。 | 与请求关联的唯一标识符。 – **clientInstructionId** 不能重复使用。 – IBKR 希望 **clientInstructionId** 按顺序编号,例如 1、2、3、4 或 100、101、102、103,而不是 777、589、123。 |
| instructionType | COMPLEX\_ASSET\_TRANSFER | 交易类型。 |
| direction | IN  OUT | 指示这是转入还是转出划转。  **IN** = 转入 IBKR  **OUT**= 划转至第三方经纪商。 |
| accountId | String;最多 32 个字符。 | 发起划转的客户账户的 IBKR 账号。 |
| securityId | String | 所划转证券的 CUSIP/ISIN 号码。 |
| quantity | Number | 转入/转出的股票数量 |
| assetType | BILL BOND  CASH FUND  OPT  STK  WAR | 产品类型。 |
| securityIdType | CUSIP  ISIN  CASH | 用于确定所提供的 securityId 的类型。为 ISIN 或 CUSIP。 |
| conId | String | 由 Interactive Brokers 分配的唯一合约 ID。 |
| currency | 货币代码(3 位)。可用货币可参见[此处](https://www.interactivebrokers.com/en/support/fund-my-account.php)。 | 所划转资产的币种。 |
| accountType | INDIVIDUAL  JOINT  ORG  TRUST | 账户类型(在金融机构处) |
| brokerName | 使用 `/api/v1/enumerations/`complex-asset-transfer 获取可接受的取值。 | 金融机构名称 |
| tradeDate | YYYY-MM-DD | 当前日期或未来日期。交易日(tradeDate)不得晚于结算日(settleDate)。日期提前不得超过 30 天。 |
| settleDate | YYYY-MM-DD | 不得早于当前日期。 |
| depositoryId | String | 在托管机构的 ID。 |
| psetBic | String | 结算地点(Place of Settlement) |
| reagDeagBic | String | 交付代理(delivering agent)的 ID 代码。 |
| buyrSellBic | String | 买方或卖方的 ID 代码。 |
| memberAccountId | String | 市场账户 ID。 |
| safekeepingAccount | String | 保管账户(Safekeeping Account) |
| brokerAccountId | String | 在第三方经纪商处的客户账号。 |
| country | Alpha-3 代码(ISO) | 对手方经纪商所在的国家/地区。 |
| contractName | String;最多 64 个字符。 | 对手方经纪商联系人的姓名。 |
| contactEmail | String;最多 64 个字符。 | 对手方经纪商联系人的电子邮箱。注意:我们使用 REGEX 验证电子邮箱。验证规则见[此处](https://www.interactivebrokers.com/campus/ibkr-api/account-management-api/#required-42)。 |
| contactPhone | String;最多 16 个字符。 | 对手方经纪商联系人的电话号码。注意:我们使用 Google API 验证电话号码。验证规则见[此处](https://www.interactivebrokers.com/campus/ibkr-api/account-management-api/#dependent-on-type-43)。 |

### 无结算数据示例

提交请求有两种方式(securityId **或** conId)

***方式 1:基于 conID 的请求***

```
POST /gw/api/v2/external-asset-transfers

{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "clientInstructionId": "7013040",
    "direction": "IN",
    "accountId": "U399192",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerName": "JP MORGAN",
      "depositoryId": "DTC0352",
      "brokerAccountId": "3456567678578",
      "country": "US",
      "contactName": "John Smith",
      "contactEmail": "a@gmail.com",
      "contactPhone": "2039126155"
    },
    "positions": [
      {
        "conid": 272093,
        "quantity": 1
      },
      {
        "conid": 272092223,
        "quantity": 1
      }
    ]
  }
}
```

**方式 2:基于 securityId 的请求**

```
POST /gw/api/v2/external-asset-transfers

{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "clientInstructionId": "7013042",
    "direction": "IN",
    "accountId": "U399192",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerName": "JP MORGAN",
      "depositoryId": "DTC0352",
      "brokerAccountId": "3456567678578",
      "country": "US",
      "contactName": "John Smith",
      "contactEmail": "a@gmail.com",
      "contactPhone": "2039126155"
    },
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
    ]
  }
}
```

### 含结算数据示例

提交请求有两种方式(securityId **或** conId)\
***方式 1:基于 conID 的请求***

```
POST /gw/api/v2/external-asset-transfers
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "clientInstructionId": "7013041",
    "direction": "IN",
    "accountId": "U399192",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerName": "JP MORGAN",
      "depositoryId": "DTC0352",
      "brokerAccountId": "3456567678578",
      "country": "US",
      "contactName": "John Smith",
      "contactEmail": "a@gmail.com",
      "contactPhone": "2039126155"
    },
    "positions": [
      {
        "conid": 272093,
        "quantity": 1
      },
      {
        "conid": 272092223,
        "quantity": 1
      }
    ],
    "nonDisclosedDetail": {
      "tradeDate": "2018-03-20T09:12:13Z",
      "settleDate": "2018-03-20T09:12:13Z",
      "psetBic": "OCSDATWWXXX",
      "reagDeagBic": "TMBECH22XXX",
      "buyerSellBic": "TMBECH22XXX",
      "memberAccountId": "OCSD212100",
      "safeKeepingAccountId": "OCSD212100"
    }
  }
}
```

***方式 2:基于 Security Id 的请求***

```
POST /gw/api/v2/external-asset-transfers
{
  "instructionType": "COMPLEX_ASSET_TRANSFER",
  "instruction": {
    "clientInstructionId": "7013041",
    "direction": "IN",
    "accountId": "U399192",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerName": "JP MORGAN",
      "depositoryId": "DTC0352",
      "brokerAccountId": "3456567678578",
      "country": "US",
      "contactName": "John Smith",
      "contactEmail": "a@gmail.com",
      "contactPhone": "2039126155"
    },
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
    ],
    "nonDisclosedDetail": {
      "tradeDate": "2018-03-20T09:12:13Z",
      "settleDate": "2018-03-20T09:12:13Z",
      "psetBic": "OCSDATWWXXX",
      "reagDeagBic": "TMBECH22XXX",
      "buyerSellBic": "TMBECH22XXX",
      "memberAccountId": "OCSD212100",
      "safeKeepingAccountId": "OCSD212100"
    }
  }
}
```

### 在 2 个 IBKR 账户之间划转时的含结算数据示例

仅适用于使用 FOP 在 2 个不同的 IBKR 账户之间划转资产的非披露(Non-Disclosed)客户。

如果 `brokerName= 'IB'` 或 '`INTERNAL`',则需要提供 `accountTitle` 和 `accountIdAtCurrentBroker`。

提交请求有两种方式(securityId **或** conId)\
***方式 1:基于 conID 的请求***

```
POST /gw/api/v2/external-asset-transfers

{
  "instructionType": "complex_asset_transfer",
  "instruction": {
    "clientInstructionId": 7013041,
    "direction": "IN",
    "accountId": "U399192",
    "quantity": 10,
     "accountIdAtCurrentBroker": "U123456",
    "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerName": "INTERNAL",
      "depositoryId": "1234",
      "brokerAccountId": "as3456567678578N",
      "country": "United States",
      "contactName": "as",
      "contactEmail": "a@gmail.com",
      "contactPhone": "2039126155"
      "accountTitle": "My Account Title"

    },
    "positions": [
      {
        "conid": 272093,
        "quantity": 1
      },
      {
        "conid": 272092223,
        "quantity": 1
      }
    ],
    "nonDisclosedDetail": {
      "tradeDate": "2018-03-20T09:12:13Z",
      "settleDate": "2018-03-20T09:12:13Z",
      "psetBic": "OCSDATWWXXX",
      "reagDeagBic": "TMBECH22XXX",
      "buyerSellBic": "TMBECH22XXX",
      "memberAccountId": "OCSD212100",
      "safeKeepingAccountId": "OCSD212100"
    }
  }
}
```

***方式 2:基于 Security Id 的请求***

```
POST /gw/api/v2/external-asset-transfers
{
  "instructionType": "complex_asset_transfer",
  "instruction": {
    "clientInstructionId": 7013041,
    "direction": "IN",
    "accountId": "U399192",
    "quantity": 10,
     "accountIdAtCurrentBroker": "U123456",
      "contraBrokerInfo": {
      "accountType": "ORG",
      "brokerName": "INTERNAL",
      "depositoryId": "1234",
      "brokerAccountId": "as3456567678578N",
      "country": "United States",
      "contactName": "as",
      "contactEmail": "a@gmail.com",
      "contactPhone": "2039126155",
       "accountTitle": "My Account Title"},
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
    ],
    "nonDisclosedDetail": {
      "tradeDate": "2018-03-20T09:12:13Z",
      "settleDate": "2018-03-20T09:12:13Z",
      "psetBic": "OCSDATWWXXX",
      "reagDeagBic": "TMBECH22XXX",
      "buyerSellBic": "TMBECH22XXX",
      "memberAccountId": "OCSD212100",
      "safeKeepingAccountId": "OCSD212100"
    }
  }
}
```

### 常见错误

| **错误代码** | **错误消息示例:** |
| --- | --- |
| **上传有效性检查** | |
| ERROR\_BROKER\_NAME\_NOT\_FOUND | 错误:未找到经纪商名称 HSBCSCB。请查询 [/api/v1/enumerations/complex-asset-transfer}](https://ibkrcampus.com/docs/web-api/api-reference/account-management/account-management-utilities/list-enumerations-complex-asset-transfer)以获取所有可接受的经纪商列表。 |
| NON\_DISCLOSED\_VALIDATION\_FAILED\_FOR\_COMPLEX\_ASSET\_TRANSFER | 非披露客户信息不完整,在 pset BIC:CIKBBEBBXX 的以下部分字段中检测到 null/空值——reagDeagBic、buyrSellBic、memberAccountId、safekeepingAccount。 |
| CORRUPT\_DATA\_INVALID\_ACCT | 账户 UXXXXX 不存在 |
| ERROR\_ACCOUNT\_CP\_NOT\_RELATED | 账户 UXXXXX 与对手方 **\<CounterPartyNameHere>** 无关联 |
| UNSUPPORTED\_CHARACTERS\_ERROR | 值包含非法字符。不支持该字符集。 |
| CORRUPT\_DATA\_DUBPLICATE\_CP | 对手方 **\<CounterPartyNameHere>** 的 counterPartyTranId 1195814 已存在 |
| **处理有效性检查** | |
| **错误代码:** | **错误消息示例:** |
| NOT\_OPEN\_ACCOUNT | 账户 UXXXXX 未开通 |
| COMPLEX\_ASSET \_TRANSFER\_NOT\_ALLOWED | acctid:UXXXXX 的 isTransferAllowed 为 fales;transfer\_method:FOP quantity:80 isFullTransfer:false Direction:OUT clearingBrokerID:JP MORGAN ibConId:34234 |

## 持仓划转请求的状态

对于 `fop` 和 `complexAssetTransfer`,IBKR 返回的响应将包含 `clearingState` 和 `status`。status 返回总体状态,`clearingState` 则反映划转流程所处的阶段。

| **clearing\_state** | **status** | **备注** |
| --- | --- | --- |
| REJECTED | REJECTED | 划转请求已被拒绝。 |
| POSTED | PROCESSED | 您的划转请求中的资产交付正在进行中。市场指示已发出,一旦与您的接收经纪商完成匹配,即进行结算。 |
| SETTLED | PROCESSED | 您的划转请求已完成。 |
| PROCESSED | PROCESSED | 划转请求已处理。 |
| PARTIALLYSETTLED | PENDING | 您的划转请求中的部分资产已结算。 |
| APPROVED | PENDING | 您的划转请求已获批准进行处理。 |
| SETTLEMENT\_INSTRUCTIONS\_TRANSMITTED | PENDING | 划转指示已提交至对手方。 |
| FULLYENTERED | PENDING | 已收到您的划转请求,正在由划转部门审核。如果您尚未通知您的接收经纪商,请立即通知。 |
| BROKER\_CONTACTED | PENDING | 我们已联系您的经纪商/银行,正在等待其回复以确认您的划转请求。对方必须同意划转详情,我们才能继续处理。如果您尚未通知对方,请立即通知。 |
| ACKNOWLEDGED | PENDING | IBKR 已收到划转请求。 |
