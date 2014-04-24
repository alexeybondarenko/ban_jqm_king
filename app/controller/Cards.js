/**
 * Контроллер представлений Карты (или Счета). Отображает данные о состояниях счетов, данные последних транзакций.
 * Singleton
 * @returns {Cards}
 * @constructor
 */


    var Cards = function() {

        /**
         * Singleton pattern part
         */
        if ( arguments.callee._singletonInstance )
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;

        var self = this;

        var cardsStore = new App().stores.cards;

        self.cards = ko.observableArray(cardsStore.data());

        /**
         * Выбранная карта.
         * @type Card
         */
        self.chosenCard = ko.observable();

        /**
         * Отображение детальной информации по карте
         * @param element карты, на которую нажали
         * @function
         */
        self.showCardsDetails = function(card) {
    //            console.log("Show cards details ", card);
            self.chosenCard(card);
            var id ="#cardDetails";
            $.mobile.changePage(id);
            var cardDetails = new CardDetails();
            cardDetails.card(card);
        };

    };

    Cards.prototype = new Controller();

