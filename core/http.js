import CryptoJS from "crypto-js"
import("../types/http.types.js")

export class Http {

    HmacSHA256 = CryptoJS.HmacSHA256

    /**
     * @param {HttpConstructor} options 
     */
    constructor(options) {

        this.api_key = options.api_key
        this.api_secret = options.api_secret
        this.isTestNet = options.isTestNet
        this.recvWindow = options.recvWindow

        this.baseURL = options.baseURL
        this.baseURLTest = options.baseURLTest
        this.timestamp = options.timestamp
    }

    /**
     * @type {HttpRequestRequest}
     */
    async request(method, address, params = {}, isPrivate = false) {
        try {
            if (this.isTestNet) {
                console.log("## Test Net Futures ##")
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
                Accept: "application/x-www-form-urlencoded",
            }

            if (isPrivate) {
                const signature = this.HmacSHA256(
                    queryString,
                    this.api_secret
                ).toString()
                address =
                    address + "?" + queryString + "&signature=" + signature
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

            if (error instanceof TypeError) {
            }
            if (error instanceof SyntaxError) {
            }

            console.log(errorMessage)
            return errorMessage
        }
    }

    /**
     * @type {HttpPublicRequest}
     */
    async publicRequest(method, address, params = {}) {
        return this.request(method, address, params, false)
    }

    /**
     * @type {HttpPrivateRequest}
     */
    async privateRequest(method, address, params = {}) {
        return this.request(method, address, params, true)
    }
}
