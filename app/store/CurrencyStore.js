/**
 * Store курсов валют
 * Паттерн: Repository

 **/
var CurrencyStore = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    var self = this;

    self.data = ko.observableArray([],{persist: 'currency'});
    self.lastUpdate = new Date();
    self.url = 'data.json';

    self.init = function() {
        console.log("CurrencyStore init");
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
                console.log(data);
                $.each(data.data.currency, function(index, value){
                    console.log(index,value);
//                    console.log('123');
                    newData[index] = self.readModel(value);
                })
                self.data(newData);
            }
        });
    }
    self.readModel = function(value) {
        return new Currency(value.title, value.from, value.to, value.buy, value.sale);
    }

    self.init();

}
