import { EventEmitter } from "events"
import { WebSocket as WsClient } from "ws"
import("../types/websocket.types.js")

/**
 * @TODO - add reconnect
 */

export class Websocket extends EventEmitter {

    wsTopics = new Map()

    /**
     * @param {Constructor} options
     */
    constructor(options = {}) {
        super()
        this.api_key        = options.api_key
        this.api_secret     = options.api_secret
        this.wsBaseURL      = options.wsBaseURL
        this.wsBaseURLTest  = options.wsBaseURLTest
        this.wsAuthURL      = options.wsAuthURL
        this.isTestNet      = options.isTestNet
    }

    /**
     * @param {Number} wsID Example: 311
     */
    unsubscribe(wsID) {
        let topic = this.wsTopics.get(wsID)

        if (topic) {
            
            let ws      = topic.ws
            let request = topic.request

            console.log(`Unsubscribe to ${request.params}`)
            
            request.method = "UNSUBSCRIBE"

            ws.send(JSON.stringify(request))
            ws.close(1000, `Unsubscribed: ${request.params}`)
            this.wsTopics.delete(wsID)
        }
    }

    // ########################################
    // https://stackoverflow.com/questions/47045000/how-do-i-jsdoc-custom-eventemitter-on-events-in-visual-studio-code
    /**
     * @typedef WsApiOptions
     * @property {String} api_key
     * @property {String} api_secret
     */

    /**
     * @callback WS
     * @param {WsClient} socket
     * @param {WsApiOptions} options
     */

    /**
     * @param {"USER_DATA" | "DATA"} eventName or anything else
     * @param {WS} callback
     */
    addListener(eventName, callback) {
        super.addListener(eventName, callback)
    }

    /**
     * @param {"USER_DATA" | "DATA"} eventName or anything else
     * @param {WS} callback
     */
    on(eventName, callback) {
        super.on(eventName, callback)
    }
    // ############################################
    
    /**
     * 
     * @param {Array<String>} params Example: ["btcusdt@kline_1m", "etcusdt@kline_3m"]
     * @param {Number} id Example: 316
     * @param {"DATA"} eventName Example: "BTC" or anything else
     */
    subscribe(params, id, eventName="DATA") {
        let URL = this.wsBaseURL
        if (this.isTestNet) {
            console.log("## Websocket: Test Net ##")
            URL = this.wsBaseURLTest
        }

        let ws = new WsClient(URL + "/ws")

        let request = {
            method: "SUBSCRIBE",
            params,
            id,
        }

        ws.on("ping", (data) => {
            // console.log(`${new Date()} - Binance Said: Ping`)
            
            ws.ping()
            ws.pong()
        })

        // ws.on("pong", (data) => {
        //     // console.log("We Said: Pong")
        // })

        ws.on("open", (event) => {

            console.log(`Subscribed to ${request.params}`)

            // Ask binance for subscription
            ws.send(JSON.stringify(request))

            // Add to subscribe list
            this.wsTopics.set(request.id, { ws, request })

            this.emit(eventName, ws, {
                api_key: this.api_key,
                api_secret: this.api_secret,
            })
        })

        ws.on("close", (event) => console.log("Websocket Closed"))
        ws.on("error", (event) => console.log("Error Happens"))
    }

    /**
     * @param {String} path Example: "/ws/bnbusdt@aggTrade"
     * @param {String} eventName Example: "BTC" or anything else
     */
    connect(path, eventName="DATA") {

        let URL = this.wsBaseURL
        if (this.isTestNet) {
            console.log("## Websocket: Test Net ##")
            URL = this.wsBaseURLTest
        }

        let ws = new WsClient(URL + path)

        ws.on("open", (event) => {
            console.log(`Connection Opened for: ${path}`)

            this.emit(eventName, ws, {
                api_key: this.api_key,
                api_secret: this.api_secret,
            })
        })
        
        ws.on("close", (event) => {
            console.log(`Connection closed for: ${path}`)
        })

    }

    /**
     * @param {String} listenKey
     * @param {"USER_DATA"} eventName Example: USER_DATA or anything else
     */
    async userStream(listenKey, eventName) {
        let path = "/ws/" + listenKey
        this.connect(path, eventName)
    }
}