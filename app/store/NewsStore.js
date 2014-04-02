/**
 * Store новостей банка
 * Паттерн: Singleton Repository
 **/

var NewsStore;

NewsStore = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.init();

};

function readNews(value) {
    return new News(value.title, value.created_at, htmlDecode(value.html));
}

NewsStore.prototype = new Store('news', 'news.json', 'news', readNews);

