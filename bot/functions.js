const fs = require('fs');
const path = require('path');

//loading bot localization
const localepath = path.join(__dirname, 'locales.json');
let locale = {};
try {
    if (fs.existsSync(localepath)) {
        const locdata = fs.readFileSync(localepath);
        locale = JSON.parse(locdata.toString());
    } else {
        locale = {};
    }
} catch (error) {
    console.error('Error while loading locale:', error);
    locale = {};
}

//Functions
//Use: var offset = convertGmtToSeconds("GMT+1");
function convertGmtToSeconds(gmtString) {
    if ( gmtString === 'GMT' ) {
        gmtoffset = 0;
        return gmtoffset;
    } else if ( gmtString === 'GMT-1' ) {
        gmtoffset = 3600;
        return gmtoffset;
    } else if ( gmtString === 'GMT-2' ) {
        gmtoffset = 3600 * 2;
        return gmtoffset;
    } else if ( gmtString === 'GMT-3' ) {
        gmtoffset = 3600 * 3;
        return gmtoffset;
    } else if ( gmtString === 'GMT-4' ) {
        gmtoffset = 3600 * 4;
        return gmtoffset;
    } else if ( gmtString === 'GMT-5' ) {
        gmtoffset = 3600 * 5;
        return gmtoffset;
    } else if ( gmtString === 'GMT-6' ) {
        gmtoffset = 3600 * 6;
        return gmtoffset;
    } else if ( gmtString === 'GMT-7' ) {
        gmtoffset = 3600 * 7;
        return gmtoffset;
    } else if ( gmtString === 'GMT-8' ) {
        gmtoffset = 3600 * 8;
        return gmtoffset;
    } else if ( gmtString === 'GMT-9' ) {
        gmtoffset = 3600 * 9;
        return gmtoffset;
    } else if ( gmtString === 'GMT-10' ) {
        gmtoffset = 3600 * 10;
        return gmtoffset;
    } else if ( gmtString === 'GMT-11' ) {
        gmtoffset = 3600 * 11;
        return gmtoffset;
    } else if ( gmtString === 'GMT-12' ) {
        gmtoffset = 3600 * 12;
        return gmtoffset;
    } else if ( gmtString === 'GMT-13' ) {
        gmtoffset = 3600 * 13;
        return gmtoffset;
    } else if ( gmtString === 'GMT-14' ) {
        gmtoffset = 3600 * 14;
        return gmtoffset;
    } else if ( gmtString === 'GMT+1' ) {
        gmtoffset = -3600;
        return gmtoffset;
    } else if ( gmtString === 'GMT+2' ) {
        gmtoffset = -3600 * 2;
        return gmtoffset;
    } else if ( gmtString === 'GMT+3' ) {
        gmtoffset = -3600 * 3;
        return gmtoffset;
    } else if ( gmtString === 'GMT+4' ) {
        gmtoffset = -3600 * 4;
        return gmtoffset;
    } else if ( gmtString === 'GMT+5' ) {
        gmtoffset = -3600 * 5;
        return gmtoffset;
    } else if ( gmtString === 'GMT+6' ) {
        gmtoffset = -3600 * 6;
        return gmtoffset;
    } else if ( gmtString === 'GMT+7' ) {
        gmtoffset = -3600 * 7;
        return gmtoffset;
    } else if ( gmtString === 'GMT+8' ) {
        gmtoffset = -3600 * 8;
        return gmtoffset;
    } else if ( gmtString === 'GMT+9' ) {
        gmtoffset = -3600 * 9;
        return gmtoffset;
    } else if ( gmtString === 'GMT+10' ) {
        gmtoffset = -3600 * 10;
        return gmtoffset;
    } else if ( gmtString === 'GMT+11' ) {
        gmtoffset = -3600 * 11;
        return gmtoffset;
    }
}
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
      name_localizations: { "ru": `${locale.ru.ShortDate}`, "en-US": `${locale.en_us.ShortDate}` }
    },
    { name: 'April 20, 2021',
      value: 'LongD',
      name_localizations: { "ru": `${locale.ru.LongDate}`, "en-US": `${locale.en_us.LongDate}` }
    },
    { name: 'April 20, 2021 at 16:20',
      value: 'LongDshortT',
      name_localizations: { "ru": `${locale.ru.LongDateShortTime}`, "en-US": `${locale.en_us.LongDateShortTime}` }
    },
    { name: 'Tuesday, April 20, 2021 at 16:20',
      value: 'FullDshortT',
      name_localizations: { "ru": `${locale.ru.FullDateShortTime}`, "en-US": `${locale.en_us.FullDateShortTime}` }
    },
    { name: '20/04/2021, 16:20',
      value: 'ShortDshortT',
      name_localizations: { "ru": `${locale.ru.ShortDateShortTime}`, "en-US": `${locale.en_us.ShortDateShortTime}` }
    },
    { name: '20/04/2021, 16:20:30',
      value: 'ShortDmediumT',
      name_localizations: { "ru": `${locale.ru.ShortDateMediumTime}`, "en-US": `${locale.en_us.ShortDateMediumTime}` }
    },
    { name: '2 months ago (Relative)',
      value: 'Relative',
      name_localizations: { "ru": `${locale.ru.RelativeDate}`, "en-US": `${locale.en_us.RelativeDate}` }
    }
];

