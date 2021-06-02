import { AllDetails } from './Interfaces';

export function SHORT({ jworg, jwb }: AllDetails): string {
   /* eslint-disable-next-line max-len */
   return `Languages: jw.org: ${jworg.total}, ${jworg.hasWebContent} L1+, ${jworg.isSign} SLs, ${jworg.isRTL} RTL, ${jworg.isSignWithWeb} L1+ SLs, ${jworg.uncounted.total} uncounted script variants; jwb: ${jwb.web.total}, ${jwb.web.isSign} SLs, ${jwb.appletv.total} AppleTV, ${jwb.roku.total} Roku`;
}

export function LONG({ jworg, jwb }: AllDetails): string {
   /* eslint-disable-next-line max-len */
   return `jw.org has ${jworg.total} languages with downloadable content, ${jworg.hasWebContent} of which have part of the actual site in their language. This includes ${jworg.isSign} sign languages with downloadable content, ${jworg.isSignWithWeb} of which have part of the actual site in their language. ${jworg.isRTL} languages on the site are written from right-to-left.\n\nJW Broadcasting is available in ${jwb.web.total} languages. This includes ${jwb.web.isSign} sign languages.\n\nThere are also ${jworg.uncounted.total} language options available on jw.org that are not counted as languages because the language matches another counted language, but is written with a different script. ${jworg.uncounted.hasWebContent} of those ${jworg.uncounted.total} have part of the actual site in their language (the others are download-only). ${jworg.uncounted.isRTL} of the ${jworg.uncounted.total} uncounted languages are written from right-to-left.`;
}
