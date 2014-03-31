/**
 * Модель Transaction - одна банковская операция
 * @param text {string} Описание транзакции
 * @param price {number} Сумма транзакции
 * @param timestamp {string} Время совершения транзакции
 * @param card_id {number} Идентификатор карты, с которой была произведена транзакция
 * @constructor
 */

var Transaction = function(text, price, timestamp, card_id) {
    /**
     * Описание
     * @type {string}
     */
    this.text = text;
    /**
     * Сумма
     * @type {number}
     */
    this.price = price;
    /**
     * Время совершения
     * @type {Date}
     */
     this.timestamp = new Date(timestamp);
    /**
     * Идентификатор карты
     * @type {number}
     */
    this.card_id = card_id;

    this.info = ko.computed(function(){
        return text+' '+price;
    }, this);
}