const timezonesgmtplus = [
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.gmtp0}`, "en-US": `${locale.en_us.gmtp0}` }
    },
    { name: 'GMT +1 (Warsaw, Paris, Berlin)',
      value: 'GMT-1',
      name_localizations: { "ru": `${locale.ru.gmtp1}`, "en-US": `${locale.en_us.gmtp1}` }
    },
    { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)',
      value: 'GMT-2',
      name_localizations: { "ru": `${locale.ru.gmtp2}`, "en-US": `${locale.en_us.gmtp2}` }
    },
    { name: 'GMT +3 (Moscow, Istanbul, Qatar)',
      value: 'GMT-3',
      name_localizations: { "ru": `${locale.ru.gmtp3}`, "en-US": `${locale.en_us.gmtp3}` }
    },
    { name: 'GMT +4 (Dubai, Samara, Baku)',
      value: 'GMT-4',
      name_localizations: { "ru": `${locale.ru.gmtp4}`, "en-US": `${locale.en_us.gmtp4}` }
    },
    { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)',
      value: 'GMT-5',
      name_localizations: { "ru": `${locale.ru.gmtp5}`, "en-US": `${locale.en_us.gmtp5}` }
    },
    { name: 'GMT +6 (Bishkek, Omsk, Dhaka)',
      value: 'GMT-6',
      name_localizations: { "ru": `${locale.ru.gmtp6}`, "en-US": `${locale.en_us.gmtp6}` }
    },
    { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)',
      value: 'GMT-7',
      name_localizations: { "ru": `${locale.ru.gmtp7}`, "en-US": `${locale.en_us.gmtp7}` }
    },
    { name: 'GMT +8 (Singapore, Shanghai, Western Australia)',
      value: 'GMT-8',
      name_localizations: { "ru": `${locale.ru.gmtp8}`, "en-US": `${locale.en_us.gmtp8}` }
    },
    { name: 'GMT +9 (Chita, Seoul, Tokyo)',
      value: 'GMT-9',
      name_localizations: { "ru": `${locale.ru.gmtp9}`, "en-US": `${locale.en_us.gmtp9}` }
    },
    { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)',
      value: 'GMT-10',
      name_localizations: { "ru": `${locale.ru.gmtp10}`, "en-US": `${locale.en_us.gmtp10}` }
    },
    { name: 'GMT +11 (Magadan, Sakhalin, Auckland)',
      value: 'GMT-11',
      name_localizations: { "ru": `${locale.ru.gmtp11}`, "en-US": `${locale.en_us.gmtp11}` }
    },
    { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)',
      value: 'GMT-12',
      name_localizations: { "ru": `${locale.ru.gmtp12}`, "en-US": `${locale.en_us.gmtp12}` }
    },
    { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)',
      value: 'GMT-13',
      name_localizations: { "ru": `${locale.ru.gmtp13}`, "en-US": `${locale.en_us.gmtp13}` }
    },
    { name: 'GMT +14 (Kiritimati, etcetera)',
      value: 'GMT-14',
      name_localizations: { "ru": `${locale.ru.gmtp14}`, "en-US": `${locale.en_us.gmtp14}` }
    }
];

const timezonesgmtminus = [
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.gmtp0}`, "en-US": `${locale.en_us.gmtp0}` }
    },
    { name: 'GMT -1 (Azores, Cape Verde)',
      value: 'GMT+1',
      name_localizations: { "ru": `${locale.ru.gmtm1}`, "en-US": `${locale.en_us.gmtm1}` }
    },
    { name: 'GMT -2 (Greenland, Atlantic islands)',
      value: 'GMT+2',
      name_localizations: { "ru": `${locale.ru.gmtm2}`, "en-US": `${locale.en_us.gmtm2}` }
    },
    { name: 'GMT -3 (Catamarca, Mendoza, st.johns)',
      value: 'GMT+3',
      name_localizations: { "ru": `${locale.ru.gmtm3}`, "en-US": `${locale.en_us.gmtm3}` }
    },
    { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)',
      value: 'GMT+4',
      name_localizations: { "ru": `${locale.ru.gmtm4}`, "en-US": `${locale.en_us.gmtm4}` }
    },
    { name: 'GMT -5 (New York, Jamaica, Louisville)',
      value: 'GMT+5',
      name_localizations: { "ru": `${locale.ru.gmtm5}`, "en-US": `${locale.en_us.gmtm5}` }
    },
    { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)',
      value: 'GMT+6',
      name_localizations: { "ru": `${locale.ru.gmtm6}`, "en-US": `${locale.en_us.gmtm6}` }
    },
    { name: 'GMT -7 (Denver, Phoenix, Mazatlan)',
      value: 'GMT+7',
      name_localizations: { "ru": `${locale.ru.gmtm7}`, "en-US": `${locale.en_us.gmtm7}` }
    },
    { name: 'GMT -8 (Pitcairn, Pacific Time (PT))',
      value: 'GMT+8',
      name_localizations: { "ru": `${locale.ru.gmtm8}`, "en-US": `${locale.en_us.gmtm8}` }
    },
    { name: 'GMT -9 (Alaska, Gambier Islands)',
      value: 'GMT+9',
      name_localizations: { "ru": `${locale.ru.gmtm9}`, "en-US": `${locale.en_us.gmtm9}` }
    },
    { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)',
      value: 'GMT+10',
      name_localizations: { "ru": `${locale.ru.gmtm10}`, "en-US": `${locale.en_us.gmtm10}` }
    },
    { name: 'GMT -11 (Niue, Pago Pago)',
      value: 'GMT+11',
      name_localizations: { "ru": `${locale.ru.gmtm11}`, "en-US": `${locale.en_us.gmtm11}` }
    },
    { name: 'GMT -12 (etcetera)',
      value: 'GMT+12',
      name_localizations: { "ru": `${locale.ru.gmtm12}`, "en-US": `${locale.en_us.gmtm12}` }
    }
];

