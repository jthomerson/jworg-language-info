var _ = require('underscore'),
    SHORT = _.template('Languages: jw.org: <%= jworg.total %>, <%= jworg.hasWebContent %> L1+, <%= jworg.isSign %> SLs, <%= jworg.isSignWithWeb %> L1+ SLs; jwb: <%= jwb.web.total %>, <%= jwb.roku.total %> Roku, <%= jwb.web.isSign %> SLs, <%= jwb.web.isLangPair %> pairs'),
    LONG = _.template('jw.org has <%= jworg.total %> languages with downloadable content, <%= jworg.hasWebContent %> of which have part of the actual site in their language. This includes <%= jworg.isSign %> sign languages with downloadable content, <%= jworg.isSignWithWeb %> of which have part of the actual site in their language.\n\nJW Broadcasting is available in <%= jwb.web.total %> languages, all of which have the monthly program. This includes <%= jwb.web.isSign %> sign languages.');

module.exports = {

   SHORT: SHORT,
   LONG: LONG,

};
