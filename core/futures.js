import { Websocket } from "./websocket.js"
import { Http } from "./http.js"
import("../types/futures.type.js")

import { config } from "../config.js"

export class Futures {
    
    ApiMap = {
        baseURL: "https://fapi.binance.com",
        baseURLTest: "https://testnet.binancefuture.com",
        wsAuthURL: "wss://fstream-auth.binance.com",
        wsBaseURL: "wss://fstream.binance.com",
        wsBaseURLTest: "wss://stream.binancefuture.com",
    }

    timestamp = Date.now()

    /**
     * @param {Constructor} options
     */
    constructor(options = {}) {

        const OPTIONS = {
            ...options,
            ...this.ApiMap,
            timestamp: this.timestamp,
        }

        // Coming from constructor
        this.api_key    = options.api_key
        this.api_secret = options.api_secret
        this.recvWindow = options.recvWindow
        this.isTestNet  = options.isTestNet

        // Default values
        this.recvWindow = this.recvWindow ?? 5000
        this.isTestNet  = this.isTestNet  ?? false

        // Websocket
        this.ws = new Websocket(OPTIONS)

        // Utils
        this.http = new Http(OPTIONS)
    }

    /**
     * @param { ListenKey } params
     */
    async listenKey(params) {
        if (!params.method) {
            params.method = "POST"
        }
        return await this.http.privateRequest(params.method, "/fapi/v1/listenKey", params)
    }

    /**
     * @param { Trades } params 
     */
    async trades(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/trades", params)
    }

    /**
     * @param { AccountInfo } params
     */
    async accountInfo(params) {
        return await this.http.privateRequest("GET", "/fapi/v2/account", params)
    }

    /**
     * @param { ExchangeInfo } params
     */
    async exchangeInfo(params) {
        return await this.http.publicRequest("GET", "/fapi/exchangeInfo", params)
    }

    /**
     * @param { ChangeMarginType } params 
     */
    async changeMarginType(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/marginType", params)
    }

    /**
     * @param {ChangeLeverage} params 
     */
    async changeLeverage(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/leverage", params)
    }
}


async function Boot() {
    let f = new Futures({
        api_key: config.API_KEY_TEST,
        api_secret: config.API_SECRET_TEST,
        isTestNet: true,
        recvWindow: 20000,
    })

    let data = await f.listenKey({method: "POST"})
    let listenKey = data.listenKey

    f.ws.userStream(listenKey, "USER_DATA")

    f.ws.addListener("USER_DATA", (socket) => {
        socket.addEventListener("message", (event) => {

            let data = event.data
            console.log(data)
        })
    })
    
    new Promise((resolve, reject) => {
        setTimeout(() => {
            f.changeMarginType({
                marginType: "ISOLATED",
                symbol: "BNBUSDT",
            })

            f.changeLeverage({
                leverage: 20,
                symbol: "BTCUSDT",
            })
        }, (5000))
    })
}
Boot()

// f.listenKey("POST")
// f.exchangeInfo()

// f.changeMarginType("BTCUSDT", "CROSSED")

// f.subscribe(["btcusdt@kline_3m"], 1, "BTC")

// f.addListener("BTC", (socket) => {
    
//     socket.addEventListener("message", (event) => {
//         // let data = event.data
//         // console.log(data)
//     })

// })

// new Promise((resolve, reject) => {
//     setTimeout(() => f.unsubscribe(1), 10000)
//     resolve()
// })