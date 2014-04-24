/**
 * Контролллер Настроек
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */
(function() {

    var Settings = function () {

        /**
         * Singleton pattern part
         */
        if (arguments.callee._singletonInstance)
            return arguments.callee._singletonInstance;
        arguments.callee._singletonInstance = this;

        var self = this;

        self.language = ko.observable( new Language());

    };

})();
