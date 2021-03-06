/**
 * Контролллер Пополнения мобильного телефона
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsMobile = function () {

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
    payments.type = "mobile";
    payments.url = "#paymentsMobile";
    payments.templateFields = ko.computed(function() {
        return {
            phoneNumber: self.phoneNumber(),
            paymentAmount: self.paymentAmount(),
            paymentCard: self.paymentCard()
        }
    }, this);

    self.reset = function() {

        self.__proto__.reset();
        self.paymentAmount(null);
        self.paymentCard(null);
        self.phoneNumber('');
    };

    self.loadFields = function(fields) {
        /*************************
         * Redeclaration Example *
         *************************/
        self.__proto__.loadFields(fields);

        // some new actions
    };
};

PaymentsMobile.prototype = new Payments();
