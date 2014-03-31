/**
 * Контролллер Login
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var Login = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.isAuth = ko.observable(null,{persist:"isAuth"});
    self.user = ko.observable(null,{persist:"user"});

    self.startPage = "cards";
    self.loginPage = "login";
    self.noAuthPages = [self.loginPage,"contacts", "locations","news","newsPage","currencyExchange", "licence", "privacy"];

    self.auth = function() {
        self.isAuth(true);
        self.user(new User(1, 'Alex', 'Ivanov', '2013-12-21T12:23:32', '1980-06-21T14:23:12'));
        $.mobile.changePage("#"+self.startPage);
    }
    self.logout = function() {
        self.isAuth(false);
        self.user(null);
        $.mobile.changePage("#"+self.loginPage);
    }
    self.getAccess = function(pageId) {

        if((!self.isAuth() || self.isAuth() == null) && self.noAuthPages.indexOf(pageId) <= -1) {
            $.mobile.changePage("#"+self.loginPage);
            return;
        }
    }

    /**
     * Обьект со всеми переводами.
     */
    self.language = ko.observable(new Language().language());

}