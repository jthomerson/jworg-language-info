var _ = require('underscore'),
    Q = require('q'),
    request = require('request'),
    JWORG = _.template('http://www.jw.org/<%= locale %>/languages'),
    JWB = _.template('http://mediator.jw.org/v1/languages/<%= languageCode %>/<%= type %>'),
    TYPE_WEB = 'web',
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
   return {
      total: data.languages.length,
      isSign: _.filter(data.languages, { isSignLanguage: true }).length,
      isRTL: _.filter(data.languages, { direction: 'rtl' }).length,
      hasWebContent: _.filter(data.languages, { hasWebContent: true }).length,
      isSignWithWeb: _.filter(data.languages, { hasWebContent: true, isSignLanguage: true }).length,
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

module.exports = {

   counts: {

      jwb: function(languageCode) {
         var web = get(JWB({ languageCode: languageCode, type: TYPE_WEB })),
             roku = get(JWB({ languageCode: languageCode, type: TYPE_ROKU }));

         return Q.all([ web, roku ])
         .spread(function(web, roku) {
            return {
               web: detailsJWB(web.body),
               roku: detailsJWB(roku.body),
            };
         });
      },

      jworg: function(locale) {
         return get(JWORG({ locale: locale }))
         .then(function(jworg) {
            return detailsJWORG(jworg.body);
         });
      },

      all: function(languageCode, locale) {
         return Q.all([ this.jwb(languageCode), this.jworg(locale) ])
         .spread(function(jwb, jworg) {
            return {
               jwb: jwb,
               jworg: jworg,
            };
         });
      }

   }

};
