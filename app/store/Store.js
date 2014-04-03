/**
 * Store. Base class
 * Паттерн: Repository
 **/
var Store = function(rootPropery, url, storeName, readModelFunction) {

    var self = this;

    self.storeName = storeName;
    self.data = ko.observableArray([],{persist: self.storeName});
    self.lastUpdate = new Date();
    self.url = url || AppConfig.dataURL;
    self.readModel = readModelFunction;

    self.rootProperty = rootPropery || '';

    self.init = function() {

        console.assert(typeof self.readModel == 'function',"You must init readModel method");
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

                //Support inner nodes
                var roots = self.rootProperty.split('/');
                while (roots.length) {
                    data = data[roots.shift()];
                }

                $.each(data, function(index, value){
                    newData[index] = self.readModel(value);
                });

               self.data(newData);
            }
        });

    }

    self.lastData = function(count) {
        var data = this.data();
        return data.slice(0, count);
    };

}
