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

//value randomizer
//effective range: getRandomInt(-999999999999999, 999999999999999));
//for date: getRandomInt(-62135596800000, 62135596800000)
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
function getDateInt(year, month, day, hour, min, sec, ms) {
    //Test if option is specified
    //this also convert integers to strings
    //This need for the date convertor to work. It length sensitive so if we use int '1' it needs to be '01'
    if (year === undefined || year === null) {
        var year = '0001'
    } else if (year < 10) {
        var year = `000${year}`
    } else if (year < 100) {
        var year = `00${year}`
    } else if (year < 1000) {
        var year = `0${year}`
    }
    if (month === undefined || month === null) {
        var month = '01'
    } else if (month.length === 1) {
        var month = `0${month}`
    }
    if (day === undefined || day === null) {
        var day = '01'
    } else if (day < 10) {
        var day = `0${day}`
    }
    if (hour === undefined || hour === null) {
        var hour = '00'
    } else {
        if (hour < 10) {
            var hour = `0${hour}`
        }
    }
    if (min === undefined || min === null) {
        var min = '00'
    } else {
        if (min < 10) {
            var min = `0${min}`
        }
    }
    if (sec === undefined || sec === null) {
        var sec = '00'
    } else {
        if (sec < 10) {
            var sec = `0${sec}`
        }
    }
    if (ms === undefined || ms === null) {
        var ms = '000'
    } else {
        if (ms < 10) {
            var ms = `00${ms}`
        } else if (ms < 100) {
            var ms = `0${ms}`
        }
    }
    //datestring vars need to be filled with strings
    var DateString = `${year}-${month}-${day}T${hour}:${min}:${sec}.${ms}Z`;
    return new Date(DateString).getTime();
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
      name_localizations: { "ru": `${locale.ru.ShortDate}`, "en-US": `${locale.en_us.ShortDate}`, "de": `${locale.de.ShortDate}`, "pl": `${locale.pl.ShortDate}`, "fr": `${locale.fr.ShortDate}`, "ja": `${locale.ja.ShortDate}`, "pt-BR": `${locale.pt_BR.ShortDate}`, "ko": `${locale.ko.ShortDate}`, "bg": `${locale.bg.ShortDate}`, "sv-SE": `${locale.sv_SE.ShortDate}`, "uk": `${locale.uk.ShortDate}` }
    },
    { name: 'April 20, 2021',
      value: 'LongD',
      name_localizations: { "ru": `${locale.ru.LongDate}`, "en-US": `${locale.en_us.LongDate}`, "de": `${locale.de.LongDate}`, "pl": `${locale.pl.LongDate}`, "fr": `${locale.fr.LongDate}`, "ja": `${locale.ja.LongDate}`, "pt-BR": `${locale.pt_BR.LongDate}`, "ko": `${locale.ko.LongDate}`, "bg": `${locale.bg.LongDate}`, "sv-SE": `${locale.sv_SE.LongDate}`, "uk": `${locale.uk.LongDate}` }
    },
    { name: 'April 20, 2021 at 16:20',
      value: 'LongDshortT',
      name_localizations: { "ru": `${locale.ru.LongDateShortTime}`, "en-US": `${locale.en_us.LongDateShortTime}`, "de": `${locale.de.LongDateShortTime}`, "pl": `${locale.pl.LongDateShortTime}`, "fr": `${locale.fr.LongDateShortTime}`, "ja": `${locale.ja.LongDateShortTime}`, "pt-BR": `${locale.pt_BR.LongDateShortTime}`, "ko": `${locale.ko.LongDateShortTime}`, "bg": `${locale.bg.LongDateShortTime}`, "sv-SE": `${locale.sv_SE.LongDateShortTime}`, "uk": `${locale.uk.LongDateShortTime}` }
    },
    { name: 'Tuesday, April 20, 2021 at 16:20',
      value: 'FullDshortT',
      name_localizations: { "ru": `${locale.ru.FullDateShortTime}`, "en-US": `${locale.en_us.FullDateShortTime}`, "de": `${locale.de.FullDateShortTime}`, "pl": `${locale.pl.FullDateShortTime}`, "fr": `${locale.fr.FullDateShortTime}`, "ja": `${locale.ja.FullDateShortTime}`, "pt-BR": `${locale.pt_BR.FullDateShortTime}`, "ko": `${locale.ko.FullDateShortTime}`, "bg": `${locale.bg.FullDateShortTime}`, "sv-SE": `${locale.sv_SE.FullDateShortTime}`, "uk": `${locale.uk.FullDateShortTime}` }
    },
    { name: '20/04/2021, 16:20',
      value: 'ShortDshortT',
      name_localizations: { "ru": `${locale.ru.ShortDateShortTime}`, "en-US": `${locale.en_us.ShortDateShortTime}`, "de": `${locale.de.ShortDateShortTime}`, "pl": `${locale.pl.ShortDateShortTime}`, "fr": `${locale.fr.ShortDateShortTime}`, "ja": `${locale.ja.ShortDateShortTime}`, "pt-BR": `${locale.pt_BR.ShortDateShortTime}`, "ko": `${locale.ko.ShortDateShortTime}`, "bg": `${locale.bg.ShortDateShortTime}`, "sv-SE": `${locale.sv_SE.ShortDateShortTime}`, "uk": `${locale.uk.ShortDateShortTime}` }
    },
    { name: '20/04/2021, 16:20:30',
      value: 'ShortDmediumT',
      name_localizations: { "ru": `${locale.ru.ShortDateMediumTime}`, "en-US": `${locale.en_us.ShortDateMediumTime}`, "de": `${locale.de.ShortDateMediumTime}`, "pl": `${locale.pl.ShortDateMediumTime}`, "fr": `${locale.fr.ShortDateMediumTime}`, "ja": `${locale.ja.ShortDateMediumTime}`, "pt-BR": `${locale.pt_BR.ShortDateMediumTime}`, "ko": `${locale.ko.ShortDateMediumTime}`, "bg": `${locale.bg.ShortDateMediumTime}`, "sv-SE": `${locale.sv_SE.ShortDateMediumTime}`, "uk": `${locale.uk.ShortDateMediumTime}` }
    },
    { name: '2 months ago (Relative)',
      value: 'Relative',
      name_localizations: { "ru": `${locale.ru.RelativeDate}`, "en-US": `${locale.en_us.RelativeDate}`, "de": `${locale.de.RelativeDate}`, "pl": `${locale.pl.RelativeDate}`, "fr": `${locale.fr.RelativeDate}`, "ja": `${locale.ja.RelativeDate}`, "pt-BR": `${locale.pt_BR.RelativeDate}`, "ko": `${locale.ko.RelativeDate}`, "bg": `${locale.bg.RelativeDate}`, "sv-SE": `${locale.sv_SE.RelativeDate}`, "uk": `${locale.uk.RelativeDate}` }
    }
];

