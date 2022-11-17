export class HttpErrors extends Error {

    /**
     * @param {Object} options 
     * @param {String} options.message
     * @param {String} options.cause
     */
    constructor(options) {
        super(options.message)
        this.name  = this.constructor.name
        this.cause = options.cause
    }

}