/**
 * Store транзакций. Реализует методы загрузки дополнительных транзакций и их считывания.
 * Паттерн: Singleton Repository
 **/

var TransactionsStore;
TransactionsStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.init();

};
function readTransaction(value) {
    return new Transaction(value.text, value.price, value.timestamp, value.card_id, value.type);
}
TransactionsStore.prototype = new Store('transactions',AppConfig.transactionsURL, 'transactions', readTransaction);
