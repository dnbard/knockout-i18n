require.config({
  // make bower_components more sensible
  // expose jquery 
  paths: {
    'bower_components': '../bower_components',
    'bindings': '../bindings',
    'jquery': '../bower_components/jquery/dist/jquery',
    'moment': '../bower_components/momentjs/moment',
    'pubsub': '../bower_components/pubsub/pubsub.min',
    'lang-ru': '../bower_components/momentjs/lang/ru',
    'lang-fr': '../bower_components/momentjs/lang/fr',
    'numeral': '../bower_components/numeraljs/numeral',
    'numeral-ru': '../bower_components/numeraljs/languages/ru',
    'numeral-fr': '../bower_components/numeraljs/languages/fr'
  },
  map: {
    '*': {
        'knockout': '../bower_components/knockout.js/knockout',
        'ko': '../bower_components/knockout.js/knockout'
    }
  }
});

// Use the debug version of knockout it development only
// When compiling with grunt require js will only look at the first 
// require.config({}) found in this file
require.config({
  map: {
    '*': {
      'knockout': '../bower_components/knockout.js/knockout-2.3.0.debug',
      'ko': '../bower_components/knockout.js/knockout-2.3.0.debug'
    }
  }
});

if (!window.requireTestMode) {
  require(['main'], function(){ });
}

