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
            "en-US": 'Select Month of timestamp you want to do',
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
    
const convertint = new SlashCommandBuilder()
    .setName('convert')
    .setDescription('Convert UNIX string to Date and backwards')
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('tounix')
        .setDescription('Convert selected date to UNIX date integer')
        .setDescriptionLocalizations({
            "ru": 'Преобразуйте читаемую дату в метку времени UNIX',
            "en-US": 'Convert selected date to UNIX date integer',
        })
        .addIntegerOption(option =>
            option.setName('year')
            .setNameLocalizations({
                "ru": 'год',
                "en-US": 'year',
            })
            .setDescription('Type Year you want')
            .setDescriptionLocalizations({
                "ru": 'Впишите нужный год',
                "en-US": 'Type Year you want',
            })
            .setMinValue(1601)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
            .setNameLocalizations({
                "ru": 'месяц',
                "en-US": 'month',
            })
            .setDescription('Select Month you want')
            .setDescriptionLocalizations({
                "ru": 'Выберите нужный месяц',
                "en-US": 'Select Month you want',
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
            .setDescription('Type Day you want')
            .setDescriptionLocalizations({
                "ru": 'Впишите нужный день',
                "en-US": 'Type Day you want',
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('displayms')
            .setNameLocalizations({
                "ru": 'отображатьмс',
                "en-US": 'displayms',
            })
            .setDescription('Whether or not to return value with milliseconds')
            .setDescriptionLocalizations({
                "ru": 'Следует ли возвращать значение с миллисекундами',
                "en-US": 'Whether or not to return value with milliseconds',
            })
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('hour')
            .setNameLocalizations({
                "ru": 'час',
                "en-US": 'hour',
            })
            .setDescription('Type Hour you want')
            .setDescriptionLocalizations({
                "ru": 'Впишите нужный час',
                "en-US": 'Type Hour you want',
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
            .setDescription('Type Minute you want')
            .setDescriptionLocalizations({
                "ru": 'Впишите нужную минуту',
                "en-US": 'Type Minute you want',
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
            .setDescription('Type Second you want')
            .setDescriptionLocalizations({
                "ru": 'Впишите нужную секунду',
                "en-US": 'Type Second you want',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": 'миллисекунда',
                "en-US": 'millisecond',
            })
            .setDescription('Type Millisecond you want')
            .setDescriptionLocalizations({
                "ru": 'Впишите нужную миллисекунду',
                "en-US": 'Type Millisecond you want',
            })
            .setMinValue(0)
            .setMaxValue(999)
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": 'часовойпояс',
                "en-US": 'timezone',
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": 'Выберите часовой пояс вашей даты (По умолчанию: GMT+0)',
                "en-US": 'Select timezone of input (Default: GMT+0)',
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('todate')
        .setDescription('Convert UNIX date integer to Human Date')
        .setDescriptionLocalizations({
            "ru": 'Преобразуйте метку времени UNIX читаемую дату',
            "en-US": 'Convert UNIX date integer to Human Date',
        })
        .addIntegerOption(option =>
            option.setName('unixtime')
            .setNameLocalizations({
                "ru": 'unixвремя',
                "en-US": 'unixtime',
            })
            .setDescription('Type UNIX Epoch Time Integer')
            .setDescriptionLocalizations({
                "ru": 'Вставьте значение времени UNIX Epoch',
                "en-US": 'Type UNIX Epoch Time Integer',
            })
            .setMinValue(-8639999999999)
            .setMaxValue(8639999999999)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('withms')
            .setNameLocalizations({
                "ru": 'учитыватьмс',
                "en-US": 'withms',
            })
            .setDescription('Whether or not to read and return value with milliseconds')
            .setDescriptionLocalizations({
                "ru": 'Следует ли считывать и возвращать значение с миллисекундами',
                "en-US": 'Whether or not to read and return value with milliseconds',
            })
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": 'часовойпояс',
                "en-US": 'timezone',
            })
            .setDescription('Select timezone for output (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": 'Выберите часовой пояс для вывода (По умолчанию: GMT+0)',
                "en-US": 'Select timezone for output (Default: GMT+0)',
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
    )

const calcint = new SlashCommandBuilder()
    .setName('calc')
    .setDescription('Time and Date Calculator')
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addSubcommand(subcommand =>
        subcommand.setName('fromnow')
        .setDescription('Add or subtract time from the current time')
        .setDescriptionLocalizations({
            "ru": 'Прибавить или отнять время от текущего момента',
            "en-US": 'Add or subtract time from the current time',
        })
        //Add or subtract
        .addStringOption(option =>
            option.setName('matharg')
            .setNameLocalizations({
                "ru": 'матемзнак',
                "en-US": 'matharg',
            })
            .setDescription('ADD OR SUBTRACT')
            .setDescriptionLocalizations({
                "ru": 'ПРИБАВТЬ ИЛИ ОТНЯТЬ',
                "en-US": 'ADD OR SUBTRACT',
            })
            .setRequired(true)
            .addChoices({
                name: 'Add (+)',
                value: 'Add',
                name_localizations: { "ru": `${locale.ru.add}`, "en-US": `${locale.en_us.add}` }
                },
                { name: 'Subtract (-)',
                  value: 'Subtract',
                  name_localizations: { "ru": `${locale.ru.subtract}`, "en-US": `${locale.en_us.subtract}` }
                }
            )
        )
        //offset to timezone
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": 'часовойпояс',
                "en-US": 'timezone',
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": 'Выберите часовой пояс вашей даты (По умолчанию: GMT+0)',
                "en-US": 'Select timezone of input (Default: GMT+0)',
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
        //arg2
        .addIntegerOption(option =>
            option.setName('years')
            .setNameLocalizations({
                "ru": 'лет',
                "en-US": 'years',
            })
            .setDescription('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во лет (Неточный. 365 дней)',
                "en-US": 'ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)',
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('months')
            .setNameLocalizations({
                "ru": 'месяцев',
                "en-US": 'months',
            })
            .setDescription('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во месяцев (Неточный. 30 дней)',
                "en-US": 'ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)',
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('weeks')
            .setNameLocalizations({
                "ru": 'недель',
                "en-US": 'weeks',
            })
            .setDescription('ADD OR SUBTRACT this amount of Weeks')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во недель',
                "en-US": 'ADD OR SUBTRACT this amount of Weeks',
            })
            .setMinValue(0)
            .setMaxValue(5000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('days')
            .setNameLocalizations({
                "ru": 'дней',
                "en-US": 'days',
            })
            .setDescription('ADD OR SUBTRACT this amount of Days')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во дней',
                "en-US": 'ADD OR SUBTRACT this amount of Days',
            })
            .setMinValue(0)
            .setMaxValue(50000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('hours')
            .setNameLocalizations({
                "ru": 'часов',
                "en-US": 'hours',
            })
            .setDescription('ADD OR SUBTRACT this amount of Hours')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во часов',
                "en-US": 'ADD OR SUBTRACT this amount of Hours',
            })
            .setMinValue(0)
            .setMaxValue(240000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
            .setNameLocalizations({
                "ru": 'минут',
                "en-US": 'minutes',
            })
            .setDescription('ADD OR SUBTRACT this amount of Minutes')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во минут',
                "en-US": 'ADD OR SUBTRACT this amount of Minutes',
            })
            .setMinValue(0)
            .setMaxValue(1000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('seconds')
            .setNameLocalizations({
                "ru": 'секунд',
                "en-US": 'seconds',
            })
            .setDescription('ADD OR SUBTRACT this amount of Seconds')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во секунд',
                "en-US": 'ADD OR SUBTRACT this amount of Seconds',
            })
            .setMinValue(0)
            .setMaxValue(100000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": 'миллисекунд',
                "en-US": 'milliseconds',
            })
            .setDescription('ADD OR SUBTRACT this amount of Milliseconds')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во миллисекунд',
                "en-US": 'ADD OR SUBTRACT this amount of Milliseconds',
            })
            .setMinValue(0)
            .setMaxValue(1000000000)
            .setRequired(false)
        )
    )
    //Calc with custom first arg
    .addSubcommand(subcommand =>
        subcommand.setName('fromdate')
        .setDescription('Add or subtract time from the specified date')
        .setDescriptionLocalizations({
            "ru": 'Прибавить или отнять время от выбранной даты',
            "en-US": 'Add or subtract time from the specified date',
        })
        //arg1
        .addIntegerOption(option =>
            option.setName('year')
            .setNameLocalizations({
                "ru": 'год',
                "en-US": 'year',
            })
            .setDescription('Type Year to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Впишите год от которого нужно считать',
                "en-US": 'Type Year to calculate from',
            })
            .setMinValue(1601)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
            .setNameLocalizations({
                "ru": 'месяц',
                "en-US": 'month',
            })
            .setDescription('Select Month to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Выберите месяц от которого нужно считать',
                "en-US": 'Select Month to calculate from',
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
            .setDescription('Type Day to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Впишите день от которого нужно считать',
                "en-US": 'Type Day to calculate from',
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //arg1
        .addIntegerOption(option =>
            option.setName('hour')
            .setNameLocalizations({
                "ru": 'час',
                "en-US": 'hour',
            })
            .setDescription('Type Hour to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Впишите час от которого нужно считать',
                "en-US": 'Type Hour to calculate from',
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minute')
            .setNameLocalizations({
                "ru": 'минута',
                "en-US": 'minute',
            })
            .setDescription('Type Minute to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Впишите минуту от которой нужно считать',
                "en-US": 'Type Minute to calculate from',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('second')
            .setNameLocalizations({
                "ru": 'секунда',
                "en-US": 'second',
            })
            .setDescription('Type Second to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Впишите секунду от которой нужно считать',
                "en-US": 'Type Second to calculate from',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": 'миллисекунда',
                "en-US": 'millisecond',
            })
            .setDescription('Type Millisecond to calculate from')
            .setDescriptionLocalizations({
                "ru": 'Впишите миллисекунду от которой нужно считать',
                "en-US": 'Type Millisecond to calculate from',
            })
            .setMinValue(0)
            .setMaxValue(999)
            .setRequired(true)
        )
        //Add or subtract
        .addStringOption(option =>
            option.setName('matharg')
            .setNameLocalizations({
                "ru": 'матемзнак',
                "en-US": 'matharg',
            })
            .setDescription('ADD OR SUBTRACT')
            .setDescriptionLocalizations({
                "ru": 'ПРИБАВТЬ ИЛИ ОТНЯТЬ',
                "en-US": 'ADD OR SUBTRACT',
            })
            .setRequired(true)
            .addChoices({
                name: 'Add (+)',
                value: 'Add',
                name_localizations: { "ru": `${locale.ru.add}`, "en-US": `${locale.en_us.add}` }
                },
                { name: 'Subtract (-)',
                  value: 'Subtract',
                  name_localizations: { "ru": `${locale.ru.subtract}`, "en-US": `${locale.en_us.subtract}` }
                }
            )
        )
        //timezone of arg1
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": 'часовойпояс',
                "en-US": 'timezone',
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": 'Выберите часовой пояс вашей даты (По умолчанию: GMT+0)',
                "en-US": 'Select timezone of input (Default: GMT+0)',
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
        //arg2
        .addIntegerOption(option =>
            option.setName('years')
            .setNameLocalizations({
                "ru": 'лет',
                "en-US": 'years',
            })
            .setDescription('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во лет (Неточный. 365 дней)',
                "en-US": 'ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)',
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('months')
            .setNameLocalizations({
                "ru": 'месяцев',
                "en-US": 'months',
            })
            .setDescription('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во месяцев (Неточный. 30 дней)',
                "en-US": 'ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)',
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('weeks')
            .setNameLocalizations({
                "ru": 'недель',
                "en-US": 'weeks',
            })
            .setDescription('ADD OR SUBTRACT this amount of Weeks')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во недель',
                "en-US": 'ADD OR SUBTRACT this amount of Weeks',
            })
            .setMinValue(0)
            .setMaxValue(5000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('days')
            .setNameLocalizations({
                "ru": 'дней',
                "en-US": 'days',
            })
            .setDescription('ADD OR SUBTRACT this amount of Days')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во дней',
                "en-US": 'ADD OR SUBTRACT this amount of Days',
            })
            .setMinValue(0)
            .setMaxValue(50000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('hours')
            .setNameLocalizations({
                "ru": 'часов',
                "en-US": 'hours',
            })
            .setDescription('ADD OR SUBTRACT this amount of Hours')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во часов',
                "en-US": 'ADD OR SUBTRACT this amount of Hours',
            })
            .setMinValue(0)
            .setMaxValue(240000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
            .setNameLocalizations({
                "ru": 'минут',
                "en-US": 'minutes',
            })
            .setDescription('ADD OR SUBTRACT this amount of Minutes')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во минут',
                "en-US": 'ADD OR SUBTRACT this amount of Minutes',
            })
            .setMinValue(0)
            .setMaxValue(1000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('seconds')
            .setNameLocalizations({
                "ru": 'секунд',
                "en-US": 'seconds',
            })
            .setDescription('ADD OR SUBTRACT this amount of Seconds')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во секунд',
                "en-US": 'ADD OR SUBTRACT this amount of Seconds',
            })
            .setMinValue(0)
            .setMaxValue(100000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('milliseconds')
            .setNameLocalizations({
                "ru": 'миллисекунд',
                "en-US": 'milliseconds',
            })
            .setDescription('ADD OR SUBTRACT this amount of Milliseconds')
            .setDescriptionLocalizations({
                "ru": 'ОТНЯТЬ ИЛИ ПРИБАВТЬ это кол-во миллисекунд',
                "en-US": 'ADD OR SUBTRACT this amount of Milliseconds',
            })
            .setMinValue(0)
            .setMaxValue(1000000000)
            .setRequired(false)
        )
    )
    //calculate time betweed dates
    .addSubcommand(subcommand =>
        subcommand.setName('from-to')
        .setDescription('Calculate time between two dates')
        .setDescriptionLocalizations({
            "ru": 'Вычислить время между двумя датами',
            "en-US": 'Calculate time between two dates',
        })
        //first date
        .addIntegerOption(option =>
            option.setName('fromyear')
            .setNameLocalizations({
                "ru": 'отгода',
                "en-US": 'fromyear',
            })
            .setDescription('Type first date Year')
            .setDescriptionLocalizations({
                "ru": 'Впишите год первой даты',
                "en-US": 'Type first date Year',
            })
            .setMinValue(1001)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('frommonth')
            .setNameLocalizations({
                "ru": 'отмесяца',
                "en-US": 'frommonth',
            })
            .setDescription('Select first date Month')
            .setDescriptionLocalizations({
                "ru": 'Выберите месяц первой даты',
                "en-US": 'Select first date Month',
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('fromday')
            .setNameLocalizations({
                "ru": 'отдня',
                "en-US": 'fromday',
            })
            .setDescription('Type first date Day')
            .setDescriptionLocalizations({
                "ru": 'Впишите день первой даты',
                "en-US": 'Type first date Day',
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //second date
        .addIntegerOption(option =>
            option.setName('toyear')
            .setNameLocalizations({
                "ru": 'догода',
                "en-US": 'toyear',
            })
            .setDescription('Type second date Year')
            .setDescriptionLocalizations({
                "ru": 'Впишите год второй даты',
                "en-US": 'Type second date Year',
            })
            .setMinValue(1001)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('tomonth')
            .setNameLocalizations({
                "ru": 'домесяца',
                "en-US": 'tomonth',
            })
            .setDescription('Select second date Month')
            .setDescriptionLocalizations({
                "ru": 'Выберите месяц второй даты',
                "en-US": 'Select second date Month',
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('today')
            .setNameLocalizations({
                "ru": 'додня',
                "en-US": 'today',
            })
            .setDescription('Type second date Day')
            .setDescriptionLocalizations({
                "ru": 'Впишите день второй даты',
                "en-US": 'Type second date Day',
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //first time
        .addIntegerOption(option =>
            option.setName('fromhour')
            .setNameLocalizations({
                "ru": 'отчаса',
                "en-US": 'fromhour',
            })
            .setDescription('Type first date Hour')
            .setDescriptionLocalizations({
                "ru": 'Впишите час первой даты',
                "en-US": 'Type first date Hour',
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromminute')
            .setNameLocalizations({
                "ru": 'отминуты',
                "en-US": 'fromminute',
            })
            .setDescription('Type first date Minute')
            .setDescriptionLocalizations({
                "ru": 'Впишите минуту первой даты',
                "en-US": 'Type first date Minute',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromsecond')
            .setNameLocalizations({
                "ru": 'отсекунды',
                "en-US": 'fromsecond',
            })
            .setDescription('Type first date Second')
            .setDescriptionLocalizations({
                "ru": 'Впишите секунду первой даты',
                "en-US": 'Type first date Second',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        //second time
        .addIntegerOption(option =>
            option.setName('tohour')
            .setNameLocalizations({
                "ru": 'дочаса',
                "en-US": 'tohour',
            })
            .setDescription('Type second date Hour')
            .setDescriptionLocalizations({
                "ru": 'Впишите час второй даты',
                "en-US": 'Type second date Hour',
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tominute')
            .setNameLocalizations({
                "ru": 'доминуты',
                "en-US": 'tominute',
            })
            .setDescription('Type second date Minute')
            .setDescriptionLocalizations({
                "ru": 'Впишите минуту второй даты',
                "en-US": 'Type second date Minute',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tosecond')
            .setNameLocalizations({
                "ru": 'досекунды',
                "en-US": 'tosecond',
            })
            .setDescription('Type second date Second')
            .setDescriptionLocalizations({
                "ru": 'Впишите секунду второй даты',
                "en-US": 'Type second date Second',
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
    )
    
module.exports = {
    ping,
    about,
    invite,
    timenow,
    timezonenow,
    timestampint,
    convertint,
    calcint
};