
var Language = function() {

    /**
     * Singleton pattern part
     */
    if ( arguments.callee._singletonInstance )
        return arguments.callee._singletonInstance;
    arguments.callee._singletonInstance = this;

    var self = this;

    self.availableLanguages = ko.observableArray([
        {title: "Українська", code: "ua"},
        {title: "Русский", code: "ru"},
        {title: "English", code: "en"}
    ]);

    self.lang = ko.observable('ru' , {persist: 'languageCode'});
    self.langFileFormat = 'json';

    self.path = 'resources/lang/';

    self.language = ko.observable(null,{persist: 'languagePack'});

    self.init = function() {
        if(self.language() == null)
            self.loadLang(self.lang());
    }
    self.loadLang = function(language) {
        language = language || self.lang();

        var path = self.path+language+'.'+self.langFileFormat;

        $.ajax({
            dataType: "json",
            url: path,
            async: false,
            success: function(data) {
                self.language(data);

            }
        });
    }

    self.lang.subscribe(function(newValue) {
        self.loadLang(newValue);
        location.reload(true);
    });

    self.init();
}

