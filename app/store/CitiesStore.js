/**
 * Store новостей банка
 * Паттерн: Singleton Repository
 **/

var CitiesStore;

CitiesStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;
//    console.log("Cities Store constructor");

    self.init();

};

function readCity(value) {
    return new City(value.id, value.name);
}

CitiesStore.prototype = new Store('cities','cities.json','cities', readCity);
CitiesStore.prototype.sortBy = 'id';
CitiesStore.prototype.filterBy = function(value) {
    return [1,2].indexOf(value.id) > -1; //Only Kiev & Dnepropetrovsk
};