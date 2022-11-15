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
    recvWindow = 5000

    /**
     * @param {Object} options
     * @param {String} [options.api_key]
     * @param {String} [options.api_secret]
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
        this.isTestNet  = options.isTestNet
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

            let recvWindow = this.recvWindow
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

    async publicRequest(method, address, params={}) {
        return this.request(method, address, params, false)
    }

    async privateRequest(method, address, params={}) {
        return this.request(method, address, params, true)
    }

    /**
     * @param {"POST" | "DELETE"} method 
     */
    async listenKey(method="POST") {
        let params = {}
        return await this.request(method, "/fapi/v1/listenKey", params, true)
    }

    /**
     * @TODO clean-up listen-key
     * 
     * @param {"POST" | "DELETE"} method
     * @returns {Promise<{listenKey: String}>}
     */
    async DEP_listenKey(method="POST") {
        try {
            let address = this.baseURL + "/fapi/v1/listenKey"
            
            let data = await fetch(address, {
                method,
                headers: {
                    accept: "application/x-www-form-urlencoded",
                    "X-MBX-APIKEY": this.api_key,
                }
            })

            data = await data.json()
            console.log(data)
            return data
        } catch {}
    }

    /**
     * @param {String} symbol 
     * @param {Number} limit 
     * @returns {Promise<Array>}
     */
    async trades(symbol, limit) {
        let params = { symbol, limit }
        return this.request("GET", "/fapi/v1/trades", params)
    }

    /**
     * @returns {Promise<Object>}
     */
    async accountInfo() {
        return this.request("GET", "/fapi/v2/account", {}, true)
    }

    
    /**
     * 
     * @param {String} symbol BTCUSDT, ETCUSDT
     * @param {"ISOLATED" | "CROSSED"} marginType ISOLATED | CROSSED
     * @returns {Promise<OutChangeMarginType>}
     */
    async changeMarginType(symbol, marginType) {
        let params = { symbol, marginType }
        return this.request("POST", "/fapi/v1/marginType", params, true)
    }

    async exchangeInfo() {
        let params = {}
        return this.request("GET", "/fapi/v1/exchangeInfo", params)
    }
}

let f = new Futures({
    api_key: config.API_KEY,
    api_secret: config.API_SECRET,
    isTestNet: false,
})
f.listenKey("POST")
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