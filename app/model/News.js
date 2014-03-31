/**
 * Модель News - новость
 * @param title {string} Заголовок новости
 * @param created_at {date} Дата создания новости
 * @param html {string} Контент
 * @constructor
 */

var News = function(title, created_at, html) {
    /**
     * Название пары
     * @type {string}
     */
    this.title = title;
    /**
     * Дата публикации новости
     * @type {date}
     */
    this.created_at = created_at;
    /**
     * Контент статьи
     * @type {string}
     */
    this.html = html;

}