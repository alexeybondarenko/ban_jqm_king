/**
 * Model for Company Object
 * @param id Identificator of company in the system
 * @param name Name of company
 * @constructor
 */
var Company = function(id, name, accountNumber, cityID, service) {
    this.id = id;
    this.name = name;
    this.accountNumber = accountNumber;
    this.cityID = cityID;
    this.service = service;
};