### Requirement
`node 18.0.0` and higher    
otherwise you need to polyfill `fetch` with `globalThis`    
also you need to enable node ES6 `module`    
package.json -> `"type": "module"`

### Installation
`npm install binance-connector`

### Usage
```js
import { Futures } from "binance-connector"
```

### Examples
**Note: Everything is`Promised` so you need to do `.then` or `await`**

- Rest (Public)

```js
import { Futures } from "./index.js"

let myFuture = new Futures({
    isTestNet: true,
})

// exchange info
myFuture.exchangeInfo()

// candles data
myFuture.klines({
    interval: "1m",
    symbol: "BTCUSDT",
    limit: 10,
})
```

- Rest (Private)

```js
import { Futures } from "./index.js"

let myFuture = new Futures({
    api_key: "MyApiKey",
    api_secret: "MyApiSecret",
    isTestNet: true,
})

// get account balance
myFuture.balance()

// place new order
myFuture.newOrder({
    symbol: "BTCUSDT",
    side: "BUY",
    type: "MARKET",
    quantity: 0.01,
})
```

- Websocket (Public)

```js
import { Futures } from "./index.js"

let myFuture = new Futures({
    isTestNet: true,
})

// subscribe to two market data
myFuture.ws.subscribe(["btcusdt@kline_1m", "ethusdt@kline_3m"], 1, "MyMarketData")

// listen for data coming from binance
myFuture.ws.addListener("MyMarketData", (socket) => {

    socket.addEventListener("message", (event) => {
        let data = event.data
        data = JSON.parse(data)

        console.log(data)
    })

})
```

- Websocket (Private)

```js
import { Futures } from "./index.js"

let myFuture = new Futures({
    api_key: "MyApiKey",
    api_secret: "MyApiSecret",
    isTestNet: true,
})

async function Run() {

    // 1- get the listenKey
    let listenKey = await myFuture.newListenKey()

    // 2- subscribe to User Data Stream
    myFuture.ws.userStream(listenKey, "MyUserData")

    // 3- Listen for data coming from binance
    myFuture.ws.addListener("MyUserData", (socket) => {
        
        socket.addEventListener("message", (event) => {
            let data = event.data
            data = JSON.parse(data)

            console.log(data)
        })

    })
}
Run()
```


### Types & Intellisense
![img1](https://github.com/mhasanjb/binance-connector/blob/main/images/img01.png "img1")
![img2](https://github.com/mhasanjb/binance-connector/blob/main/images/img02.png "img2")


### Structure
`binance-connector` contains this components    

| Component     | Info               | Description   |
| ------------- |-------------       | ------------- |
| Futures       | Futures API        |               |
| Websocket     | Abstract Websocket | it can connect to any of binances ws endpoints |
| Http          | Abstract Http      | it can request to any of binaces rest endpoints |


### Notes
- ws data are either `Buffer` OR `Raw string`    
so you need to `JSON.parse` them    
example    

```js
import { Futures } from "binance-connector"

let myFuture = new Futures({
    isTestNet: true,
})

myFuture.ws.subscribe(["btcusdt@kline_1m"], 1)

myFuture.ws.addListener("DATA", (socket) => {

    // Buffer
    socket.addListener("message", (data, siBinary) => {
        console.log(data)
    })

    // Raw string data
    socket.addEventListener("message", (event) => {
        // Its raw
        let data = event.data

        // Now its parsed
        data = JSON.parse(data)
    })

})
```

- You don't need to import Http OR Websocket directly    
you can access them with `.http.` OR `.ws.`    
example    

```js
import { Futures } from "binance-connector"

let myFuture = new Futures({
    isTestNet: true,
})

// websocket example
myFuture.ws.subscribe(["btcusdt@kline_1m"], 1)

// http example
myFuture.http.publicGET("/fapi/v1/exchangeInfo")
```

### Documentation
[Binance Doc](https://binance-docs.github.io/apidocs/futures/en/#general-info)

### TODO
- Spot and other endpoints