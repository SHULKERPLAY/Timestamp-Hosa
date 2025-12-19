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
        "ru": `${locale.ru.checkping}`,
        "en-US": `${locale.en_us.checkping}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1)

const about = new SlashCommandBuilder()
    .setName('about')
    .setDescription('About this app')
    .setDescriptionLocalizations({
        "ru": `${locale.ru.aboutapp}`,
        "en-US": `${locale.en_us.aboutapp}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1)

const invite = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('Install TimestampHosa app on Server or as personal app!')
    .setDescriptionLocalizations({
        "ru": `${locale.ru.installapp}`,
        "en-US": `${locale.en_us.installapp}`,
    })
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)

const timenow = new SlashCommandBuilder()
    .setName('now')
    .setDescription('Display current time and timestamp')
    .setDescriptionLocalizations({
        "ru": `${locale.ru.descnow}`,
        "en-US": `${locale.en_us.descnow}`,
    })
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addStringOption(option =>
        option.setName('style')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.style}`,
            "en-US": `${locale.en_us.arg.style}`,
        })
        .setDescription('Select style of date output')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.selectstyleformat}`,
            "en-US": `${locale.en_us.selectstyleformat}`,
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
            "ru": `${locale.ru.desctimezoneplus}`,
            "en-US": `${locale.en_us.desctimezoneplus}`,
        })
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
            })
            .setDescription('Select timezone')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selecttimezone}`,
                "en-US": `${locale.en_us.selecttimezone}`,
            })
            .setRequired(true)
            .addChoices(timezonesgmtplus)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('gmtminus')
        .setDescription('Select timezone from GMT -12 to GMT')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.desctimezoneminus}`,
            "en-US": `${locale.en_us.desctimezoneminus}`,
        })
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
            })
            .setDescription('Select timezone')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selecttimezone}`,
                "en-US": `${locale.en_us.selecttimezone}`,
            })
            .setRequired(true)
            .addChoices(timezonesgmtminus)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('keyzones')
        .setDescription('Check time in timezone different from GMT')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.desctimezonekey}`,
            "en-US": `${locale.en_us.desctimezonekey}`,
        })
        .addStringOption(option =>
        option.setName('timezone')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.timezone}`,
            "en-US": `${locale.en_us.arg.timezone}`,
        })
        .setDescription('Select timezone')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.selecttimezone}`,
            "en-US": `${locale.en_us.selecttimezone}`,
        })
        .setRequired(true)
        .addChoices(timezoneskey)
        )
    )
        
const timestampint = new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('Create timestamp to embed it in your message!')
    .setDescriptionLocalizations({
        "ru": `${locale.ru.desctimestamp}`,
        "en-US": `${locale.en_us.desctimestamp}`,
    })