const timezonesgmtplus = [
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.gmtp0}`, "en-US": `${locale.en_us.gmtp0}`, "de": `${locale.de.gmtp0}`, "pl": `${locale.pl.gmtp0}`, "fr": `${locale.fr.gmtp0}`, "ja": `${locale.ja.gmtp0}`, "pt-BR": `${locale.pt_BR.gmtp0}`, "ko": `${locale.ko.gmtp0}`, "bg": `${locale.bg.gmtp0}`, "sv-SE": `${locale.sv_SE.gmtp0}`, "uk": `${locale.uk.gmtp0}` }
    },
    { name: 'GMT +1 (Warsaw, Paris, Berlin)',
      value: 'GMT-1',
      name_localizations: { "ru": `${locale.ru.gmtp1}`, "en-US": `${locale.en_us.gmtp1}`, "de": `${locale.de.gmtp1}`, "pl": `${locale.pl.gmtp1}`, "fr": `${locale.fr.gmtp1}`, "ja": `${locale.ja.gmtp1}`, "pt-BR": `${locale.pt_BR.gmtp1}`, "ko": `${locale.ko.gmtp1}`, "bg": `${locale.bg.gmtp1}`, "sv-SE": `${locale.sv_SE.gmtp1}`, "uk": `${locale.uk.gmtp1}` }
    },
    { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)',
      value: 'GMT-2',
      name_localizations: { "ru": `${locale.ru.gmtp2}`, "en-US": `${locale.en_us.gmtp2}`, "de": `${locale.de.gmtp2}`, "pl": `${locale.pl.gmtp2}`, "fr": `${locale.fr.gmtp2}`, "ja": `${locale.ja.gmtp2}`, "pt-BR": `${locale.pt_BR.gmtp2}`, "ko": `${locale.ko.gmtp2}`, "bg": `${locale.bg.gmtp2}`, "sv-SE": `${locale.sv_SE.gmtp2}`, "uk": `${locale.uk.gmtp2}` }
    },
    { name: 'GMT +3 (Moscow, Istanbul, Qatar)',
      value: 'GMT-3',
      name_localizations: { "ru": `${locale.ru.gmtp3}`, "en-US": `${locale.en_us.gmtp3}`, "de": `${locale.de.gmtp3}`, "pl": `${locale.pl.gmtp3}`, "fr": `${locale.fr.gmtp3}`, "ja": `${locale.ja.gmtp3}`, "pt-BR": `${locale.pt_BR.gmtp3}`, "ko": `${locale.ko.gmtp3}`, "bg": `${locale.bg.gmtp3}`, "sv-SE": `${locale.sv_SE.gmtp3}`, "uk": `${locale.uk.gmtp3}` }
    },
    { name: 'GMT +4 (Dubai, Samara, Baku)',
      value: 'GMT-4',
      name_localizations: { "ru": `${locale.ru.gmtp4}`, "en-US": `${locale.en_us.gmtp4}`, "de": `${locale.de.gmtp4}`, "pl": `${locale.pl.gmtp4}`, "fr": `${locale.fr.gmtp4}`, "ja": `${locale.ja.gmtp4}`, "pt-BR": `${locale.pt_BR.gmtp4}`, "ko": `${locale.ko.gmtp4}`, "bg": `${locale.bg.gmtp4}`, "sv-SE": `${locale.sv_SE.gmtp4}`, "uk": `${locale.uk.gmtp4}` }
    },
    { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)',
      value: 'GMT-5',
      name_localizations: { "ru": `${locale.ru.gmtp5}`, "en-US": `${locale.en_us.gmtp5}`, "de": `${locale.de.gmtp5}`, "pl": `${locale.pl.gmtp5}`, "fr": `${locale.fr.gmtp5}`, "ja": `${locale.ja.gmtp5}`, "pt-BR": `${locale.pt_BR.gmtp5}`, "ko": `${locale.ko.gmtp5}`, "bg": `${locale.bg.gmtp5}`, "sv-SE": `${locale.sv_SE.gmtp5}`, "uk": `${locale.uk.gmtp5}` }
    },
    { name: 'GMT +6 (Bishkek, Omsk, Dhaka)',
      value: 'GMT-6',
      name_localizations: { "ru": `${locale.ru.gmtp6}`, "en-US": `${locale.en_us.gmtp6}`, "de": `${locale.de.gmtp6}`, "pl": `${locale.pl.gmtp6}`, "fr": `${locale.fr.gmtp6}`, "ja": `${locale.ja.gmtp6}`, "pt-BR": `${locale.pt_BR.gmtp6}`, "ko": `${locale.ko.gmtp6}`, "bg": `${locale.bg.gmtp6}`, "sv-SE": `${locale.sv_SE.gmtp6}`, "uk": `${locale.uk.gmtp6}` }
    },
    { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)',
      value: 'GMT-7',
      name_localizations: { "ru": `${locale.ru.gmtp7}`, "en-US": `${locale.en_us.gmtp7}`, "de": `${locale.de.gmtp7}`, "pl": `${locale.pl.gmtp7}`, "fr": `${locale.fr.gmtp7}`, "ja": `${locale.ja.gmtp7}`, "pt-BR": `${locale.pt_BR.gmtp7}`, "ko": `${locale.ko.gmtp7}`, "bg": `${locale.bg.gmtp7}`, "sv-SE": `${locale.sv_SE.gmtp7}`, "uk": `${locale.uk.gmtp7}` }
    },
    { name: 'GMT +8 (Singapore, Shanghai, Western Australia)',
      value: 'GMT-8',
      name_localizations: { "ru": `${locale.ru.gmtp8}`, "en-US": `${locale.en_us.gmtp8}`, "de": `${locale.de.gmtp8}`, "pl": `${locale.pl.gmtp8}`, "fr": `${locale.fr.gmtp8}`, "ja": `${locale.ja.gmtp8}`, "pt-BR": `${locale.pt_BR.gmtp8}`, "ko": `${locale.ko.gmtp8}`, "bg": `${locale.bg.gmtp8}`, "sv-SE": `${locale.sv_SE.gmtp8}`, "uk": `${locale.uk.gmtp8}` }
    },
    { name: 'GMT +9 (Chita, Seoul, Tokyo)',
      value: 'GMT-9',
      name_localizations: { "ru": `${locale.ru.gmtp9}`, "en-US": `${locale.en_us.gmtp9}`, "de": `${locale.de.gmtp9}`, "pl": `${locale.pl.gmtp9}`, "fr": `${locale.fr.gmtp9}`, "ja": `${locale.ja.gmtp9}`, "pt-BR": `${locale.pt_BR.gmtp9}`, "ko": `${locale.ko.gmtp9}`, "bg": `${locale.bg.gmtp9}`, "sv-SE": `${locale.sv_SE.gmtp9}`, "uk": `${locale.uk.gmtp9}` }
    },
    { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)',
      value: 'GMT-10',
      name_localizations: { "ru": `${locale.ru.gmtp10}`, "en-US": `${locale.en_us.gmtp10}`, "de": `${locale.de.gmtp10}`, "pl": `${locale.pl.gmtp10}`, "fr": `${locale.fr.gmtp10}`, "ja": `${locale.ja.gmtp10}`, "pt-BR": `${locale.pt_BR.gmtp10}`, "ko": `${locale.ko.gmtp10}`, "bg": `${locale.bg.gmtp10}`, "sv-SE": `${locale.sv_SE.gmtp10}`, "uk": `${locale.uk.gmtp10}` }
    },
    { name: 'GMT +11 (Magadan, Sakhalin, Auckland)',
      value: 'GMT-11',
      name_localizations: { "ru": `${locale.ru.gmtp11}`, "en-US": `${locale.en_us.gmtp11}`, "de": `${locale.de.gmtp11}`, "pl": `${locale.pl.gmtp11}`, "fr": `${locale.fr.gmtp11}`, "ja": `${locale.ja.gmtp11}`, "pt-BR": `${locale.pt_BR.gmtp11}`, "ko": `${locale.ko.gmtp11}`, "bg": `${locale.bg.gmtp11}`, "sv-SE": `${locale.sv_SE.gmtp11}`, "uk": `${locale.uk.gmtp11}` }
    },
    { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)',
      value: 'GMT-12',
      name_localizations: { "ru": `${locale.ru.gmtp12}`, "en-US": `${locale.en_us.gmtp12}`, "de": `${locale.de.gmtp12}`, "pl": `${locale.pl.gmtp12}`, "fr": `${locale.fr.gmtp12}`, "ja": `${locale.ja.gmtp12}`, "pt-BR": `${locale.pt_BR.gmtp12}`, "ko": `${locale.ko.gmtp12}`, "bg": `${locale.bg.gmtp12}`, "sv-SE": `${locale.sv_SE.gmtp12}`, "uk": `${locale.uk.gmtp12}` }
    },
    { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)',
      value: 'GMT-13',
      name_localizations: { "ru": `${locale.ru.gmtp13}`, "en-US": `${locale.en_us.gmtp13}`, "de": `${locale.de.gmtp13}`, "pl": `${locale.pl.gmtp13}`, "fr": `${locale.fr.gmtp13}`, "ja": `${locale.ja.gmtp13}`, "pt-BR": `${locale.pt_BR.gmtp13}`, "ko": `${locale.ko.gmtp13}`, "bg": `${locale.bg.gmtp13}`, "sv-SE": `${locale.sv_SE.gmtp13}`, "uk": `${locale.uk.gmtp13}` }
    },
    { name: 'GMT +14 (Kiritimati, etcetera)',
      value: 'GMT-14',
      name_localizations: { "ru": `${locale.ru.gmtp14}`, "en-US": `${locale.en_us.gmtp14}`, "de": `${locale.de.gmtp14}`, "pl": `${locale.pl.gmtp14}`, "fr": `${locale.fr.gmtp14}`, "ja": `${locale.ja.gmtp14}`, "pt-BR": `${locale.pt_BR.gmtp14}`, "ko": `${locale.ko.gmtp14}`, "bg": `${locale.bg.gmtp14}`, "sv-SE": `${locale.sv_SE.gmtp14}`, "uk": `${locale.uk.gmtp14}` }
    }
];

const timezonesgmtminus = [
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.gmtp0}`, "en-US": `${locale.en_us.gmtp0}`, "de": `${locale.de.gmtp0}`, "pl": `${locale.pl.gmtp0}`, "fr": `${locale.fr.gmtp0}`, "ja": `${locale.ja.gmtp0}`, "pt-BR": `${locale.pt_BR.gmtp0}`, "ko": `${locale.ko.gmtp0}`, "bg": `${locale.bg.gmtp0}`, "sv-SE": `${locale.sv_SE.gmtp0}`, "uk": `${locale.uk.gmtp0}` }
    },
    { name: 'GMT -1 (Azores, Cape Verde)',
      value: 'GMT+1',
      name_localizations: { "ru": `${locale.ru.gmtm1}`, "en-US": `${locale.en_us.gmtm1}`, "de": `${locale.de.gmtm1}`, "pl": `${locale.pl.gmtm1}`, "fr": `${locale.fr.gmtm1}`, "ja": `${locale.ja.gmtm1}`, "pt-BR": `${locale.pt_BR.gmtm1}`, "ko": `${locale.ko.gmtm1}`, "bg": `${locale.bg.gmtm1}`, "sv-SE": `${locale.sv_SE.gmtm1}`, "uk": `${locale.uk.gmtm1}` }
    },
    { name: 'GMT -2 (Greenland, Atlantic islands)',
      value: 'GMT+2',
      name_localizations: { "ru": `${locale.ru.gmtm2}`, "en-US": `${locale.en_us.gmtm2}`, "de": `${locale.de.gmtm2}`, "pl": `${locale.pl.gmtm2}`, "fr": `${locale.fr.gmtm2}`, "ja": `${locale.ja.gmtm2}`, "pt-BR": `${locale.pt_BR.gmtm2}`, "ko": `${locale.ko.gmtm2}`, "bg": `${locale.bg.gmtm2}`, "sv-SE": `${locale.sv_SE.gmtm2}`, "uk": `${locale.uk.gmtm2}` }
    },
    { name: 'GMT -3 (Catamarca, Mendoza, st.johns)',
      value: 'GMT+3',
      name_localizations: { "ru": `${locale.ru.gmtm3}`, "en-US": `${locale.en_us.gmtm3}`, "de": `${locale.de.gmtm3}`, "pl": `${locale.pl.gmtm3}`, "fr": `${locale.fr.gmtm3}`, "ja": `${locale.ja.gmtm3}`, "pt-BR": `${locale.pt_BR.gmtm3}`, "ko": `${locale.ko.gmtm3}`, "bg": `${locale.bg.gmtm3}`, "sv-SE": `${locale.sv_SE.gmtm3}`, "uk": `${locale.uk.gmtm3}` }
    },
    { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)',
      value: 'GMT+4',
      name_localizations: { "ru": `${locale.ru.gmtm4}`, "en-US": `${locale.en_us.gmtm4}`, "de": `${locale.de.gmtm4}`, "pl": `${locale.pl.gmtm4}`, "fr": `${locale.fr.gmtm4}`, "ja": `${locale.ja.gmtm4}`, "pt-BR": `${locale.pt_BR.gmtm4}`, "ko": `${locale.ko.gmtm4}`, "bg": `${locale.bg.gmtm4}`, "sv-SE": `${locale.sv_SE.gmtm4}`, "uk": `${locale.uk.gmtm4}` }
    },
    { name: 'GMT -5 (New York, Jamaica, Louisville)',
      value: 'GMT+5',
      name_localizations: { "ru": `${locale.ru.gmtm5}`, "en-US": `${locale.en_us.gmtm5}`, "de": `${locale.de.gmtm5}`, "pl": `${locale.pl.gmtm5}`, "fr": `${locale.fr.gmtm5}`, "ja": `${locale.ja.gmtm5}`, "pt-BR": `${locale.pt_BR.gmtm5}`, "ko": `${locale.ko.gmtm5}`, "bg": `${locale.bg.gmtm5}`, "sv-SE": `${locale.sv_SE.gmtm5}`, "uk": `${locale.uk.gmtm5}` }
    },
    { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)',
      value: 'GMT+6',
      name_localizations: { "ru": `${locale.ru.gmtm6}`, "en-US": `${locale.en_us.gmtm6}`, "de": `${locale.de.gmtm6}`, "pl": `${locale.pl.gmtm6}`, "fr": `${locale.fr.gmtm6}`, "ja": `${locale.ja.gmtm6}`, "pt-BR": `${locale.pt_BR.gmtm6}`, "ko": `${locale.ko.gmtm6}`, "bg": `${locale.bg.gmtm6}`, "sv-SE": `${locale.sv_SE.gmtm6}`, "uk": `${locale.uk.gmtm6}` }
    },
    { name: 'GMT -7 (Denver, Phoenix, Mazatlan)',
      value: 'GMT+7',
      name_localizations: { "ru": `${locale.ru.gmtm7}`, "en-US": `${locale.en_us.gmtm7}`, "de": `${locale.de.gmtm7}`, "pl": `${locale.pl.gmtm7}`, "fr": `${locale.fr.gmtm7}`, "ja": `${locale.ja.gmtm7}`, "pt-BR": `${locale.pt_BR.gmtm7}`, "ko": `${locale.ko.gmtm7}`, "bg": `${locale.bg.gmtm7}`, "sv-SE": `${locale.sv_SE.gmtm7}`, "uk": `${locale.uk.gmtm7}` }
    },
    { name: 'GMT -8 (Pitcairn, Pacific Time (PT))',
      value: 'GMT+8',
      name_localizations: { "ru": `${locale.ru.gmtm8}`, "en-US": `${locale.en_us.gmtm8}`, "de": `${locale.de.gmtm8}`, "pl": `${locale.pl.gmtm8}`, "fr": `${locale.fr.gmtm8}`, "ja": `${locale.ja.gmtm8}`, "pt-BR": `${locale.pt_BR.gmtm8}`, "ko": `${locale.ko.gmtm8}`, "bg": `${locale.bg.gmtm8}`, "sv-SE": `${locale.sv_SE.gmtm8}`, "uk": `${locale.uk.gmtm8}` }
    },
    { name: 'GMT -9 (Alaska, Gambier Islands)',
      value: 'GMT+9',
      name_localizations: { "ru": `${locale.ru.gmtm9}`, "en-US": `${locale.en_us.gmtm9}`, "de": `${locale.de.gmtm9}`, "pl": `${locale.pl.gmtm9}`, "fr": `${locale.fr.gmtm9}`, "ja": `${locale.ja.gmtm9}`, "pt-BR": `${locale.pt_BR.gmtm9}`, "ko": `${locale.ko.gmtm9}`, "bg": `${locale.bg.gmtm9}`, "sv-SE": `${locale.sv_SE.gmtm9}`, "uk": `${locale.uk.gmtm9}` }
    },
    { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)',
      value: 'GMT+10',
      name_localizations: { "ru": `${locale.ru.gmtm10}`, "en-US": `${locale.en_us.gmtm10}`, "de": `${locale.de.gmtm10}`, "pl": `${locale.pl.gmtm10}`, "fr": `${locale.fr.gmtm10}`, "ja": `${locale.ja.gmtm10}`, "pt-BR": `${locale.pt_BR.gmtm10}`, "ko": `${locale.ko.gmtm10}`, "bg": `${locale.bg.gmtm10}`, "sv-SE": `${locale.sv_SE.gmtm10}`, "uk": `${locale.uk.gmtm10}` }
    },
    { name: 'GMT -11 (Niue, Pago Pago)',
      value: 'GMT+11',
      name_localizations: { "ru": `${locale.ru.gmtm11}`, "en-US": `${locale.en_us.gmtm11}`, "de": `${locale.de.gmtm11}`, "pl": `${locale.pl.gmtm11}`, "fr": `${locale.fr.gmtm11}`, "ja": `${locale.ja.gmtm11}`, "pt-BR": `${locale.pt_BR.gmtm11}`, "ko": `${locale.ko.gmtm11}`, "bg": `${locale.bg.gmtm11}`, "sv-SE": `${locale.sv_SE.gmtm11}`, "uk": `${locale.uk.gmtm11}` }
    },
    { name: 'GMT -12 (etcetera)',
      value: 'GMT+12',
      name_localizations: { "ru": `${locale.ru.gmtm12}`, "en-US": `${locale.en_us.gmtm12}`, "de": `${locale.de.gmtm12}`, "pl": `${locale.pl.gmtm12}`, "fr": `${locale.fr.gmtm12}`, "ja": `${locale.ja.gmtm12}`, "pt-BR": `${locale.pt_BR.gmtm12}`, "ko": `${locale.ko.gmtm12}`, "bg": `${locale.bg.gmtm12}`, "sv-SE": `${locale.sv_SE.gmtm12}`, "uk": `${locale.uk.gmtm12}` }
    }
];

