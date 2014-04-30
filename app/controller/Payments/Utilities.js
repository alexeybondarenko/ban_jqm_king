/**
 * Контролллер Коммунальных Платежей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var PaymentsUtilities = function (service) {


    var self = this;
    /**
     * Array of the city that are available for utilities payments
     * @property cities
     * @type {Array}
     */
    self.cities = new CitiesStore().data();
    /**
     * Service name
     * @property service
     * @type {string}
     */
    self.service = service || null;
    /**
     * Get companies by service name and get city id from selected city property
     * @param service {string} name of the service, that company is providing
     * @returns {Array}
     */
    self.getCompaniesByService = function (service) {
        /**
         * By default returning value is an empty array
         * @type {Array}
         */
        var result = [];
        /**
         * Get the id of the selected city
         */
        var cityID = self.getSelectedCityID();
        if (cityID == null) return result;

        return self.getCompaniesByServiceAndCityID(service, cityID);
    };
    /**
     * Get companies by service name and city id
     * @param service
     * @param cityID
     * @returns {Array}
     */
    self.getCompaniesByServiceAndCityID = function(service, cityID) {
        return new CompaniesStore().data().filter(function(company) {
            return company.cityID == cityID && company.service === service;
        });
    };
    /**
     * Getting selecting city id
     * Return NULL if ID is undefined.
     * @method getSelectedCityID
     * @type {Number}
     */
    self.getSelectedCityID = ko.computed(function() {
//        return (self.selectedCity() == undefined) ? null : self.selectedCity();
        return (self.selectedCity() == undefined || self.selectedCity().id == undefined) ? null : self.selectedCity().id;
    }, this);
    /**
     * Array of the available companies in the selected city
     * @property companies
     * @type {Array}
     */
    self.companies = ko.computed(function(){ return self.getCompaniesByService(self.service); }, this);

};

PaymentsUtilities.prototype = new Payments();
