/**
 * Store транзакций. Реализует методы загрузки дополнительных транзакций и их считывания.
 * Паттерн: Repository
 * Архитектура приложения была пересмотренна. Поэтому TransactionsStore пока не используется
 **/
var TransactionsStore = function() {

    /**
     * Singleton pattern part
     */

    this.prototype = new Store();
    
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    var self = this;

    self.data = ko.observableArray([],{persist: 'transactions'});
    self.lastUpdate = new Date();
    self.url = 'more_transactions.json';

    self.init = function() {
        console.log("Init transactions store");
        this.update();
    }
    self.update = function() {
        $.ajax({
            dataType: "json",
            url: self.url,
            async: false,
            success: function(data) {
                var newData = [];
                self.lastUpdate = new Date();
                $.each(data.transactions, function(index, value){
                    newData[index] = self.readModel(value);
                });
               self.data(newData);
            }
        });
    }
    self.readModel = function(value) {
        return new Transaction(value.text, value.price, value.timestamp, value.card_id);
    }

    self.getTransactionsForCard = function(cardID) {

    }

    self.lastData = function(count) {
        var data = this.data();
        console.log('123',data);
        return data.slice(0, count);
    };

    self.init();

}
