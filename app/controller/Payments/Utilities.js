/**
 * Контролллер Коммунальных Платежей
 * @author ALexey Bondarenko <alexeybondarenko@me.com>
 * @constructor
 */


var PaymentsUtilities = function () {

    /**
     * Singleton pattern part
     */
    if (arguments.callee._singletonInstance)
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.availableCities = [
        { "name": "Винница", "id": 30 },
        { "name": "Днепропетровск", "id": 2 },
        { "name": "Донецк", "id": 3 },
        { "name": "Житомир", "id": 4 },
        { "name": "Запорожье", "id": 5 },
        { "name": "Ивано-франковск", "id": 6 },
        { "name": "Киев", "id": 1 },
        { "name": "Кировоград", "id": 9 },
        { "name": "Луганск", "id": 10 },
        { "name": "Луцк", "id": 11 },
        { "name": "Львов", "id": 12 },
        { "name": "Николаев", "id": 13 },
        { "name": "Одесса", "id": 14 },
        { "name": "Полтава", "id": 15 },
        { "name": "Ровно", "id": 16 },
        { "name": "Севастополь", "id": 17 },
        { "name": "Симферополь", "id": 18 },
        { "name": "Сумы", "id": 19 },
        { "name": "Тернополь", "id": 20 },
        { "name": "Ужгород", "id": 21 },
        { "name": "Харьков", "id": 22 },
        { "name": "Херсон", "id": 23 },
        { "name": "Хмельницкий", "id": 24 },
        { "name": "Черкассы", "id": 25 },
        { "name": "Чернигов", "id": 26 },
        { "name": "Черновцы", "id": 27 }
    ];

    self.selectedCompany = ko.observable(null);
    self.selectedCity = ko.observable(null);

    self.hasSelectedCity = ko.computed(function () {
        return this.selectedCity() != null;
    }, this);

};
PaymentsUtilities.prototype = new Payments();
