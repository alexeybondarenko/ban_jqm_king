/**
 * Контролллер Коммунальных Платежей ГАЗ
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsUtilitiesGas = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.companies = ko.computed(function() {

        if(self.selectedCity() == undefined || self.selectedCity().id == undefined) return [];
        var cityID = self.selectedCity().id;
        var res = self.getCompaniesByServiceAndCityID("gas", cityID);

        return res;
    }, this);

    /**
     * Redifinition Payments properties to save current payment as template
     */
    var payments = new Payments();
    payments.type = "utilitiesGas";
    payments.url = "#paymentsUtilitiesGas";
    payments.templateFields = ko.computed(function() {
        return {
            selectedCityID:     self.selectedCity(),
            selectedCompanyID:  self.selectedCompany(),
            personalAccount:    self.personalAccount(),
            recipientName:      self.recipientName()
        }
    }, this);

};

PaymentsUtilitiesGas.prototype = new PaymentsUtilities();