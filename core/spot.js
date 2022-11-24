import { Websocket } from "./websocket.js"
import { Http } from "./http.js"
import("../types/spot.types.js")

export class Spot {
    
    ApiMap = {
        baseURL: "https://api.binance.com",
        baseURLTest: "https://testnet.binance.vision",
        wsBaseURL: "wss://stream.binance.com:443",
        wsBaseURLTest: "wss://testnet.binance.vision",
    }

    timestamp = Date.now()

    /**
     * @param {SpotConstructor} options
     */
    constructor(options = {}) {

        switch (options.changeBaseURL) {
            case 1:
                this.ApiMap.baseURL = "https://api1.binance.com"
                break;
            case 2:
                this.ApiMap.baseURL = "https://api2.binance.com"
                break;
            case 3:
                this.ApiMap.baseURL = "https://api3.binance.com"
                break;
            default:
                break;
        }

        if (options.changeWsStream) {
            this.ApiMap.wsBaseURL = "wss://stream.binance.com:9443"
        }

        let OPTIONS = {
            ...options,
            ...this.ApiMap,
            timestamp: this.timestamp,
        }

        // Coming from constructor
        this.api_key    = options.api_key
        this.api_secret = options.api_secret
        this.recvWindow = options.recvWindow
        this.isTestNet  = options.isTestNet

        // Default values
        this.recvWindow = this.recvWindow ?? 5000
        this.isTestNet  = this.isTestNet  ?? false
        
        if (!OPTIONS.recvWindow) {
            OPTIONS.recvWindow = this.recvWindow
        }

        // Websocket
        this.ws = new Websocket(OPTIONS)
        
        // Utils
        this.http = new Http(OPTIONS)
    }

    // ########################################### Wallet Endpoints
    // ########### Public
    /**
     * @param {SpotJustRecvWindow} [params]
     */
    async systemStatus(params) {
        return await this.http.publicGET("/sapi/v1/system/status", params)
    }
    
    // ########### Private
    /**
     * @param {} [params]
     */
    async capitalConfigGetAll(params) {
        return await this.http.privateGET("/sapi/v1/capital/config/getall", params)
    }


    /**
     * @param {} [params]
     */
    async accountSnapshot(params) {
        return await this.http.privateGET("/sapi/v1/accountSnapshot", params)
    }

    /**
     * @param {} [params]
     */
    async accountDisableFastWithdrawSwitch(params) {
        return await this.http.privateGET("/sapi/v1/account/disableFastWithdrawSwitch", params)
    }

    /**
     * @param {} [params]
     */
    async newAccountEnableFastWithdrawSwitch(params) {
        return await this.http.privatePOST("/sapi/v1/account/enableFastWithdrawSwitch", params)
    }

    /**
     * @param {} [params]
     */
    async newCapitalWithdrawApply(params) {
        return await this.http.privatePOST("/sapi/v1/capital/withdraw/apply", params)
    }

    /**
     * @param {} [params]
     */
    async capitalDepositHisrec(params) {
        return await this.http.privateGET("/sapi/v1/capital/deposit/hisrec", params)
    }

    /**
     * @param {} [params]
     */
    async capitalWithdrawHistory(params) {
        return await this.http.privateGET("/sapi/v1/capital/withdraw/history", params)
    }

    /**
     * @param {} [params]
     */
    async capitalDepositAddress(params) {
        return await this.http.privateGET("/sapi/v1/capital/deposit/address", params)
    }

    /**
     * @param {} [params]
     */
    async accountStatus(params) {
        return await this.http.privateGET("/sapi/v1/account/status", params)
    }

    /**
     * @param {} [params]
     */
    async accountApiTradingStatus(params) {
        return await this.http.privateGET("/sapi/v1/account/apiTradingStatus", params)
    }

    /**
     * @param {} [params]
     */
    async assetDribblet(params) {
        return await this.http.privateGET("/sapi/v1/asset/dribblet", params)
    }

    /**
     * @param {} [params]
     */
    async newAssetDustBTC(params) {
        return await this.http.privatePOST("/sapi/v1/asset/dust-btc", params)
    }

    /**
     * @param {} [params]
     */
    async newAssetDust(params) {
        return await this.http.privatePOST("/sapi/v1/asset/dust", params)
    }

    /**
     * @param {} [params]
     */
    async assetAssetDividend(params) {
        return await this.http.privateGET("/sapi/v1/asset/assetDividend", params)
    }
    
    /**
     * @param {} [params]
     */
    async assetAssetDetail(params) {
        return await this.http.privateGET("/sapi/v1/asset/assetDetail", params)
    }

    /**
     * @param {} [params]
     */
    async assetTradeFee(params) {
        return await this.http.privateGET("/sapi/v1/asset/tradeFee", params)
    }

    /**
     * @param {} [params]
     */
    async newAssetTransfer(params) {
        return await this.http.privatePOST("/sapi/v1/asset/transfer", params)
    }

    /**
     * @param {} [params]
     */
    async assetTransfer(params) {
        return await this.http.privateGET("/sapi/v1/asset/transfer", params)
    }

    /**
     * @param {} [params]
     */
    async assetGetFundingAsset(params) {
        return await this.http.privatePOST("/sapi/v1/asset/get-funding-asset", params)
    }

    /**
     * @param {} [params]
     */
    async assetGetUserAsset(params) {
        return await this.http.privatePOST("/sapi/v3/asset/getUserAsset", params)
    }

    /**
     * @param {} [params]
     */
    async newAssetConvertTransfer(params) {
        return await this.http.privatePOST("/sapi/v1/asset/convert-transfer", params)
    }

    /**
     * @param {} [params]
     */
    async assetConvertTransferQueryByPage(params) {
        return await this.http.privateGET("/sapi/v1/asset/convert-transfer/queryByPage", params)
    }

