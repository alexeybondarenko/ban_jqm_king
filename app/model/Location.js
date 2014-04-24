var Location = function(title, type, adress, city, latitude, longitude) {
    var self = this;

    self.countryDefault = "Ukraine";

    self.title = title;
    self.type = type; // atm or branch
    self.adress = adress;
    self.city = city;
    self.latitude = latitude;
    self.longitude = longitude;

}