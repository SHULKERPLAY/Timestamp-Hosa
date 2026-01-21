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

const timezonesgmtplus = [
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations:(getLoc('gmtp0'))
    },
    { name: 'GMT +1 (Warsaw, Paris, Berlin)',
      value: 'GMT-1',
      name_localizations:(getLoc('gmtp1'))
    },
    { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)',
      value: 'GMT-2',
      name_localizations:(getLoc('gmtp2'))
    },
    { name: 'GMT +3 (Moscow, Istanbul, Qatar)',
      value: 'GMT-3',
      name_localizations:(getLoc('gmtp3'))
    },
    { name: 'GMT +4 (Dubai, Samara, Baku)',
      value: 'GMT-4',
      name_localizations:(getLoc('gmtp4'))
    },
    { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)',
      value: 'GMT-5',
      name_localizations:(getLoc('gmtp5'))
    },
    { name: 'GMT +6 (Bishkek, Omsk, Dhaka)',
      value: 'GMT-6',
      name_localizations:(getLoc('gmtp6'))
    },
    { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)',
      value: 'GMT-7',
      name_localizations:(getLoc('gmtp7'))
    },
    { name: 'GMT +8 (Singapore, Shanghai, Western Australia)',
      value: 'GMT-8',
      name_localizations:(getLoc('gmtp8'))
    },
    { name: 'GMT +9 (Chita, Seoul, Tokyo)',
      value: 'GMT-9',
      name_localizations:(getLoc('gmtp9'))
    },
    { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)',
      value: 'GMT-10',
      name_localizations:(getLoc('gmtp10'))
    },
    { name: 'GMT +11 (Magadan, Sakhalin, Auckland)',
      value: 'GMT-11',
      name_localizations:(getLoc('gmtp11'))
    },
    { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)',
      value: 'GMT-12',
      name_localizations:(getLoc('gmtp12'))
    },
    { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)',
      value: 'GMT-13',
      name_localizations:(getLoc('gmtp13'))
    },
    { name: 'GMT +14 (Kiritimati, etcetera)',
      value: 'GMT-14',
      name_localizations:(getLoc('gmtp14'))
    }
];

const timezonesgmtminus = [
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations:(getLoc('gmtp0'))
    },
    { name: 'GMT -1 (Azores, Cape Verde)',
      value: 'GMT+1',
      name_localizations:(getLoc('gmtm1'))
    },
    { name: 'GMT -2 (Greenland, Atlantic islands)',
      value: 'GMT+2',
      name_localizations:(getLoc('gmtm2'))
    },
    { name: 'GMT -3 (Catamarca, Mendoza, st.johns)',
      value: 'GMT+3',
      name_localizations:(getLoc('gmtm3'))
    },
    { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)',
      value: 'GMT+4',
      name_localizations:(getLoc('gmtm4'))
    },
    { name: 'GMT -5 (New York, Jamaica, Louisville)',
      value: 'GMT+5',
      name_localizations:(getLoc('gmtm5'))
    },
    { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)',
      value: 'GMT+6',
      name_localizations:(getLoc('gmtm6'))
    },
    { name: 'GMT -7 (Denver, Phoenix, Mazatlan)',
      value: 'GMT+7',
      name_localizations:(getLoc('gmtm7'))
    },
    { name: 'GMT -8 (Pitcairn, Pacific Time (PT))',
      value: 'GMT+8',
      name_localizations:(getLoc('gmtm8'))
    },
    { name: 'GMT -9 (Alaska, Gambier Islands)',
      value: 'GMT+9',
      name_localizations:(getLoc('gmtm9'))
    },
    { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)',
      value: 'GMT+10',
      name_localizations:(getLoc('gmtm10'))
    },
    { name: 'GMT -11 (Niue, Pago Pago)',
      value: 'GMT+11',
      name_localizations:(getLoc('gmtm11'))
    },
    { name: 'GMT -12 (etcetera)',
      value: 'GMT+12',
      name_localizations:(getLoc('gmtm12'))
    }
];

