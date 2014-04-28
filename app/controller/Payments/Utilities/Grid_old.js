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

    self.companies = ko.computed({
        read :function() {

        if(self.selectedCity() == undefined || self.selectedCity()[0] == undefined || self.selectedCity()[0].id == undefined) return [];
        var cityID = self.selectedCity()[0].id;
        var res = self.getCompaniesByServiceAndCityID("elec", cityID);

        return res;
        },
        deferEvaluation : true
    });
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