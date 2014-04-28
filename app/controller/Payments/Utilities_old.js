/**
 * Контролллер Коммунальных Платежей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsUtilities = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.availableCities = new CitiesStore().data;
    self.service = null;

    self.isVisibleAccountInfo = ko.computed(function () {

        return this.selectedCity() != undefined && this.selectedCity()[0] != undefined &&
               this.selectedCompany() != undefined && this.selectedCompany()[0] != undefined;

    }, this);

    self.getCompaniesByServiceAndCityID = function(service, cityID) {
        service = service || null;
        cityID = cityID || null;

        if (service == null || cityID == null) return null;
        var res =  new CompaniesStore().data().filter(function(company){
            return (company.cityID == cityID) && (company.service === service);
        });
        return res;
    };

};
PaymentsUtilities.prototype = new Payments();
