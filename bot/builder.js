const { SlashCommandBuilder } = require('discord.js');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones } = require('./functions.js');
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
        
const timestampint = new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('Create timestamp to embed it in your message!')
    .setDescriptionLocalizations({
        "ru": 'Создать временную метку для вставки в ваше сообщение!',
        "en-US": 'Create timestamp to embed in your message!',
    })
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addIntegerOption(option =>
        option.setName('year')
        .setNameLocalizations({
            "ru": 'год',
            "en-US": 'year',
        })
        .setDescription('Type Year of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": 'Впишите год, который будет на временной метке',
            "en-US": 'Type Year of timestamp you want to do',
        })
        .setMinValue(1901)
        .setMaxValue(2999)
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('month')
        .setNameLocalizations({
            "ru": 'месяц',
            "en-US": 'month',
        })
        .setDescription('Select Month of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": 'Выберите месяц, который будет на временной метке',
            "en-US": 'Select style of date output',
        })
        .setRequired(true)
        .addChoices(monthsoption)
    )
    .addIntegerOption(option =>
        option.setName('day')
        .setNameLocalizations({
            "ru": 'день',
            "en-US": 'day',
        })
        .setDescription('Type Day of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": 'Впишите день, который будет на временной метке',
            "en-US": 'Type Day of timestamp you want to do',
        })
        .setMinValue(1)
        .setMaxValue(31)
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('hour')
        .setNameLocalizations({
            "ru": 'час',
            "en-US": 'hour',
        })
        .setDescription('Type Hour of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": 'Впишите час, который будет на временной метке',
            "en-US": 'Type Hour of timestamp you want to do',
        })
        .setMinValue(0)
        .setMaxValue(23)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option.setName('minute')
        .setNameLocalizations({
            "ru": 'минута',
            "en-US": 'minute',
        })
        .setDescription('Type Minute of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": 'Впишите минуту, которая будет на временной метке',
            "en-US": 'Type Minute of timestamp you want to do',
        })
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option.setName('second')
        .setNameLocalizations({
            "ru": 'секунда',
            "en-US": 'second',
        })
        .setDescription('Type Second of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": 'Впишите секунду, которая будет на временной метке',
            "en-US": 'Type Second of timestamp you want to do',
        })
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('timezone')
        .setNameLocalizations({
            "ru": 'часовойпояс',
            "en-US": 'timezone',
        })
        .setDescription('Select timezone of timestamp (Default: GMT+0)')
        .setDescriptionLocalizations({
            "ru": 'Выберите часовой пояс метки (По умолчанию: GMT+0)',
            "en-US": 'Select timezone of timestamp (Default: GMT+0)',
        })
        .setRequired(false)
        .addChoices(alltimezones)
    )
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

module.exports = {
    ping,
    about,
    invite,
    timenow,
    timezonenow,
    timestampint
};