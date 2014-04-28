/**
 * Контролллер Платеж на банковский счет
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsOnBankAccount = function () {

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
    payments.type = "onBankAccount";
    payments.url = "#paymentsOnBankAccount";

    payments.templateFields = ko.computed(function() {
        return {
            paymentAmount:          self.paymentAmount(),
            paymentCard:            self.paymentCard(),
            personalAccount:        self.personalAccount(),
            recipientName:          self.recipientName(),
            recipientNumber:        self.recipientNumber(),
            isRecipientAccountOpenedInBank: self.isRecipientAccountOpenedInBank(),
            bankMFONumber:          self.bankMFONumber(),
            recepientAccountInBank: self.recepientAccountInBank(),
            paymentDetails:         self.paymentDetails()
        }
    }, this);

};

PaymentsOnBankAccount.prototype = new Payments();
