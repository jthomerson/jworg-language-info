import fetch from 'node-fetch';
import { JWORGDetails, JWBResponse, JWORGLangaugeInfo, AllDetails, AllJWBDetails, JWBDetails, JWORGResponse } from './Interfaces';

export default class Client {
   public constructor(private _currentLanguageCode = 'E', private _currentLocale = 'en') {}

   public async info(search: string, field?: keyof JWORGLangaugeInfo): Promise<JWORGLangaugeInfo[]> {
      const resp = await this._getJWORG();

      return this._searchLangs(resp.languages, search, field);
   }

   public async jwb(): Promise<AllJWBDetails> {
      const [ web, roku, appletv ] = await Promise.all([ this._getJWB('web'), this._getJWB('roku'), this._getJWB('appletv') ]);

      return {
         web: this._detailsJWB(web),
         roku: this._detailsJWB(roku),
         appletv: this._detailsJWB(appletv),
      };
   }

   public async jworg(): Promise<JWORGDetails> {
      const jworg = await this._getJWORG();

      return this._detailsJWORG(jworg);
   }

   public async all(): Promise<AllDetails> {
      const [ jworg, jwb ] = await Promise.all([ this.jworg(), this.jwb() ]);

      return {
         jwb: jwb,
         jworg: jworg,
      };
   }

   public get languageCode(): string {
      return this._currentLanguageCode;
   }
   public set languageCode(v: string) {
      this._currentLanguageCode = v;
   }

   public get locale(): string {
      return this._currentLocale;
   }
   public set locale(v: string) {
      this._currentLocale = v;
   }

   private async _getJWORG(): Promise<JWORGResponse> {
      const url = `https://www.jw.org/${this.locale}/languages`,
            res = await fetch(url);

      return res.json();
   }

   private async _getJWB(type: 'web' | 'roku' | 'appletv'): Promise<JWBResponse> {
      const url = `https://data.jw-api.org/mediator/v1/languages/${this.languageCode}/${type}`,
            res = await fetch(url);

      return res.json();
   }

   private _searchLangs(langs: JWORGLangaugeInfo[], search: string, field?: keyof JWORGLangaugeInfo): JWORGLangaugeInfo[] {
      // boolean string value mapping
      if ([ 'true', '1' ].includes(search)) {
         search = 'true';
      } else if ([ 'false', '0', '-1' ].includes(search)) {
         search = 'false';
      }

      const found = langs.filter((lang) => { return field ? lang[field] === search : lang.symbol === search; });

      if (found.length) {
         return found;
      }

      // need to do loose matching
      const pattern = new RegExp(search, 'i');

      return langs.filter((lang) => {
         const values = field ? [ lang[field] ] : [ lang.name, lang.vernacularName ].concat(lang.altSpellings);

         return values.some((val) => { return pattern.test(val.toString()); });
      });
   }


   private _detailsJWORG(data: JWORGResponse): JWORGDetails {
      const countedLangs = data.languages.filter((lang) => { return lang.isCounted; }),
            uncountedLangs = data.languages.filter((lang) => { return !lang.isCounted; }),
            FILTER_SIGN_LANG = (lang: JWORGLangaugeInfo): boolean => { return lang.isSignLanguage; },
            FILTER_RTL = (lang: JWORGLangaugeInfo): boolean => { return lang.direction === 'rtl'; },
            FILTER_HAS_WEB = (lang: JWORGLangaugeInfo): boolean => { return lang.hasWebContent; },
            FILTER_SL_HAS_WEB = (lang: JWORGLangaugeInfo): boolean => { return lang.hasWebContent && lang.isSignLanguage; };

      return {
         total: countedLangs.length,
         isSign: countedLangs.filter(FILTER_SIGN_LANG).length,
         isRTL: countedLangs.filter(FILTER_RTL).length,
         hasWebContent: countedLangs.filter(FILTER_HAS_WEB).length,
         isSignWithWeb: countedLangs.filter(FILTER_SL_HAS_WEB).length,
         uncounted: {
            total: uncountedLangs.length,
            isSign: uncountedLangs.filter(FILTER_SIGN_LANG).length,
            isRTL: uncountedLangs.filter(FILTER_RTL).length,
            hasWebContent: uncountedLangs.filter(FILTER_HAS_WEB).length,
            isSignWithWeb: uncountedLangs.filter(FILTER_SL_HAS_WEB).length,
         },
      };
   }

   private _detailsJWB(data: JWBResponse): JWBDetails {
      return {
         total: data.languages.length,
         isSign: data.languages.filter((lang) => { return lang.isSignLanguage; }).length,
         isRTL: data.languages.filter((lang) => { return lang.isRTL; }).length,
         isLangPair: data.languages.filter((lang) => { return lang.isLangPair; }).length,
      };
   }
}
