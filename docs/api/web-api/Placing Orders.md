# 下单

首先，确保你已建立活跃的经纪会话（brokerage session），如[初始化经纪会话](/)所示。然后，向 `/iserver/account/{accountId}/orders` 端点发送 POST 请求。

**`Python`**

```python title="Python"
import requests

account_id = "DU123456"
url = f"https://localhost:5000/v1/api/iserver/account/{account_id}/orders"

payload = {
    "orders": [
        {
            "conid": 265598,
            "orderType": "LMT",
            "price": 165,
            "quantity": 100,
            "side": "BUY",
            "tif": "DAY"
        }
    ]
}

headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)

print(response.status_code)
print(response.json())
```

**`Java`**

```java title="Java"
import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;

public class Main {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newHttpClient();

        String accountId = "DU123456";
        String url = "https://localhost:5000/v1/api/iserver/account/" + accountId + "/orders";

        String payload = "{"
                + "\"orders\":[{"
                + "\"conid\":265598,"
                + "\"orderType\":\"LMT\","
                + "\"price\":165,"
                + "\"quantity\":100,"
                + "\"side\":\"BUY\","
                + "\"tif\":\"DAY\""
                + "}]"
                + "}";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString(payload))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Status: " + response.statusCode());
        System.out.println(response.body());
    }
}
```

**`JavaScript`**

```javascript title="JavaScript"
const axios = require('axios');

const accountId = "DU123456";
const url = `https://localhost:5000/v1/api/iserver/account/${accountId}/orders`;

const payload = {
    orders: [
        {
            conid: 265598,
            orderType: "LMT",
            price: 165,
            quantity: 100,
            side: "BUY",
            tif: "DAY"
        }
    ]
};

const headers = { "Content-Type": "application/json" };

axios.post(url, payload, { headers })
  .then(response => {
    console.log("Status:", response.status);
    console.log(response.data);
  })
  .catch(error => {
    console.error(error.response ? error.response.data : error.message);
  });
```

**`C#`**

```csharp title="C#"
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main(string[] args)
    {
        using var client = new HttpClient();

        var accountId = "DU123456";
        var url = $"https://localhost:5000/v1/api/iserver/account/{accountId}/orders";

        var payload = @"
        {
            ""orders"": [
                {
                    ""conid"": 265598,
                    ""orderType"": ""LMT"",
                    ""price"": 165,
                    ""quantity"": 100,
                    ""side"": ""BUY"",
                    ""tif"": ""DAY""
                }
            ]
        }";

        var content = new StringContent(payload, Encoding.UTF8, "application/json");

        var response = await client.PostAsync(url, content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine($"Status: {(int)response.StatusCode}");
        Console.WriteLine(responseBody);
    }
}
```

**`Go`**

```go title="Go"
package main

import (
	"bytes"
	"fmt"
	"io"
	"net/http"
)

func main() {
	accountId := "DU123456"
	url := fmt.Sprintf("https://localhost:5000/v1/api/iserver/account/%s/orders", accountId)

	payload := []byte(`{
		"orders": [
			{
				"conid": 265598,
				"orderType": "LMT",
				"price": 165,
				"quantity": 100,
				"side": "BUY",
				"tif": "DAY"
			}
		]
	}`)

	client := &http.Client{}

	req, err := http.NewRequest("POST", url, bytes.NewBuffer(payload))
	if err != nil {
		panic(err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	body, _ := io.ReadAll(resp.Body)
	fmt.Println("Status:", resp.StatusCode)
	fmt.Println(string(body))
}
```

**`PHP`**

```php title="PHP"
<?php

$accountId = "DU123456";
$url = "https://localhost:5000/v1/api/iserver/account/{$accountId}/orders";

$payload = json_encode([
    "orders" => [
        [
            "conid" => 265598,
            "orderType" => "LMT",
            "price" => 165,
            "quantity" => 100,
            "side" => "BUY",
            "tif" => "DAY"
        ]
    ]
]);

$headers = [
    "Content-Type: application/json"
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, $payload);
curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$response = curl_exec($ch);
$statusCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);

if ($response === false) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    echo "Status: $statusCode\n";
    echo $response;
}

curl_close($ch);
```

**`Ruby`**

```ruby title="Ruby"
require 'net/http'
require 'uri'
require 'json'

account_id = "DU123456"
url = URI("https://localhost:5000/v1/api/iserver/account/#{account_id}/orders")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request.body = {
    orders: [
        {
            conid: 265598,
            orderType: "LMT",
            price: 165,
            quantity: 100,
            side: "BUY",
            tif: "DAY"
        }
    ]
}.to_json

response = http.request(request)

puts "Status: #{response.code}"
puts response.body
```

**`Swift`**

```swift title="Swift"
import Foundation

let accountId = "DU123456"
let url = URL(string: "https://localhost:5000/v1/api/iserver/account/\(accountId)/orders")!

var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")

let payload: [String: Any] = [
    "orders": [
        [
            "conid": 265598,
            "orderType": "LMT",
            "price": 165,
            "quantity": 100,
            "side": "BUY",
            "tif": "DAY"
        ]
    ]
]

request.httpBody = try! JSONSerialization.data(withJSONObject: payload, options: [])

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \(error)")
        return
    }
    if let httpResponse = response as? HTTPURLResponse {
        print("Status: \(httpResponse.statusCode)")
    }
    if let data = data, let responseString = String(data: data, encoding: .utf8) {
        print(responseString)
    }
}
task.resume()

RunLoop.main.run(until: Date(timeIntervalSinceNow: 5))
```
