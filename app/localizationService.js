define([
    'jquery',
    'moment',
    'pubsub',
    'numeral',

    'lang-ru',
    'lang-fr',
    'numeral-ru',
    'numeral-fr',
    'app/localization',
    'moment-timezone'
], function($, moment, pubsub, numeral, moment_timezone){
    var instance = null,
        locals = ['en', 'fr', 'ru'],
        globalNameSpace = 'i18n_',
        i18n,
        timezones,
        currentTimezone;

    function getInstance (){
        if (!instance){
            instance = new LocalizationService();
        }

        return instance;
    }

    function reset (){
        if (instance && typeof instance.dispose === 'function'){
            instance.dispose();
        }

        instance = null;
    }

    function LocalizationService(){
        var currentLanguage;

        var eventToken = pubsub.subscribe('language', function(language){
            moment.lang(language);
            numeral.language(language);
            currentLanguage = language;
        });

        this.dispose = function(){
            pubsub.unsubscribe(eventToken);
        }

        function getValueFromPath(path, obj){
            var path = path.split('/'),
                parent = obj;

            for (var i = 0; i < path.length -1; i += 1) {
                parent = parent[path[i]];
            }

            return parent[path[path.length-1]];
        }

        this.get = function(string, format, locale){
            locale = locale || currentLanguage;

            if (!i18n[locale]){
                throw new Error('Wrong locale ' + locale)
            }

            /*if (!i18n[locale][string]){
                throw new Error('Undefined string ' + string + ' for ' + locale + ' locale');
            }*/

            return getValueFromPath(string, i18n[locale])(format);
        }
    }

    function init(locals){
        var localNameSpace,
            i18n = {};

        for(var i = 0; i < locals.length; i ++){
            localNameSpace = globalNameSpace + locals[i];
            if (typeof window[localNameSpace] === 'object'){
                i18n[locals[i]] = window[localNameSpace];
                window[localNameSpace] = undefined;
            }
        }

        return i18n;
    }

    function initTimezones(callback){
        $.ajax({
            url: 'app/moment-timezone.json'})
            .success(callback)
            .error(function(){
                console.log('Can\'t load timezones');
            }
        );
    }

    function setTimezone(){
        return 'America/Toronto';
        //return 'Africa/Asmara';
    }

    function getTimezone(){
        return currentTimezone;
    }

    i18n = init(locals, i18n);
    initTimezones(function(data){
        timezones = data;
        moment.tz.add(data);
        currentTimezone = setTimezone();
    });

    return {
        getInstance: getInstance,
        reset: reset,
        timezone: getTimezone
    }
});