const timezoneskey = [
    { name: 'UTC/GMT (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations:(getLoc('utc'))
    },
    { name: 'PST/PDT (Pacific Standard Time)',
      value: 'GMT+8',
      name_localizations:(getLoc('pst'))
    },
    { name: 'CET (Central European Time)',
      value: 'GMT-1',
      name_localizations:(getLoc('cet'))
    },
    { name: 'EST (Eastern Standard Time)',
      value: 'GMT+5',
      name_localizations:(getLoc('est'))
    },
    { name: 'MST (Mountain Standard Time)',
      value: 'GMT+7',
      name_localizations:(getLoc('mst'))
    },
    { name: 'JST (Japan Standard Time)',
      value: 'GMT-9',
      name_localizations:(getLoc('jst'))
    },
    { name: 'CST (China Standard Time)',
      value: 'GMT-8',
      name_localizations:(getLoc('cst'))
    },
    { name: 'AEST (Australian Eastern Standard Time)',
      value: 'GMT-10',
      name_localizations:(getLoc('aest'))
    },
    { name: 'AST (Atlantic Standard Time)',
      value: 'GMT+4',
      name_localizations:(getLoc('ast'))
    },
    { name: 'CEST (Central European Summer Time)',
      value: 'GMT-2',
      name_localizations:(getLoc('cest'))
    }
];

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

const alltimezones = [
    { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)',
      value: 'GMT-13',
      name_localizations:(getLoc('gmtp13'))
    },
    { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)',
      value: 'GMT-12',
      name_localizations:(getLoc('gmtp12'))
    },
    { name: 'GMT +11 (Magadan, Sakhalin, Auckland)',
      value: 'GMT-11',
      name_localizations:(getLoc('gmtp11'))
    },
    { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)',
      value: 'GMT-10',
      name_localizations:(getLoc('gmtp10'))
    },
    { name: 'GMT +9 (Chita, Seoul, Tokyo)',
      value: 'GMT-9',
      name_localizations:(getLoc('gmtp9'))
    },
    { name: 'GMT +8 (Singapore, Shanghai, Western Australia)',
      value: 'GMT-8',
      name_localizations:(getLoc('gmtp8'))
    },
    { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)',
      value: 'GMT-7',
      name_localizations:(getLoc('gmtp7'))
    },
    { name: 'GMT +6 (Bishkek, Omsk, Dhaka)',
      value: 'GMT-6',
      name_localizations:(getLoc('gmtp6'))
    },
    { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)',
      value: 'GMT-5',
      name_localizations:(getLoc('gmtp5'))
    },
    { name: 'GMT +4 (Dubai, Samara, Baku)',
      value: 'GMT-4',
      name_localizations:(getLoc('gmtp4'))
    },
    { name: 'GMT +3 (Moscow, Istanbul, Qatar)',
      value: 'GMT-3',
      name_localizations:(getLoc('gmtp3'))
    },
    { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)',
      value: 'GMT-2',
      name_localizations:(getLoc('gmtp2'))
    },
    { name: 'GMT +1 (Warsaw, Paris, Berlin)',
      value: 'GMT-1',
      name_localizations:(getLoc('gmtp1'))
    },
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations:(getLoc('gmtp0'))
    },
    { name: 'GMT -1 (Azores, Cape Verde)',
      value: 'GMT+1',
      name_localizations:(getLoc('gmtm1'))
    },
    { name: 'GMT -2 (Greenland, Atlantic islands)',
      value: 'GMT+2',
      name_localizations:(getLoc('gmtm2'))
    },
    { name: 'GMT -3 (Catamarca, Mendoza, st.johns)',
      value: 'GMT+3',
      name_localizations:(getLoc('gmtm3'))
    },
    { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)',
      value: 'GMT+4',
      name_localizations:(getLoc('gmtm4'))
    },
    { name: 'GMT -5 (New York, Jamaica, Louisville)',
      value: 'GMT+5',
      name_localizations:(getLoc('gmtm5'))
    },
    { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)',
      value: 'GMT+6',
      name_localizations:(getLoc('gmtm6'))
    },
    { name: 'GMT -7 (Denver, Phoenix, Mazatlan)',
      value: 'GMT+7',
      name_localizations:(getLoc('gmtm7'))
    },
    { name: 'GMT -8 (Pitcairn, Pacific Time (PT))',
      value: 'GMT+8',
      name_localizations:(getLoc('gmtm8'))
    },
    { name: 'GMT -9 (Alaska, Gambier Islands)',
      value: 'GMT+9',
      name_localizations:(getLoc('gmtm9'))
    },
    { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)',
      value: 'GMT+10',
      name_localizations:(getLoc('gmtm10'))
    },
    { name: 'GMT -11 (Niue, Pago Pago)',
      value: 'GMT+11',
      name_localizations:(getLoc('gmtm11'))
    }
];

module.exports = { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones };