/**
 * Store новостей банка
 * Паттерн: Repository

 **/
var NewsStore = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    var self = this;

    self.data = ko.observableArray([],{persist: 'currency'});
    self.lastUpdate = new Date();
    self.url = 'news.json';

    self.init = function() {
        this.update();
    }
    self.update = function() {

        $.ajax({
            dataType: "json",
            url: self.url,
            async: false,
            success: function(data) {
                self.lastUpdate = new Date();
                var newData = [];
                $.each(data.news, function(index, value){
                    newData[index] = self.readModel(value);
                })
                self.data(newData);
            }
        });
    }
    self.readModel = function(value) {
        return new News(value.title, value.created_at, value.html);
    }

    self.init();

}
