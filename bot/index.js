const corever = 'v0.1';
const forbiddenChars = /['",:;<>?!@#$%^&*(){}|\[\]\/\\]/;
//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');
loadStats();
//Autosave stats every (mins)
statsAutoSave(60);

// const fs = require('fs');
// const { exec } = require("child_process");

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

const ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Check Application response time')
    .setDescriptionLocalizations({
        "ru": 'Проверка скорости ответа приложения',
        "en-US": 'Check Application response time',
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1)
  
const about = new SlashCommandBuilder()
    .setName('about')
    .setDescription('About this app')
    .setDescriptionLocalizations({
        "ru": 'Подробная информация о приложении',
        "en-US": 'About this app',
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1)

const invite = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Install TimestampHosa app on Server or as personal app!')
    .setDescriptionLocalizations({
        "ru": 'Установить TimestampHosa на сервер или как личное приложение!',
        "en-US": 'Install TimestampHosa app on Server or as personal app!',
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const timenow = new SlashCommandBuilder()
    .setName('now')
    .setDescription('Display current time and timestamp')
    .setDescriptionLocalizations({
        "ru": 'Вывести текущее время и временную метку',
        "en-US": 'Display current time and timestamp',
    })
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addStringOption(option =>
        option.setName('style')
			.setNameLocalizations({
                "ru": 'стиль',
                "en-US": 'style',
			})
            .setDescription('Select style of date output')
			.setDescriptionLocalizations({
                "ru": 'Выбор формата отображения даты',
                "en-US": 'Select style of date output',
			})
            .setRequired(false)
            .addChoices(
                { name: '16:20',
                  value: 'ShortT',
                },
                { name: '16:20:30',
                  value: 'MediumT', 
                },
                { name: '20/04/2021',
                  value: 'ShortD',
                  nameLocalizations: { "ru": '20.04.2021', "en-US": '4/20/2021' }
                },
                { name: 'April 20, 2021',
                  value: 'LongD',
                  nameLocalizations: { "ru": '20 апреля 2021 г.', "en-US": 'April 20, 2021' }
                },
                { name: 'April 20, 2021 at 16:20',
                  value: 'LongDshortT',
                  nameLocalizations: { "ru": '20 апреля 2021 г. 16:20', "en-US": 'April 20, 2021 16:20' }
                },
                { name: 'Tuesday, April 20, 2021 at 16:20',
                  value: 'FullDshortT',
                  nameLocalizations: { "ru": 'вторник, 20 апреля 2021 г. 16:20', "en-US": 'Tuesday, April 20, 2021 16:20' }
                },
                { name: '20/04/2021, 16:20',
                  value: 'ShortDshortT',
                  nameLocalizations: { "ru": '20.04.2021 16:20', "en-US": '4/20/2021 16:20' }
                },
                { name: '20/04/2021, 16:20:30',
                  value: 'ShortDmediumT',
                  nameLocalizations: { "ru": '20.04.2021 16:20:30', "en-US": '4/20/2021 16:20:30' }
                },
                { name: '2 months ago (Relative)',
                  value: 'Relative',
                  nameLocalizations: { "ru": '2 месяца назад', "en-US": '2 months ago' }
                }
            )
        )

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
        interaction.reply({
            content: `:gift_heart: Нет возможности приглашения во время раннего доступа`,
            ephemeral: true,
    });
  } else if (interaction.commandName === 'now') {
        incrementStat('nowcmd');
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
        var nowtimestamp = Math.floor(Date.now() / 1000)
        interaction.reply({
            content: `Сейчас: <t:${nowtimestamp}${nowstyle}> \nМетка для вставки: \`<t:${nowtimestamp}${nowstyle}>\``,
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
