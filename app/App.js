
/**
 * Контроллер приложения. Singleton Factory
 */

var App;
App = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.dataURL = AppConfig.dataURL;
    self.id = ko.observable();
    self.isAuth = ko.computed(function() {
        return new Login().isAuth();
    }, this);

    self.stores = {
        transactions: new TransactionsStore(),
        cards: new CardsStore(),
        payments: new PaymentsStore(),
        locations: new LocationsStore(),
        currencies: new CurrencyStore(),
        news: new NewsStore()
    };

    self.logout = function () {
        return new Login().logout();
    };
    self.cardDetails = function() {
        var cardsController = new Cards();
        var controller = new CardDetails(cardsController.chosenCard());
        return controller;
    };
    self.payments = function(pageID) {
        var controller = new Payments();
        controller.reset();
        controller.type = pageID;

        return controller;
    };
    self.paymentsVerify = function() {
        var controller = new Payments();
        controller.resetDigits();
        return controller;
    };

    self.locationsMap = function() {
        var controller = new Locations();
            controller.initMap();
        return controller;
    };

    self.title = ko.observable();
    self.language = ko.observable(new Language());

};

$(function() {
    ko.applyBindings(new App(), $(".mainHeader")[0]);
    ko.applyBindings(new Language(), $("#mainNavBar")[0]);
    ko.applyBindings(new App(), $("#sidemenu")[0]);
});

function htmlEncode(value){
    //create a in-memory div, set it's inner text(which jQuery automatically encodes)
    //then grab the encoded contents back out.  The div never exists on the page.
    return $('<div/>').text(value).html();
}

function htmlDecode(value){
    return $('<div/>').html(value).text();
}
