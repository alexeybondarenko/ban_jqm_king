/**
 * Модель User - пользователь приложения, клиент банка
 * @param id {number} Идентификатор пользователя
 * @param firstName {string} Имя пользователя
 * @param lastName {string} Фамилия пользователя
 * @param created_at {string} Дата и время регистрации пользователя как клиента банка
 * @param birthday_date {string} Дата рождения пользователя
 * @constructor
 */
    var User = function(id, firstName, lastName, created_at, birthday_date) {
    /**
     * Идентификатор пользователя
     * @type {number}
     */
    this.id = id;
    /**
     * Имя пользователя
     * @type {string}
     */
    this.firstName = firstName;
    /**
     * Фамилия пользователя
     * @type {string}
     */
    this.lastName = lastName;
    /**
     * Имя и фамилия пользователя
     * @function
     * @type {string}
     */
    this.fullName = ko.computed(function(){
        return this.firstName+ ' '+this.lastName;
    },this);
    /**
     * Дата и время регистрации пользователя как клиента банка
     * @type {Date}
     */
    this.created_at = new Date(created_at);
    /**
     * Дата рождения пользователя
     * @type {string}
     */
    this.birthday_date = birthday_date;
}