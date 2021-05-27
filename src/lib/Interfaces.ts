export interface JWORGLangaugeInfo {
   symbol: string;
   langcode: string;
   name: string;
   vernacularName: string;
   altSpellings: string[];
   direction: 'ltr' | 'rtl';
   isSignLanguage: boolean;
   isCounted: boolean;
   hasWebContent: boolean;
}

export interface JWORGResponse {
   languages: JWORGLangaugeInfo[];
   localizedCount: string;
   status: number;
}

export interface JWORGDetails {
   total: number;
   isSign: number;
   isRTL: number;
   hasWebContent: number;
   isSignWithWeb: number;
   uncounted: {
      total: number;
      isSign: number;
      isRTL: number;
      hasWebContent: number;
      isSignWithWeb: number;
   };
}

export interface JWBLanguageInfo {
   code: string;
   locale: string;
   vernacular: string;
   name: string;
   isLangPair: boolean;
   isSignLanguage: boolean;
   isRTL: boolean;
}

export interface JWBResponse {
   languages: JWBLanguageInfo[];
}

export interface JWBDetails {
   total: number;
   isSign: number;
   isRTL: number;
   isLangPair: number;
}

export interface AllJWBDetails {
   web: JWBDetails;
   roku: JWBDetails;
   appletv: JWBDetails;
}

export interface AllDetails {
   jworg: JWORGDetails;
   jwb: AllJWBDetails;
}
