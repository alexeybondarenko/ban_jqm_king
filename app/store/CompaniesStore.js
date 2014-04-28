/**
 * Store новостей банка
 * Паттерн: Singleton Repository
 **/

var CompaniesStore;

CompaniesStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.init();

};

function readCompany(value) {
    return new Company(value.id, value.name, value.accountNumber, value.cityID, value.service);
}

CompaniesStore.prototype = new Store('companies','companies.json','companies', readCompany);
//CompaniesStore.sortBy = 'title';