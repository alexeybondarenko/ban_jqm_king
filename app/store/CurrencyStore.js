/**
 * Store курсов валют
 * Паттерн: Repository
 **/

var CurrencyStore;
CurrencyStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.init();

};

function readCurrency(value) {
    return new Currency(value.title, value.from, value.to, value.buy, value.sale);
}

CurrencyStore.prototype = new Store('data/currency', AppConfig.dataURL, 'currency', readCurrency);
