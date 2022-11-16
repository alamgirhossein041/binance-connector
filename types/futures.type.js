/**
 * Futures constructor
 * @typedef {Object} Constructor
 * @property {String} [api_key]
 * @property {String} [api_secret]
 * @property {Number} [recvWindow]
 * @property {Boolean} [isTestNet]
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

// ################### API
/**
 * @typedef {Object} ListenKey
 * @property { "POST" | "DELETE" } method
 * @property { Number } [recvWindow]
 */

/**
 * @typedef { Object } Trades
 * @property { String } symbol
 * @property { Number } limit
 * @property { Number } [recvWindow]
 */

/**
 * @typedef { Object } AccountInfo
 * @property { Number } [recvWindow]
 */

/**
 * @typedef { Object } ExchangeInfo
 * @property { Number } [recvWindow]
 */

/**
 * @typedef { Object } ChangeMarginType
 * @property { String } symbol BTCUSDT, ETCUSDT
 * @property {"ISOLATED" | "CROSSED"} marginType ISOLATED | CROSSED
 * @property { Number } [recvWindow]
 */

/**
 * @typedef {Object} ChangeLeverage
 * @property {String} symbol
 * @property {Number} leverage
 * @property {Number} [recvWindow]
 */
