/**
 * Контролллер Перевода между счетами
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsAccount = function () {

    /**
     * Singleton pattern part
     */

    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    /**
     * Redifinition Payments properties to save current payment as template
     */
    var payments = new Payments();
    payments.type = "account";
    payments.url = "#paymentsAccount";
    payments.templateFields = ko.computed(function() {
        return {
            paymentAmount: self.paymentAmount(),
            paymentCard: self.paymentCard(),
            receiveCard: self.receiveCard()
        }
    }, this);

    self.reset = function() {

        self.__proto__.reset();
        self.paymentAmount(null);
        self.paymentCard(null);
        self.receiveCard(null);
    }

};

PaymentsAccount.prototype = new Payments();
