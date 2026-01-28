const { getLoc } = require('./functions.js');

//Here constants
//Reusable timestamp options
const timestampstyles = [
    { name: '16:20',
      value: 'ShortT',
    },
    { name: '16:20:30',
      value: 'MediumT', 
    },
    { name: '20/04/2021',
      value: 'ShortD',
      name_localizations:(getLoc('ShortDate'))
    },
    { name: 'April 20, 2021',
      value: 'LongD',
      name_localizations:(getLoc('LongDate'))
    },
    { name: 'April 20, 2021 at 16:20',
      value: 'LongDshortT',
      name_localizations:(getLoc('LongDateShortTime'))
    },
    { name: 'Tuesday, April 20, 2021 at 16:20',
      value: 'FullDshortT',
      name_localizations:(getLoc('FullDateShortTime'))
    },
    { name: '20/04/2021, 16:20',
      value: 'ShortDshortT',
      name_localizations:(getLoc('ShortDateShortTime'))
    },
    { name: '20/04/2021, 16:20:30',
      value: 'ShortDmediumT',
      name_localizations:(getLoc('ShortDateMediumTime'))
    },
    { name: '2 months ago (Relative)',
      value: 'Relative',
      name_localizations:(getLoc('RelativeDate'))
    }
];

//timezones
const tzgmtp0 = { name: 'GMT +0 (Iceland, London, Dublin)', value: 'GMT', name_localizations:(getLoc('gmtp0')) };
const tzgmtp1 = { name: 'GMT +1 (Warsaw, Paris, Berlin)', value: 'GMT-1', name_localizations:(getLoc('gmtp1')) };
const tzgmtp2 = { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)', value: 'GMT-2', name_localizations:(getLoc('gmtp2')) };
const tzgmtp3 = { name: 'GMT +3 (Moscow, Istanbul, Qatar)', value: 'GMT-3', name_localizations:(getLoc('gmtp3')) };
const tzgmtp4 = { name: 'GMT +4 (Dubai, Samara, Baku)', value: 'GMT-4', name_localizations:(getLoc('gmtp4')) };
const tzgmtp5 = { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)', value: 'GMT-5', name_localizations:(getLoc('gmtp5')) };
const tzgmtp6 = { name: 'GMT +6 (Bishkek, Omsk, Dhaka)', value: 'GMT-6', name_localizations:(getLoc('gmtp6')) };
const tzgmtp7 = { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)', value: 'GMT-7', name_localizations:(getLoc('gmtp7')) };
const tzgmtp8 = { name: 'GMT +8 (Singapore, Shanghai, Western Australia)', value: 'GMT-8', name_localizations:(getLoc('gmtp8')) };
const tzgmtp9 = { name: 'GMT +9 (Chita, Seoul, Tokyo)', value: 'GMT-9', name_localizations:(getLoc('gmtp9')) };
const tzgmtp10 = { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)', value: 'GMT-10', name_localizations:(getLoc('gmtp10')) };
const tzgmtp11 = { name: 'GMT +11 (Magadan, Sakhalin, Auckland)', value: 'GMT-11', name_localizations:(getLoc('gmtp11')) };
const tzgmtp12 = { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)', value: 'GMT-12', name_localizations:(getLoc('gmtp12')) };
const tzgmtp13 = { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)', value: 'GMT-13', name_localizations:(getLoc('gmtp13')) };
const tzgmtp14 = { name: 'GMT +14 (Kiritimati, etcetera)', value: 'GMT-14', name_localizations:(getLoc('gmtp14')) };
const tzgmtm1 = { name: 'GMT -1 (Azores, Cape Verde)', value: 'GMT+1', name_localizations:(getLoc('gmtm1')) };
const tzgmtm2 = { name: 'GMT -2 (Greenland, Atlantic islands)', value: 'GMT+2', name_localizations:(getLoc('gmtm2')) };
const tzgmtm3 = { name: 'GMT -3 (Catamarca, Mendoza, st.johns)', value: 'GMT+3', name_localizations:(getLoc('gmtm3')) };
const tzgmtm4 = { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)', value: 'GMT+4', name_localizations:(getLoc('gmtm4')) };
const tzgmtm5 = { name: 'GMT -5 (New York, Jamaica, Louisville)', value: 'GMT+5', name_localizations:(getLoc('gmtm5')) };
const tzgmtm6 = { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)', value: 'GMT+6', name_localizations:(getLoc('gmtm6')) };
const tzgmtm7 = { name: 'GMT -7 (Denver, Phoenix, Mazatlan)', value: 'GMT+7', name_localizations:(getLoc('gmtm7')) };
const tzgmtm8 = { name: 'GMT -8 (Pitcairn, Pacific Time (PT))', value: 'GMT+8', name_localizations:(getLoc('gmtm8')) };
const tzgmtm9 = { name: 'GMT -9 (Alaska, Gambier Islands)', value: 'GMT+9', name_localizations:(getLoc('gmtm9')) };
const tzgmtm10 = { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)', value: 'GMT+10', name_localizations:(getLoc('gmtm10')) };
const tzgmtm11 = { name: 'GMT -11 (Niue, Pago Pago)', value: 'GMT+11', name_localizations:(getLoc('gmtm11')) };
const tzgmtm12 = { name: 'GMT -12 (etcetera)', value: 'GMT+12', name_localizations:(getLoc('gmtm12')) };
const tzutc = { name: 'UTC/GMT (Iceland, London, Dublin)', value: 'GMT', name_localizations:(getLoc('utc')) };
const tzpst = { name: 'PST/PDT (Pacific Standard Time)', value: 'GMT+8', name_localizations:(getLoc('pst')) };
const tzcet = { name: 'CET (Central European Time)', value: 'GMT-1', name_localizations:(getLoc('cet')) };
const tzest = { name: 'EST (Eastern Standard Time)', value: 'GMT+5', name_localizations:(getLoc('est')) };
const tzmst = { name: 'MST (Mountain Standard Time)', value: 'GMT+7', name_localizations:(getLoc('mst')) };
const tzjst = { name: 'JST (Japan Standard Time)', value: 'GMT-9', name_localizations:(getLoc('jst')) };
const tzcst = { name: 'CST (China Standard Time)', value: 'GMT-8', name_localizations:(getLoc('cst')) };
const tzaest = { name: 'AEST (Australian Eastern Standard Time)', value: 'GMT-10', name_localizations:(getLoc('aest')) };
const tzast = { name: 'AST (Atlantic Standard Time)', value: 'GMT+4', name_localizations:(getLoc('ast')) };
const tzcest = { name: 'CEST (Central European Summer Time)', value: 'GMT-2', name_localizations:(getLoc('cest')) };
//GMT+
const timezonesgmtplus = [ tzgmtp0, tzgmtp1, tzgmtp2, tzgmtp3, tzgmtp4, tzgmtp5, tzgmtp6, tzgmtp7, tzgmtp8, tzgmtp9, tzgmtp10, tzgmtp11, tzgmtp12, tzgmtp13, tzgmtp14 ];
//GMT-
const timezonesgmtminus = [ tzgmtp0, tzgmtm1, tzgmtm2, tzgmtm3, tzgmtm4, tzgmtm5, tzgmtm6, tzgmtm7, tzgmtm8, tzgmtm9, tzgmtm10, tzgmtm11, tzgmtm12 ];
//Others
const timezoneskey = [ tzutc, tzpst, tzcet, tzest, tzmst, tzjst, tzcst, tzaest, tzast, tzcest ]

