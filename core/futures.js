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
     * @param {FuturesConstructor} options
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

    // ### Public
    /**
     * @param {FuturesJustRecvWindow} [params]
     */
    async ping(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/ping", params)
    }

    /**
     * @param {FuturesJustRecvWindow} [params]
     */
    async time(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/time", params)
    }

    /**
     * @param { FuturesJustRecvWindow } [params]
     */
     async exchangeInfo(params) {
        return await this.http.publicRequest("GET", "/fapi/exchangeInfo", params)
    }

    /**
     * @param {FuturesDepth} params 
     */
    async depth(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/depth", params)
    }

    /**
     * @param {FuturesTrades} params 
     */
     async trades(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/trades", params)
    }

    /**
     * @param {FuturesHistoricalTrades} params 
     */
    async historicalTrades(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/historicalTrades", params)
    }

    /**
     * @param {FuturesAggTrades} params 
     */
    async aggTrades(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/aggTrades", params)
    }

    /**
     * @param {FuturesKlines} params 
     */
    async klines(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/klines", params)
    }

    /**
     * @param {FuturesContinuousKlines} params 
     */
    async continuousKlines(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/continuousKlines", params)
    }

    /**
     * @param {FuturesIndexPriceKlines} params 
     */
    async indexPriceKlines(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/indexPriceKlines", params)
    }

    /**
     * @param {FuturesMarkPriceKlines} params 
     */
    async markPriceKlines(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/markPriceKlines", params)
    }

    /**
     * @param {FuturesPremiumIndex} params 
     */
    async premiumIndex(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/premiumIndex", params)
    }

    /**
     * @param {FuturesFundingRate} params 
     */
    async fundingRate(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/fundingRate", params)
    }

    /**
     * @param {Futures24hr} params 
     */
    async ticker24hr(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/ticker/24hr", params)
    }

    /**
     * @param {FuturesTickerPrice} params 
     */
    async tickerPrice(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/ticker/price", params)
    }

    /**
     * @param {FuturesTickerBookTicker} params 
     */
    async tickerBookTicker(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/ticker/bookTicker", params)
    }

    /**
     * @param {FuturesOpenInterest} params 
     */
    async openInterest(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/openInterest", params)
    }

    /**
     * @param {FuturesDataOpenInterestHist} params 
     */
    async dataOpenInterestHist(params) {
        return await this.http.publicRequest("GET", "/futures/data/openInterestHist", params)
    }

    /**
     * @param {FuturesDataTopLongShortAccountRatio} params 
     */
    async dataTopLongShortAccountRatio(params) {
        return await this.http.publicRequest("GET", "/futures/data/topLongShortAccountRatio", params)
    }

    /**
     * @param {FuturesDataTopLongShortPositionRatio} params 
     */
    async dataTopLongShortPositionRatio(params) {
        return await this.http.publicRequest("GET", "/futures/data/topLongShortPositionRatio", params)
    }

    /**
     * @param {FuturesDataGlobalLongShortAccountRatio} params 
     */
    async dataGlobalLongShortAccountRatio(params) {
        return await this.http.publicRequest("GET", "/futures/data/globalLongShortAccountRatio", params)
    }

    /**
     * @param {FuturesDataTakerLongShortRatio} params 
     */
    async dataTakerLongShortRatio(params) {
        return await this.http.publicRequest("GET", "/futures/data/takerlongshortRatio", params)
    }

    /**
     * @param {FuturesLvtKlines} params 
     */
    async lvtKlines(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/lvtKlines", params)
    }

    /**
     * @param {FuturesIndexInfo} params 
     */
    async indexInfo(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/indexInfo", params)
    }

    /**
     * @param {FuturesAssetIndex} params 
     */
    async assetIndex(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/assetIndex", params)
    }

    /**
     * @param { FuturesGetPmExchangeInfo } params
     */
     async pmExchangeInfo(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/pmExchangeInfo", params)
    }

    /**
     * @param { FuturesPmAccountInfo } params
     */
    async pmAccountInfo(params) {
        return await this.http.publicRequest("GET", "/fapi/v1/pmAccountInfo", params)
    }
    // ### Private

    /**
     * @param {FuturesPostPositionSideDual} params 
     */
    async changePositionSideDual(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/positionSide/dual", params)
    }

    /**
     * @param {FuturesGetPositionSideDual} [params] 
     */
    async positionSideDual(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/positionSide/dual", params)
    }

    /**
     * @param {FuturesPostMultiAssetsMargin} params 
     */
    async changeMultiAssetsMargin(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/multiAssetsMargin", params)
    }

    /**
     * @param {FuturesGetMultiAssetsMargin} [params] 
     */
    async multiAssetsMargin(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/multiAssetsMargin", params)
    }

    /**
     * @param {FuturesPostOrder} params 
     */
    async newOrder(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/order", params)
    }

    /**
     * @param {FuturesPostBatchOrders} params 
     */
    async newBatchOrders(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/batchOrders", params)
    }

    /**
     * @param {FuturesGetOrder} params 
     */
    async order(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/order", params)
    }

    /**
     * @param {FuturesDeleteOrder} params 
     */
    async deleteOrder(params) {
        return await this.http.privateRequest("DELETE", "/fapi/v1/order", params)
    }

    /**
     * @param {FuturesDeleteAllOpenOrders} params 
     */
    async deleteAllOpenOrders(params) {
        return await this.http.privateRequest("DELETE", "/fapi/v1/allOpenOrders", params)
    }

    /**
     * @param {FuturesDeleteBatchOrders} params 
     */
    async deleteBatchOrders(params) {
        return await this.http.privateRequest("DELETE", "/fapi/v1/batchOrders", params)
    }

    /**
     * @param {FuturesPostCountDownCancelAll} params 
     */
    async deleteCountDownCancelAll(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/countdownCancelAll", params)
    }

    /**
     * @param {FuturesGetOpenOrder} params 
     */
    async openOrder(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/openOrder", params)
    }
    
    /**
     * @param {FuturesGetOpenOrders} params 
     */
     async openOrders(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/openOrders", params)
    }
    
    /**
     * @param {FuturesGetAllOrders} params 
     */
     async allOrders(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/allOrders", params)
    }
    
    /**
     * @param {FuturesGetBalance} [params] 
     */
     async balance(params) {
        return await this.http.privateRequest("GET", "/fapi/v2/balance", params)
    }
    
    /**
     * @param { FuturesGetAccount } [params]
     */
     async account(params) {
        return await this.http.privateRequest("GET", "/fapi/v2/account", params)
    }
    
    /**
     * @param {FuturesPostLeverage} params 
     */
     async changeLeverage(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/leverage", params)
    }

    /**
     * @param { FuturesPostMarginType } params 
     */
     async changeMarginType(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/marginType", params)
    }

    /**
     * @param {FuturesPostPositionMargin} params 
     */
     async changePositionMargin(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/positionMargin", params)
    }
    
    /**
     * @param {FuturesGetPositionMarginHistory} params 
     */
     async positionMarginHistory(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/positionMargin/history", params)
    }
    
    /**
     * @param {FuturesGetPositionRisk} params 
     */
     async positionRisk(params) {
        return await this.http.privateRequest("GET", "/fapi/v2/positionRisk", params)
    }
    
    /**
     * @param {FuturesGetUserTrades} params 
     */
     async userTrades(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/userTrades", params)
    }
    
    /**
     * @param {FuturesGetIncome} params 
     */
     async income(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/income", params)
    }
    
    /**
     * @param {FuturesGetLeverageBracket} params 
     */
     async leverageBracket(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/leverageBracket", params)
    }
    
    /**
     * @param {FuturesGetADLQuantile} params 
     */
     async adlQuantile(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/adlQuantile", params)
    }
    
    /**
     * @param {FuturesGetForceOrders} params 
     */
     async forceOrders(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/forceOrders", params)
    }
    
    /**
     * @param {FuturesGetApiTradingStatus} params 
     */
     async apiTradingStatus(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/apiTradingStatus", params)
    }
    
    /**
     * @param {FuturesGetCommissionRate} params 
     */
     async commissionRate(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/commissionRate", params)
    }
    
    /**
     * @param {FuturesGetIncomeAsyn} params 
     */
     async incomeAsyn(params) {
        return await this.http.privateRequest("", "/fapi/v1/income/asyn", params)
    }
    
    /**
     * @param {FuturesGetIncomeAsynId} params 
     */
     async incomeAsynId(params) {
        return await this.http.privateRequest("GET", "/fapi/v1/income/asyn/id", params)
    }
    
    /**
     * @param { FuturesPostListenKey } [params]
     */
    async newListenKey(params) {
        return await this.http.privateRequest("POST", "/fapi/v1/listenKey", params)
    }

    /**
     * @param { FuturesPutListenKey } [params]
     */
    async keepAliveListenKey(params) {
        return await this.http.privateRequest("PUT", "/fapi/v1/listenKey", params)
    }

    /**
     * @param { FuturesDeleteListenKey } [params]
     */
    async deleteListenKey(params) {
        return await this.http.privateRequest("DELETE", "/fapi/v1/listenKey", params)
    }
}

async function Boot() {
    let f = new Futures({
        api_key: config.API_KEY_TEST,
        api_secret: config.API_SECRET_TEST,
        isTestNet: true,
    })

    // await f.account()
    await f.http.privateRequest("GET", "/fapi/v1/test")
}

async function _Boot() {
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