const timezoneskey = [
    { name: 'UTC/GMT (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.utc}`, "en-US": `${locale.en_us.utc}`, "de": `${locale.de.utc}`, "pl": `${locale.pl.utc}`, "fr": `${locale.fr.utc}`, "ja": `${locale.ja.utc}`, "pt-BR": `${locale.pt_BR.utc}`, "ko": `${locale.ko.utc}`, "bg": `${locale.bg.utc}`, "sv-SE": `${locale.sv_SE.utc}`, "uk": `${locale.uk.utc}` }
    },
    { name: 'PST/PDT (Pacific Standard Time)',
      value: 'GMT+8',
      name_localizations: { "ru": `${locale.ru.pst}`, "en-US": `${locale.en_us.pst}`, "de": `${locale.de.pst}`, "pl": `${locale.pl.pst}`, "fr": `${locale.fr.pst}`, "ja": `${locale.ja.pst}`, "pt-BR": `${locale.pt_BR.pst}`, "ko": `${locale.ko.pst}`, "bg": `${locale.bg.pst}`, "sv-SE": `${locale.sv_SE.pst}`, "uk": `${locale.uk.pst}` }
    },
    { name: 'CET (Central European Time)',
      value: 'GMT-1',
      name_localizations: { "ru": `${locale.ru.cet}`, "en-US": `${locale.en_us.cet}`, "de": `${locale.de.cet}`, "pl": `${locale.pl.cet}`, "fr": `${locale.fr.cet}`, "ja": `${locale.ja.cet}`, "pt-BR": `${locale.pt_BR.cet}`, "ko": `${locale.ko.cet}`, "bg": `${locale.bg.cet}`, "sv-SE": `${locale.sv_SE.cet}`, "uk": `${locale.uk.cet}` }
    },
    { name: 'EST (Eastern Standard Time)',
      value: 'GMT+5',
      name_localizations: { "ru": `${locale.ru.est}`, "en-US": `${locale.en_us.est}`, "de": `${locale.de.est}`, "pl": `${locale.pl.est}`, "fr": `${locale.fr.est}`, "ja": `${locale.ja.est}`, "pt-BR": `${locale.pt_BR.est}`, "ko": `${locale.ko.est}`, "bg": `${locale.bg.est}`, "sv-SE": `${locale.sv_SE.est}`, "uk": `${locale.uk.est}` }
    },
    { name: 'MST (Mountain Standard Time)',
      value: 'GMT+7',
      name_localizations: { "ru": `${locale.ru.mst}`, "en-US": `${locale.en_us.mst}`, "de": `${locale.de.mst}`, "pl": `${locale.pl.mst}`, "fr": `${locale.fr.mst}`, "ja": `${locale.ja.mst}`, "pt-BR": `${locale.pt_BR.mst}`, "ko": `${locale.ko.mst}`, "bg": `${locale.bg.mst}`, "sv-SE": `${locale.sv_SE.mst}`, "uk": `${locale.uk.mst}` }
    },
    { name: 'JST (Japan Standard Time)',
      value: 'GMT-9',
      name_localizations: { "ru": `${locale.ru.jst}`, "en-US": `${locale.en_us.jst}`, "de": `${locale.de.jst}`, "pl": `${locale.pl.jst}`, "fr": `${locale.fr.jst}`, "ja": `${locale.ja.jst}`, "pt-BR": `${locale.pt_BR.jst}`, "ko": `${locale.ko.jst}`, "bg": `${locale.bg.jst}`, "sv-SE": `${locale.sv_SE.jst}`, "uk": `${locale.uk.jst}` }
    },
    { name: 'CST (China Standard Time)',
      value: 'GMT-8',
      name_localizations: { "ru": `${locale.ru.cst}`, "en-US": `${locale.en_us.cst}`, "de": `${locale.de.cst}`, "pl": `${locale.pl.cst}`, "fr": `${locale.fr.cst}`, "ja": `${locale.ja.cst}`, "pt-BR": `${locale.pt_BR.cst}`, "ko": `${locale.ko.cst}`, "bg": `${locale.bg.cst}`, "sv-SE": `${locale.sv_SE.cst}`, "uk": `${locale.uk.cst}` }
    },
    { name: 'AEST (Australian Eastern Standard Time)',
      value: 'GMT-10',
      name_localizations: { "ru": `${locale.ru.aest}`, "en-US": `${locale.en_us.aest}`, "de": `${locale.de.aest}`, "pl": `${locale.pl.aest}`, "fr": `${locale.fr.aest}`, "ja": `${locale.ja.aest}`, "pt-BR": `${locale.pt_BR.aest}`, "ko": `${locale.ko.aest}`, "bg": `${locale.bg.aest}`, "sv-SE": `${locale.sv_SE.aest}`, "uk": `${locale.uk.aest}` }
    },
    { name: 'AST (Atlantic Standard Time)',
      value: 'GMT+4',
      name_localizations: { "ru": `${locale.ru.ast}`, "en-US": `${locale.en_us.ast}`, "de": `${locale.de.ast}`, "pl": `${locale.pl.ast}`, "fr": `${locale.fr.ast}`, "ja": `${locale.ja.ast}`, "pt-BR": `${locale.pt_BR.ast}`, "ko": `${locale.ko.ast}`, "bg": `${locale.bg.ast}`, "sv-SE": `${locale.sv_SE.ast}`, "uk": `${locale.uk.ast}` }
    },
    { name: 'CEST (Central European Summer Time)',
      value: 'GMT-2',
      name_localizations: { "ru": `${locale.ru.cest}`, "en-US": `${locale.en_us.cest}`, "de": `${locale.de.cest}`, "pl": `${locale.pl.cest}`, "fr": `${locale.fr.cest}`, "ja": `${locale.ja.cest}`, "pt-BR": `${locale.pt_BR.cest}`, "ko": `${locale.ko.cest}`, "bg": `${locale.bg.cest}`, "sv-SE": `${locale.sv_SE.cest}`, "uk": `${locale.uk.cest}` }
    }
];

