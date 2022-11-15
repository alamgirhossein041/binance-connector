import crypto from "crypto-js"
import { Websocket } from "./websocket.js"
import { config } from "../config.js"
import("../types.js")

const HmacSHA256 = crypto.HmacSHA256

export class Futures extends Websocket {
    
    baseURL         = "https://fapi.binance.com"
    baseURLTest     = "https://testnet.binancefuture.com"
    wsBaseURL       = "wss://fstream.binance.com"
    wsBaseURLTest   = "wss://stream.binancefuture.com"
    wsAuthURL       = "wss://fstream-auth.binance.com"

    timestamp = Date.now()

    /**
     * @param {Object} options
     * @param {String} [options.api_key]
     * @param {String} [options.api_secret]
     * @param {Number} [options.recvWindow]
     * @param {Boolean} [options.isTestNet]
     */
    constructor(options = {}) {
        super({
            ...options,
            wsAuthURL: "wss://fstream-auth.binance.com",
            wsBaseURL: "wss://fstream.binance.com",
            wsBaseURLTest: "wss://stream.binancefuture.com",
        })

        this.api_key    = options.api_key
        this.api_secret = options.api_secret
        this.recvWindow = options.recvWindow
        this.isTestNet  = options.isTestNet

        // Default values
        this.recvWindow = this.recvWindow ?? 5000
        this.isTestNet  = this.isTestNet  ?? false
    }

    /**
     * 
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method 
     * @param {String} address https://fapi.binance.com/fapi/v1/ping
     * @param {Object} params 
     * @param {Boolean} isPrivate 
     * @returns 
     */
    async request(method, address, params={}, isPrivate=false) {

        try {

            if (this.isTestNet) {
                console.log("## Test Net ##")
                address = this.baseURLTest + address
            } else {
                address = this.baseURL + address
            }

            let recvWindow  = this.recvWindow
            if (params.recvWindow) {
                recvWindow = params.recvWindow
                delete params.recvWindow
            }

            const _params = {
                ...params,
                timestamp: this.timestamp,
                recvWindow,
            }

            // Way1
            // let queryString = ""
            // let paramsList = Object.keys(_params)
            // for (let index = 0; index < paramsList.length; index++) {
            //     const key = paramsList[index]
            //     const value = _params[key]

            //     queryString += `&${key}=${value}`
            // }
            // queryString = queryString.slice(1)

            // Way2
            const queryString = Object.keys(_params)
            .map((key) => `${key}=${_params[key]}`)
            .join("&")

            let headers = {
                "Accept": "application/x-www-form-urlencoded",
            }
            
            if (isPrivate) {
                const signature = HmacSHA256(queryString, this.api_secret).toString()    
                address = address + "?" + queryString + "&signature=" + signature
            } else {
                address = address + "?" + queryString
            }
            
            if (this.api_key) {
                headers["X-MBX-APIKEY"] = this.api_key
            }

            let data = await fetch(address, {
                method,
                headers,
            })

            let res
            if (data.status == 200) {
                res = await data.json()
            }

            console.log(res)

            return res
        } catch (error) {

            let errorMessage = {
                type: "error",
                name: error.name,
                message: error.message,
            }

            if (error instanceof TypeError) {}
            if (error instanceof SyntaxError) {}

            console.log(errorMessage)
            return errorMessage
        }
    }

    /**
     * 
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method 
     * @param {String} address Example: /fapi/v1/exchangeInfo
     * @param {Object} params Example: {symbol: "BTCUSDT", limit: 10}
     */
    async publicRequest(method, address, params={}) {
        return this.request(method, address, params, false)
    }

    /**
     * 
     * @param {"GET" | "POST" | "PUT" | "DELETE"} method 
     * @param {String} address Example: /fapi/v1/listenKey
     * @param {Object} params Example: {symbol: "BTCUSDT", limit: 10}
     */
    async privateRequest(method, address, params={}) {
        return this.request(method, address, params, true)
    }

    /**
     * @param { Object } params
     * @param { "POST" | "DELETE" } params.method
     * @param { Number } [params.recvWindow]
     */
    async listenKey(params) {
        if (!params.method) {
            params.method = "POST"
        }
        return await this.privateRequest(params.method, "/fapi/v1/listenKey", params)
    }

    /**
     * 
     * @param { Object } params 
     * @param { String } params.symbol
     * @param { Number } params.limit
     * @param { Number } [params.recvWindow]
     */
    async trades(params) {
        return await this.publicRequest("GET", "/fapi/v1/trades", params)
    }

    /**
     * @param { Object } params
     * @param { Number } [params.recvWindow]
     * @returns {Promise<Object>}
     */
    async accountInfo(params) {
        return await this.privateRequest("GET", "/fapi/v2/account", params)
    }

    /**
     * @param { Object } params
     * @param { Number } [params.recvWindow]
     */
    async exchangeInfo(params) {
        return await this.publicRequest("GET", "/fapi/exchangeInfo", params)
    }

    /**
     * @param { Object } params 
     * @param { String } params.symbol BTCUSDT, ETCUSDT
     * @param {"ISOLATED" | "CROSSED"} params.marginType ISOLATED | CROSSED
     * @param { Number } [params.recvWindow]
     * @returns { Promise<JSON> }
     */
    async changeMarginType(params) {
        return await this.privateRequest("POST", "/fapi/v1/marginType", params)
    }
}


async function Boot() {
    let f = new Futures({
        api_key: config.API_KEY,
        api_secret: config.API_SECRET,
        isTestNet: false,
    })

    let data = await f.listenKey("POST")
    let listenKey = data.listenKey

    f.userStream(listenKey, "USER_DATA")

    f.addListener("USER_DATA", (socket) => {
        socket.addEventListener("message", (event) => {

            let data = event.data
            console.log(data)
        })
    })
    
    new Promise((resolve, reject) => {
        setTimeout(async () => {
            await f.changeMarginType({
                marginType: "ISOLATED",
                symbol: "BNBUSDT",
                recvWindow: 20000,
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