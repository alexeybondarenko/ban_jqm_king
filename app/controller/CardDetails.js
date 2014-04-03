/**
 * Контроллер страницы CardDetails. Отображает информацию по карте, последние транзакции.
 * @param card {Card} выбранная карты, для которой отображаются детали
 * @constructor
 */
function CardDetails(card) {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    /**
     * Выбранная карта.
     * @type Card
     */

    self.card = ko.observable(card || new Card());

    /**
     * Последние транзакции карты, отсортированные по дате в обратном порядке
     * @function
     * @type computed {Card}
     */

    console.log(self.card().transactions());
//    self.transactions = ko.observable(self.card().transactions());

    self.transactions = ko.computed(function(length) {
        if (self.card() == null) {
            return null;
        }
        var tr = self.card().transactions();
        console.log(tr);
        return tr;
//        var transactionsStore = new App().stores.transactions;
//        var transactions = transactionsStore.getTransactionsForCard(self.card().id);
//
//        return transactions;
//
    }, this);

    /**
     * Обьект со всеми переводами.
     */
    self.language = ko.observable(Language().language());
}
