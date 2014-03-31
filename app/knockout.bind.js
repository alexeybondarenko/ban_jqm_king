$(function() {

    /**
     * Когда контен создается динамически и используются шаблоны knockoutJS, jQM не обрабатывает HTML и не добавляет неободимые стили. Для того, чтобы указать jQM на необходимость обработки кода, укажите в data-bind bind jqmRender.
     * Например, data-bind="template: { name: 'transactionsList', data: transactions()}, jqmRender"
     * @type event
     */

    ko.bindingHandlers.jqmRender = {

        update: function (element, valueAccessor) {
            // Get jQuery Mobile to enhance elements within this element
            $(element).trigger("create");
            console.log('create jqmRender');
        }
    };

    ko.bindingHandlers.slideVisible = {
        init: function(element, valueAccessor) {
            var duration = ko.utils.unwrapObservable(valueAccessor());
            $(element).hide().slideDown(duration);
        }
    };

});