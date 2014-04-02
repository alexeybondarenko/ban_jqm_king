/**
 * Контролллер Новостей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var Dashboard = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = ko.observable(new Language().language());

    var cardsStore = new App().stores.cards;
    self.cards = ko.observableArray(cardsStore.data);

    var newsStore = new App().stores.news;
    self.news = ko.observableArray(newsStore.data());

    var currencyStore = new App().stores.currencies;
    self.currency = ko.observableArray(currencyStore.data());

    var transactionsStore = new App().stores.transactions;
    self.transactions = ko.observableArray(transactionsStore.data());

}

