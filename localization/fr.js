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