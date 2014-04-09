!function() {

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

    /**
     * Заголовки для групп списка.
     * Пример:
     <ul data-role="listview" data-bind="foreach: $data">
        <li data-role="divider" data-bind="groupTitle: {field: 'type', text: 'typeTitle'}"></li>
        <li>
            <a data-bind="text: info()"></a>
        </li>
     </ul>
     * @type {{init: init}}
     */
    ko.bindingHandlers.groupTitle = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext) {
            console.log("Grouping");
            var observable = valueAccessor();

            var groupArg = observable.field;
            var textArg = observable.text || groupBy;

            var fieldValue = viewModel[groupArg];
            fieldValue = typeof fieldValue == "function" ? fieldValue(): fieldValue;
            var textValue = viewModel[textArg];
            textValue = typeof textValue == "function" ? textValue() : textValue;
            var idx = bindingContext['$index']();
            var data = bindingContext['$parent'];

            console.log(groupArg, "groupVal:"+fieldValue, textArg, "groupArg:"+textValue);

            var prevFieldValue = (idx-1 >=0) ?  data[idx-1] : null;

            var $elem = $(element);

            !prevFieldValue || (prevFieldValue && prevFieldValue[groupArg] != fieldValue) ? $elem.text(textValue) : $elem.hide();

        }
    };
    /**
     * Добавление (...) в конце слова
     * @type {{update: update, defaultLength: number}}
     */
    ko.bindingHandlers.truncatedText = {
        update: function (element, valueAccessor, allBindingsAccessor) {
            var value = ko.utils.unwrapObservable(valueAccessor()),
                length = ko.utils.unwrapObservable(allBindingsAccessor().length) || ko.bindingHandlers.truncatedText.defaultLength,
                truncatedValue = value.length > length ? value.substring(0, Math.min(value.length, length)) + " ..." : value;

            ko.bindingHandlers.text.update(element, function () { return truncatedValue; });
        },
        defaultLength: 15
    };

}();