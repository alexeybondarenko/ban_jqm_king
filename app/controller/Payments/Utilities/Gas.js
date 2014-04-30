/**
 * Контролллер Коммунальных Платежей ГАЗ
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var PaymentsUtilitiesGas = function () {

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
    payments.type = "utilitiesGas";
    payments.url = "#paymentsUtilitiesGas";
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
PaymentsUtilitiesGas.prototype = new PaymentsUtilities('gas');