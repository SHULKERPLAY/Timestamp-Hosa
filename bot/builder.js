const { SlashCommandBuilder } = require('discord.js');
const { loadlocale, timestampstyles } = require('./functions.js');
loadlocale();

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
        
module.exports = {
    ping,
    about,
    invite,
    timenow
};