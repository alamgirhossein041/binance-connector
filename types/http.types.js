/**
 * Futures constructor
 * @typedef {Object} Constructor
 * @property {String} [api_key]
 * @property {String} [api_secret]
 * @property {Number} [recvWindow]
 * @property {Boolean} [isTestNet]
 * 
 * @property {String} [baseURL]
 * @property {String} [baseURLTest]
 * @property {String} [wsAuthURL]
 * @property {String} [wsBaseURL]
 * @property {String} [wsBaseURLTest]
 * @property {Number} [timestamp]
 * 
 */

/**
 * Request
 * @callback Req
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method
 * @param {String} address https://fapi.binance.com/fapi/v1/ping
 * @param {Object} params
 * @param {Boolean} isPrivate
 * @returns {Promise}
 */

/**
 * @callback PublicRequest
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method
 * @param {String} address Example: /fapi/v1/exchangeInfo
 * @param {Object} params Example: {symbol: "BTCUSDT", limit: 10}
 * @return {Promise}
 */

/**
 * @callback PrivateRequest
 * @param {"GET" | "POST" | "PUT" | "DELETE"} method Example: GET
 * @param {String} address Example: /fapi/v1/listenKey
 * @param {Object} params Example: {symbol: "BTCUSDT", limit: 10}
 * @return {Promise}
 */