import { EventEmitter } from "events"
import { WebSocket as WsClient } from "ws"

export class Websocket extends EventEmitter {

    baseURL = "wss://fstream.binance.com"
    authURL = "wss://fstream-auth.binance.com"

    wsTopics = new Map()

    constructor(options = {}) {
        super()
        this.api_key    = options.api_key
        this.api_secret = options.api_secret
    }

    /**
     * @param {Number} wsID Example: 311
     */
    unsubscribe(wsID) {
        let topic = this.wsTopics.get(wsID)

        if (topic) {
            let ws      = topic.ws
            let request = topic.request
            
            request.method = "UNSUBSCRIBE"

            ws.send(JSON.stringify(request))
            ws.close(1000, `Unsubscribed: ${request.params}`)
            this.wsTopics.delete(wsID)
        }
    }

    /**
     * 
     * @param {Array<String>} params Example: ["btcusdt@kline_1m", "etcusdt@kline_3m"]
     * @param {Number} id Example: 316
     * @param {String} eventName Example: "BTC"
     */
    subscribe(params, id, eventName="Data") {

        let ws = new WsClient(this.baseURL + "/ws")

        let request = {
            method: "SUBSCRIBE",
            params,
            id,
        }

        ws.addListener("ping", (data) => {
            console.log(`${new Date()} - Binance Said: Ping`)
            
            ws.ping()
            ws.pong()
        })

        ws.addListener("pong", (data) => {
            console.log("We Said: Pong")
        })

        ws.addEventListener("open", (event) => {
            ws.send(JSON.stringify(request))
            this.wsTopics.set(request.id, { ws, request })

            // Emit the ws => emit("message", event)
            this.emit(eventName, ws)
        })

        ws.addEventListener("close", (event) => console.log("Websocket Closed"))
        ws.addEventListener("error", (event) => console.log("Error Happens"))
    }

    /**
     * @param {String} path Example: "/ws/bnbusdt@aggTrade"
     * @param {String} eventName Example: "Data"
     */
    connect(path, eventName="Data") {

        let ws = new WsClient(this.baseURL + path)

        ws.addEventListener("open", (event) => {
            console.log(`Connection Opened for: ${path}`)
            this.emit(eventName, ws)
        })
        
        ws.addEventListener("close", (event) => {
            console.log(`Connection closed for: ${path}`)
        })

    }

    /**
     * @param {String} listenKey
     * @param {String} eventName Example: USER_DATA
     */
    async userStream(listenKey, eventName) {
        let path = "/ws/" + listenKey
        this.connect(path, eventName)
    }
}


import { Futures } from "./index.js"
import { config } from "./config.js"

async function Boot() {

    let api_key = config.API_KEY
    let api_secret = config.API_SECRET
    
    let ws = new Websocket({
        api_key,
        api_secret,
    })

    // ############################ Using Connect
    // ws.connect("/ws/bnbusdt@kline_1m")

    // ws.addListener("Data", (socket) => {
        
    //     socket.addEventListener("message", (event) => {
    //         let data = event.data
    //         console.log(data)
    //     })

    //     new Promise((resolve, reject) => {
    //         setTimeout(() => {
                
    //             socket.close()
                
    //             resolve()
    //         }, 10000)
    //     })
    // })

    // ############################ Using Subscribe
    ws.subscribe(["btcusdt@kline_5m"], 1, "Data")

    ws.addListener("Data", (socket) => {
        socket.addEventListener("message", (event) => {
            // let data = event.data
            // console.log(data)
        })
    })
    
    // new Promise((resolve, reject) => {
    //     setTimeout(() => {
    //         ws.unsubscribe(1)
    //     }, 20000)

    //     setTimeout(() => {
    //         ws.unsubscribe(2)
    //     }, 40000)

    //     resolve()
    // });

    // ############################ User Stream
    // let rest = new Futures({
    //     api_key,
    //     api_secret,
    // })
    // let data = await rest.listenKey()
    // let listenKey = data.listenKey

    // ws.userStream(listenKey, "USER_DATA")

    // ws.addListener("USER_DATA", (socket) => {
    //     socket.addEventListener("message", (event) => {

    //         let data = event.data
    //         console.log(data)
    //     })
    // })
    
    // new Promise((resolve, reject) => {
    //     setTimeout(async () => {
    //         await rest.listenKey("DELETE")
    //         resolve()
    //     }, (10000))
    // })
}
Boot()
/**
 * @TODO 1- add API_key API_secret
 * @TODO 2- add private subscribe
 * @TODO 3- add reconnect
 * @TODO 4- check ping/pong
 */