    /**
     * @param {} [params]
     */
    async assetLedgerTransferCloudMiningQueryByPage(params) {
        return await this.http.privateGET("/sapi/v1/asset/ledger-transfer/cloud-mining/queryByPage", params)
    }

    /**
     * @param {} [params]
     */
    async accountApiRestrictions(params) {
        return await this.http.privateGET("/sapi/v1/account/apiRestrictions", params)
    }
    
    // ########################################### Sub-Account Endpoints
    // ########### Public
    // ########### Private
    /**
     * @param {} [params]
     */
    async newSubAccountVirtualSubAccount(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/virtualSubAccount", params)
    }

    /**
     * @param {} [params]
     */
    async subAccountList(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/list", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountSubTransferHistory(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/sub/transfer/history", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountFuturesInternalTransfer(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/futures/internalTransfer", params)
    }
 
    /**
     * @param {} [params]
     */
    async newSubAccountFuturesInternalTransfer(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/futures/internalTransfer", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountAssets(params) {
        return await this.http.privateGET("/sapi/v3/sub-account/assets", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountSpotSummary(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/spotSummary", params)
    }
 
    /**
     * @param {} [params]
     */
    async capitalDepositSubAddress(params) {
        return await this.http.privateGET("/sapi/v1/capital/deposit/subAddress", params)
    }
 
    /**
     * @param {} [params]
     */
    async capitalDepositSubHisrec(params) {
        return await this.http.privateGET("/sapi/v1/capital/deposit/subHisrec", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountStatus(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/status", params)
    }
 
    /**
     * @param {} [params]
     */
    async newSubAccountMarginEnable(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/margin/enable", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountMarginAccount(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/margin/account", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountMarginAccountSummary(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/margin/accountSummary", params)
    }
 
    /**
     * @param {} [params]
     */
    async newSubAccountFuturesEnable(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/futures/enable", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountFuturesAccount(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/futures/account", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountFuturesAccountSummary(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/futures/accountSummary", params)
    }
 
    /**
     * @param {} [params]
     */
    async subAccountFuturesPositionRisk(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/futures/positionRisk", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountFuturesTransfer(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/futures/transfer", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountMarginTransfer(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/margin/transfer", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountTransferSubToSub(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/transfer/subToSub", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountTransferSubToMaster(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/transfer/subToMaster", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountTransferSubUserHistory(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/transfer/subUserHistory", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountUniversalTransfer(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/universalTransfer", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountUniversalTransfer(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/universalTransfer", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountFuturesAccount(params) {
        return await this.http.privateGET("/sapi/v2/sub-account/futures/account", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountFuturesAccountSummary(params) {
        return await this.http.privateGET("/sapi/v2/sub-account/futures/accountSummary", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountFuturesPositionRisk(params) {
        return await this.http.privateGET("/sapi/v2/sub-account/futures/positionRisk", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountBlvtEnable(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/blvt/enable", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountSubAccountApiIpRestriction(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/subAccountApi/ipRestriction", params)
    }
   
    /**
     * @param {} [params]
     */
    async newSubAccountSubAccountApiIpRestrictionIpList(params) {
        return await this.http.privatePOST("/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountSubAccountApiIpRestriction(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/subAccountApi/ipRestriction", params)
    }
   
    /**
     * @param {} [params]
     */
    async deleteSubAccountSubAccountApiIpRestrictionIpList(params) {
        return await this.http.privateDELETE("/sapi/v1/sub-account/subAccountApi/ipRestriction/ipList", params)
    }
   
    /**
     * @param {} [params]
     */
    async subAccountApiRestrictionsIpRestrictionThirdPartyList(params) {
        return await this.http.privateGET("/sapi/v1/sub-account/apiRestrictions/ipRestriction/thirdPartyList", params)
    }
   
    /**
     * @param {} [params]
     */
    async updateSubAccountSubAccountApiIpRestriction(params) {
        return await this.http.privatePOST("/sapi/v2/sub-account/subAccountApi/ipRestriction", params)
    }
   
    /**
     * @param {} [params]
     */
    async newManagedSubaccountDeposit(params) {
        return await this.http.privatePOST("/sapi/v1/managed-subaccount/deposit", params)
    }

    /**
     * @param {} [params]
     */
    async managedSubaccountAsset(params) {
        return await this.http.privateGET("/sapi/v1/managed-subaccount/asset", params)
    }

    /**
     * @param {} [params]
     */
    async newManagedSubaccountWithdraw(params) {
        return await this.http.privatePOST("/sapi/v1/managed-subaccount/withdraw", params)
    }

    /**
     * @param {} [params]
     */
    async managedSubaccountAccountSnapshot(params) {
        return await this.http.privateGET("/sapi/v1/managed-subaccount/accountSnapshot", params)
    }
    // ########################################### Market Data Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Spot Account/Trade
    // ########### Public
    // ########### Private

    // ########################################### Margin Account/Trade
    // ########### Public
    // ########### Private

    // ########################################### Savings Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Stacking Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Mining Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Futures
    // ########### Public
    // ########### Private

    // ########################################### Futures Algo Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Portfolio Margin Endpoints
    // ########### Public
    // ########### Private

    // ########################################### BLVT Endpoints
    // ########### Public
    // ########### Private

    // ########################################### BSwap Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Fiat Endpoints
    // ########### Public
    // ########### Private

    // ########################################### C2C Endpoints
    // ########### Public
    // ########### Private

    // ########################################### VIP Loans Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Crypto Loans Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Pay Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Convert Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Rebate Endpoints
    // ########### Public
    // ########### Private

    // ########################################### NFT Endpoints
    // ########### Public
    // ########### Private

    // ########################################### Binance Code Endpoints
    // ########### Public
    // ########### Private

}