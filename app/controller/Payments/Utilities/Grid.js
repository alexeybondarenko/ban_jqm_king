/**
 * Контролллер Коммунальных Платежей ЭЛЕКТРОЭНЕРГИЯ
 * @author Alexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var PaymentsUtilitiesGrid = function () {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    /**
     * Redifinition Payments properties to save current payment as template
     */
    var payments = new Payments();
    payments.type = "utilitiesGrid";
    payments.url = "#paymentsUtilitiesGrid";
    payments.templateFields = ko.computed(function() {
        return {
            selectedCity:       this.selectedCity(),
            selectedCompany:    this.selectedCompany(),
            personalAccount:    this.personalAccount(),
            recipientName:      this.recipientName(),
            paymentAmount:      this.paymentAmount()
        }
    }, this);
};
PaymentsUtilitiesGrid.prototype = new PaymentsUtilities('elec');
