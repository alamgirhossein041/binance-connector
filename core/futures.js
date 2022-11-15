import crypto from "crypto-js"
import { Websocket } from "./websocket.js"
import { config } from "../config.js"
import("../types.js")

const HmacSHA256 = crypto.HmacSHA256

export class Futures extends Websocket {
    
    baseURLTestNet  = "https://testnet.binancefuture.com"
    baseURL         = "https://fapi.binance.com"
    wsBaseURL       = "wss://fstream.binance.com"
    wsAuthURL       = "wss://fstream-auth.binance.com"

    timestamp = Date.now()
    recvWindow = 5000

    /**
     * @param {Object} options
     * @param {String} [options.api_key]
     * @param {String} [options.api_secret]
     */
    constructor(options = {}) {
        super({
            ...options,
            wsAuthURL: "wss://fstream-auth.binance.com",
            wsBaseURL: "wss://fstream.binance.com",
        })

        this.api_key    = options.api_key
        this.api_secret = options.api_secret
    }

    set wsBaseURL(value) {
        value = "wss://fstream.binance.com"
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
        let address = this.baseEndPoint + "/fapi/v1/trades"
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

let f = new Futures({
    api_key: "myApiKey",
    api_secret: "mySecretKey"
})

f.subscribe(["btcusdt@kline_1m"], 1, "BTC")

f.addListener("BTC", (socket) => {
    
    socket.addEventListener("message", (event) => {
        let data = event.data
        console.log(data)
    })

})