const monthsoption = [
    { name: 'January',
      value: '01',
      name_localizations: { "ru": `${locale.ru.jan}`, "en-US": `${locale.en_us.jan}`, "de": `${locale.de.jan}`, "pl": `${locale.pl.jan}`, "fr": `${locale.fr.jan}`, "ja": `${locale.ja.jan}`, "pt-BR": `${locale.pt_BR.jan}`, "ko": `${locale.ko.jan}`, "bg": `${locale.bg.jan}`, "sv-SE": `${locale.sv_SE.jan}`, "uk": `${locale.uk.jan}` }
    },
    { name: 'February',
      value: '02',
      name_localizations: { "ru": `${locale.ru.feb}`, "en-US": `${locale.en_us.feb}`, "de": `${locale.de.feb}`, "pl": `${locale.pl.feb}`, "fr": `${locale.fr.feb}`, "ja": `${locale.ja.feb}`, "pt-BR": `${locale.pt_BR.feb}`, "ko": `${locale.ko.feb}`, "bg": `${locale.bg.feb}`, "sv-SE": `${locale.sv_SE.feb}`, "uk": `${locale.uk.feb}` }
    },
    { name: 'March',
      value: '03',
      name_localizations: { "ru": `${locale.ru.mar}`, "en-US": `${locale.en_us.mar}`, "de": `${locale.de.mar}`, "pl": `${locale.pl.mar}`, "fr": `${locale.fr.mar}`, "ja": `${locale.ja.mar}`, "pt-BR": `${locale.pt_BR.mar}`, "ko": `${locale.ko.mar}`, "bg": `${locale.bg.mar}`, "sv-SE": `${locale.sv_SE.mar}`, "uk": `${locale.uk.mar}` }
    },
    { name: 'April',
      value: '04',
      name_localizations: { "ru": `${locale.ru.apr}`, "en-US": `${locale.en_us.apr}`, "de": `${locale.de.apr}`, "pl": `${locale.pl.apr}`, "fr": `${locale.fr.apr}`, "ja": `${locale.ja.apr}`, "pt-BR": `${locale.pt_BR.apr}`, "ko": `${locale.ko.apr}`, "bg": `${locale.bg.apr}`, "sv-SE": `${locale.sv_SE.apr}`, "uk": `${locale.uk.apr}` }
    },
    { name: 'May',
      value: '05',
      name_localizations: { "ru": `${locale.ru.may}`, "en-US": `${locale.en_us.may}`, "de": `${locale.de.may}`, "pl": `${locale.pl.may}`, "fr": `${locale.fr.may}`, "ja": `${locale.ja.may}`, "pt-BR": `${locale.pt_BR.may}`, "ko": `${locale.ko.may}`, "bg": `${locale.bg.may}`, "sv-SE": `${locale.sv_SE.may}`, "uk": `${locale.uk.may}` }
    },
    { name: 'June',
      value: '06',
      name_localizations: { "ru": `${locale.ru.jun}`, "en-US": `${locale.en_us.jun}`, "de": `${locale.de.jun}`, "pl": `${locale.pl.jun}`, "fr": `${locale.fr.jun}`, "ja": `${locale.ja.jun}`, "pt-BR": `${locale.pt_BR.jun}`, "ko": `${locale.ko.jun}`, "bg": `${locale.bg.jun}`, "sv-SE": `${locale.sv_SE.jun}`, "uk": `${locale.uk.jun}` }
    },
    { name: 'July',
      value: '07',
      name_localizations: { "ru": `${locale.ru.jul}`, "en-US": `${locale.en_us.jul}`, "de": `${locale.de.jul}`, "pl": `${locale.pl.jul}`, "fr": `${locale.fr.jul}`, "ja": `${locale.ja.jul}`, "pt-BR": `${locale.pt_BR.jul}`, "ko": `${locale.ko.jul}`, "bg": `${locale.bg.jul}`, "sv-SE": `${locale.sv_SE.jul}`, "uk": `${locale.uk.jul}` }
    },
    { name: 'August',
      value: '08',
      name_localizations: { "ru": `${locale.ru.aug}`, "en-US": `${locale.en_us.aug}`, "de": `${locale.de.aug}`, "pl": `${locale.pl.aug}`, "fr": `${locale.fr.aug}`, "ja": `${locale.ja.aug}`, "pt-BR": `${locale.pt_BR.aug}`, "ko": `${locale.ko.aug}`, "bg": `${locale.bg.aug}`, "sv-SE": `${locale.sv_SE.aug}`, "uk": `${locale.uk.aug}` }
    },
    { name: 'September',
      value: '09',
      name_localizations: { "ru": `${locale.ru.sep}`, "en-US": `${locale.en_us.sep}`, "de": `${locale.de.sep}`, "pl": `${locale.pl.sep}`, "fr": `${locale.fr.sep}`, "ja": `${locale.ja.sep}`, "pt-BR": `${locale.pt_BR.sep}`, "ko": `${locale.ko.sep}`, "bg": `${locale.bg.sep}`, "sv-SE": `${locale.sv_SE.sep}`, "uk": `${locale.uk.sep}` }
    },
    { name: 'October',
      value: '10',
      name_localizations: { "ru": `${locale.ru.oct}`, "en-US": `${locale.en_us.oct}`, "de": `${locale.de.oct}`, "pl": `${locale.pl.oct}`, "fr": `${locale.fr.oct}`, "ja": `${locale.ja.oct}`, "pt-BR": `${locale.pt_BR.oct}`, "ko": `${locale.ko.oct}`, "bg": `${locale.bg.oct}`, "sv-SE": `${locale.sv_SE.oct}`, "uk": `${locale.uk.oct}` }
    },
    { name: 'November',
      value: '11',
      name_localizations: { "ru": `${locale.ru.nov}`, "en-US": `${locale.en_us.nov}`, "de": `${locale.de.nov}`, "pl": `${locale.pl.nov}`, "fr": `${locale.fr.nov}`, "ja": `${locale.ja.nov}`, "pt-BR": `${locale.pt_BR.nov}`, "ko": `${locale.ko.nov}`, "bg": `${locale.bg.nov}`, "sv-SE": `${locale.sv_SE.nov}`, "uk": `${locale.uk.nov}` }
    },
    { name: 'December',
      value: '12',
      name_localizations: { "ru": `${locale.ru.dec}`, "en-US": `${locale.en_us.dec}`, "de": `${locale.de.dec}`, "pl": `${locale.pl.dec}`, "fr": `${locale.fr.dec}`, "ja": `${locale.ja.dec}`, "pt-BR": `${locale.pt_BR.dec}`, "ko": `${locale.ko.dec}`, "bg": `${locale.bg.dec}`, "sv-SE": `${locale.sv_SE.dec}`, "uk": `${locale.uk.dec}` }
    },
];

