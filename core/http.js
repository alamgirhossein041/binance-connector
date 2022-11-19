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
    async DEP_request(method, address, params = {}, isPrivate = false) {
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

            let queryString = Object.keys(queries)
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

            let queryParam = ""
            let signature  = ""
            if (isPrivate && this.api_secret) {
                signature = this.HmacSHA256(
                    queryString,
                    this.api_secret
                ).toString()

                queryParam = queryString + "&signature=" + signature
            } else {
                queryParam = address + "?" + queryString
            }

            if (this.api_key) {
                headers["X-MBX-APIKEY"] = this.api_key
            }

            // console.log(address + "?" + queryParam)
            // console.log(signature)
            // console.log(queries)
            // console.log(params)
            // console.log(queries)
            // console.log({
            //     ...queries,
            //     signature,
            // })

            // console.log(queryParam)
            // return false

            let data = await fetch(address + "?" + queryParam, {
                method,
                headers,
            })
            let res = await data.json()
            console.log(res)

            // let data
            // if (method == "POST") {
            //     data = await fetch(address, {
            //         method,
            //         headers,
            //         body: queryParam,
            //     })
            //     console.log(await data.json())
            // }
            // let data = await fetch(address, {
            //     method,
            //     headers,
            // })

            // if (data.status == 404) {
            //     throw new Error("404 not found")
            // }

            // let body = await data.json()
            // console.log(body)
            // return body

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
