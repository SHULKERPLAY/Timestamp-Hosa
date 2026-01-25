const fs = require('fs');
const path = require('path');

//Supported Locales
const supportedlocales = ['ru', 'en-US', 'de', 'pl', 'fr', 'ja', 'pt-BR', 'ko', 'bg', 'sv-SE', 'uk'];

//Functions
//loading bot localization
function loadlocale() {
    let locale = {};
    try {
        const locpath = path.join(__dirname, 'locales.json');
        if (fs.existsSync(locpath)) locale = JSON.parse(fs.readFileSync(locpath));
    } catch (e) { console.error('Locale load error:', e); }
    return locale;
}
const locale = loadlocale();

//Get all locales on keyword
function getLoc(pathStr, prefix = '') {
    const result = {};
    const keys = pathStr.split('.'); // Splits requests like (arg.year)

    supportedlocales.forEach(lang => {
        let value = locale[lang];
        for (const k of keys) {
            value = value ? value[k] : undefined;
        }
        if (value) result[lang] = `${prefix}${value}`;
    });
    return result;
};

function lunar() {};
lunar.isephemeral = function(interaction) {
    const isPublic = interaction.options.getBoolean('публично') ?? false;
    if (isPublic) {
        incrementStat(`use.publicreply`);
        return { publicreplylog: 'public', isephemeral: false };
    }
    return { publicreplylog: '', isephemeral: true };
};
lunar.reply = async function(interaction, replycontent, isephemeral, embedcontent, hideembeds) {
    try {
        //djs v14.15+ now using flags instead of 'ephemeral: true'
        const replyflag = [];
        const replydata = (replycontent || '').length > 1900 ? replycontent.substring(0, 1900) + "...\n```\nОтображаемый контент превышает 1900 символов!" : replycontent;
        if (isephemeral) replyflag.push(MessageFlags.Ephemeral);
        if (hideembeds) replyflag.push(MessageFlags.SuppressEmbeds);
        await interaction.reply({
            content: replydata || '',
            embeds: embedcontent || [],
            flags: replyflag,
        });
    } catch (error) {
        console.error('Ошибка отправки сообщения:', error.message)
    }
};
lunar.editReply = async function(interaction, replycontent, embedcontent) {
    const replydata = (replycontent || '').length > 1900 ? replycontent.substring(0, 1900) + "...\n```\nОтображаемый контент превышает 1900 символов!" : replycontent;
    try {
        await interaction.editReply({
            content: replydata || '',
            embeds: embedcontent || [],
        });
    } catch (error) {
        console.error('Ошибка именения ответа:', error.message)
    }
};

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
    if (min === undefined || min === null) {
        var min = -999999999999999
    }
    if (max === undefined || max === null) {
        var max = 999999999999999
    }
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

//export
module.exports = { convertGmtToSeconds, getRandomInt, getDateInt, loadlocale, getLoc, lunar };