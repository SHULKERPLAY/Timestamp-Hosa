const fs = require('fs');
const path = require('path');
const { MessageFlags } = require('discord.js');

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
};
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
lunar.checkephemeral = function(interaction) {
    const isPublic = interaction.options.getBoolean('publicreply') === true;
    if (isPublic) {
        return { publicreplylog: 'public', isephemeral: false };
    };
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
        console.error('Error while sending message:', error.message)
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
        console.error('Error while editing message:', error.message)
    }
};

//Use: const offset = convertGmtToSeconds("GMT+1");
//In .toLocaleString() 'Etc/GMT+1' means GMT -1 and 'Etc/GMT-1' means GMT +1 so offset integer reverted
function convertGmtToSeconds(gmtString) {
    //replace GMT code with number. GMT return 0
    const offsetValue = Number(gmtString.replace('GMT', ''));
    //multiply on seconds in one hour
    return -offsetValue * 3600;
};

//Integer randomizer
//effective range: getRandomInt(-999999999999999, 999999999999999));
//for date: getRandomInt(-62135596800000, 62135596800000)
function getRandomInt(min, max) {
    //null test
    min = min ?? -999999999999999;
    max = max ?? 999999999999999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

//getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
function getDateInt(year, month, day, hour, min, sec, ms) {
    //null test
    year = year ?? '0001';
    month = month ?? '01';
    day = day ?? '01';
    hour = hour ?? '00';
    min = min ?? '00';
    sec = sec ?? '00';
    ms = ms ?? '000';
    //convert integers to strings
    //This need for the date convertor to work. It length sensitive so if we use int '1' it needs to be '01'
    if (year === '0001') {
    } else if (year < 10) {
        year = `000${year}`
    } else if (year < 100) {
        year = `00${year}`
    } else if (year < 1000) {
        year = `0${year}`
    }
    //Month must be 'string'
    if (month === '01') {
    } else if (month.length === 1) {
        month = `0${month}`
    }
    if (day === '01') {
    } else if (day < 10) {
        day = `0${day}`
    }
    if (hour === '00') {
    } else {
        if (hour < 10) {
            hour = `0${hour}`
        }
    }
    if (min === '00') {
    } else {
        if (min < 10) {
            min = `0${min}`
        }
    }
    if (sec === '00') {
    } else {
        if (sec < 10) {
            sec = `0${sec}`
        }
    }
    if (ms === '000') {
    } else {
        if (ms < 10) {
            ms = `00${ms}`
        } else if (ms < 100) {
            ms = `0${ms}`
        }
    }
    //datestring vars need to be filled with strings
    const DateString = `${year}-${month}-${day}T${hour}:${min}:${sec}.${ms}Z`;
    return new Date(DateString).getTime();
};

//export
module.exports = { convertGmtToSeconds, getRandomInt, getDateInt, loadlocale, getLoc, lunar };