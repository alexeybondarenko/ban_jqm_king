/**
 * Store отделений и банкоматов.
 * Паттерн: Repository
 **/

var LocationsStore;

LocationsStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.init();

};

function readLocation(value) {
    return new Location(value.title, value.type, value.adress, value.city, value.latitude, value.longitude);
}

LocationsStore.prototype = new Store('locations', 'locations.json', 'locations', readLocation);
