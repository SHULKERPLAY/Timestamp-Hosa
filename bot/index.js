const corever = 'v0.2';
const forbiddenChars = /['",:;<>?!@#$%^&*(){}|\[\]\/\\]/;

const fs = require('fs');
const path = require('path');
const { loadlocale, timestampstyles } = require('./functions.js');
const { ping, about, invite, timenow } = require('./builder.js');

//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');
loadStats();
//Autosave stats every (mins)
statsAutoSave(60);

//loading bot localization
loadlocale();

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

const commands = [ping, about, invite, timenow]; // Add your commands with commas to add them to the bot!

const rl = createInterface({ input: process.stdin, output: process.stdout });

client.on('interactionCreate', (interaction) => {
  if (interaction.commandName === 'ping') {
        incrementStat('pingcmd');
        interaction.reply({
        content: `:ping_pong: *Понг!* Задержка ${Date.now() - interaction.createdTimestamp} миллисекунд! Задержка API ${Math.round(client.ws.ping)} миллисекунд.`,
        ephemeral: true,
      });
  } else if (interaction.commandName === 'about') {
        incrementStat('aboutcmd');
        const aboutloc = {
            "ru": ':blue_heart: Мы в раннем доступе, все объявления есть на сервере разработчика',
            "en-US": ':blue_heart: We are still in early access. Additional info available on developer server',
        };
        interaction.reply({
            content: aboutloc[interaction.locale] ?? `:blue_heart: We are still in early access. Additional info available on developer server`,
            ephemeral: true,
    });
  } else if (interaction.commandName === 'invite') {
        incrementStat('invitecmd');
        const inviteloc = {
            "ru": `:gift_heart: Нет возможности приглашения во время раннего доступа`,
            "en-US": `:gift_heart: Invites not work in Early Access`,
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
            "ru": `Сейчас: <t:${nowtimestamp}${nowstyle}> \nМетка для вставки: \`<t:${nowtimestamp}${nowstyle}>\``,
            "en-US": `Now: <t:${nowtimestamp}${nowstyle}> \nTimestamp: \`<t:${nowtimestamp}${nowstyle}>\``,
        };;
        interaction.reply({
            content: nowloc[interaction.locale] ?? `Now: <t:${nowtimestamp}${nowstyle}> \nTimestamp: \`<t:${nowtimestamp}${nowstyle}>\``,
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
