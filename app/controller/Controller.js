/**
 * Контролллер default
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var Controller = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = new Language().language;
    self.bankCurrency = 'грн';
};



