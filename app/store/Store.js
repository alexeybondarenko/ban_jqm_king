/**
 * Store. Base class
 * Паттерн: Repository
 **/
var Store = function(rootPropery, url, storeName, readModelFunction) {

    var self = this;

    self.storeName = storeName;
    self.data = ko.observableArray([],{persist: self.storeName});
    self.lastUpdate = new Date();

    self.url = url;
    self.readModel = readModelFunction;

    self.sortBy = null;
    self.filterBy = null;

    self.rootProperty = rootPropery || '';

    self.idField = 'id';

    self.init = function() {
        console.assert(typeof self.readModel == 'function',"You must init readModel method");
        if (self.url != null)
            self.update();
    };

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

                if (self.sortBy) { newData.sortBy(self.sortBy); }
                if (self.filterBy) { newData = newData.filter(self.filterBy); }
               self.data(newData);
            }
        });

    };

    self.lastData = function(count) {
        var data = self.data();
        return data.slice(0, count);
    };

    self.getByID = function(argument, obj) {
        return (obj[argument] != null) ? self.data().filter(function(prop) {
            return prop[self.idField] == obj[argument];
        }): null;
    };


};

!function() {
    function _dynamicSortMultiple(attr) {
        /*
         * save the arguments object as it will be overwritten
         * note that arguments object is an array-like object
         * consisting of the names of the properties to sort by
         */
        var props = arguments;
        return function (obj1, obj2) {
            var i = 0, result = 0, numberOfProperties = props.length;
            /* try getting a different result from 0 (equal)
             * as long as we have extra properties to compare
             */
            while(result === 0 && i < numberOfProperties) {
                result = _dynamicSort(props[i])(obj1, obj2);
                i++;
            }
            return result;
        }
    }
    function _dynamicSort(property) {
        /* dynamicSort function body comes here */
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    Object.defineProperty(Array.prototype, "sortBy", {
        enumerable: false,
        writable: true,
        value: function() {
            return this.sort(_dynamicSortMultiple.apply(null, arguments));
        }
    });
}();