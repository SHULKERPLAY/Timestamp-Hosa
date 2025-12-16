const { SlashCommandBuilder } = require('discord.js');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey } = require('./functions.js');
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

//CommandBuilder
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
            .addChoices(timestampstyles)
        )
        
const timezonenow = new SlashCommandBuilder()
    .setName('timezone')
    .setDescription('Display current time in selected timezone')
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('gmtplus')
            .setDescription('Select timezone from GMT to GMT +14')
			.setDescriptionLocalizations({
                "ru": 'Узнайте время в часовых поясах от GMT до GMT +14',
                "en-US": 'Check time in timezones from GMT to GMT +14',
			})
            .addStringOption(option =>
                option.setName('timezone')
                .setNameLocalizations({
                    "ru": 'часовойпояс',
                    "en-US": 'timezone',
                })
                .setDescription('Select timezone')
                .setDescriptionLocalizations({
                    "ru": 'Выберите часовой пояс',
                    "en-US": 'Select timezone',
                })
                .setRequired(true)
                .addChoices(timezonesgmtplus)
            )
            
        )
    .addSubcommand(subcommand =>
        subcommand.setName('gmtminus')
            .setDescription('Select timezone from GMT -12 to GMT')
			.setDescriptionLocalizations({
                "ru": 'Узнайте время в часовых поясах от GMT -12 до GMT',
                "en-US": 'Check time in timezones from GMT -12 to GMT',
			})
            .addStringOption(option =>
                option.setName('timezone')
                .setNameLocalizations({
                    "ru": 'часовойпояс',
                    "en-US": 'timezone',
                })
                .setDescription('Select timezone')
                .setDescriptionLocalizations({
                    "ru": 'Выберите часовой пояс',
                    "en-US": 'Select timezone',
                })
                .setRequired(true)
                .addChoices(timezonesgmtminus)
            )
        )
    .addSubcommand(subcommand =>
        subcommand.setName('keyzones')
            .setDescription('Check time in timezone different from GMT')
			.setDescriptionLocalizations({
                "ru": 'Узнайте время в часовом поясе, отличном от GMT',
                "en-US": 'Check time in timezone different from GMT',
			})
            .addStringOption(option =>
                option.setName('timezone')
                .setNameLocalizations({
                    "ru": 'часовойпояс',
                    "en-US": 'timezone',
                })
                .setDescription('Select timezone')
                .setDescriptionLocalizations({
                    "ru": 'Выберите часовой пояс',
                    "en-US": 'Select timezone',
                })
                .setRequired(true)
                .addChoices(timezoneskey)
            )
        )

module.exports = {
    ping,
    about,
    invite,
    timenow,
    timezonenow
};