//.setDefaultMemberPermissions(0) блокирует использование всем кроме администраторов. Удалить после закрытого тестирования
    .setDefaultMemberPermissions(0)
    .setIntegrationTypes(0, 1)
    .setContexts(0, 1, 2)
    .addIntegerOption(option =>
        option.setName('year')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.year}`,
            "en-US": `${locale.en_us.arg.year}`,
        })
        .setDescription('Type Year of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampyear}`,
            "en-US": `${locale.en_us.typetimestampyear}`,
        })
        .setMinValue(1901)
        .setMaxValue(2999)
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName('month')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.month}`,
            "en-US": `${locale.en_us.arg.month}`,
        })
        .setDescription('Select Month of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.seltimestampmonth}`,
            "en-US": `${locale.en_us.seltimestampmonth}`,
        })
        .setRequired(true)
        .addChoices(monthsoption)
    )
    .addIntegerOption(option =>
        option.setName('day')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.day}`,
            "en-US": `${locale.en_us.arg.day}`,
        })
        .setDescription('Type Day of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampday}`,
            "en-US": `${locale.en_us.typetimestampday}`,
        })
        .setMinValue(1)
        .setMaxValue(31)
        .setRequired(true)
    )
    .addIntegerOption(option =>
        option.setName('hour')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.hour}`,
            "en-US": `${locale.en_us.arg.hour}`,
        })
        .setDescription('Type Hour of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestamphour}`,
            "en-US": `${locale.en_us.typetimestamphour}`,
        })
        .setMinValue(0)
        .setMaxValue(23)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option.setName('minute')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.minute}`,
            "en-US": `${locale.en_us.arg.minute}`,
        })
        .setDescription('Type Minute of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampminute}`,
            "en-US": `${locale.en_us.typetimestampminute}`,
        })
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(false)
    )
    .addIntegerOption(option =>
        option.setName('second')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.second}`,
            "en-US": `${locale.en_us.arg.second}`,
        })
        .setDescription('Type Second of timestamp you want to do')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.typetimestampsecond}`,
            "en-US": `${locale.en_us.typetimestampsecond}`,
        })
        .setMinValue(0)
        .setMaxValue(59)
        .setRequired(false)
    )
    .addStringOption(option =>
        option.setName('timezone')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.timezone}`,
            "en-US": `${locale.en_us.arg.timezone}`,
        })
        .setDescription('Select timezone of timestamp (Default: GMT+0)')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.seltimestamptimezone}`,
            "en-US": `${locale.en_us.seltimestamptimezone}`,
        })
        .setRequired(false)
        .addChoices(alltimezones)
    )
    .addStringOption(option =>
        option.setName('style')
        .setNameLocalizations({
            "ru": `${locale.ru.arg.style}`,
            "en-US": `${locale.en_us.arg.style}`,
        })
        .setDescription('Select style of date output')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.selectstyleformat}`,
            "en-US": `${locale.en_us.selectstyleformat}`,
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
            "ru": `${locale.ru.descconverttounix}`,
            "en-US": `${locale.en_us.descconverttounix}`,
        })
        .addIntegerOption(option =>
            option.setName('year')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.year}`,
                "en-US": `${locale.en_us.arg.year}`,
            })
            .setDescription('Type Year you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeyear}`,
                "en-US": `${locale.en_us.typeyear}`,
            })
            .setMinValue(1601)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.month}`,
                "en-US": `${locale.en_us.arg.month}`,
            })
            .setDescription('Select Month you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selmonth}`,
                "en-US": `${locale.en_us.selmonth}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('day')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.day}`,
                "en-US": `${locale.en_us.arg.day}`,
            })
            .setDescription('Type Day you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeday}`,
                "en-US": `${locale.en_us.typeday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('displayms')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.displayms}`,
                "en-US": `${locale.en_us.displayms}`,
            })
            .setDescription('Whether or not to return value with milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.returnmilliseconds}`,
                "en-US": `${locale.en_us.returnmilliseconds}`,
            })
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('hour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hour}`,
                "en-US": `${locale.en_us.arg.hour}`,
            })
            .setDescription('Type Hour you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typehour}`,
                "en-US": `${locale.en_us.typehour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minute}`,
                "en-US": `${locale.en_us.arg.minute}`,
            })
            .setDescription('Type Minute you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeminute}`,
                "en-US": `${locale.en_us.typeminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('second')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.second}`,
                "en-US": `${locale.en_us.arg.second}`,
            })
            .setDescription('Type Second you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecond}`,
                "en-US": `${locale.en_us.typesecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.millisecond}`,
                "en-US": `${locale.en_us.arg.millisecond}`,
            })
            .setDescription('Type Millisecond you want')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typemillisecond}`,
                "en-US": `${locale.en_us.typemillisecond}`,
            })
            .setMinValue(0)
            .setMaxValue(999)
            .setRequired(false)
        )
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seldatetimezone}`,
                "en-US": `${locale.en_us.seldatetimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
    )
    .addSubcommand(subcommand =>
        subcommand.setName('todate')
        .setDescription('Convert UNIX date integer to Human Date')
        .setDescriptionLocalizations({
            "ru": `${locale.ru.descconverttodate}`,
            "en-US": `${locale.en_us.descconverttodate}`,
        })
        .addIntegerOption(option =>
            option.setName('unixtime')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.unixtime}`,
                "en-US": `${locale.en_us.arg.unixtime}`,
            })
            .setDescription('Type UNIX Epoch Time Integer')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeunixint}`,
                "en-US": `${locale.en_us.typeunixint}`,
            })
            .setMinValue(-8639999999999)
            .setMaxValue(8639999999999)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('withms')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.withms}`,
                "en-US": `${locale.en_us.arg.withms}`,
            })
            .setDescription('Whether or not to read and return value with milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.withmilliseconds}`,
                "en-US": `${locale.en_us.withmilliseconds}`,
            })
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('timezone')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
            })
            .setDescription('Select timezone for output (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.outputtimezone}`,
                "en-US": `${locale.en_us.outputtimezone}`,
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
            "ru": `${locale.ru.desccalcfromnow}`,
            "en-US": `${locale.en_us.desccalcfromnow}`,
        })
        //Add or subtract
        .addStringOption(option =>
            option.setName('matharg')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.matharg}`,
                "en-US": `${locale.en_us.arg.matharg}`,
            })
            .setDescription('ADD OR SUBTRACT')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsub}`,
                "en-US": `${locale.en_us.addorsub}`,
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
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seltimezone}`,
                "en-US": `${locale.en_us.seltimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
        //arg2
        .addIntegerOption(option =>
            option.setName('years')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.years}`,
                "en-US": `${locale.en_us.arg.years}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubyears}`,
                "en-US": `${locale.en_us.addorsubyears}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('months')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.months}`,
                "en-US": `${locale.en_us.arg.months}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmonths}`,
                "en-US": `${locale.en_us.addorsubmonths}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('weeks')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.weeks}`,
                "en-US": `${locale.en_us.arg.weeks}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Weeks')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubweeks}`,
                "en-US": `${locale.en_us.addorsubweeks}`,
            })
            .setMinValue(0)
            .setMaxValue(5000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('days')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.days}`,
                "en-US": `${locale.en_us.arg.days}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Days')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubdays}`,
                "en-US": `${locale.en_us.addorsubdays}`,
            })
            .setMinValue(0)
            .setMaxValue(50000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('hours')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hours}`,
                "en-US": `${locale.en_us.arg.hours}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Hours')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubhours}`,
                "en-US": `${locale.en_us.addorsubhours}`,
            })
            .setMinValue(0)
            .setMaxValue(240000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minutes}`,
                "en-US": `${locale.en_us.arg.minutes}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Minutes')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubminutes}`,
                "en-US": `${locale.en_us.addorsubminutes}`,
            })
            .setMinValue(0)
            .setMaxValue(1000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('seconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.seconds}`,
                "en-US": `${locale.en_us.arg.seconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Seconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubseconds}`,
                "en-US": `${locale.en_us.addorsubseconds}`,
            })
            .setMinValue(0)
            .setMaxValue(100000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('milliseconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.milliseconds}`,
                "en-US": `${locale.en_us.arg.milliseconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmilliseconds}`,
                "en-US": `${locale.en_us.addorsubmilliseconds}`,
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
            "ru": `${locale.ru.desccalcfromdate}`,
            "en-US": `${locale.en_us.desccalcfromdate}`,
        })
        //arg1
        .addIntegerOption(option =>
            option.setName('year')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.year}`,
                "en-US": `${locale.en_us.arg.year}`,
            })
            .setDescription('Type Year to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeyeartocountfrom}`,
                "en-US": `${locale.en_us.typeyeartocountfrom}`,
            })
            .setMinValue(1601)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('month')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.month}`,
                "en-US": `${locale.en_us.arg.month}`,
            })
            .setDescription('Select Month to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selmonthtocountfrom}`,
                "en-US": `${locale.en_us.selmonthtocountfrom}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('day')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.day}`,
                "en-US": `${locale.en_us.arg.day}`,
            })
            .setDescription('Type Day to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typedaytocountfrom}`,
                "en-US": `${locale.en_us.typedaytocountfrom}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //arg1
        .addIntegerOption(option =>
            option.setName('hour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hour}`,
                "en-US": `${locale.en_us.arg.hour}`,
            })
            .setDescription('Type Hour to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typehourtocountfrom}`,
                "en-US": `${locale.en_us.typehourtocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('minute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minute}`,
                "en-US": `${locale.en_us.arg.minute}`,
            })
            .setDescription('Type Minute to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typeminutetocountfrom}`,
                "en-US": `${locale.en_us.typeminutetocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('second')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.second}`,
                "en-US": `${locale.en_us.arg.second}`,
            })
            .setDescription('Type Second to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondtocountfrom}`,
                "en-US": `${locale.en_us.typesecondtocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(true)
        )
        .addIntegerOption(option =>
            option.setName('millisecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.millisecond}`,
                "en-US": `${locale.en_us.arg.millisecond}`,
            })
            .setDescription('Type Millisecond to calculate from')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typemillisecondtocountfrom}`,
                "en-US": `${locale.en_us.typemillisecondtocountfrom}`,
            })
            .setMinValue(0)
            .setMaxValue(999)
            .setRequired(true)
        )
        //Add or subtract
        .addStringOption(option =>
            option.setName('matharg')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.matharg}`,
                "en-US": `${locale.en_us.arg.matharg}`,
            })
            .setDescription('ADD OR SUBTRACT')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsub}`,
                "en-US": `${locale.en_us.addorsub}`,
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
                "ru": `${locale.ru.arg.timezone}`,
                "en-US": `${locale.en_us.arg.timezone}`,
            })
            .setDescription('Select timezone of input (Default: GMT+0)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.seltimezone}`,
                "en-US": `${locale.en_us.seltimezone}`,
            })
            .setRequired(false)
            .addChoices(alltimezones)
        )
        //arg2
        .addIntegerOption(option =>
            option.setName('years')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.years}`,
                "en-US": `${locale.en_us.arg.years}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubyears}`,
                "en-US": `${locale.en_us.addorsubyears}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('months')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.months}`,
                "en-US": `${locale.en_us.arg.months}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmonths}`,
                "en-US": `${locale.en_us.addorsubmonths}`,
            })
            .setMinValue(0)
            .setMaxValue(1000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('weeks')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.weeks}`,
                "en-US": `${locale.en_us.arg.weeks}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Weeks')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubweeks}`,
                "en-US": `${locale.en_us.addorsubweeks}`,
            })
            .setMinValue(0)
            .setMaxValue(5000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('days')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.days}`,
                "en-US": `${locale.en_us.arg.days}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Days')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubdays}`,
                "en-US": `${locale.en_us.addorsubdays}`,
            })
            .setMinValue(0)
            .setMaxValue(50000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('hours')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.hours}`,
                "en-US": `${locale.en_us.arg.hours}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Hours')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubhours}`,
                "en-US": `${locale.en_us.addorsubhours}`,
            })
            .setMinValue(0)
            .setMaxValue(240000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('minutes')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.minutes}`,
                "en-US": `${locale.en_us.arg.minutes}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Minutes')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubminutes}`,
                "en-US": `${locale.en_us.addorsubminutes}`,
            })
            .setMinValue(0)
            .setMaxValue(1000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('seconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.seconds}`,
                "en-US": `${locale.en_us.arg.seconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Seconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubseconds}`,
                "en-US": `${locale.en_us.addorsubseconds}`,
            })
            .setMinValue(0)
            .setMaxValue(100000000)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('milliseconds')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.milliseconds}`,
                "en-US": `${locale.en_us.arg.milliseconds}`,
            })
            .setDescription('ADD OR SUBTRACT this amount of Milliseconds')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.addorsubmilliseconds}`,
                "en-US": `${locale.en_us.addorsubmilliseconds}`,
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
            "ru": `${locale.ru.desccalcfromto}`,
            "en-US": `${locale.en_us.desccalcfromto}`,
        })
        //first date
        .addIntegerOption(option =>
            option.setName('fromyear')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromyear}`,
                "en-US": `${locale.en_us.arg.fromyear}`,
            })
            .setDescription('Type first date Year')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstyear}`,
                "en-US": `${locale.en_us.typefirstyear}`,
            })
            .setMinValue(1001)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('frommonth')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.frommonth}`,
                "en-US": `${locale.en_us.arg.frommonth}`,
            })
            .setDescription('Select first date Month')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selfirstmonth}`,
                "en-US": `${locale.en_us.selfirstmonth}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('fromday')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromday}`,
                "en-US": `${locale.en_us.arg.fromday}`,
            })
            .setDescription('Type first date Day')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstday}`,
                "en-US": `${locale.en_us.typefirstday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //second date
        .addIntegerOption(option =>
            option.setName('toyear')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.toyear}`,
                "en-US": `${locale.en_us.arg.toyear}`,
            })
            .setDescription('Type second date Year')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondyear}`,
                "en-US": `${locale.en_us.typesecondyear}`,
            })
            .setMinValue(1001)
            .setMaxValue(3333)
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName('tomonth')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tomonth}`,
                "en-US": `${locale.en_us.arg.tomonth}`,
            })
            .setDescription('Select second date Month')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.selsecondmonth}`,
                "en-US": `${locale.en_us.selsecondmonth}`,
            })
            .setRequired(true)
            .addChoices(monthsoption)
        )
        .addIntegerOption(option =>
            option.setName('today')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.today}`,
                "en-US": `${locale.en_us.arg.today}`,
            })
            .setDescription('Type second date Day')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondday}`,
                "en-US": `${locale.en_us.typesecondday}`,
            })
            .setMinValue(1)
            .setMaxValue(31)
            .setRequired(true)
        )
        //first time
        .addIntegerOption(option =>
            option.setName('fromhour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromhour}`,
                "en-US": `${locale.en_us.arg.fromhour}`,
            })
            .setDescription('Type first date Hour')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirsthour}`,
                "en-US": `${locale.en_us.typefirsthour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromminute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromminute}`,
                "en-US": `${locale.en_us.arg.fromminute}`,
            })
            .setDescription('Type first date Minute')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstminute}`,
                "en-US": `${locale.en_us.typefirstminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('fromsecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.fromsecond}`,
                "en-US": `${locale.en_us.arg.fromsecond}`,
            })
            .setDescription('Type first date Second')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typefirstsecond}`,
                "en-US": `${locale.en_us.typefirstsecond}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        //second time
        .addIntegerOption(option =>
            option.setName('tohour')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tohour}`,
                "en-US": `${locale.en_us.arg.tohour}`,
            })
            .setDescription('Type second date Hour')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondhour}`,
                "en-US": `${locale.en_us.typesecondhour}`,
            })
            .setMinValue(0)
            .setMaxValue(23)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tominute')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tominute}`,
                "en-US": `${locale.en_us.arg.tominute}`,
            })
            .setDescription('Type second date Minute')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondminute}`,
                "en-US": `${locale.en_us.typesecondminute}`,
            })
            .setMinValue(0)
            .setMaxValue(59)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('tosecond')
            .setNameLocalizations({
                "ru": `${locale.ru.arg.tosecond}`,
                "en-US": `${locale.en_us.arg.tosecond}`,
            })
            .setDescription('Type second date Second')
            .setDescriptionLocalizations({
                "ru": `${locale.ru.typesecondsecond}`,
                "en-US": `${locale.en_us.typesecondsecond}`,
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