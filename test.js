import { Futures } from "./index.js"
import { config } from "./config.js"

let myFuture = new Futures({
    api_key: config.TEST_API_KEY,
    api_secret: config.TEST_API_SECRET,
    isTestNet: true,
})

async function Run() {
    let klines = await myFuture.klines({
        interval: "1m",
        symbol: "BTCUSDT",
        limit: 10
    })
    console.log(klines)
}
Run()