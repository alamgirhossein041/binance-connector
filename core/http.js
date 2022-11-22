import { EventEmitter } from "events"
import https from "https"
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
     * @type {HttpRequest}
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

            const queries = {
                ...params,
                timestamp: this.timestamp,
                recvWindow,
            }

            let queryToString = Object.keys(queries)
                .map((key) => {
                    let value = queries[key]

                    if (value instanceof Array) {
                        value = JSON.stringify(value)
                        value = encodeURI(value)
                    }
                    return `${key}=${value}`
                })
                .join("&")

            let headers = {
                Accept: "application/x-www-form-urlencoded",
            }

            if (isPrivate && this.api_secret) {
                const signature = this.HmacSHA256(
                    queryToString,
                    this.api_secret
                ).toString()

                address = address + "?" + queryToString + "&signature=" + signature
            } else {
                address = address + "?" + queryToString
            }

            if (this.api_key) {
                headers["X-MBX-APIKEY"] = this.api_key
            }

            let data = await fetch(address, {
                method,
                headers,
            })

            if (data.status == 404) {
                throw new Error("404 not found")
            }

            let body = await data.json()
            console.log(body)
            return body

        } catch (error) {
            let errorMessage = {
                name: error.name,
                message: error.message,
                stack: error.stack,
            }

            console.log(errorMessage)
            return errorMessage
        }
    }

    /**
     * @type {HttpPublic}
     */
    async publicGET(address, params = {}) {
        return await this.request("GET", address, params, false)
    }

    /**
     * @type {HttpPublic}
     */
    async publicPOST(address, params = {}) {
        return await this.request("POST", address, params, false)
    }

    /**
     * @type {HttpPublic}
     */
    async publicPUT(address, params = {}) {
        return await this.request("PUT", address, params, false)
    }

    /**
     * @type {HttpPublic}
     */
    async publicDELETE(address, params = {}) {
        return await this.request("DELETE", address, params, false)
    }

    /**
     * @type {HttpPrivate}
     */
    async privateGET(address, params={}) {
        return await this.request("GET", address, params, true)
    }

    /**
     * @type {HttpPrivate}
     */
    async privatePOST(address, params={}) {
        return await this.request("POST", address, params, true)
    }

    /**
     * @type {HttpPrivate}
     */
    async privatePUT(address, params={}) {
        return await this.request("PUT", address, params, true)
    }

    /**
     * @type {HttpPrivate}
     */
    async privateDELETE(address, params={}) {
        return await this.request("DELETE", address, params, true)
    }

    /**
     * @type {HttpPublicRequest}
     */
    async publicRequest(method, address, params = {}) {
        return await this.request(method, address, params, false)
    }

    /**
     * @type {HttpPrivateRequest}
     */
    async privateRequest(method, address, params = {}) {
        return await this.request(method, address, params, true)
    }
}
