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
    self.chosenNews = ko.observable(new News('' ,'',''));

    self.onNewsItemClick = function(news) {
        var contr = new NewsController();
        console.log("news click");
        contr.chosenNews(news);
        $.mobile.changePage("#newsPage");
    };

    var newsStore = new App().stores.news;
    self.news = ko.observableArray(newsStore.data());

};

NewsController.prototype = new Controller();
