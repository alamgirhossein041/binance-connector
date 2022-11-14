import { EventEmitter } from "events"
import { WebSocket as WsClient } from "ws"
// import { Futures } from "./index.js"

export class Websocket extends EventEmitter {

    baseURL = "wss://fstream.binance.com"
    authURL = "wss://fstream-auth.binance.com"

    wsTopics = new Map()

    constructor(options = {}) {
        super()
        this.api_key    = options.api_key
        this.api_secret = options.api_secret
    }

    // async listenKey() {
    //     return await this.rest.listenKey("POST")
    // }

    // async deleteListenKey() {
    //     return await this.rest.listenKey("DELETE")
    // }

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

        ws.addEventListener("open", (event) => {
            ws.send(JSON.stringify(request))
            this.wsTopics.set(request.id, { ws, request })

            // Emit the ws => emit("message", event)
            this.emit(eventName, ws)
        })

        ws.addEventListener("close", (event) => console.log("Websocket Closed"))
        ws.addEventListener("error", (event) => console.log("Error Happens"))
    }

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

    let rest = new Futures({
        api_key,
        api_secret,
    })
    let data = await rest.listenKey()
    let listenKey = data.listenKey
    
    let ws = new Websocket({
        api_key,
        api_secret,
    })

    ws.userStream(listenKey, "USER_DATA")

    ws.addListener("USER_DATA", (socket) => {
        socket.addEventListener("message", (event) => {

            let data = event.data
            console.log(data)
        })
    })
    
    new Promise((resolve, reject) => {
        setTimeout(async () => {
            await rest.listenKey("DELETE")
            resolve()
        }, (10000))
    })
}
Boot()

// ws.userStream("USER_DATA")

// ws.addListener("USER_DATA", (socket) => {
    
//     socket.addEventListener("message", (event) => {

//         let data = event.data
//         console.log(data)
//     })

// })

// ws.listenKey()
// ws.connect("/ws/bnbusdt@aggTrade")
// ws.subscribe(["btcusdt@kline_3m"], 1)
// ws.subscribe(["etcusdt@kline_3m"], 2)

// new Promise((resolve, reject) => {
//     resolve(
//         setTimeout(() => {
//             ws.unsubscribe(1)
//             ws.unsubscribe(2)
//         }, 10000)
//     )
// })

/**
 * @TODO 1- add API_key API_secret
 * @TODO 2- add private subscribe
 * @TODO 3- add reconnect
 * @TODO 4- check ping/pong
 */

// ws.subscribe(["btcusdt@kline_3m"], 1, "BTC")
// ws.subscribe(["etcusdt@kline_1m"], 2)

// ws.addListener("BTC", (socket) => {
    
//     console.log("BTC Event Name")
//     socket.addEventListener("message", (event) => {
//         let data = event.data
//         console.log(data)
//     })
// })

// ws.addListener("Data", (socket) => {
//     // console.log(socket)

//     console.log("Data Event Name")
//     socket.addEventListener("message", (event) => {
//         let data = event.data
//         // try {
//         //     data = JSON.parse(data)
//         // } catch {}

//         console.log(data)
//         // if (data.s == "BTCUSDT") {
//         //     console.log("BTC")
//         // } else if (data.s == "ETCUSDT") {
//         //     console.log("ETC")
//         // }
//     })

// })