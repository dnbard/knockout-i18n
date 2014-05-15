/*! localizationtest - v0.0.0 - 2014-05-15
* Copyright (c) 2014 Author Name; Licensed MIT */
(function(){ window.i18n_en || (window.i18n_en = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.en=function(n){return n===1?"one":"other"}
var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},
s=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};
window.i18n_en["welcome"] = {
"string":function(d){return "Welcome"},
"name":function(d){return "His name is "+v(d,"NAME")},
"gender":function(d){return s(d,"GENDER",{"male":"He","female":"She","other":"They"})+" liked this"},
"plural":function(d){return "There "+p(d,"NUM_RESULTS",0,"en",{"one":"is one result","other":"are "+n(d,"NUM_RESULTS")+" results"})}}
})();
(function(){ window.i18n_fr || (window.i18n_fr = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.fr=function(n){return n===0||n==1?"one":"other"}
var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},
s=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};
window.i18n_fr["welcome"] = {
"string":function(d){return "accueil"},
"name":function(d){return "His name is "+v(d,"NAME")+" FRENCH"},
"gender":function(d){return s(d,"GENDER",{"male":"He","female":"She","other":"They"})+" liked this FRENCH"},
"plural":function(d){return "There "+p(d,"NUM_RESULTS",0,"fr",{"one":"is one result","other":"are "+n(d,"NUM_RESULTS")+" results"})+" FRENCH"}}
})();
(function(){ window.i18n_ru || (window.i18n_ru = {}) 
var MessageFormat = { locale: {} };
MessageFormat.locale.ru = function (n) {
  if ((n % 10) == 1 && (n % 100) != 11) {
    return 'one';
  }
  if ((n % 10) >= 2 && (n % 10) <= 4 &&
      ((n % 100) < 12 || (n % 100) > 14) && n == Math.floor(n)) {
    return 'few';
  }
  if ((n % 10) === 0 || ((n % 10) >= 5 && (n % 10) <= 9) ||
      ((n % 100) >= 11 && (n % 100) <= 14) && n == Math.floor(n)) {
    return 'many';
  }
  return 'other';
};
var
c=function(d){if(!d)throw new Error("MessageFormat: No data passed to function.")},
n=function(d,k,o){if(isNaN(d[k]))throw new Error("MessageFormat: `"+k+"` isnt a number.");return d[k]-(o||0)},
v=function(d,k){c(d);return d[k]},
p=function(d,k,o,l,p){c(d);return d[k] in p?p[d[k]]:(k=MessageFormat.locale[l](d[k]-o),k in p?p[k]:p.other)},
s=function(d,k,p){c(d);return d[k] in p?p[d[k]]:p.other};
window.i18n_ru["welcome"] = {
"string":function(d){return "добро пожаловать"},
"name":function(d){return "His name is "+v(d,"NAME")+" RUSSKE"},
"gender":function(d){return s(d,"GENDER",{"male":"He","female":"She","other":"They"})+" liked this RUSSKE"},
"plural":function(d){return "There "+p(d,"NUM_RESULTS",0,"ru",{"one":"is one result","other":"are "+n(d,"NUM_RESULTS")+" results"})+" RUSSKE"}}
})();