/**
 * Контролллер default
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var Controller = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = ko.observable(Language().language());


}

