
$("div[data-role=\"page\"]").live('pagebeforecreate', function() {

    var id = this.id;
    var controller;

    switch(id) {
        case 'cardDetails':
        case 'cardSettings':
            controller = new App().cardDetails();
            break;
        case 'cards':
            controller = new Cards;
            break;
        case 'payments':
        case 'paymentsMobile':
        case 'paymentsAccount':
        case 'paymentsCards':
            controller = new App().payments();
            break;
        case 'paymentsVerify':
        case 'paymentsSuccess':
            controller = new App().paymentsVerify();
            break;
        case 'locations':
        case 'locationsList':
            controller = new Locations();
            break;
        case 'contacts':
            controller = new Contacts();
            break;
        case 'login':
            controller = new Login();
            break;
        case 'settings':
            controller = new Settings();
            break;
        case 'currencyExchange':
            controller = new CurrencyExchange();
            break;
        case 'news':
        case 'newsPage':
            controller = new NewsController();
            break;
        default :
            controller = new Controller();
            break;
    }

    ko.applyBindings(controller, this);
});

$("div[data-role=\"page\"]").live('pagebeforeshow', function() {

    var pageId = this.id;

    new Login().getAccess(pageId);

    var title = $(this).attr('data-title') || '';
    new App().title(title);

    switch(pageId) {
        case 'paymentsMobile':
        case 'paymentsAccount':
        case 'paymentsCards':
            new Payments().reset();
            break;
    }

});
$("div[data-role=\"page\"]").live('pageshow', function() {

    var pageId = this.id;
    new App().id(pageId);

    var $navbar = $("#mainNavBar");

//    var the_height = ($(window).height() - $("#mainHeader").height() - $("#mainFooter").height());
//    $(this).height(the_height);

//    $navbar.find("a[href=#"+pageId+"]").addClass("ui-btn-active");
});


/**
 * Контроллер приложения. Singleton Factory
 */

var App = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.dataURL = 'data.json';
    self.id = ko.observable();
    self.isAuth = ko.computed(function() {
        return new Login().isAuth();
    }, this);

    self.logout = function() {
        return new Login().logout();
    }

    self.cardDetails = function() {
        var cardsController = new Cards();
        var controller = new CardDetails(cardsController.chosenCard());
        return controller;
    }
    self.payments = function() {
        var controller = new Payments();
        controller.reset();
        return controller;
    }
    self.paymentsVerify = function() {
        var controller = new Payments();
        controller.resetDigits();
        return controller;
    }

    self.stores = {
        transactions: new TransactionsStore(),
        cards: new CardsStore(),
        locations: new LocationsStore(),
        currencies: new CurrencyStore(),
        news: new NewsStore()
    };

    self.title = ko.observable();

    self.language = ko.observable(new Language());

};

$(function() {
    ko.applyBindings(new App(), $("#mainHeader")[0]);
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
