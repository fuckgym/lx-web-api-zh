# 获取市场数据

市场数据可以通过对 `/iserver/marketdata/snapshot` 端点发起 `GET` 请求来获取。该端点要求提供以逗号分隔的 conid 列表,即合约 ID(Contract ID)。可以通过对 `/trsrv/stocks/` 端点发起 `GET` 请求来确定这些 ID。fields 表示应返回哪些数据字段。

有关合约 ID 的更多信息,请参见[此文](/web-api/trading/instrument-discovery/contract-i-ds)。

有关市场数据端点的更多信息,请参见[此文](/web-api/trading/market-data/top-of-book-snapshots)。

> **警告**
>
> 对 `/iserver/marketdata/snapshot` 端点的首次请求不会返回任何数据。因此,必须至少请求该端点两次才能返回所需的市场数据。初始响应将返回所请求的 conids。

**`Python`**

```python title="Python"
import requests

conids = "265598,8314"
fields = "31,7059,84,88,86,85"

url = "https://localhost:5000/v1/api/iserver/marketdata/snapshot"

params = {
    "conids": conids,
    "fields": fields
}

response = requests.get(url, params=params)

print(response.status_code)
print(response.json())
```

**`Java`**

```java title="Java"
import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

public class MarketDataSnapshot {

    public static void main(String[] args) throws Exception {
        String conids = "265598,8314";
        String fields = "31,7059,84,88,86,85";

        URL url = new URL("https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids="
                + conids + "&fields=" + fields);

        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestMethod("GET");

        int status = conn.getResponseCode();
        BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
        String inputLine;
        StringBuilder response = new StringBuilder();
        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();

        System.out.println(status);
        System.out.println(response.toString());
    }
}
```

**`JavaScript`**

```javascript title="JavaScript"
const conids = "265598,8314";
const fields = "31,7059,84,88,86,85";

const url = `https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=${conids}&fields=${fields}`;

fetch(url)
  .then(response => {
    console.log(response.status);
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error(error);
  });
```

**`C#`**

```csharp title="C#"
using System;
using System.Net.Http;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        using var client = new HttpClient();

        string conids = "265598,8314";
        string fields = "31,7059,84,88,86,85";

        string url = $"https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids={conids}&fields={fields}";

        HttpResponseMessage response = await client.GetAsync(url);
        string content = await response.Content.ReadAsStringAsync();

        Console.WriteLine((int)response.StatusCode);
        Console.WriteLine(content);
    }
}
```

**`Go`**

```go title="Go"
package main

import (
	"fmt"
	"io"
	"net/http"
)

func main() {
	client := &http.Client{}

	url := "https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=265598,8314&fields=31,7059,84,88,86,85"

	resp, err := client.Get(url)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)

	fmt.Println(resp.StatusCode)
	fmt.Println(string(body))
}
```

**`PHP`**

```php title="PHP"
<?php

$conids = "265598,8314";
$fields = "31,7059,84,88,86,85";

$url = "https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids={$conids}&fields={$fields}";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

curl_close($ch);

echo $httpCode . "\n";
echo $response . "\n";
```

**`Ruby`**

```ruby title="Ruby"
require 'net/http'
require 'uri'

conids = "265598,8314"
fields = "31,7059,84,88,86,85"

uri = URI("https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=#{conids}&fields=#{fields}")

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri)

response = http.request(request)

puts response.code
puts response.body
```

**`Swift`**

```swift title="Swift"
import Foundation

let conids = "265598,8314"
let fields = "31,7059,84,88,86,85"

guard let url = URL(string: "https://localhost:5000/v1/api/iserver/marketdata/snapshot?conids=\(conids)&fields=\(fields)") else {
    fatalError("Invalid URL")
}

var request = URLRequest(url: url)
request.httpMethod = "GET"

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let httpResponse = response as? HTTPURLResponse {
        print(httpResponse.statusCode)
    }
    if let data = data, let responseString = String(data: data, encoding: .utf8) {
        print(responseString)
    }
    if let error = error {
        print("Error: \(error)")
    }
}

task.resume()
```
