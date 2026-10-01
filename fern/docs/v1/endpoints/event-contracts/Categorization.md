# 分类

ForecastEx 预测合约按类别层级进行归类,以便于组织管理。

这些类别是元数据,而非可交易工具本身的固有属性——预计它们会随时间略有变化。

该类别树深达三层,其叶子(第 3 级类别)包含预测合约的"市场(Markets)"——即共享相同问题形式的一组可交易合约,例如"X 日期的联邦基金利率是否会超过 Y%"。

`/forecast/category/tree` 端点可用于检索完整的类别树。

返回事件合约类别与市场树

`GET /forecast/category/tree`

#### 请求对象

###### 无 Body 参数

#### Python

```python
import requests

url = "{{base-url}}/forecast/category/tree"

payload = {}
headers = {}

response = requests.request("GET", url, headers=headers, data=payload)

print(response.text)
```

#### Abap

```abap
curl --location --globoff '{{base-url}}/forecast/category/tree'
```

#### 响应对象

**categories:** List(列表)\
类别列表

**id:** String\
类别标识符

**name:** String\
类别名称

**parent\_id:** String\
父类别的标识符,可选

**markets:** List\
市场列表,可选

**name:** String\
市场名称

**symbol:** String\
市场代码

**exchange:** String\
市场交易所

**conid:** Integer\
市场合约标识符

**as\_of:** String\
数据检索的时间戳

```
{
    "categories": {
        "g78664": {
            "name": "Northeast",
            "parent_id": "g17457",
            "markets": [
                {
                    "name": "Northeastern US CPI",
                    "symbol": "RCNET",
                    "exchange": "FORECASTX",
                    "conid": 831072285,
                    "product_conid": 831072289
                }
            ]
        },
}
```
