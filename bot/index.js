const corever = 'v0.2';
const forbiddenChars = /['",:;<>?!@#$%^&*(){}|\[\]\/\\]/;

const fs = require('fs');
const path = require('path');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey } = require('./functions.js');
const { ping, about, invite, timenow, timezonenow } = require('./builder.js');

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

const commands = [ping, about, invite, timenow, timezonenow]; // Add your commands with commas to add them to the bot!

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
        var tztimestamp = Math.floor(Date.now())
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