const alltimezones = [ tzgmtp13, tzgmtp12, tzgmtp11, tzgmtp10, tzgmtp9, tzgmtp8, tzgmtp7, tzgmtp6, tzgmtp5, tzgmtp4, tzgmtp3, tzgmtp2, tzgmtp1, tzgmtp0, tzgmtm1, tzgmtm2, tzgmtm3, tzgmtm4, tzgmtm5, tzgmtm6, tzgmtm7, tzgmtm8, tzgmtm9, tzgmtm10, tzgmtm11 ];

const monthsoption = [
    { name: 'January',
      value: '01',
      name_localizations:(getLoc('jan'))
    },
    { name: 'February',
      value: '02',
      name_localizations:(getLoc('feb'))
    },
    { name: 'March',
      value: '03',
      name_localizations:(getLoc('mar'))
    },
    { name: 'April',
      value: '04',
      name_localizations:(getLoc('apr'))
    },
    { name: 'May',
      value: '05',
      name_localizations:(getLoc('may'))
    },
    { name: 'June',
      value: '06',
      name_localizations:(getLoc('jun'))
    },
    { name: 'July',
      value: '07',
      name_localizations:(getLoc('jul'))
    },
    { name: 'August',
      value: '08',
      name_localizations:(getLoc('aug'))
    },
    { name: 'September',
      value: '09',
      name_localizations:(getLoc('sep'))
    },
    { name: 'October',
      value: '10',
      name_localizations:(getLoc('oct'))
    },
    { name: 'November',
      value: '11',
      name_localizations:(getLoc('nov'))
    },
    { name: 'December',
      value: '12',
      name_localizations:(getLoc('dec'))
    },
];

const mathargs = [
    {
        name: 'Add (+)',
        value: 'Add',
        name_localizations:(getLoc('add'))
    },
    { 
        name: 'Subtract (-)',
        value: 'Subtract',
        name_localizations:(getLoc('subtract'))
    }
];

const dicetypes = [
    { name: '🎲 D4 (1 ... 4)',
        value: 'D4'
    },
    { name: '🎲 D6 (1 ... 6)',
        value: 'D6'
    },
    { name: '🎲 D8 (1 ... 8)',
        value: 'D8'
    },
    { name: '🎲 D10 (1 ... 10)',
        value: 'D10'
    },
    { name: '🎲 D12 (1 ... 12)',
        value: 'D12'
    },
    { name: '🎲 D20 (1 ... 20)',
        value: 'D20'
    },
    { name: '🎲 D100 (1 ... 100)',
        value: 'D100'
    }
];

module.exports = { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones, mathargs, dicetypes };