const timezoneskey = [
    { name: 'UTC/GMT (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.utc}`, "en-US": `${locale.en_us.utc}` }
    },
    { name: 'PST/PDT (Pacific Standard Time)',
      value: 'GMT+8',
      name_localizations: { "ru": `${locale.ru.pst}`, "en-US": `${locale.en_us.pst}` }
    },
    { name: 'CET (Central European Time)',
      value: 'GMT-1',
      name_localizations: { "ru": `${locale.ru.cet}`, "en-US": `${locale.en_us.cet}` }
    },
    { name: 'EST (Eastern Standard Time)',
      value: 'GMT+5',
      name_localizations: { "ru": `${locale.ru.est}`, "en-US": `${locale.en_us.est}` }
    },
    { name: 'MST (Mountain Standard Time)',
      value: 'GMT+7',
      name_localizations: { "ru": `${locale.ru.mst}`, "en-US": `${locale.en_us.mst}` }
    },
    { name: 'JST (Japan Standard Time)',
      value: 'GMT-9',
      name_localizations: { "ru": `${locale.ru.jst}`, "en-US": `${locale.en_us.jst}` }
    },
    { name: 'CST (China Standard Time)',
      value: 'GMT-8',
      name_localizations: { "ru": `${locale.ru.cst}`, "en-US": `${locale.en_us.cst}` }
    },
    { name: 'AEST (Australian Eastern Standard Time)',
      value: 'GMT-10',
      name_localizations: { "ru": `${locale.ru.aest}`, "en-US": `${locale.en_us.aest}` }
    },
    { name: 'AST (Atlantic Standard Time)',
      value: 'GMT+4',
      name_localizations: { "ru": `${locale.ru.ast}`, "en-US": `${locale.en_us.ast}` }
    },
    { name: 'CEST (Central European Summer Time)',
      value: 'GMT-2',
      name_localizations: { "ru": `${locale.ru.cest}`, "en-US": `${locale.en_us.cest}` }
    }
];

