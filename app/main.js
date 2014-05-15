define([
    'jquery',
    'knockout',
    'pubsub',
    'app/localizationService',

    'bindings/i18n'
], function($, ko, pubsub, LocalizationService) {
    function setLanguage(language){
        pubsub.publish('language', language);
    }
    
    function ViewModel(options) {
        var self = this,
            langs = langs,
            localizationService = LocalizationService.getInstance();

        self.status = ko.observable('active');

        self.date = ko.observable(new Date());
        setInterval(function(){
            self.date(new Date());
        }, 1000);
        
        self.language = ko.observable(options.locale || 'en');
        self.language.subscribe(setLanguage);
        setLanguage('en');
    };
  

    ko.applyBindings(new ViewModel({
        locale: 'en'
    }));
});
