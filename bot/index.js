const corever = 'v0.6';
const supportedtimelocale = ["en-US", "ru", "de", "pl", "fr", "ja", "pt-BR", "ko", "bg", "sv-SE", "uk"];

const fs = require('fs');
const path = require('path');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones, convertGmtToSeconds } = require('./functions.js');
const { ping, about, invite, timenow, timezonenow, timestampint, convertint, calcint } = require('./builder.js');

//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');
loadStats();
//Autosave stats every (mins)
statsAutoSave(60);

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

// Require the necessary discord.js classes
const { Client, Routes, Events, GatewayIntentBits, ActivityType, setPresence, SlashCommandBuilder } = require('discord.js');
const { createInterface } = require('node:readline');
const fetch = require('node-fetch');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, readyClient => {
    console.log(`Ready! Logged in as ${readyClient.user.tag}`);
    incrementStat('botlogin');
});

const commands = [ping, about, invite, timenow, timezonenow, timestampint, convertint, calcint]; // Add your commands with commas to add them to the bot!

const rl = createInterface({ input: process.stdin, output: process.stdout });

client.on('interactionCreate', (interaction) => {
    //decide if reply be ephemeral (publicreply: false / true)
    if (interaction.options.getBoolean('publicreply') === undefined || interaction.options.getBoolean('publicreply') === null || interaction.options.getBoolean('publicreply') === false) {
        var isephemeral = true
    } else { var isephemeral = false }
    //get commandName
    if (interaction.commandName === 'ping') {
        incrementStat('pingcmd');
        const pingloc = {
            "ru": `:ping_pong: *${locale.ru.pong}!* ${locale.ru.latency} ${Date.now() - interaction.createdTimestamp} ${locale.ru.milliseconds}! ${locale.ru.apilatency} ${Math.round(client.ws.ping)} ${locale.ru.milliseconds}.`,
            "en-US": `:ping_pong: *${locale.en_us.pong}!* ${locale.en_us.latency} ${Date.now() - interaction.createdTimestamp} ${locale.en_us.milliseconds}! ${locale.en_us.apilatency} ${Math.round(client.ws.ping)} ${locale.en_us.milliseconds}.`,
        }
        interaction.reply({
            content: pingloc[interaction.locale] ?? `:ping_pong: *Pong!* Latency ${Date.now() - interaction.createdTimestamp} ms! API Latency ${Math.round(client.ws.ping)} ms.`,
            ephemeral: true,
        });
    } else if (interaction.commandName === 'about') {
        incrementStat('aboutcmd');
        const aboutloc = {
            "ru": `:blue_heart: ${locale.ru.aboutcmd}`,
            "en-US": `:blue_heart: ${locale.en_us.aboutcmd}`,
        };
        interaction.reply({
            content: aboutloc[interaction.locale] ?? `:blue_heart: We are still in early access. Additional info available on developer server`,
            ephemeral: true,
        });
    } else if (interaction.commandName === 'invite') {
        incrementStat('invitecmd');
        const inviteloc = {
            "ru": `:gift_heart: ${locale.ru.invitecmd}`,
            "en-US": `:gift_heart: ${locale.en_us.invitecmd}`,
        };
        interaction.reply({
            content: inviteloc[interaction.locale] ?? `:gift_heart: Invites not work in Early Access`,
            ephemeral: true,
        });
    } else if (interaction.commandName === 'now') {
        incrementStat('nowcmd');
        var nowtimestamp = Math.floor(Date.now() / 1000)
        var style = interaction.options.getString('style');
        if (style === undefined || style === null) {
            var nowstyle = ''
        } else if (style === 'ShortT') {
            var nowstyle = ':t'
        } else if (style === 'MediumT') {
            var nowstyle = ':T'
        } else if (style === 'ShortD') {
            var nowstyle = ':d'
        } else if (style === 'LongD') {
            var nowstyle = ':D'
        } else if (style === 'LongDshortT') {
            var nowstyle = ':f'
        } else if (style === 'FullDshortT') {
            var nowstyle = ':F'
        } else if (style === 'ShortDshortT') {
            var nowstyle = ':s'
        } else if (style === 'ShortDmediumT') {
            var nowstyle = ':S'
        } else if (style === 'Relative') {
            var nowstyle = ':R'
        }
        const nowloc = {
            "ru": `${locale.ru.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.ru.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "en-US": `${locale.en_us.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.en_us.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
        };;
        interaction.reply({
            content: nowloc[interaction.locale] ?? `Now: <t:${nowtimestamp}${nowstyle}> \nTimestamp: \`<t:${nowtimestamp}${nowstyle}>\``,
            ephemeral: isephemeral,
        });
    } else if (interaction.commandName === 'timezone') {
        incrementStat('timezonecmd');
//subcommand string: interaction.options.getSubcommand()
        var tztimestamp = Date.now()
        var tzdate = new Date(tztimestamp)
        var timezonesel = interaction.options.getString('timezone');
        if (timezonesel === undefined || style === null) {
            var timezonesel = 'GMT'
        }
        if (supportedtimelocale.includes(interaction.locale)) {
            var timelocale = interaction.locale
        } else { 
            var timelocale = 'en-UK'
        }
        var tzreply = tzdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: "long" })
        const timezoneloc = {
            "ru": `:alarm_clock: ${locale.ru.nowintz}: **__${tzreply}__** \n*${locale.ru.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "en-US": `:alarm_clock: ${locale.en_us.nowintz}: **__${tzreply}__** \n*${locale.en_us.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
        };;
        interaction.reply({
        content: timezoneloc[interaction.locale] ?? `:alarm_clock: Now in this timezone: **__${tzreply}__** \n*Local Time: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            ephemeral: isephemeral,
        });
    } else if (interaction.commandName === 'timestamp') {
        incrementStat('timestampcmd');
        var tsyear = interaction.options.getInteger('year');
        var tsmonth = interaction.options.getString('month');
        var tsdayi = interaction.options.getInteger('day');
        var tshouri = interaction.options.getInteger('hour');
        var tsmini = interaction.options.getInteger('minute');
        var tsseci = interaction.options.getInteger('second');
        var style = interaction.options.getString('style');
//Offset value to selected timezone
        var timezonesel = interaction.options.getString('timezone');
        if (timezonesel === undefined || timezonesel === null) {
            var tzoffset = 0
        } else { var tzoffset = convertGmtToSeconds(timezonesel) }
//Test if option is specified and set postfix to timestamp
        if (style === undefined || style === null) {
            var tsstyle = ''
        } else if (style === 'ShortT') {
            var tsstyle = ':t'
        } else if (style === 'MediumT') {
            var tsstyle = ':T'
        } else if (style === 'ShortD') {
            var tsstyle = ':d'
        } else if (style === 'LongD') {
            var tsstyle = ':D'
        } else if (style === 'LongDshortT') {
            var tsstyle = ':f'
        } else if (style === 'FullDshortT') {
            var tsstyle = ':F'
        } else if (style === 'ShortDshortT') {
            var tsstyle = ':s'
        } else if (style === 'ShortDmediumT') {
            var tsstyle = ':S'
        } else if (style === 'Relative') {
            var tsstyle = ':R'
        }
//This need for the date convertor to work. It length sensitive so if we use int '1' it needs to be '01'
//Also converting integers into strings
        if (tsdayi < 10) {
            var tsday = `0${tsdayi}`
        }
//Test if option is specified
        if (tshouri === undefined || tshouri === null) {
            var tshour = '00'
        } else {
            if (tshouri < 10) {
                var tshour = `0${tshouri}`
            }
        }
        if (tsmini === undefined || tsmini === null) {
            var tsmin = '00'
        } else {
            if (tsmini < 10) {
                var tsmin = `0${tsmini}`
            }
        }
        if (tsseci === undefined || tsseci === null) {
            var tssec = '00'
        } else {
            if (tsseci < 10) {
                var tssec = `0${tsseci}`
            }
        }
        var tsdateString = `${tsyear}-${tsmonth}-${tsday}T${tshour}:${tsmin}:${tssec}.000Z`;
        var calcDate = new Date(tsdateString).getTime();
        var gettimestamp = calcDate / 1000 - tzoffset
        const timestamploc = {
            "ru": `:white_check_mark: ${locale.ru.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.ru.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "en-US": `:white_check_mark: ${locale.en_us.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.en_us.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
        };;
        interaction.reply({
        content: timestamploc[interaction.locale] ?? `:white_check_mark: Preview: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **Timestamp to Paste:** \`<t:${gettimestamp}${tsstyle}>\``,
            ephemeral: isephemeral,
        });
    } else if (interaction.commandName === 'convert') {
        incrementStat('convertcmd');
        if (interaction.options.getSubcommand() === 'tounix') {
            var cvyear = interaction.options.getInteger('year');
            var cvmonth = interaction.options.getString('month');
            var cvdayi = interaction.options.getInteger('day');
            var cvhouri = interaction.options.getInteger('hour');
            var cvmini = interaction.options.getInteger('minute');
            var cvseci = interaction.options.getInteger('second');
            var cvmsi = interaction.options.getInteger('millisecond');
            var cvmsdisplay = interaction.options.getBoolean('displayms');
            //Offset value to selected timezone
            var timezonesel = interaction.options.getString('timezone');
            if (timezonesel === undefined || timezonesel === null) {
                var tzoffset = 0
            } else { var tzoffset = convertGmtToSeconds(timezonesel) }
            //This need for the date convertor to work. It length sensitive so if we use int '1' it needs to be '01'
            if (cvdayi < 10) {
                var cvday = `0${cvdayi}`
            }
            //Test if option is specified
            if (cvhouri === undefined || cvhouri === null) {
                var cvhour = '00'
            } else {
                if (cvhouri < 10) {
                var cvhour = `0${cvhouri}`
                }
            }
            if (cvmini === undefined || cvmini === null) {
                var cvmin = '00'
            } else {
                if (cvmini < 10) {
                var cvmin = `0${cvmini}`
                }
            }
            if (cvseci === undefined || cvseci === null) {
                var cvsec = '00'
            } else {
                if (cvseci < 10) {
                var cvsec = `0${cvseci}`
                }
            }
            if (cvmsi === undefined || cvmsi === null) {
                var cvms = '000'
            } else {
                if (cvmsi < 10) {
                var cvms = `00${cvmsi}`
                } else if (cvmsi < 100) {
                    var cvms = `0${cvmsi}`
                }
            }
            var cvdateString = `${cvyear}-${cvmonth}-${cvday}T${cvhour}:${cvmin}:${cvsec}.${cvms}Z`;
            var calctimestamp = new Date(cvdateString).getTime();
            //Calculate value in seconds or in ms
            if ( cvmsdisplay === true ) {
                var gettimestamp = calctimestamp - tzoffset * 1000
                //adjust interaction reply
                if ( interaction.locale === 'ru' ) {
                    var cvreplystyle = locale.ru.milliseconds
                } else if ( interaction.locale === 'en-us' ) {
                    var cvreplystyle = locale.en_us.milliseconds
                } else { var cvreplystyle = 'milliseconds' }
            } else {
                var gettimestamp = Math.floor(calctimestamp / 1000 - tzoffset)
                //adjust interaction reply
                if ( interaction.locale === 'ru' ) {
                    var cvreplystyle = locale.ru.seconds
                } else if ( interaction.locale === 'en-us' ) {
                    var cvreplystyle = locale.en_us.seconds
                } else { var cvreplystyle = 'seconds' }
            }
            const cvunixloc = {
                "ru": `:abacus: **${locale.ru.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.ru.since1970} (UNIX)*`,
                "en-US": `:abacus: **${locale.en_us.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.en_us.since1970} (UNIX)*`,
            };;
            interaction.reply({
            content: cvunixloc[interaction.locale] ?? `:abacus: **Result:** \`${gettimestamp}\` *${cvreplystyle} since Jan 1, 1970 (UNIX)*`,
                ephemeral: true,
            });
        } else if (interaction.options.getSubcommand() === 'todate') {
            var cvmscount = interaction.options.getBoolean('withms');
            var cvtimestamp = interaction.options.getInteger('unixtime');
            var timezonesel = interaction.options.getString('timezone');
            if (timezonesel === undefined || timezonesel === null) {
                var timezonesel = 'GMT'
            }
            //is it milliseconds or seconds
            if ( cvmscount === true ) {
                var cvdate = new Date(cvtimestamp)
                var msdigits = '3'
            } else {
                var cvdate = new Date(cvtimestamp * 1000)
                var msdigits = '0'
            }
            //Date output locale
            if (supportedtimelocale.includes(interaction.locale)) {
                var timelocale = interaction.locale
            } else { 
                var timelocale = 'en-UK'
            }
            var cvreply = cvdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `${msdigits}`, weekday: "long" })
            const cvdateloc = { 
                "ru": `:date: ${locale.ru.result}: **__${cvreply}__**`,
                "en-US": `:date: ${locale.en_us.result}: **__${cvreply}__**`,
            };;
            interaction.reply({
            content: cvdateloc[interaction.locale] ?? `:date: Result: **__${cvreply}__**`,
                ephemeral: true,
            });
        }
    } else if (interaction.commandName === 'calc') {
        incrementStat('calccmd');
        //get Add or Subtract for entire calc command
        var calcmatharg = interaction.options.getString('matharg');
        if (interaction.options.getSubcommand() === 'from-to') {
            var calcfromyear = interaction.options.getInteger('fromyear');
            var calcfrommonth = interaction.options.getString('frommonth');
            var calcfromday = interaction.options.getInteger('fromday');
            var calcfromhour = interaction.options.getInteger('fromhour');
            var calcfrommin = interaction.options.getInteger('fromminute');
            var calcfromsec = interaction.options.getInteger('fromsecond');
            if (calcfromday < 10) {
                var calcfromday = `0${calcfromday}`
            }
            if (calcfromhour === undefined || calcfromhour === null) {
                var calcfromhour = '00'
            } else if (calcfromhour < 10) {
                var calcfromhour = `0${calcfromhour}`
            }
            if (calcfrommin === undefined || calcfrommin === null) {
                var calcfrommin = '00'
            } else if (calcfrommin < 10) {
                var calcfrommin = `0${calcfrommin}`
            }
            if (calcfromsec === undefined || calcfromsec === null) {
                var calcfromsec = '00'
            } else if (calcfromsec < 10) {
                var calcfromsec = `0${calcfromsec}`
            }
            var calctoyear = interaction.options.getInteger('toyear');
            var calctomonth = interaction.options.getString('tomonth');
            var calctoday = interaction.options.getInteger('today');
            var calctohour = interaction.options.getInteger('tohour');
            var calctomin = interaction.options.getInteger('tominute');
            var calctosec = interaction.options.getInteger('tosecond');
            if (calctoday < 10) {
                var calctoday = `0${calctoday}`
            }
            if (calctohour === undefined || calctohour === null) {
                var calctohour = '00'
            } else if (calctohour < 10) {
                var calctohour = `0${calctohour}`
            }
            if (calctomin === undefined || calctomin === null) {
                var calctomin = '00'
            } else if (calctomin < 10) {
                var calctomin = `0${calctomin}`
            }
            if (calctosec === undefined || calctosec === null) {
                var calctosec = '00'
            } else if (calctosec < 10) {
                var calctosec = `0${calctosec}`
            }
            var calcfromdateString = `${calcfromyear}-${calcfrommonth}-${calcfromday}T${calcfromhour}:${calcfrommin}:${calcfromsec}.000Z`;
            var calctodateString = `${calctoyear}-${calctomonth}-${calctoday}T${calctohour}:${calctomin}:${calctosec}.000Z`;
            var calcfromtimestamp = new Date(calcfromdateString).getTime();
            var calctotimestamp = new Date(calctodateString).getTime();
            var calcdiff = Math.floor(Math.abs(calctotimestamp - calcfromtimestamp) / 1000)
            var daysdiff = Math.floor(calcdiff / 86400)
            var hoursdiff = Math.floor((calcdiff - (daysdiff * 86400)) / 3600)
            var minsdiff = Math.floor(((calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600))) / 60))
            var secsdiff = Math.floor(calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600) + (minsdiff * 60)))
            const calcfromtoloc = {
                "ru": `:white_check_mark: ${locale.ru.datesdiff}: **__${daysdiff} ${locale.ru.days} ${hoursdiff} ${locale.ru.hours} ${minsdiff} ${locale.ru.minutes} ${secsdiff} ${locale.ru.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.ru.seconds}*`,
                "en-US": `:white_check_mark: ${locale.en_us.datesdiff}: **__${daysdiff} ${locale.en_us.days} ${hoursdiff} ${locale.en_us.hours} ${minsdiff} ${locale.en_us.minutes} ${secsdiff} ${locale.en_us.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.en_us.seconds}*`,
            };;
            interaction.reply({
            content: calcfromtoloc[interaction.locale] ?? `:white_check_mark: Difference between dates is: **__${daysdiff} Days ${hoursdiff} Hours ${minsdiff} Minutes ${secsdiff} Seconds__** \n:hourglass_flowing_sand: \`${calcdiff}\` *Seconds*`,
                ephemeral: isephemeral,
            });           
        } else if (interaction.options.getSubcommand() === 'fromnow') {
            var calcarg1 = Date.now()
        } else if (interaction.options.getSubcommand() === 'fromdate') {
            var calcyear = interaction.options.getInteger('year');
            var calcmonth = interaction.options.getString('month');
            var calcday = interaction.options.getInteger('day');
            var calchour = interaction.options.getInteger('hour');
            var calcmin = interaction.options.getInteger('minute');
            var calcsec = interaction.options.getInteger('second');
            var calcms = interaction.options.getInteger('millisecond');
            if (calcday < 10) {
                var calcday = `0${calcday}`
            }
            if (calchour < 10) {
                var calchour = `0${calchour}`
            }
            if (calcmin < 10) {
                var calcmin = `0${calcmin}`
            }
            if (calcsec < 10) {
                var calcsec = `0${calcsec}`
            }
            if (calcms < 10) {
                var calcms = `00${calcms}`
            } else if (calcms < 100) {
                var calcms = `0${calcms}`
            }
            var calcdateString = `${calcyear}-${calcmonth}-${calcday}T${calchour}:${calcmin}:${calcsec}.${calcms}Z`;
            var calcarg1 = new Date(calcdateString).getTime();
        }
        if (interaction.options.getSubcommand() === 'fromnow' || interaction.options.getSubcommand() === 'fromdate') {
            var timezonesel = interaction.options.getString('timezone');
            var calcarg2y = interaction.options.getInteger('years') * 31536000000;
            var calcarg2m = interaction.options.getInteger('months') * 2592000000;
            var calcarg2w = interaction.options.getInteger('weeks') * 604800000;
            var calcarg2d = interaction.options.getInteger('days') * 86400000;
            var calcarg2h = interaction.options.getInteger('hours') * 3600000;
            var calcarg2min = interaction.options.getInteger('minutes') * 60000;
            var calcarg2s = interaction.options.getInteger('seconds') * 1000;
            var calcarg2ms = interaction.options.getInteger('milliseconds');
            var calcarg2 = calcarg2ms + calcarg2s + calcarg2min + calcarg2h + calcarg2d + calcarg2w + calcarg2m + calcarg2y
            if (calcmatharg === 'Subtract') { var calcarg2 = -calcarg2 }
            if (timezonesel === undefined || timezonesel === null) {
                var timezonesel = 'GMT'
            }
            //Date output locale
            if (supportedtimelocale.includes(interaction.locale)) {
                var timelocale = interaction.locale
            } else {
                var timelocale = 'en-UK'
            }
            var calcresult = calcarg1 + calcarg2
            var calcresdate = new Date(calcresult)
            var calcreply = calcresdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `3`, weekday: "long" })
            const calcdateloc = {
                "ru": `:white_check_mark: ${locale.ru.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.ru.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.ru.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "en-US": `:white_check_mark: ${locale.en_us.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.en_us.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.en_us.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
            };;
            interaction.reply({
            content: calcdateloc[interaction.locale] ?? `:white_check_mark: Result: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` Timestamp to Paste: \`<t:${Math.floor(calcresult / 1000)}>\` Local Time: <t:${Math.floor(calcresult / 1000)}>*`,
                ephemeral: isephemeral,
            });
        }
    }
});
(async ()=>{
    const question = (q) => new Promise((resolve) => rl.question(q, resolve));

    // Log in to Discord with your client's token
    await client.login(token).catch((err) => {
      throw err
    });

    await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });

    client.user.setPresence({
    activities: [{ name: `Early Access`, type: ActivityType.Listening }],
    status: 'idle',
    });
})();
