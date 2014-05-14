define([
    'ko',
    'moment',
    'pubsub'
], function(ko, moment, pubsub){
    ko.bindingHandlers.date = {
        update: function(element, valueAccessor, allBindings, viewModel, bindingContext){
            var value = moment(valueAccessor())
                .format('MMMM Do YYYY, h:mm:ss a');
            ko.utils.setTextContent(element, value);

            pubsub.subscribe('language', function(lang){
                var value = moment(valueAccessor())
                    .format('MMMM Do YYYY, h:mm:ss a');
                ko.utils.setTextContent(element, value);
            });
        }
    }
});