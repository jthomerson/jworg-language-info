# jworg-language-info

## Synopsis

This is a simple utility for retrieving language data from [jw.org](https://www.jw.org), the most translated site on the internet.

## CLI Usage

### Installation

```bash
$ npm i -g jworg-language-info
```

### Langauge Info

To retrieve information about a certain language, use the `info` command.

```bash
$ jwl info en
[
  {
    symbol: 'en',
    langcode: 'E',
    name: 'English',
    vernacularName: 'English',
    altSpellings: [ 'English' ],
    direction: 'ltr',
    isSignLanguage: false,
    isCounted: true,
    hasWebContent: true
  }
]
```

You can also search by language code or a more fuzzy search against the name.

```bash
$ jwl info arabic
[
  {
    symbol: 'ar',
    langcode: 'A',
    name: 'Arabic',
    vernacularName: 'العربية',
    altSpellings: [ 'Arabic', 'العربية' ],
    direction: 'rtl',
    isSignLanguage: false,
    isCounted: true,
    hasWebContent: true
  },
  {
    symbol: 'arq',
    langcode: 'ADZ',
    name: 'Arabic (Algeria)',
    vernacularName: 'العربيّة (الدّارجة الجزائريّة)',
    altSpellings: [
      'Arabic (Algeria)',
      'العربيّة (الدّارجة الجزائريّة)',
      'Arabic Algeria',
      'العربيّة الدّارجة الجزائريّة'
    ],
    direction: 'rtl',
    isSignLanguage: false,
    isCounted: true,
    hasWebContent: false
  },
  ...
]
```

### Counts

To retrieve the counts for all languages enabled on jw.org use the `counts` command.

```bash
$ jwl counts
{
  jwb: {
    web: { total: 312, isSign: 50, isRTL: 8, isLangPair: 0 },
    roku: { total: 256, isSign: 40, isRTL: 0, isLangPair: 0 },
    appletv: { total: 291, isSign: 45, isRTL: 6, isLangPair: 0 }
  },
  jworg: {
    total: 1032,
    isSign: 101,
    isRTL: 20,
    hasWebContent: 862,
    isSignWithWeb: 98,
    uncounted: {
      total: 27,
      isSign: 0,
      isRTL: 3,
      hasWebContent: 21,
      isSignWithWeb: 0
    }
  }
}

---

Short:
Languages: jw.org: 1032, 862 L1+, 101 SLs, 20 RTL, 98 L1+ SLs, 27 uncounted script variants; jwb: 312, 50 SLs, 291 AppleTV, 256 Roku

---

Long:
jw.org has 1032 languages with downloadable content, 862 of which have part of the actual site in their language. This includes 101 sign languages with downloadable content, 98 of which have part of the actual site in their language. 20 languages on the site are written from right-to-left.

JW Broadcasting is available in 312 languages. This includes 50 sign languages.

There are also 27 language options available on jw.org that are not counted as languages because the language matches another counted language, but is written with a different script. 21 of those 27 have part of the actual site in their language (the others are download-only). 3 of the 27 uncounted languages are written from right-to-left.
```

## License

This project is licensed with the Apache Software License, 2.0. See
[LICENSE.txt](https://github.com/jthomerson/jworg-language-info/blob/master/LICENSE.txt) for more details.
