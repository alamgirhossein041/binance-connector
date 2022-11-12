export const symbolType = {
    FUTURE: "FUTURE",
}

export const contractType = {
    PERPETUAL: "PERPETUAL",
    CURRENT_MONTH: "CURRENT_MONTH",
    NEXT_MONTH: "NEXT_MONTH",
    CURRENT_QUARTER: "CURRENT_QUARTER",
    NEXT_QUARTER: "NEXT_QUARTER",
    PERPETUAL_DELIVERING: "PERPETUAL_DELIVERING",
}

export const contractStatus = {
    PENDING_TRADING: "PENDING_TRADING",
    TRADING: "TRADING",
    PRE_DELIVERING: "PRE_DELIVERING",
    DELIVERING: "DELIVERING",
    DELIVERED: "DELIVERED",
    PRE_SETTLE: "PRE_SETTLE",
    SETTLING: "SETTLING",
    CLOSE: "CLOSE",
}

export const orderStatus = {
    NEW: "NEW",
    PARTIALLY_FILLED: "PARTIALLY_FILLED",
    FILLED: "FILLED",
    CANCELED: "CANCELED",
    REJECTED: "REJECTED",
    EXPIRED: "EXPIRED",
}

export const orderTypes = {
    LIMIT: "LIMIT",
    MARKET: "MARKET",
    STOP: "STOP",
    STOP_MARKET: "STOP_MARKET",
    TAKE_PROFIT: "TAKE_PROFIT",
    TAKE_PROFIT_MARKET: "TAKE_PROFIT_MARKET",
    TRAILING_STOP_MARKET: "TRAILING_STOP_MARKET",
}

export const orderSide = {
    BUY: "BUY",
    SELL: "SELL",
}

export const positionSide = {
    BOTH: "BOTH",
    LONG: "LONG",
    SHORT: "SHORT",
}

export const timeInForce = {
    GTC: "GTC",
    IOC: "IOC",
    FOK: "FOK",
    GTX: "GTX",
}

export const workingType = {
    MARK_PRICE: "MARK_PRICE",
    CONTRACT_PRICE: "CONTRACT_PRICE",
}

export const newOrderRespType = {
    ACK: "ACK",
    RESULT: "RESULT",
}

export const chartIntervals = {
    "1m": "1m",
    "3m": "3m",
    "5m": "5m",
    "15m": "15m",
    "30m": "30m",
    "1h": "1h",
    "2h": "2h",
    "4h": "4h",
    "6h": "6h",
    "8h": "8h",
    "12h": "12h",
    "1d": "1d",
    "3d": "3d",
    "1w": "1w",
    "1M": "1M",
}

export const rateLimitType = {
    REQUEST_WEIGHT: "REQUEST_WEIGHT",
    ORDERS: "ORDERS",
}

export const rateLimitIntervals = {
    MINUTE: "MINUTE",
}

