import { Futures } from "./index.js"
import { config } from "./config.js"

let f = new Futures({
    isTestNet: true,
})

async function boot() {
    f.ws.subscribe(["btcusdt@kline_1m"], 1)
    
    f.ws.addListener("DATA", (socket) => {
        
        // Buffer
        // socket.addListener("message", (data) => {
        //     console.log(data)
        // })

        // Raw string data
        // socket.addEventListener("message", (event) => {
        //     let data = event.data
        //     console.log(data)
        // })
    })

}
boot()