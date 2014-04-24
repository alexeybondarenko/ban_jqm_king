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

    var cardsStore = new App().stores.cards;
    self.cards = ko.observableArray(cardsStore.data());

    var newsStore = new App().stores.news;
    self.news = ko.observableArray(newsStore.lastData(5));

    var currencyStore = new App().stores.currencies;
    self.currency = ko.observableArray(currencyStore.data());

    var transactionsStore = new App().stores.transactions;
    self.transactions = ko.observableArray(transactionsStore.lastData(5));

    self.showCardsDetails = new Cards().showCardsDetails;
    self.onNewsItemClick = new NewsController().onNewsItemClick;
};

Dashboard.prototype = new Controller();
