/**
 * Контролллер Контактов
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

    var Contacts = function() {

        /**
         * Singleton pattern part
         */
        if ( arguments.callee._singletonInstance )
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;

    };

    Contacts.prototype = new Controller();


