define([
    'ko',
    'jquery',
    'pubsub',
    'moment',
    'numeral',
    'app/localizationService'
], function(ko, $, pubsub, moment, numeral, LocalizationService){
    var localizationService = LocalizationService.getInstance();

    function rebind(elements){
        $.each(elements, function(index, value){
            if (typeof value.handler === 'function') {
                $.each(value.elements, function(index, element){
                    value.handler(element);
                });
            } else {
                throw new Error('Undefined elements for rebind action');
            }
        });
    }

    function rebindDateElement(element){
        var $element = $(element),
            format = $element.attr('format') || 'MMMM Do YYYY, h:mm:ss a',
            locale = $element.attr('locale') || moment.lang();

        $element.text(moment($element.attr('date'))
            .lang(locale)
            .format(format));
    }

    function rebindNumberElement(element){
        var $element = $(element),
            format = $element.attr('format') || '0,0[.][00000]',
            globaleLocale = numeral.language(),
            locale = $element.attr('locale') || globaleLocale;

        if (locale != globaleLocale){
            numeral.language(locale);
        }

        $element.text(numeral($element.attr('number'))
            .format(format));

        if (locale != globaleLocale){
            numeral.language(globaleLocale);
        }
    }

    function rebindCurrencyElement(element){
        var $element = $(element),
            format = $element.attr('format') || '0,0[.]00 $',
            globaleLocale = numeral.language(),
            locale = $element.attr('locale') || globaleLocale;

        if (locale != globaleLocale){
            numeral.language(locale);
        }

        $element.text(numeral($element.attr('currency'))
            .format(format));

        if (locale != globaleLocale){
            numeral.language(globaleLocale);
        }
    }

    function rebindStringFormatElement(element){
        var $element = $(element),
            key = $element.attr('string'),
            attr = {};

        $.each(element.attributes, function() {
            if (this.name === 'string') return;
            attr[this.name.toUpperCase()] = this.value;
        });

        $element.text(localizationService.get(key, attr));
    }

    ko.bindingHandlers.i18n = {
        init: function(element, valueAccessor, allBindings, viewModel, bindingContext){
            function timeOutHandler (){
                setTimeout(function(){
                    var elements = [],
                        $element = $(element);

                    elements.push({
                        elements: $element.find('[date]'),
                        handler: rebindDateElement
                    });

                    elements.push({
                        elements: $element.find('[number]'),
                        handler: rebindNumberElement
                    });

                    elements.push({
                        elements: $element.find('[currency]'),
                        handler: rebindCurrencyElement
                    });

                    elements.push({
                        elements: $element.find('[string]'),
                        handler: rebindStringFormatElement
                    })
                    
                    rebind(elements);
                }, 0);
            }

            timeOutHandler();
            pubsub.subscribe('language', timeOutHandler);
        },
        update: function(element, valueAccessor){
            var language = valueAccessor();

            if (typeof value === 'string' && !pubsub){
                moment.lang(language);
                numeral.language(language);
                timeOutHandler();
            }
        }
    }

    function koBindingHandler(element, attrName, attrValue){
        var toRemove = (attrValue === false) || (attrValue === null) || (attrValue === undefined);
            if (toRemove){
                element.removeAttribute(attrName);
            } 
            
        element.setAttribute(attrName, attrValue.toString());
    }

    ko.bindingHandlers.date = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
            koBindingHandler(element, 'date', ko.utils.unwrapObservable(valueAccessor()));
            rebindDateElement(element);
        }
    }

    ko.bindingHandlers.number = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
            koBindingHandler(element, 'number', ko.utils.unwrapObservable(valueAccessor()));
            rebindNumberElement(element);
        }
    }

    ko.bindingHandlers.currency = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
            koBindingHandler(element, 'currency', ko.utils.unwrapObservable(valueAccessor()));
            rebindNumberElement(element);
        }
    }

    ko.bindingHandlers.string = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
            var attrValue = valueAccessor();
            if (typeof attrValue === 'string'){
                koBindingHandler(element, 'string', attrValue);
                
            } else if (typeof attrValue === 'object'){
                $.each(attrValue, function(index, attrObservable){
                    var attr = typeof attrObservable === 'function'? attrObservable() : attrObservable;
                    koBindingHandler(element, index, attr);
                });
            }

            rebindStringFormatElement(element);
        }
    }
});