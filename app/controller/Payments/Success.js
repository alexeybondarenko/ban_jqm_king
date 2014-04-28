/**
 * Контролллер Успешного платежа
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsSuccess = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.reset = function() {};

};

PaymentsSuccess.prototype = new Payments();