const monthsoption = [
    { name: 'January',
      value: '01',
      name_localizations: { "ru": `${locale.ru.jan}`, "en-US": `${locale.en_us.jan}` }
    },
    { name: 'February',
      value: '02',
      name_localizations: { "ru": `${locale.ru.feb}`, "en-US": `${locale.en_us.feb}` }
    },
    { name: 'March',
      value: '03',
      name_localizations: { "ru": `${locale.ru.mar}`, "en-US": `${locale.en_us.mar}` }
    },
    { name: 'April',
      value: '04',
      name_localizations: { "ru": `${locale.ru.apr}`, "en-US": `${locale.en_us.apr}` }
    },
    { name: 'May',
      value: '05',
      name_localizations: { "ru": `${locale.ru.may}`, "en-US": `${locale.en_us.may}` }
    },
    { name: 'June',
      value: '06',
      name_localizations: { "ru": `${locale.ru.jun}`, "en-US": `${locale.en_us.jun}` }
    },
    { name: 'July',
      value: '07',
      name_localizations: { "ru": `${locale.ru.jul}`, "en-US": `${locale.en_us.jul}` }
    },
    { name: 'August',
      value: '08',
      name_localizations: { "ru": `${locale.ru.aug}`, "en-US": `${locale.en_us.aug}` }
    },
    { name: 'September',
      value: '09',
      name_localizations: { "ru": `${locale.ru.sep}`, "en-US": `${locale.en_us.sep}` }
    },
    { name: 'October',
      value: '10',
      name_localizations: { "ru": `${locale.ru.oct}`, "en-US": `${locale.en_us.oct}` }
    },
    { name: 'November',
      value: '11',
      name_localizations: { "ru": `${locale.ru.nov}`, "en-US": `${locale.en_us.nov}` }
    },
    { name: 'December',
      value: '12',
      name_localizations: { "ru": `${locale.ru.dec}`, "en-US": `${locale.en_us.dec}` }
    },
];

