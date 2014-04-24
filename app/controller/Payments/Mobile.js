/**
 * Контролллер Коммунальных Платежей
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

    self.phoneNumber = ko.observable();

};
PaymentsMobile.prototype = new Payments();
