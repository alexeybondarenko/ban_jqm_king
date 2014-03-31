/**
 * Контролллер CurrencyExchange
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var CurrencyExchange = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = ko.observable(Language().language());

    var currencyStore = new App().stores.currencies;

    self.currency = ko.observableArray(currencyStore.data());
    console.log(self.currency());
}

