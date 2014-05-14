define([
    'jquery',
    'knockout',
    'moment',
    'pubsub',
    'numeral',

    'bindings/i18n',
    'lang-ru',
    'lang-fr',
    'numeral-ru',
    'numeral-fr'
], function($, ko, moment, pubsub, numeral) {
    function setLanguage(language){
        moment.lang(language);
        numeral.language(language);
        pubsub.publish('language', language);
    }
    
    function ViewModel(options) {
        var self = this,
            langs = langs;

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
