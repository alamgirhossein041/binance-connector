import { Futures } from "./index.js"
import { config } from "./config.js"

let myFuture = new Futures({
    api_key: config.TEST_API_KEY,
    api_secret: config.TEST_API_SECRET,
    isTestNet: true,
})

async function Run() {
    let reqListenKey = await myFuture.newListenKey()
    let listenKey = reqListenKey.listenKey
    console.log(listenKey)
}
Run()