const alltimezones = [
    { name: 'GMT +13 (Tongatapu, Fakaofo, Apia)',
      value: 'GMT-13',
      name_localizations: { "ru": `${locale.ru.gmtp13}`, "en-US": `${locale.en_us.gmtp13}`, "de": `${locale.de.gmtp13}`, "pl": `${locale.pl.gmtp13}`, "fr": `${locale.fr.gmtp13}`, "ja": `${locale.ja.gmtp13}`, "pt-BR": `${locale.pt_BR.gmtp13}`, "ko": `${locale.ko.gmtp13}`, "bg": `${locale.bg.gmtp13}`, "sv-SE": `${locale.sv_SE.gmtp13}`, "uk": `${locale.uk.gmtp13}` }
    },
    { name: 'GMT +12 (Kamchatka, Fiji, Kwajalein)',
      value: 'GMT-12',
      name_localizations: { "ru": `${locale.ru.gmtp12}`, "en-US": `${locale.en_us.gmtp12}`, "de": `${locale.de.gmtp12}`, "pl": `${locale.pl.gmtp12}`, "fr": `${locale.fr.gmtp12}`, "ja": `${locale.ja.gmtp12}`, "pt-BR": `${locale.pt_BR.gmtp12}`, "ko": `${locale.ko.gmtp12}`, "bg": `${locale.bg.gmtp12}`, "sv-SE": `${locale.sv_SE.gmtp12}`, "uk": `${locale.uk.gmtp12}` }
    },
    { name: 'GMT +11 (Magadan, Sakhalin, Auckland)',
      value: 'GMT-11',
      name_localizations: { "ru": `${locale.ru.gmtp11}`, "en-US": `${locale.en_us.gmtp11}`, "de": `${locale.de.gmtp11}`, "pl": `${locale.pl.gmtp11}`, "fr": `${locale.fr.gmtp11}`, "ja": `${locale.ja.gmtp11}`, "pt-BR": `${locale.pt_BR.gmtp11}`, "ko": `${locale.ko.gmtp11}`, "bg": `${locale.bg.gmtp11}`, "sv-SE": `${locale.sv_SE.gmtp11}`, "uk": `${locale.uk.gmtp11}` }
    },
    { name: 'GMT +10 (Sydney, Vladivostok, Lindeman)',
      value: 'GMT-10',
      name_localizations: { "ru": `${locale.ru.gmtp10}`, "en-US": `${locale.en_us.gmtp10}`, "de": `${locale.de.gmtp10}`, "pl": `${locale.pl.gmtp10}`, "fr": `${locale.fr.gmtp10}`, "ja": `${locale.ja.gmtp10}`, "pt-BR": `${locale.pt_BR.gmtp10}`, "ko": `${locale.ko.gmtp10}`, "bg": `${locale.bg.gmtp10}`, "sv-SE": `${locale.sv_SE.gmtp10}`, "uk": `${locale.uk.gmtp10}` }
    },
    { name: 'GMT +9 (Chita, Seoul, Tokyo)',
      value: 'GMT-9',
      name_localizations: { "ru": `${locale.ru.gmtp9}`, "en-US": `${locale.en_us.gmtp9}`, "de": `${locale.de.gmtp9}`, "pl": `${locale.pl.gmtp9}`, "fr": `${locale.fr.gmtp9}`, "ja": `${locale.ja.gmtp9}`, "pt-BR": `${locale.pt_BR.gmtp9}`, "ko": `${locale.ko.gmtp9}`, "bg": `${locale.bg.gmtp9}`, "sv-SE": `${locale.sv_SE.gmtp9}`, "uk": `${locale.uk.gmtp9}` }
    },
    { name: 'GMT +8 (Singapore, Shanghai, Western Australia)',
      value: 'GMT-8',
      name_localizations: { "ru": `${locale.ru.gmtp8}`, "en-US": `${locale.en_us.gmtp8}`, "de": `${locale.de.gmtp8}`, "pl": `${locale.pl.gmtp8}`, "fr": `${locale.fr.gmtp8}`, "ja": `${locale.ja.gmtp8}`, "pt-BR": `${locale.pt_BR.gmtp8}`, "ko": `${locale.ko.gmtp8}`, "bg": `${locale.bg.gmtp8}`, "sv-SE": `${locale.sv_SE.gmtp8}`, "uk": `${locale.uk.gmtp8}` }
    },
    { name: 'GMT +7 (Novokuznetsk, Bangkok, Jakarta)',
      value: 'GMT-7',
      name_localizations: { "ru": `${locale.ru.gmtp7}`, "en-US": `${locale.en_us.gmtp7}`, "de": `${locale.de.gmtp7}`, "pl": `${locale.pl.gmtp7}`, "fr": `${locale.fr.gmtp7}`, "ja": `${locale.ja.gmtp7}`, "pt-BR": `${locale.pt_BR.gmtp7}`, "ko": `${locale.ko.gmtp7}`, "bg": `${locale.bg.gmtp7}`, "sv-SE": `${locale.sv_SE.gmtp7}`, "uk": `${locale.uk.gmtp7}` }
    },
    { name: 'GMT +6 (Bishkek, Omsk, Dhaka)',
      value: 'GMT-6',
      name_localizations: { "ru": `${locale.ru.gmtp6}`, "en-US": `${locale.en_us.gmtp6}`, "de": `${locale.de.gmtp6}`, "pl": `${locale.pl.gmtp6}`, "fr": `${locale.fr.gmtp6}`, "ja": `${locale.ja.gmtp6}`, "pt-BR": `${locale.pt_BR.gmtp6}`, "ko": `${locale.ko.gmtp6}`, "bg": `${locale.bg.gmtp6}`, "sv-SE": `${locale.sv_SE.gmtp6}`, "uk": `${locale.uk.gmtp6}` }
    },
    { name: 'GMT +5 (Almaty, Yekaterinburg, Tashkent)',
      value: 'GMT-5',
      name_localizations: { "ru": `${locale.ru.gmtp5}`, "en-US": `${locale.en_us.gmtp5}`, "de": `${locale.de.gmtp5}`, "pl": `${locale.pl.gmtp5}`, "fr": `${locale.fr.gmtp5}`, "ja": `${locale.ja.gmtp5}`, "pt-BR": `${locale.pt_BR.gmtp5}`, "ko": `${locale.ko.gmtp5}`, "bg": `${locale.bg.gmtp5}`, "sv-SE": `${locale.sv_SE.gmtp5}`, "uk": `${locale.uk.gmtp5}` }
    },
    { name: 'GMT +4 (Dubai, Samara, Baku)',
      value: 'GMT-4',
      name_localizations: { "ru": `${locale.ru.gmtp4}`, "en-US": `${locale.en_us.gmtp4}`, "de": `${locale.de.gmtp4}`, "pl": `${locale.pl.gmtp4}`, "fr": `${locale.fr.gmtp4}`, "ja": `${locale.ja.gmtp4}`, "pt-BR": `${locale.pt_BR.gmtp4}`, "ko": `${locale.ko.gmtp4}`, "bg": `${locale.bg.gmtp4}`, "sv-SE": `${locale.sv_SE.gmtp4}`, "uk": `${locale.uk.gmtp4}` }
    },
    { name: 'GMT +3 (Moscow, Istanbul, Qatar)',
      value: 'GMT-3',
      name_localizations: { "ru": `${locale.ru.gmtp3}`, "en-US": `${locale.en_us.gmtp3}`, "de": `${locale.de.gmtp3}`, "pl": `${locale.pl.gmtp3}`, "fr": `${locale.fr.gmtp3}`, "ja": `${locale.ja.gmtp3}`, "pt-BR": `${locale.pt_BR.gmtp3}`, "ko": `${locale.ko.gmtp3}`, "bg": `${locale.bg.gmtp3}`, "sv-SE": `${locale.sv_SE.gmtp3}`, "uk": `${locale.uk.gmtp3}` }
    },
    { name: 'GMT +2 (Kaliningrad, Helsinki, Kyiv)',
      value: 'GMT-2',
      name_localizations: { "ru": `${locale.ru.gmtp2}`, "en-US": `${locale.en_us.gmtp2}`, "de": `${locale.de.gmtp2}`, "pl": `${locale.pl.gmtp2}`, "fr": `${locale.fr.gmtp2}`, "ja": `${locale.ja.gmtp2}`, "pt-BR": `${locale.pt_BR.gmtp2}`, "ko": `${locale.ko.gmtp2}`, "bg": `${locale.bg.gmtp2}`, "sv-SE": `${locale.sv_SE.gmtp2}`, "uk": `${locale.uk.gmtp2}` }
    },
    { name: 'GMT +1 (Warsaw, Paris, Berlin)',
      value: 'GMT-1',
      name_localizations: { "ru": `${locale.ru.gmtp1}`, "en-US": `${locale.en_us.gmtp1}`, "de": `${locale.de.gmtp1}`, "pl": `${locale.pl.gmtp1}`, "fr": `${locale.fr.gmtp1}`, "ja": `${locale.ja.gmtp1}`, "pt-BR": `${locale.pt_BR.gmtp1}`, "ko": `${locale.ko.gmtp1}`, "bg": `${locale.bg.gmtp1}`, "sv-SE": `${locale.sv_SE.gmtp1}`, "uk": `${locale.uk.gmtp1}` }
    },
    { name: 'GMT +0 (Iceland, London, Dublin)',
      value: 'GMT',
      name_localizations: { "ru": `${locale.ru.gmtp0}`, "en-US": `${locale.en_us.gmtp0}`, "de": `${locale.de.gmtp0}`, "pl": `${locale.pl.gmtp0}`, "fr": `${locale.fr.gmtp0}`, "ja": `${locale.ja.gmtp0}`, "pt-BR": `${locale.pt_BR.gmtp0}`, "ko": `${locale.ko.gmtp0}`, "bg": `${locale.bg.gmtp0}`, "sv-SE": `${locale.sv_SE.gmtp0}`, "uk": `${locale.uk.gmtp0}` }
    },
    { name: 'GMT -1 (Azores, Cape Verde)',
      value: 'GMT+1',
      name_localizations: { "ru": `${locale.ru.gmtm1}`, "en-US": `${locale.en_us.gmtm1}`, "de": `${locale.de.gmtm1}`, "pl": `${locale.pl.gmtm1}`, "fr": `${locale.fr.gmtm1}`, "ja": `${locale.ja.gmtm1}`, "pt-BR": `${locale.pt_BR.gmtm1}`, "ko": `${locale.ko.gmtm1}`, "bg": `${locale.bg.gmtm1}`, "sv-SE": `${locale.sv_SE.gmtm1}`, "uk": `${locale.uk.gmtm1}` }
    },
    { name: 'GMT -2 (Greenland, Atlantic islands)',
      value: 'GMT+2',
      name_localizations: { "ru": `${locale.ru.gmtm2}`, "en-US": `${locale.en_us.gmtm2}`, "de": `${locale.de.gmtm2}`, "pl": `${locale.pl.gmtm2}`, "fr": `${locale.fr.gmtm2}`, "ja": `${locale.ja.gmtm2}`, "pt-BR": `${locale.pt_BR.gmtm2}`, "ko": `${locale.ko.gmtm2}`, "bg": `${locale.bg.gmtm2}`, "sv-SE": `${locale.sv_SE.gmtm2}`, "uk": `${locale.uk.gmtm2}` }
    },
    { name: 'GMT -3 (Catamarca, Mendoza, st.johns)',
      value: 'GMT+3',
      name_localizations: { "ru": `${locale.ru.gmtm3}`, "en-US": `${locale.en_us.gmtm3}`, "de": `${locale.de.gmtm3}`, "pl": `${locale.pl.gmtm3}`, "fr": `${locale.fr.gmtm3}`, "ja": `${locale.ja.gmtm3}`, "pt-BR": `${locale.pt_BR.gmtm3}`, "ko": `${locale.ko.gmtm3}`, "bg": `${locale.bg.gmtm3}`, "sv-SE": `${locale.sv_SE.gmtm3}`, "uk": `${locale.uk.gmtm3}` }
    },
    { name: 'GMT -4 (Puerto Rico, Halifax, Santiago)',
      value: 'GMT+4',
      name_localizations: { "ru": `${locale.ru.gmtm4}`, "en-US": `${locale.en_us.gmtm4}`, "de": `${locale.de.gmtm4}`, "pl": `${locale.pl.gmtm4}`, "fr": `${locale.fr.gmtm4}`, "ja": `${locale.ja.gmtm4}`, "pt-BR": `${locale.pt_BR.gmtm4}`, "ko": `${locale.ko.gmtm4}`, "bg": `${locale.bg.gmtm4}`, "sv-SE": `${locale.sv_SE.gmtm4}`, "uk": `${locale.uk.gmtm4}` }
    },
    { name: 'GMT -5 (New York, Jamaica, Louisville)',
      value: 'GMT+5',
      name_localizations: { "ru": `${locale.ru.gmtm5}`, "en-US": `${locale.en_us.gmtm5}`, "de": `${locale.de.gmtm5}`, "pl": `${locale.pl.gmtm5}`, "fr": `${locale.fr.gmtm5}`, "ja": `${locale.ja.gmtm5}`, "pt-BR": `${locale.pt_BR.gmtm5}`, "ko": `${locale.ko.gmtm5}`, "bg": `${locale.bg.gmtm5}`, "sv-SE": `${locale.sv_SE.gmtm5}`, "uk": `${locale.uk.gmtm5}` }
    },
    { name: 'GMT -6 (Costa Rica, Guatemala, Mexico City)',
      value: 'GMT+6',
      name_localizations: { "ru": `${locale.ru.gmtm6}`, "en-US": `${locale.en_us.gmtm6}`, "de": `${locale.de.gmtm6}`, "pl": `${locale.pl.gmtm6}`, "fr": `${locale.fr.gmtm6}`, "ja": `${locale.ja.gmtm6}`, "pt-BR": `${locale.pt_BR.gmtm6}`, "ko": `${locale.ko.gmtm6}`, "bg": `${locale.bg.gmtm6}`, "sv-SE": `${locale.sv_SE.gmtm6}`, "uk": `${locale.uk.gmtm6}` }
    },
    { name: 'GMT -7 (Denver, Phoenix, Mazatlan)',
      value: 'GMT+7',
      name_localizations: { "ru": `${locale.ru.gmtm7}`, "en-US": `${locale.en_us.gmtm7}`, "de": `${locale.de.gmtm7}`, "pl": `${locale.pl.gmtm7}`, "fr": `${locale.fr.gmtm7}`, "ja": `${locale.ja.gmtm7}`, "pt-BR": `${locale.pt_BR.gmtm7}`, "ko": `${locale.ko.gmtm7}`, "bg": `${locale.bg.gmtm7}`, "sv-SE": `${locale.sv_SE.gmtm7}`, "uk": `${locale.uk.gmtm7}` }
    },
    { name: 'GMT -8 (Pitcairn, Pacific Time (PT))',
      value: 'GMT+8',
      name_localizations: { "ru": `${locale.ru.gmtm8}`, "en-US": `${locale.en_us.gmtm8}`, "de": `${locale.de.gmtm8}`, "pl": `${locale.pl.gmtm8}`, "fr": `${locale.fr.gmtm8}`, "ja": `${locale.ja.gmtm8}`, "pt-BR": `${locale.pt_BR.gmtm8}`, "ko": `${locale.ko.gmtm8}`, "bg": `${locale.bg.gmtm8}`, "sv-SE": `${locale.sv_SE.gmtm8}`, "uk": `${locale.uk.gmtm8}` }
    },
    { name: 'GMT -9 (Alaska, Gambier Islands)',
      value: 'GMT+9',
      name_localizations: { "ru": `${locale.ru.gmtm9}`, "en-US": `${locale.en_us.gmtm9}`, "de": `${locale.de.gmtm9}`, "pl": `${locale.pl.gmtm9}`, "fr": `${locale.fr.gmtm9}`, "ja": `${locale.ja.gmtm9}`, "pt-BR": `${locale.pt_BR.gmtm9}`, "ko": `${locale.ko.gmtm9}`, "bg": `${locale.bg.gmtm9}`, "sv-SE": `${locale.sv_SE.gmtm9}`, "uk": `${locale.uk.gmtm9}` }
    },
    { name: 'GMT -10 (Rarotonga, Tahiti, Hawaii)',
      value: 'GMT+10',
      name_localizations: { "ru": `${locale.ru.gmtm10}`, "en-US": `${locale.en_us.gmtm10}`, "de": `${locale.de.gmtm10}`, "pl": `${locale.pl.gmtm10}`, "fr": `${locale.fr.gmtm10}`, "ja": `${locale.ja.gmtm10}`, "pt-BR": `${locale.pt_BR.gmtm10}`, "ko": `${locale.ko.gmtm10}`, "bg": `${locale.bg.gmtm10}`, "sv-SE": `${locale.sv_SE.gmtm10}`, "uk": `${locale.uk.gmtm10}` }
    },
    { name: 'GMT -11 (Niue, Pago Pago)',
      value: 'GMT+11',
      name_localizations: { "ru": `${locale.ru.gmtm11}`, "en-US": `${locale.en_us.gmtm11}`, "de": `${locale.de.gmtm11}`, "pl": `${locale.pl.gmtm11}`, "fr": `${locale.fr.gmtm11}`, "ja": `${locale.ja.gmtm11}`, "pt-BR": `${locale.pt_BR.gmtm11}`, "ko": `${locale.ko.gmtm11}`, "bg": `${locale.bg.gmtm11}`, "sv-SE": `${locale.sv_SE.gmtm11}`, "uk": `${locale.uk.gmtm11}` }
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
    convertGmtToSeconds,
    getRandomInt, 
    getDateInt
};