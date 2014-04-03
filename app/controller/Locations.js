/**
 * Контролллер Отделений
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */

var Locations = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.language = ko.observable(new Language().language());

    var locationsStore = new App().stores.locations;

    self.locations = ko.observableArray(locationsStore.data());
    self.initMap = function() {
        console.log("Init map");

        var $locationsMap = $("#locationsMap");
        $locationsMap.gmap();
//        $locationsMap.gmap().bind('init', function(evt, map) {
//        $locationsMap.gmap('getCurrentPosition', function(position, status) {
//            if ( status === 'OK' ) {
//                var clientPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
//                $locationsMap.gmap('addMarker', {'position': clientPosition, 'bounds': true});
//                var locations = new LocationsStore().data();
//                $.each(locations, function(index, value) {
////                    console.log('123');
//                    $locationsMap.gmap('addMarker', {
//                        'position': new google.maps.LatLng(value.latitude, value.longitude),
//                        'bounds': true,
//                        'title':'<h3>'+value.title+'</h3>'
//                    });
//                });
//            }
//        });
//    });
//
    }
}