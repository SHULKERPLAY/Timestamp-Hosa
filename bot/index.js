const corever = 'v1.1b';
const supportedtimelocale = ["en-US", "ru", "de", "pl", "fr", "ja", "pt-BR", "ko", "bg", "sv-SE", "uk"]; //and en-UK as default

const fs = require('fs');
const path = require('path');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones, convertGmtToSeconds, getRandomInt, getDateInt } = require('./functions.js');
const { ping, about, invite, timenow, timezonenow, timestampint, convertint, calcint } = require('./builder.js');

//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');
loadStats();
statsAutoSave(60); //Autosave stats every (mins)

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
const client = new Client({ intents: [GatewayIntentBits.Guilds], rest: { timeout: 60000 } });

//Define commands
const commands = [ping, about, invite, timenow, timezonenow, timestampint, convertint, calcint];

const rl = createInterface({ input: process.stdin, output: process.stdout });

client.on('interactionCreate', (interaction) => {
    incrementStat(`interactionlang.${interaction.locale}`);
    //decide if reply be ephemeral (publicreply: false / true)
    if (interaction.options.getBoolean('publicreply') === undefined || interaction.options.getBoolean('publicreply') === null || interaction.options.getBoolean('publicreply') === false) {
        var isephemeral = true
        var publicreplylog = ''
    } else { 
        incrementStat(`use.publicreply`);
        var publicreplylog = 'public'
        var isephemeral = false
    }
    //get commandName
    if (interaction.commandName === 'ping') {
        incrementStat('pingcmd');
        const pingloc = {
            "ru": `:ping_pong: *${locale.ru.pong}!* ${locale.ru.latency} ${Date.now() - interaction.createdTimestamp} ${locale.ru.milliseconds}! ${locale.ru.apilatency} ${Math.round(client.ws.ping)} ${locale.ru.milliseconds}.`,
            "en-US": `:ping_pong: *${locale.en_us.pong}!* ${locale.en_us.latency} ${Date.now() - interaction.createdTimestamp} ${locale.en_us.milliseconds}! ${locale.en_us.apilatency} ${Math.round(client.ws.ping)} ${locale.en_us.milliseconds}.`,
            "de": `:ping_pong: *${locale.de.pong}!* ${locale.de.latency} ${Date.now() - interaction.createdTimestamp} ${locale.de.milliseconds}! ${locale.de.apilatency} ${Math.round(client.ws.ping)} ${locale.de.milliseconds}.`,
            "pl": `:ping_pong: *${locale.pl.pong}!* ${locale.pl.latency} ${Date.now() - interaction.createdTimestamp} ${locale.pl.milliseconds}! ${locale.pl.apilatency} ${Math.round(client.ws.ping)} ${locale.pl.milliseconds}.`,
            "fr": `:ping_pong: *${locale.fr.pong}!* ${locale.fr.latency} ${Date.now() - interaction.createdTimestamp} ${locale.fr.milliseconds}! ${locale.fr.apilatency} ${Math.round(client.ws.ping)} ${locale.fr.milliseconds}.`,
            "ja": `:ping_pong: *${locale.ja.pong}!* ${locale.ja.latency} ${Date.now() - interaction.createdTimestamp} ${locale.ja.milliseconds}! ${locale.ja.apilatency} ${Math.round(client.ws.ping)} ${locale.ja.milliseconds}.`,
            "pt-BR": `:ping_pong: *${locale.pt_BR.pong}!* ${locale.pt_BR.latency} ${Date.now() - interaction.createdTimestamp} ${locale.pt_BR.milliseconds}! ${locale.pt_BR.apilatency} ${Math.round(client.ws.ping)} ${locale.pt_BR.milliseconds}.`,
            "ko": `:ping_pong: *${locale.ko.pong}!* ${locale.ko.latency} ${Date.now() - interaction.createdTimestamp} ${locale.ko.milliseconds}! ${locale.ko.apilatency} ${Math.round(client.ws.ping)} ${locale.ko.milliseconds}.`,
            "bg": `:ping_pong: *${locale.bg.pong}!* ${locale.bg.latency} ${Date.now() - interaction.createdTimestamp} ${locale.bg.milliseconds}! ${locale.bg.apilatency} ${Math.round(client.ws.ping)} ${locale.bg.milliseconds}.`,
            "sv-SE": `:ping_pong: *${locale.sv_SE.pong}!* ${locale.sv_SE.latency} ${Date.now() - interaction.createdTimestamp} ${locale.sv_SE.milliseconds}! ${locale.sv_SE.apilatency} ${Math.round(client.ws.ping)} ${locale.sv_SE.milliseconds}.`,
            "uk": `:ping_pong: *${locale.uk.pong}!* ${locale.uk.latency} ${Date.now() - interaction.createdTimestamp} ${locale.uk.milliseconds}! ${locale.uk.apilatency} ${Math.round(client.ws.ping)} ${locale.uk.milliseconds}.`,
        }
        interaction.reply({
            content: pingloc[interaction.locale] ?? `:ping_pong: *Pong!* Latency ${Date.now() - interaction.createdTimestamp} ms! API Latency ${Math.round(client.ws.ping)} ms.`,
            ephemeral: true,
        });
    } else if (interaction.commandName === 'about') {
        incrementStat('aboutcmd');
        const aboutloc = {
            "ru": `${locale.ru.aboutcmd} \n:sparkles: Версия ядра: ${corever}`,
            "en-US": `${locale.en_us.aboutcmd} \n:sparkles: Core version: ${corever}`,
            "de": `${locale.de.aboutcmd} \n:sparkles: Core-Version: ${corever}`,
            "pl": `${locale.pl.aboutcmd} \n:sparkles: Wersja rdzenia: ${corever}`,
            "fr": `${locale.fr.aboutcmd} \n:sparkles: Version du noyau : ${corever}`,
            "ja": `${locale.ja.aboutcmd} \n:sparkles: コアバージョン: ${corever}`,
            "pt-BR": `${locale.pt_BR.aboutcmd} \n:sparkles: Versão do núcleo: ${corever}`,
            "ko": `${locale.ko.aboutcmd} \n:sparkles: 코어 버전: ${corever}`,
            "bg": `${locale.bg.aboutcmd} \n:sparkles: Версия на ядрото: ${corever}`,
            "sv-SE": `${locale.sv_SE.aboutcmd} \n:sparkles: Kärnversion: ${corever}`,
            "uk": `${locale.uk.aboutcmd} \n:sparkles: Версія ядра: ${corever}`,
        };
        interaction.reply({
            content: aboutloc[interaction.locale] ?? `:alarm_clock: Create timestamps for your messages with `/timestamp`, calculate dates with `/calc`! Check the full command list for more features! \n:knot: Noticed a localization error or a bug? Have a feature request? [Visit our GitHub](https://github.com/SHULKERPLAY/Timestamp-Hosa)! \n :gift_heart: [Support Server](https://discord.gg/e2HcXrQ) - <@459657842895486977> \n\n[Terms of Service](https://lunarcreators.ru/timestamp-hosa/tos/) and [Privacy Policy](https://lunarcreators.ru/timestamp-hosa/privacy/) \n:sparkles: Core version: ${corever}`,
            ephemeral: true,
        });
    } else if (interaction.commandName === 'invite') {
        incrementStat('invitecmd');
        const inviteloc = {
            "ru": `${locale.ru.invitecmd}`,
            "en-US": `${locale.en_us.invitecmd}`,
            "de": `${locale.de.invitecmd}`,
            "pl": `${locale.pl.invitecmd}`,
            "fr": `${locale.fr.invitecmd}`,
            "ja": `${locale.ja.invitecmd}`,
            "pt-BR": `${locale.pt_BR.invitecmd}`,
            "ko": `${locale.ko.invitecmd}`,
            "bg": `${locale.bg.invitecmd}`,
            "sv-SE": `${locale.sv_SE.invitecmd}`,
            "uk": `${locale.uk.invitecmd}`,
        };
        interaction.reply({
            content: inviteloc[interaction.locale] ?? `:gift_heart: Add the app to your profile or server through the [Discord App Directory](https://discord.com/discovery/applications/1449839745910964254)! \n*By installing it to your profile, you can use the app's commands in any of your chats* \n\n[Or invite the bot to your server directly](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)`,
            ephemeral: true,
        });
    } else if (interaction.commandName === 'now') {
        //Reply with current timestamp
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
        console.log(`Tstamp created (/now) ${publicreplylog}`)
        const nowloc = {
            "ru": `${locale.ru.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.ru.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "en-US": `${locale.en_us.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.en_us.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "de": `${locale.de.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.de.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "pl": `${locale.pl.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.pl.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "fr": `${locale.fr.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.fr.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "ja": `${locale.ja.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.ja.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "pt-BR": `${locale.pt_BR.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.pt_BR.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "ko": `${locale.ko.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.ko.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "bg": `${locale.bg.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.bg.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "sv-SE": `${locale.sv_SE.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.sv_SE.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
            "uk": `${locale.uk.now}: <t:${nowtimestamp}${nowstyle}> \n${locale.uk.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``,
        };;
        interaction.reply({
            content: nowloc[interaction.locale] ?? `Now: <t:${nowtimestamp}${nowstyle}> \nTimestamp: \`<t:${nowtimestamp}${nowstyle}>\``,
            ephemeral: isephemeral,
        });
    } else if (interaction.commandName === 'timezone') {
        incrementStat(`timezonecmd.${interaction.options.getSubcommand()}`);
//subcommand string: interaction.options.getSubcommand()
        var tztimestamp = Date.now()
        var tzdate = new Date(tztimestamp)
        //get timezone string from options and reply with user locale
        var timezonesel = interaction.options.getString('timezone');
        if (timezonesel === undefined || style === null) {
            var timezonesel = 'GMT'
        }
        if (supportedtimelocale.includes(interaction.locale)) {
            var timelocale = interaction.locale
        } else { 
            var timelocale = 'en-UK'
        }
        console.log(`Tzone checked Etc/${timezonesel} ${publicreplylog}`)
        var tzreply = tzdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: "long" })
        const timezoneloc = {
            "ru": `:alarm_clock: ${locale.ru.nowintz}: **__${tzreply}__** \n*${locale.ru.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "en-US": `:alarm_clock: ${locale.en_us.nowintz}: **__${tzreply}__** \n*${locale.en_us.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "de": `:alarm_clock: ${locale.de.nowintz}: **__${tzreply}__** \n*${locale.de.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "pl": `:alarm_clock: ${locale.pl.nowintz}: **__${tzreply}__** \n*${locale.pl.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "fr": `:alarm_clock: ${locale.fr.nowintz}: **__${tzreply}__** \n*${locale.fr.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "ja": `:alarm_clock: ${locale.ja.nowintz}: **__${tzreply}__** \n*${locale.ja.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "pt-BR": `:alarm_clock: ${locale.pt_BR.nowintz}: **__${tzreply}__** \n*${locale.pt_BR.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "ko": `:alarm_clock: ${locale.ko.nowintz}: **__${tzreply}__** \n*${locale.ko.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "bg": `:alarm_clock: ${locale.bg.nowintz}: **__${tzreply}__** \n*${locale.bg.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "sv-SE": `:alarm_clock: ${locale.sv_SE.nowintz}: **__${tzreply}__** \n*${locale.sv_SE.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            "uk": `:alarm_clock: ${locale.uk.nowintz}: **__${tzreply}__** \n*${locale.uk.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
        };;
        interaction.reply({
        content: timezoneloc[interaction.locale] ?? `:alarm_clock: Now in this timezone: **__${tzreply}__** \n*Local Time: <t:${Math.floor(tztimestamp / 1000)}:F>*`,
            ephemeral: isephemeral,
        });
    } else if (interaction.commandName === 'timestamp') {
        incrementStat(`timestampcmd.${interaction.options.getString('style')}`);
        var tsyear = interaction.options.getInteger('year');
        var tsmonth = interaction.options.getString('month');
        var tsday = interaction.options.getInteger('day');
        var tshour = interaction.options.getInteger('hour');
        var tsmin = interaction.options.getInteger('minute');
        var tssec = interaction.options.getInteger('second');
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
        //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
        var gettimestamp = getDateInt(tsyear, tsmonth, tsday, tshour, tsmin, tssec, 0) / 1000 - tzoffset;
        console.log(`Tstamp created ${gettimestamp} ${publicreplylog}`)
        const timestamploc = {
            "ru": `:white_check_mark: ${locale.ru.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.ru.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "en-US": `:white_check_mark: ${locale.en_us.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.en_us.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "de": `:white_check_mark: ${locale.de.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.de.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "pl": `:white_check_mark: ${locale.pl.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.pl.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "fr": `:white_check_mark: ${locale.fr.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.fr.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "ja": `:white_check_mark: ${locale.ja.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.ja.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "pt-BR": `:white_check_mark: ${locale.pt_BR.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.pt_BR.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "ko": `:white_check_mark: ${locale.ko.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.ko.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "bg": `:white_check_mark: ${locale.bg.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.bg.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "sv-SE": `:white_check_mark: ${locale.sv_SE.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.sv_SE.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "uk": `:white_check_mark: ${locale.uk.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.uk.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
        };;
        interaction.reply({
        content: timestamploc[interaction.locale] ?? `:white_check_mark: Preview: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **Timestamp to Paste:** \`<t:${gettimestamp}${tsstyle}>\``,
            ephemeral: isephemeral,
        });
    } else if (interaction.commandName === 'convert') {
        incrementStat(`convertcmd.${interaction.options.getSubcommand()}`);
        if (interaction.options.getSubcommand() === 'tounix') {
            var cvyear = interaction.options.getInteger('year');
            var cvmonth = interaction.options.getString('month');
            var cvday = interaction.options.getInteger('day');
            var cvhour = interaction.options.getInteger('hour');
            var cvmin = interaction.options.getInteger('minute');
            var cvsec = interaction.options.getInteger('second');
            var cvms = interaction.options.getInteger('millisecond');
            var cvmsdisplay = interaction.options.getBoolean('displayms');
            //Offset value to selected timezone
            var timezonesel = interaction.options.getString('timezone');
            if (timezonesel === undefined || timezonesel === null) {
                var tzoffset = 0
            } else { var tzoffset = convertGmtToSeconds(timezonesel) }
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            var calctimestamp = getDateInt(cvyear, cvmonth, cvday, cvhour, cvmin, cvsec, cvms);
            //Calculate value in seconds or in ms
            if ( cvmsdisplay === true ) {
                var gettimestamp = calctimestamp - tzoffset * 1000
                //adjust interaction reply
                if ( interaction.locale === 'ru' ) {
                    var cvreplystyle = locale.ru.milliseconds
                } else if ( interaction.locale === 'en-us' ) {
                    var cvreplystyle = locale.en_us.milliseconds
                } else if ( interaction.locale === 'de' ) {
                    var cvreplystyle = locale.de.milliseconds
                } else if ( interaction.locale === 'pl' ) {
                    var cvreplystyle = locale.pl.milliseconds
                } else if ( interaction.locale === 'fr' ) {
                    var cvreplystyle = locale.fr.milliseconds
                } else if ( interaction.locale === 'ja' ) {
                    var cvreplystyle = locale.ja.milliseconds
                } else if ( interaction.locale === 'pt-BR' ) {
                    var cvreplystyle = locale.pt_BR.milliseconds
                } else if ( interaction.locale === 'ko' ) {
                    var cvreplystyle = locale.ko.milliseconds
                } else if ( interaction.locale === 'bg' ) {
                    var cvreplystyle = locale.bg.milliseconds
                } else if ( interaction.locale === 'sv-SE' ) {
                    var cvreplystyle = locale.sv_SE.milliseconds
                } else if ( interaction.locale === 'uk' ) {
                    var cvreplystyle = locale.uk.milliseconds
                } else { var cvreplystyle = 'milliseconds' }
            } else {
                var gettimestamp = Math.floor(calctimestamp / 1000 - tzoffset)
                //adjust interaction reply
                if ( interaction.locale === 'ru' ) {
                    var cvreplystyle = locale.ru.seconds
                } else if ( interaction.locale === 'en-us' ) {
                    var cvreplystyle = locale.en_us.seconds
                } else if ( interaction.locale === 'de' ) {
                    var cvreplystyle = locale.de.seconds
                } else if ( interaction.locale === 'pl' ) {
                    var cvreplystyle = locale.pl.seconds
                } else if ( interaction.locale === 'fr' ) {
                    var cvreplystyle = locale.fr.seconds
                } else if ( interaction.locale === 'ja' ) {
                    var cvreplystyle = locale.ja.seconds
                } else if ( interaction.locale === 'pt-BR' ) {
                    var cvreplystyle = locale.pt_BR.seconds
                } else if ( interaction.locale === 'ko' ) {
                    var cvreplystyle = locale.ko.seconds
                } else if ( interaction.locale === 'bg' ) {
                    var cvreplystyle = locale.bg.seconds
                } else if ( interaction.locale === 'sv-SE' ) {
                    var cvreplystyle = locale.sv_SE.seconds
                } else if ( interaction.locale === 'uk' ) {
                    var cvreplystyle = locale.uk.seconds
                } else { var cvreplystyle = 'seconds' }
            }
            console.log(`Converted date to ${gettimestamp} ${publicreplylog}`)
            const cvunixloc = {
                "ru": `:abacus: **${locale.ru.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.ru.since1970} (UNIX)*`,
                "en-US": `:abacus: **${locale.en_us.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.en_us.since1970} (UNIX)*`,
                "de": `:abacus: **${locale.de.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.de.since1970} (UNIX)*`,
                "pl": `:abacus: **${locale.pl.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.pl.since1970} (UNIX)*`,
                "fr": `:abacus: **${locale.fr.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.fr.since1970} (UNIX)*`,
                "ja": `:abacus: **${locale.ja.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.ja.since1970} (UNIX)*`,
                "pt-BR": `:abacus: **${locale.pt_BR.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.pt_BR.since1970} (UNIX)*`,
                "ko": `:abacus: **${locale.ko.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.ko.since1970} (UNIX)*`,
                "bg": `:abacus: **${locale.bg.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.bg.since1970} (UNIX)*`,
                "sv-SE": `:abacus: **${locale.sv_SE.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.sv_SE.since1970} (UNIX)*`,
                "uk": `:abacus: **${locale.uk.result}:** \`${gettimestamp}\` *${cvreplystyle} ${locale.uk.since1970} (UNIX)*`,
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
                //never set it to 0
                var msdigits = '1'
            }
            //Date output locale
            if (supportedtimelocale.includes(interaction.locale)) {
                var timelocale = interaction.locale
            } else { 
                var timelocale = 'en-UK'
            }
            console.log(`Converted ${cvtimestamp} to date ${publicreplylog}`)
            var cvreply = cvdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `${msdigits}`, weekday: "long" })
            const cvdateloc = { 
                "ru": `:date: ${locale.ru.result}: **__${cvreply}__**`,
                "en-US": `:date: ${locale.en_us.result}: **__${cvreply}__**`,
                "de": `:date: ${locale.de.result}: **__${cvreply}__**`,
                "pl": `:date: ${locale.pl.result}: **__${cvreply}__**`,
                "fr": `:date: ${locale.fr.result}: **__${cvreply}__**`,
                "ja": `:date: ${locale.ja.result}: **__${cvreply}__**`,
                "pt-BR": `:date: ${locale.pt_BR.result}: **__${cvreply}__**`,
                "ko": `:date: ${locale.ko.result}: **__${cvreply}__**`,
                "bg": `:date: ${locale.bg.result}: **__${cvreply}__**`,
                "sv-SE": `:date: ${locale.sv_SE.result}: **__${cvreply}__**`,
                "uk": `:date: ${locale.uk.result}: **__${cvreply}__**`,
            };;
            interaction.reply({
            content: cvdateloc[interaction.locale] ?? `:date: Result: **__${cvreply}__**`,
                ephemeral: true,
            });
        }
    } else if (interaction.commandName === 'calc') {
        incrementStat(`calccmd.${interaction.options.getSubcommand()}`);
        //get Add or Subtract for entire calc command
        var calcmatharg = interaction.options.getString('matharg');
        if (interaction.options.getSubcommand() === 'from-to') {
            var calcfromyear = interaction.options.getInteger('fromyear');
            var calcfrommonth = interaction.options.getString('frommonth');
            var calcfromday = interaction.options.getInteger('fromday');
            var calcfromhour = interaction.options.getInteger('fromhour');
            var calcfrommin = interaction.options.getInteger('fromminute');
            var calcfromsec = interaction.options.getInteger('fromsecond');
            var calctoyear = interaction.options.getInteger('toyear');
            var calctomonth = interaction.options.getString('tomonth');
            var calctoday = interaction.options.getInteger('today');
            var calctohour = interaction.options.getInteger('tohour');
            var calctomin = interaction.options.getInteger('tominute');
            var calctosec = interaction.options.getInteger('tosecond');
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            var calcfromtimestamp = getDateInt(calcfromyear, calcfrommonth, calcfromday, calcfromhour, calcfrommin, calcfromsec, 0);
            var calctotimestamp = getDateInt(calctoyear, calctomonth, calctoday, calctohour, calctomin, calctosec, 0);        
            var calcdiff = Math.floor(Math.abs(calctotimestamp - calcfromtimestamp) / 1000)
            //now we get days, hours, mins and secs from seconds
            var daysdiff = Math.floor(calcdiff / 86400)
            var hoursdiff = Math.floor((calcdiff - (daysdiff * 86400)) / 3600)
            var minsdiff = Math.floor(((calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600))) / 60))
            var secsdiff = Math.floor(calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600) + (minsdiff * 60)))
            console.log(`Diff calculated ${calcdiff} ${publicreplylog}`)
            const calcfromtoloc = {
                "ru": `:white_check_mark: ${locale.ru.datesdiff}: **__${daysdiff} ${locale.ru.days} ${hoursdiff} ${locale.ru.hours} ${minsdiff} ${locale.ru.minutes} ${secsdiff} ${locale.ru.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.ru.seconds}*`,
                "en-US": `:white_check_mark: ${locale.en_us.datesdiff}: **__${daysdiff} ${locale.en_us.days} ${hoursdiff} ${locale.en_us.hours} ${minsdiff} ${locale.en_us.minutes} ${secsdiff} ${locale.en_us.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.en_us.seconds}*`,
                "de": `:white_check_mark: ${locale.de.datesdiff}: **__${daysdiff} ${locale.de.days} ${hoursdiff} ${locale.de.hours} ${minsdiff} ${locale.de.minutes} ${secsdiff} ${locale.de.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.de.seconds}*`,
                "pl": `:white_check_mark: ${locale.pl.datesdiff}: **__${daysdiff} ${locale.pl.days} ${hoursdiff} ${locale.pl.hours} ${minsdiff} ${locale.pl.minutes} ${secsdiff} ${locale.pl.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.pl.seconds}*`,
                "fr": `:white_check_mark: ${locale.fr.datesdiff}: **__${daysdiff} ${locale.fr.days} ${hoursdiff} ${locale.fr.hours} ${minsdiff} ${locale.fr.minutes} ${secsdiff} ${locale.fr.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.fr.seconds}*`,
                "ja": `:white_check_mark: ${locale.ja.datesdiff}: **__${daysdiff} ${locale.ja.days} ${hoursdiff} ${locale.ja.hours} ${minsdiff} ${locale.ja.minutes} ${secsdiff} ${locale.ja.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.ja.seconds}*`,
                "pt-BR": `:white_check_mark: ${locale.pt_BR.datesdiff}: **__${daysdiff} ${locale.pt_BR.days} ${hoursdiff} ${locale.pt_BR.hours} ${minsdiff} ${locale.pt_BR.minutes} ${secsdiff} ${locale.pt_BR.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.pt_BR.seconds}*`,
                "ko": `:white_check_mark: ${locale.ko.datesdiff}: **__${daysdiff} ${locale.ko.days} ${hoursdiff} ${locale.ko.hours} ${minsdiff} ${locale.ko.minutes} ${secsdiff} ${locale.ko.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.ko.seconds}*`,
                "bg": `:white_check_mark: ${locale.bg.datesdiff}: **__${daysdiff} ${locale.bg.days} ${hoursdiff} ${locale.bg.hours} ${minsdiff} ${locale.bg.minutes} ${secsdiff} ${locale.bg.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.bg.seconds}*`,
                "sv-SE": `:white_check_mark: ${locale.sv_SE.datesdiff}: **__${daysdiff} ${locale.sv_SE.days} ${hoursdiff} ${locale.sv_SE.hours} ${minsdiff} ${locale.sv_SE.minutes} ${secsdiff} ${locale.sv_SE.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.sv_SE.seconds}*`,
                "uk": `:white_check_mark: ${locale.uk.datesdiff}: **__${daysdiff} ${locale.uk.days} ${hoursdiff} ${locale.uk.hours} ${minsdiff} ${locale.uk.minutes} ${secsdiff} ${locale.uk.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${locale.uk.seconds}*`,
            };;
            interaction.reply({
            content: calcfromtoloc[interaction.locale] ?? `:white_check_mark: Difference between dates is: **__${daysdiff} Days ${hoursdiff} Hours ${minsdiff} Minutes ${secsdiff} Seconds__** \n:hourglass_flowing_sand: \`${calcdiff}\` *Seconds*`,
                ephemeral: isephemeral,
            });           
        } else if (interaction.options.getSubcommand() === 'fromnow') {
            //get current time
            var calcarg1 = Date.now()
        } else if (interaction.options.getSubcommand() === 'fromdate') {
            //else set 1st arg from user input
            var calcyear = interaction.options.getInteger('year');
            var calcmonth = interaction.options.getString('month');
            var calcday = interaction.options.getInteger('day');
            var calchour = interaction.options.getInteger('hour');
            var calcmin = interaction.options.getInteger('minute');
            var calcsec = interaction.options.getInteger('second');
            var calcms = interaction.options.getInteger('millisecond');          
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            var calcarg1 = getDateInt(calcyear, calcmonth, calcday, calchour, calcmin, calcsec, calcms);
        }
        if (interaction.options.getSubcommand() === 'fromnow' || interaction.options.getSubcommand() === 'fromdate') {
            //if calculating with 1st arg then we setting 2nd arg
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
            //If subtract then reverting sign of value
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
            console.log(`Calculated ${calcarg1} + ${calcarg2} ${publicreplylog}`)
            var calcresdate = new Date(calcresult)
            var calcreply = calcresdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `3`, weekday: "long" })
            const calcdateloc = {
                "ru": `:white_check_mark: ${locale.ru.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.ru.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.ru.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "en-US": `:white_check_mark: ${locale.en_us.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.en_us.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.en_us.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "de": `:white_check_mark: ${locale.de.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.de.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.de.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "pl": `:white_check_mark: ${locale.pl.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.pl.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.pl.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "fr": `:white_check_mark: ${locale.fr.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.fr.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.fr.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "ja": `:white_check_mark: ${locale.ja.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.ja.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.ja.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "pt-BR": `:white_check_mark: ${locale.pt_BR.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.pt_BR.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.pt_BR.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "ko": `:white_check_mark: ${locale.ko.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.ko.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.ko.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "bg": `:white_check_mark: ${locale.bg.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.bg.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.bg.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "sv-SE": `:white_check_mark: ${locale.sv_SE.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.sv_SE.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.sv_SE.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
                "uk": `:white_check_mark: ${locale.uk.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${locale.uk.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${locale.uk.localtime}: <t:${Math.floor(calcresult / 1000)}>*`,
            };;
            interaction.reply({
            content: calcdateloc[interaction.locale] ?? `:white_check_mark: Result: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` Timestamp to Paste: \`<t:${Math.floor(calcresult / 1000)}>\` Local Time: <t:${Math.floor(calcresult / 1000)}>*`,
                ephemeral: isephemeral,
            });
        }
    }
});

//actions as client ready
client.once(Events.ClientReady, async(readyClient) => {
    //fetch application data
    await readyClient.application.fetch();
    //Installation Counter
    const installCount = readyClient.application.approximateUserInstallCount
    //Login output
    console.log(`Logged in as ${readyClient.user.tag}. Approx installs: ${installCount}`);
    incrementStat('botlogin');
    
    //Bot Presence List
    const presencelist = [
        { name: `/about • ${corever}`, type: ActivityType.Streaming },
        { name: `/now • With ${installCount}+ installs!`, type: ActivityType.Streaming },
        { name: `/random • Coming Soon!`, type: ActivityType.Streaming }
    ];
    
    //index init
    let currentIndex = 0;
    
    function presenceupdate() {
        //check if client ready
        if (!client.user) return;
        //Set Presence
        client.user.setPresence({
            activities: [presencelist[currentIndex]],
            status: 'online',
        });
        //next index (0 in the end)
        currentIndex = (currentIndex + 1) % presencelist.length;
    };
    
    //Update presence on Login
    presenceupdate()
    //Update presence every (x, ms)
    setInterval(presenceupdate, 1800000);
});

//prelogin
(async() => {
    //auth
    const question = (q) => new Promise((resolve) => rl.question(q, resolve));

    // Log in to Discord with your client's token
    await client.login(token).catch((err) => {
      throw err
    });
    
    //app commands registration
    await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });
})();