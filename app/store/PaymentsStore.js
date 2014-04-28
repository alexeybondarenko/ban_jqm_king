/**
 * Store счетов и карт пользователя
 * Паттерн: Singleton Repository
 **/

PaymentsStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

};

PaymentsStore.prototype = new Store(null, null, 'paymentsTemplates',null);
PaymentsStore.prototype.sortBy = 'title';