const alltimezones = [
    { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)',
      value: 'GMT-13',
      name_localizations: { "ru": `${locale.ru.gmtp13}`, "en-US": `${locale.en_us.gmtp13}` }
    },
    { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)',
      value: 'GMT-12',
      name_localizations: { "ru": `${locale.ru.gmtp12}`, "en-US": `${locale.en_us.gmtp12}` }
    },
    { name: 'GMT +11 (Magadan, Sakhalin, Auckland)',
      value: 'GMT-11',
      name_localizations: { "ru": `${locale.ru.gmtp11}`, "en-US": `${locale.en_us.gmtp11}` }
    },
    { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)',
      value: 'GMT-10',
      name_localizations: { "ru": `${locale.ru.gmtp10}`, "en-US": `${locale.en_us.gmtp10}` }
    },
    { name: 'GMT +9 (Chita, Seoul, Tokyo)',
      value: 'GMT-9',
      name_localizations: { "ru": `${locale.ru.gmtp9}`, "en-US": `${locale.en_us.gmtp9}` }
    },
    { name: 'GMT +8 (Singapore, Shanghai, Western Australia)',
      value: 'GMT-8',
      name_localizations: { "ru": `${locale.ru.gmtp8}`, "en-US": `${locale.en_us.gmtp8}` }
    },
    { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)',
      value: 'GMT-7',
      name_localizations: { "ru": `${locale.ru.gmtp7}`, "en-US": `${locale.en_us.gmtp7}` }
    },
    { name: 'GMT +6 (Bishkek, Omsk, Dhaka)',
      value: 'GMT-6',
      name_localizations: { "ru": `${locale.ru.gmtp6}`, "en-US": `${locale.en_us.gmtp6}` }
    },
    { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)',
      value: 'GMT-5',
      name_localizations: { "ru": `${locale.ru.gmtp5}`, "en-US": `${locale.en_us.gmtp5}` }
    },
    { name: 'GMT +4 (Dubai, Samara, Baku)',
      value: 'GMT-4',
      name_localizations: { "ru": `${locale.ru.gmtp4}`, "en-US": `${locale.en_us.gmtp4}` }
    },
    { name: 'GMT +3 (Moscow, Istanbul, Qatar)',
      value: 'GMT-3',
      name_localizations: { "ru": `${locale.ru.gmtp3}`, "en-US": `${locale.en_us.gmtp3}` }
    },
    { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)',
      value: 'GMT-2',
      name_localizations: { "ru": `${locale.ru.gmtp2}`, "en-US": `${locale.en_us.gmtp2}` }
    },
    { name: 'GMT +1 (Warsaw, Paris, Berlin)',
      value: 'GMT-1',
      name_localizations: { "ru": `${locale.ru.gmtp1}`, "en-US": `${locale.en_us.gmtp1}` }
    },
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.gmtp0}`, "en-US": `${locale.en_us.gmtp0}` }
    },
    { name: 'GMT -1 (Azores, Cape Verde)',
      value: 'GMT+1',
      name_localizations: { "ru": `${locale.ru.gmtm1}`, "en-US": `${locale.en_us.gmtm1}` }
    },
    { name: 'GMT -2 (Greenland, Atlantic islands)',
      value: 'GMT+2',
      name_localizations: { "ru": `${locale.ru.gmtm2}`, "en-US": `${locale.en_us.gmtm2}` }
    },
    { name: 'GMT -3 (Catamarca, Mendoza, st.johns)',
      value: 'GMT+3',
      name_localizations: { "ru": `${locale.ru.gmtm3}`, "en-US": `${locale.en_us.gmtm3}` }
    },
    { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)',
      value: 'GMT+4',
      name_localizations: { "ru": `${locale.ru.gmtm4}`, "en-US": `${locale.en_us.gmtm4}` }
    },
    { name: 'GMT -5 (New York, Jamaica, Louisville)',
      value: 'GMT+5',
      name_localizations: { "ru": `${locale.ru.gmtm5}`, "en-US": `${locale.en_us.gmtm5}` }
    },
    { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)',
      value: 'GMT+6',
      name_localizations: { "ru": `${locale.ru.gmtm6}`, "en-US": `${locale.en_us.gmtm6}` }
    },
    { name: 'GMT -7 (Denver, Phoenix, Mazatlan)',
      value: 'GMT+7',
      name_localizations: { "ru": `${locale.ru.gmtm7}`, "en-US": `${locale.en_us.gmtm7}` }
    },
    { name: 'GMT -8 (Pitcairn, Pacific Time (PT))',
      value: 'GMT+8',
      name_localizations: { "ru": `${locale.ru.gmtm8}`, "en-US": `${locale.en_us.gmtm8}` }
    },
    { name: 'GMT -9 (Alaska, Gambier Islands)',
      value: 'GMT+9',
      name_localizations: { "ru": `${locale.ru.gmtm9}`, "en-US": `${locale.en_us.gmtm9}` }
    },
    { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)',
      value: 'GMT+10',
      name_localizations: { "ru": `${locale.ru.gmtm10}`, "en-US": `${locale.en_us.gmtm10}` }
    },
    { name: 'GMT -11 (Niue, Pago Pago)',
      value: 'GMT+11',
      name_localizations: { "ru": `${locale.ru.gmtm11}`, "en-US": `${locale.en_us.gmtm11}` }
    }
];

//export
module.exports = {
    timestampstyles,
    timezonesgmtminus,
    timezonesgmtplus,
    timezoneskey,
    monthsoption,
    alltimezones,
    convertGmtToSeconds
};