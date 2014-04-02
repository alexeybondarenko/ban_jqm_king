/**
 * Store счетов и карт пользователя
 * Паттерн: Singleton Repository
 **/

var CardsStore;

CardsStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.init();
};

function readCard(value) {
    return new Card(value.id,value.owner_id,value.created_at,value.title,value.number,value.amount,value.currency,value.type, value.transactions);
}

CardsStore.prototype = new Store('data/cards', null, 'cards', readCard);
