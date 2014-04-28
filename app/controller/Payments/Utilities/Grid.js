/**
 * Контролллер Коммунальных Платежей ЭЛЕКТРОЭНЕРГИЯ
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsUtilitiesGrid = function () {

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
        return self.getCompaniesByServiceAndCityID("elec", cityID);
    },this);
    /**
     * Redifinition Payments properties to save current payment as template
     */
    var payments = new Payments();
    payments.type = "utilitiesGrid";
    payments.url = "#paymentsUtilitiesGrid";
    payments.templateFields = ko.computed(function() {
        return {
            selectedCity: self.selectedCity(),
            selectedCompany: self.selectedCompany(),
            personalAccount: self.personalAccount(),
            recipientName: self.recipientName()
        }
    }, this);

};

PaymentsUtilitiesGrid.prototype = new PaymentsUtilities();