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

        var defaultLatLng = new google.maps.LatLng(34.0983425, -118.3267434);  // Default to Hollywood, CA when no geolocation support
        if ( navigator.geolocation ) {
            function success(pos) {
                // Location found, show map with these coordinates
                drawMap(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            }
            function fail() {
                drawMap(defaultLatLng);  // Failed to find location, show default map
            }
            // Find the users current position.  Cache the location for 5 minutes, timeout after 6 seconds
            navigator.geolocation.getCurrentPosition(success, fail, {maximumAge: 500000, enableHighAccuracy:true, timeout: 6000});
        } else {
            drawMap(defaultLatLng);  // No geolocation support, show default map
        }
        function drawMap(latlng) {
            var myOptions = {
                zoom: 10,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("locationsMap"), myOptions);
            // Add an overlay to the map of current lat/lng

            var locations = new LocationsStore().data();
            $.each(locations, function(index, value) {
                new google.maps.Marker({
                    position: new google.maps.LatLng(value.latitude, value.longitude),
                    map: map,
                    title: value.title
                });
            });
        }
    };
    };
