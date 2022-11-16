/**
 * Futures constructor
 * @typedef {Object} Constructor
 * @property {String} [api_key]
 * @property {String} [api_secret]
 * @property {Number} [recvWindow]
 * @property {Boolean} [isTestNet]
 */

// ################################### API
// #### Common

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
