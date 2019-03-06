var _ = require('underscore'),
    SHORT = _.template('Languages: jw.org: <%= jworg.total %>, <%= jworg.hasWebContent %> L1+, <%= jworg.isSign %> SLs, <%= jworg.isRTL %> RTL, <%= jworg.isSignWithWeb %> L1+ SLs, <%= jworg.uncounted.total %> uncounted script variants; jwb: <%= jwb.web.total %>, <%= jwb.web.isSign %> SLs, <%= jwb.appletv.total %> AppleTV, <%= jwb.roku.total %> Roku'),
    LONG = _.template('jw.org has <%= jworg.total %> languages with downloadable content, <%= jworg.hasWebContent %> of which have part of the actual site in their language. This includes <%= jworg.isSign %> sign languages with downloadable content, <%= jworg.isSignWithWeb %> of which have part of the actual site in their language. <%= jworg.isRTL %> languages on the site are written from right-to-left.\n\nJW Broadcasting is available in <%= jwb.web.total %> languages. This includes <%= jwb.web.isSign %> sign languages.\n\nThere are also <%= jworg.uncounted.total %> language options available on jw.org that are not counted as languages because the language matches another counted language, but is written with a different script. <%= jworg.uncounted.hasWebContent %> of those <%= jworg.uncounted.total %> have part of the actual site in their language (the others are download-only). <%= jworg.uncounted.isRTL %> of the <%= jworg.uncounted.total %> uncounted languages are written from right-to-left.');

module.exports = {

   SHORT: SHORT,
   LONG: LONG,

};
