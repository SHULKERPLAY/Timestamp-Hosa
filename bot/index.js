const corever = 'v0.5';
const forbiddenChars = /['",:;<>?!@#$%^&*(){}|\[\]\/\\]/;

const fs = require('fs');
const path = require('path');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones, convertGmtToSeconds } = require('./functions.js');
const { ping, about, invite, timenow, timezonenow, timestampint, convertint } = require('./builder.js');

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

const commands = [ping, about, invite, timenow, timezonenow, timestampint, convertint]; // Add your commands with commas to add them to the bot!

const rl = createInterface({ input: process.stdin, output: process.stdout });

client.on('interactionCreate', (interaction) => {
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
            ephemeral: true,
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
        var intlocale = interaction.locale
        if (intlocale === 'ru' || intlocale === 'en-US') {
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
            ephemeral: true,
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
        var tsday = tsdayi.toString();
        if (tsday.length === 1) {
            var tsday = `0${tsday}`
        }
//Test if option is specified
        if (tshouri === undefined || tshouri === null) {
            var tshour = '00'
        } else { var tshour = tshouri.toString();
            if (tshour.length === 1) {
            var tshour = `0${tshour}`
            }
        }
        if (tsmini === undefined || tsmini === null) {
            var tsmin = '00'
        } else { var tsmin = tsmini.toString();
            if (tsmin.length === 1) {
            var tsmin = `0${tsmin}`
            }
        }
        if (tsseci === undefined || tsseci === null) {
            var tssec = '00'
        } else { var tssec = tsseci.toString();
            if (tssec.length === 1) {
            var tssec = `0${tssec}`
            }
        }
        var tsdateString = `${tsyear}-${tsmonth}-${tsday}T${tshour}:${tsmin}:${tssec}.000Z`;
        var calcDate = new Date(tsdateString);
        var calctimestamp = Math.floor(calcDate.getTime() / 1000);
        var gettimestamp = calctimestamp - tzoffset
        const timestamploc = {
            "ru": `:white_check_mark: ${locale.ru.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.ru.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
            "en-US": `:white_check_mark: ${locale.en_us.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${locale.en_us.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``,
        };;
        interaction.reply({
        content: timestamploc[interaction.locale] ?? `:white_check_mark: Preview: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **Timestamp to Paste:** \`<t:${gettimestamp}${tsstyle}>\``,
            ephemeral: true,
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
            //Also converting integers into strings
            var cvday = cvdayi.toString();
            if (cvday.length === 1) {
                var cvday = `0${cvday}`
            }
            //Test if option is specified
            if (cvhouri === undefined || cvhouri === null) {
                var cvhour = '00'
            } else { var cvhour = cvhouri.toString();
                if (cvhour.length === 1) {
                var cvhour = `0${cvhour}`
                }
            }
            if (cvmini === undefined || cvmini === null) {
                var cvmin = '00'
            } else { var cvmin = cvmini.toString();
                if (cvmin.length === 1) {
                var cvmin = `0${cvmin}`
                }
            }
            if (cvseci === undefined || cvseci === null) {
                var cvsec = '00'
            } else { var cvsec = cvseci.toString();
                if (cvsec.length === 1) {
                var cvsec = `0${cvsec}`
                }
            }
            if (cvmsi === undefined || cvmsi === null) {
                var cvms = '000'
            } else { var cvms = cvmsi.toString();
                if (cvms.length === 1) {
                var cvms = `0${cvms}`
                } else if (cvms.length === 2) {
                    var cvms = `00${cvms}`
                }
            }   
            var cvdateString = `${cvyear}-${cvmonth}-${cvday}T${cvhour}:${cvmin}:${cvsec}.${cvms}Z`;
            var cvcalcDate = new Date(cvdateString);
            //Calculate value in seconds or in ms
            if ( cvmsdisplay === true ) {
                var calctimestamp = cvcalcDate.getTime();
                var gettimestamp = calctimestamp - tzoffset * 1000
                //adjust interaction reply
                if ( interaction.locale === 'ru' ) {
                    var cvreplystyle = locale.ru.milliseconds
                } else if ( interaction.locale === 'en-us' ) {
                    var cvreplystyle = locale.en_us.milliseconds
                } else { var cvreplystyle = 'milliseconds' }
            } else { var calctimestamp = Math.floor(cvcalcDate.getTime() / 1000);
                var gettimestamp = calctimestamp - tzoffset
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
            var intlocale = interaction.locale
            var timezonesel = interaction.options.getString('timezone');
            if (timezonesel === undefined || timezonesel === null) {
                var timezonesel = 'GMT'
            }
            //is it milliseconds or seconds
            if ( cvmscount === true ) {
                var cvdate = new Date(cvtimestamp)
            } else { var cvcalc = Math.floor(cvtimestamp * 1000)
                var cvdate = new Date(cvcalc)
            }
            //Date output locale
            if (intlocale === 'ru' || intlocale === 'en-US') {
                var timelocale = interaction.locale
            } else { 
                var timelocale = 'en-UK'
            }
            var cvreply = cvdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `3`, weekday: "long" })
            const cvdateloc = {
                "ru": `:date: ${locale.ru.result}: **__${cvreply}__**`,
                "en-US": `:date: ${locale.en_us.result}: **__${cvreply}__**`,
            };;
            interaction.reply({
            content: cvdateloc[interaction.locale] ?? `:date: Result: **__${cvreply}__**`,
                ephemeral: true,
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
