/**
 * Модель Currency - курс валют
 * "eur/uah": {
                "from": "EUR",
                "to": "UAH",
                "buy": 14.9,
                "sale": 15.9
            },
 * @param title {string} Пара валют (EUR/UAH, USD/UAH etc.)
 * @param from {string} Валюта которую покупают/меняют
 * @param to {string} Валюта которой платят/получают
 * @param buy {number} Цена покупки валюты
 * @param sale {number} Цена продажи валюты
 * @constructor
 */

var Currency = function(title, from, to, buy, sale) {
    /**
     * Название пары
     * @type {string}
     */
    this.title = title;
    /**
     * Валюта которую покупают/меняют
     * @type {string}
     */
    this.from = from;
    /**
     * Валюта которой платят/получают
     * @type {string}
     */
    this.to = to;
    /**
     * Цена покупки валюты
     * @type {number}
     */
    this.buy = buy;
    /**
     * Цена продажи валюты
     * @type {number}
     */
    this.sale = sale;

}