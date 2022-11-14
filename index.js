import crypto from "crypto-js"
import { config } from "./config.js"
import("./types.js")

const HmacSHA256 = crypto.HmacSHA256

export class Futures {
    
    restEndPointTestNet = "https://testnet.binancefuture.com"
    WsEndPointTestNet = "wss://stream.binancefuture.com"
    baseEndPoint = "https://fapi.binance.com"
    wsEndPoint = ""
    timestamp = Date.now()
    recvWindow = 5000

    // Request Header
    // application/x-www-form-urlencoded
    // X-MBX-APIKEY

    // Response Header
    // X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter) => X-MBX-USED-WEIGHT-1m => IP
    // X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter) => X-MBX-ORDER-COUNT-1m => Order

    constructor(options = {}) {
        this.api_key = options.api_key
        this.api_secret = options.api_secret
    }

    async request(method, address, params={}, isPrivate=false) {

        try {
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

            let res = await data.json()

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
     * @returns {Promise<{listenKey: String}>}
     */
    async listenKey(method="POST") {
        try {
            let address = this.baseEndPoint + "/fapi/v1/listenKey"
            
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
        } catch (error) {

            let errorMessage = {
                type: "error",
                name: error.name,
                message: error.message,
            }

            if (error instanceof TypeError) {}
            if (error instanceof SyntaxError) {}

            console.log("ListenKey:", errorMessage)
            return errorMessage
        }
    }

    /**
     * @param {String} symbol 
     * @param {Number} limit 
     * @returns {Promise<Array>}
     */
    async trades(symbol, limit) {
        let address = this.baseEndPoint + "/fapi/v1/trades" + "NOTVALID"
        let params = { symbol, limit }
        return this.request("GET", address, params)
    }

    /**
     * @returns {Promise<Object>}
     */
    async accountInfo() {
        let address = this.baseEndPoint + "/fapi/v2/account"
        return this.request("GET", address, {}, true)
    }

    
    /**
     * 
     * @param {String} symbol BTCUSDT, ETCUSDT
     * @param {"ISOLATED" | "CROSSED"} marginType ISOLATED | CROSSED
     * @returns {Promise<OutChangeMarginType>}
     */
    async changeMarginType(symbol, marginType) {
        let address = this.baseEndPoint + "/fapi/v1/marginType"
        let params = { symbol, marginType }
        return this.request("POST", address, params, true)
    }
}

// let api_key = config.API_KEY
// let api_secret = config.api_secret

// let binance = new Futures({ api_key, api_secret })
// binance.changeMarginType("BTCUSDT", "ISOLATED")
// binance.trades("BTCUSDT", 5)

// binance.accountInfo()
// binance.klines()
// binance.exchangeInfo()

// API Generator
// const options = {
//     private: "HmacSHA256",
// }
// const api = {
//     kline: {
//         type: "private" | "public",
//         path: "/fapi/v1/klines",
//         method: "GET",
//         params: {
//             symbol: {
//                 type: String,
//                 required: true,
//                 options: []
//             },
//             contractType: {
//                 type: String,
//                 required: true,
//                 options: ["PERPETUAL", "CURRENT_QUARTER", "NEXT_QUARTER"],
//                 default: "PERPETUAL"
//             }
//         }
//     }
// }

// let a = api.kline.options
// console.log(a)
