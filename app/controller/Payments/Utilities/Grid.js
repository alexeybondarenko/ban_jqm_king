/**
 * Контролллер Коммунальных Платежей
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

    self.companies = [
        new Company(1, 'Киевэнерго'),
        new Company(2, 'ОблСвет'),
        new Company(3, 'ОАО Городские электросети')
    ];

};

PaymentsUtilitiesGrid.prototype = new PaymentsUtilities();