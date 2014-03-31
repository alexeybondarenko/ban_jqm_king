/**
 * Контролллер Новостей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var NewsController = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = ko.observable(Language().language());
    self.chosenNews = ko.observable();

    self.onNewsItemClick = function(news) {
        self.chosenNews(news);
        $.mobile.changePage("#newsPage");
    }

    var newsStore = new App().stores.news;
    self.news = ko.observableArray(newsStore.data());

}

