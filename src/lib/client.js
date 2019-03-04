var _ = require('underscore'),
    Q = require('q'),
    request = require('request'),
    currentLocale = 'en',
    currentLanguageCode = 'E',
    JWORG = _.template('https://www.jw.org/<%= locale %>/languages'),
    JWB = _.template('https://data.jw-api.org/mediator/v1/languages/<%= languageCode %>/<%= type %>'),
    TYPE_WEB = 'web',
    TYPE_APPLETV = 'appletv',
    TYPE_ROKU = 'roku';

function get(url) {
   var def = Q.defer();

   request(url, function(err, response, body) {
      if (err) {
         return def.reject(err);
      }

      if (response.statusCode != 200) {
         return def.reject(response);
      }

      def.resolve({ response: response, body: JSON.parse(body) });
   });

   return def.promise;
}

function detailsJWORG(data) {
   var languagesThatCount = _.filter(data.languages, { isCounted: true });

   return {
      total: languagesThatCount.length,
      isSign: _.filter(languagesThatCount, { isSignLanguage: true }).length,
      isRTL: _.filter(languagesThatCount, { direction: 'rtl' }).length,
      hasWebContent: _.filter(languagesThatCount, { hasWebContent: true }).length,
      isSignWithWeb: _.filter(languagesThatCount, { hasWebContent: true, isSignLanguage: true }).length,
   }
}

function detailsJWB(data) {
   return {
      total: data.languages.length,
      isSign: _.filter(data.languages, { isSignLanguage: true }).length,
      isRTL: _.filter(data.languages, { isRTL: true }).length,
      isLangPair: _.filter(data.languages, { isLangPair: true }).length,
   }
}

function searchLangs(langs, search, field) {

   // boolean string value mapping
   if (_.contains([ 'true', '1' ], search)) {
      search = true;
   } else if (_.contains([ 'false', '0', '-1' ], search)) {
      search = false;
   }

   var pattern = new RegExp(search, 'i'),
       matchObj = (field ? _.object([ [ field, search ] ]) : { symbol: search }),
       strictMatcher = _.matcher(matchObj),
       found = _.filter(langs, strictMatcher),
       looseMatcher;

   if (found.length) {
      return found;
   }

   // need to do loose matching
   looseMatcher = function(lang) {
      var values = field ? [ lang[field] ] : [ lang.name, lang.vernacularName ].concat(lang.altSpellings);
      return _.some(values, pattern.test.bind(pattern));
   };

   return _.filter(langs, looseMatcher);
}

module.exports = {

   setLanguageCode: function(languageCode) {
      currentLanguageCode = languageCode;
   },

   setLocale: function(locale) {
      currentLocale = locale;
   },

   counts: {

      jwb: function() {
         var web = get(JWB({ languageCode: currentLanguageCode, type: TYPE_WEB })),
             roku = get(JWB({ languageCode: currentLanguageCode, type: TYPE_ROKU })),
             appletv = get(JWB({ languageCode: currentLanguageCode, type: TYPE_APPLETV }));

         return Q.all([ web, roku, appletv ])
         .spread(function(web, roku, appletv) {
            return {
               web: detailsJWB(web.body),
               roku: detailsJWB(roku.body),
               appletv: detailsJWB(appletv.body),
            };
         });
      },

      jworg: function() {
         return get(JWORG({ locale: currentLocale }))
         .then(function(jworg) {
            return detailsJWORG(jworg.body);
         });
      },

      all: function() {
         return Q.all([ this.jwb(currentLanguageCode), this.jworg(currentLocale) ])
         .spread(function(jwb, jworg) {
            return {
               jwb: jwb,
               jworg: jworg,
            };
         });
      }

   },

   info: function(search, field) {
      return get(JWORG({ locale: currentLocale }))
         .then(function(resp) {
            return resp.body.languages;
         })
         .then(function(langs) {
            return searchLangs(langs, search, field);
         });
   }

};
