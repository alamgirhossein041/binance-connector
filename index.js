import { HmacSHA256 } from "crypto-js"

// const signature = HmacSHA256("all params as string", "APISecretKey")

class Futures {

    restEndPointTestNet = "https://testnet.binancefuture.com"
    WsEndPointTestNet   = "wss://stream.binancefuture.com"
    baseEndPoint        = "https://fapi.binance.com"
    wsEndPoint          = ""
    timestamp           = Date.now()
    recvWindow          = 5000

    // Request Header
    // application/x-www-form-urlencoded
    // X-MBX-APIKEY

    // Response Header
    // X-MBX-USED-WEIGHT-(intervalNum)(intervalLetter) => X-MBX-USED-WEIGHT-1m => IP
    // X-MBX-ORDER-COUNT-(intervalNum)(intervalLetter) => X-MBX-ORDER-COUNT-1m => Order

    constructor(options) {

    }


}