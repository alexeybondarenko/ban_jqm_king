/**
 * Store отделений и банкоматов.
 * Паттерн: Repository

 **/
var LocationsStore = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;
    var self = this;

    self.data = ko.observableArray([],{persist: 'locations'});
    self.lastUpdate = new Date();
    self.url = 'locations.json';

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
                $.each(data.locations, function(index, value){
                    newData[index] = self.readModel(value);
                })
                self.data(newData);
            }
        });
    }
    self.readModel = function(value) {
        return new Location(value.title, value.type, value.adress, value.city, value.latitude, value.longitude);
    }

    self.init();

}
