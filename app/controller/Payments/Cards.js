/**
 * Контролллер Перевода на карту (по номеру карты)
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsCards = function () {

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
    payments.type = "cards";
    payments.url = "#paymentsCards";
    payments.templateFields = ko.computed(function() {
        return {
            paymentAmount:  self.paymentAmount(),
            paymentCard:    self.paymentCard(),
            cardNumber:     self.cardNumber()
        }
    }, this);

    self.reset = function() {

        self.__proto__.reset();
        self.paymentAmount(null);
        self.paymentCard(null);
        self.cardNumber(null);
    }

};

PaymentsCards.prototype = new Payments();
