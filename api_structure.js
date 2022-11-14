export const API_Structure = {

    test: {
        path: "/fapi/v1/ping",
        method: "GET",
        params: {}
    },

    time: {
        path: "/fapi/v1/time",
        method: "GET",
    },

    exchangeInfo: {
        path: "/fapi/v1/exchangeInfo",
        method: "GET",
    },

    depth: {
        path: "/fapi/v1/depth",
        method: "GET",
        params: {
            symbol: true,
            limit: false,
        }
    },

    trades: {
        path: "/fapi/v1/trades",
        method: "GET",
        params: {
            symbol: true,
            limit: false,
        }
    },

    historicalTrades: {
        path: "/fapi/v1/historicalTrades",
        method: "GET",
        params: {
            symbol: true,	
            limit: false,
            fromId: false,
        }
    },

    aggTrades: {
        path: "/fapi/v1/aggTrades",
        method: "GET",
        params: {
            symbol: true,
            fromId: false,
            startTime: false,
            endTime: false,
            limit: false,
        }
    },

    klines: {
        path: "/fapi/v1/klines",
        method: "GET",
        params: {
            symbol: true,
            interval: true,
            startTime: false,
            endTime: false,
            limit: false,
        }
    },

    continuousKlines: {
        path: "/fapi/v1/continuousKlines",
        method: "GET",
        params: {
            pair: true,
            contractType: true,
            interval: true,
            startTime: false,
            endTime: false,
            limit: false,
        }
    },

}