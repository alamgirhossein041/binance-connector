import { Futures } from "./index.js"

let myFuture = new Futures({
    api_key: "MyApiKey",
    api_secret: "MyApiSecret",
    isTestNet: true,
})

myFuture.newOrder({
    
})

// 1- get the listenKey
let listenKey
myFuture.newListenKey().then(d => d = listenKey)
console.log(listenKey)

// 2- subscribe to two market data
// myFuture.ws.userStream("")

// // 3- listen to data coming from binance
// myFuture.ws.addListener("MyMarketData", (socket) => {

//     socket.addEventListener("message", (event) => {
//         let data = event.data
//         data = JSON.parse(data)

//         console.log(data)
//     })

// })