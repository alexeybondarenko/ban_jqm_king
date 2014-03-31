
var CardsStore = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    var self = this;

    self.data = [];
    self.lastUpdate = new Date();
    self.url = new App().dataURL;

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
                $.each(data.data.cards, function(index, value){
                    self.data[index] = self.readModel(value);
                })
            }
        });
    }
    self.readModel = function(value) {
        return new Card(value.id,value.owner_id,value.created_at,value.title,value.number,value.amount,value.currency,value.type, value.transactions);
    }

    self.getTransactionsForCard = function(cardID) {
        var result = [];

        $.ajax({
            dataType: "json",
            url: self.url,
            async: false,
            success: function(data) {
                $.each(data.data.transactions, function(index, value){
                    result[index] = self.readModel(value);
                })
            }
        });

        return result;
    }

    self.init();

}
