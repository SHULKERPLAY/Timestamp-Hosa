const fs = require('fs');
const path = require('path');

//load locales for functions cuz loadlocale(); doesn't work here
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
function loadlocale() {
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

//export
module.exports = {
    loadlocale,
    timestampstyles
};