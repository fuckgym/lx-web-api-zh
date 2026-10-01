# 初始化经纪会话

以 `/iserver` 路径为前缀的端点都需要经纪会话（brokerage session）。要初始化经纪会话，请向 `/iserver/auth/ssodh/init` 端点发送请求。

**`Python`**

```python title="Python"
import requests

url = "https://localhost:5000/v1/api/iserver/auth/ssodh/init"
payload = {}
headers = {"Content-Type": "application/json"}

response = requests.post(url, json=payload, headers=headers)
```

**`JavaScript`**

```javascript title="JavaScript"
const axios = require('axios');

const url = "https://localhost:5000/v1/api/iserver/auth/ssodh/init";
const payload = {};
const headers = { "Content-Type": "application/json" };

axios.post(url, payload, { headers })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
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

        String url = "https://localhost:5000/v1/api/iserver/auth/ssodh/init";

        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(url))
                .header("Content-Type", "application/json")
                .POST(HttpRequest.BodyPublishers.ofString("{}"))
                .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println(response.body());
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
	url := "https://localhost:5000/v1/api/iserver/auth/ssodh/init"
	payload := []byte("{}")

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
	fmt.Println(string(body))
}
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

        var url = "https://localhost:5000/v1/api/iserver/auth/ssodh/init";
        var content = new StringContent("{}", Encoding.UTF8, "application/json");

        var response = await client.PostAsync(url, content);
        var responseBody = await response.Content.ReadAsStringAsync();

        Console.WriteLine(responseBody);
    }
}
```

**`PHP`**

```php title="PHP"
<?php

$url = "https://localhost:5000/v1/api/iserver/auth/ssodh/init";
$payload = json_encode([]);

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

if ($response === false) {
    echo 'Curl error: ' . curl_error($ch);
} else {
    echo $response;
}

curl_close($ch);
```

**`Ruby`**

```ruby title="Ruby"
require 'net/http'
require 'uri'
require 'json'

url = URI("https://localhost:5000/v1/api/iserver/auth/ssodh/init")

http = Net::HTTP.new(url.host, url.port)
http.use_ssl = true

request = Net::HTTP::Post.new(url)
request["Content-Type"] = "application/json"
request.body = {}.to_json

response = http.request(request)

puts response.body
```

**`Swift`**

```swift title="Swift"
import Foundation

let url = URL(string: "https://localhost:5000/v1/api/iserver/auth/ssodh/init")!

var request = URLRequest(url: url)
request.httpMethod = "POST"
request.setValue("application/json", forHTTPHeaderField: "Content-Type")
request.httpBody = try! JSONSerialization.data(withJSONObject: [:], options: [])

let task = URLSession.shared.dataTask(with: request) { data, response, error in
    if let error = error {
        print("Error: \(error)")
        return
    }
    if let data = data, let responseString = String(data: data, encoding: .utf8) {
        print(responseString)
    }
}
task.resume()

RunLoop.main.run(until: Date(timeIntervalSinceNow: 5))
```
