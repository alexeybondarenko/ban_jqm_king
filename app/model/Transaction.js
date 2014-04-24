/**
 * Модель Transaction - одна банковская операция
 * @param text {string} Описание транзакции
 * @param price {number} Сумма транзакции
 * @param timestamp {string} Время совершения транзакции
 * @param card_id {number} Идентификатор карты, с которой была произведена транзакция
 * @constructor
 */

var Transaction = function(text, price, timestamp, card_id, type) {
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

    this.formatedDate = ko.computed(function(){
         return this.timestamp.format("yyyy-MM-dd h:mm:ss");
    }, this);

    this.type = type || "other";

    this.typeIconName = ko.computed(function() {
        var res = '';
        switch (this.type) {
            case 'phone':
                res += 'fa-mobile-phone fa-2x';
                break;
            case 'cafe':
                res += 'fa-coffee fa-1x';
                break;
            case 'store':
                res += 'fa-shopping-cart fa-1x';
                break;
            case 'terminal pay':
                res += 'fa-angle-double-right fa-1x';
                break;
            case 'food':
                res += 'fa-lemon-o fa-1x';
                break;
            case 'atm-cash':
                res += 'fa-money fa-1x';
                break;
            default:
                res += ''

        }

        return res;
    }, this);
}