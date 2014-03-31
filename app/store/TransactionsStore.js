/**
 * Store транзакций. Реализует методы загрузки дополнительных транзакций и их считывания.
 * Паттерн: Repository
 * Архитектура приложения была пересмотренна. Поэтому TransactionsStore пока не используется
 **/
var TransactionsStore = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    var self = this;

    self.data = [];
    self.lastUpdate = new Date();
    self.url = new App().dataURL;;

    self.init = function() {
        this.update();
    }
    self.update = function() {

//        $.ajax({
//            dataType: "json",
//            url: self.url,
//            async: false,
//            success: function(data) {
//
//                self.lastUpdate = new Date();
//                $.each(data.data.transactions, function(index, value){
//                    self.data[index] = self.readModel(value);
//                })
//            }
//        });
    }
    self.readModel = function(value) {
//        return new Transaction(value.text, value.price, value.timestamp, value.card_id);
    }

    self.getTransactionsForCard = function(cardID) {
//        var result = [];
//
//        $.ajax({
//            dataType: "json",
//            url: self.url,
//            async: false,
//            success: function(data) {
//                $.each(data.data.transactions, function(index, value){
//                    result[index] = self.readModel(value);
//                })
//            }
//        });
//
//        return result;
    }

    self.init();

}
