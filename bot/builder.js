const { SlashCommandBuilder } = require('discord.js');
const { timestampstyles, timezonesgmtminus, timezonesgmtplus, timezoneskey, monthsoption, alltimezones, mathargs, dicetypes } = require('./constants.js');
const { getLoc } = require('./functions.js');
const { setAvailable, addPublicReply, addYearOption, addMonthOption, addDayOption, addHourOption, addMinuteOption, addSecondOption, addMillisecondOption, addYearsOption, addMonthsOption, addWeeksOption, addDaysOption, addHoursOption, addMinutesOption, addSecondsOption, addMillisecondsOption, addTimezoneOption, addStyleOption, addMathargOption } = require('./helpers.js');

const hosa = {}; //Init commands object

//CommandBuilder
hosa.ping = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('🏓 Check Application response time')
    .setDescriptionLocalizations(getLoc('checkping', '🏓 '))
    setAvailable(hosa.ping)

hosa.about = new SlashCommandBuilder()
    .setName('about')
    .setDescription('📙 About this app')
    .setDescriptionLocalizations(getLoc('aboutapp', '📙 '))
    setAvailable(hosa.about)

hosa.invite = new SlashCommandBuilder()
    .setName('invite')
    .setDescription('🔗 Install TimestampHosa app on Server or as personal app!')
    .setDescriptionLocalizations(getLoc('installapp', '🔗 '))
    setAvailable(hosa.invite)

hosa.timenow = new SlashCommandBuilder()
    .setName('now')
    .setDescription('⏱ Display current time and timestamp')
    .setDescriptionLocalizations(getLoc('descnow', '⏱ '))
    setAvailable(hosa.timenow)
    .addStringOption(addStyleOption('Select style of date output', 'selectstyleformat', false))
    .addBooleanOption(addPublicReply())
        
hosa.timezonenow = new SlashCommandBuilder()
    .setName('timezone')
    .setDescription('🕒 Display current time in selected timezone')
    setAvailable(hosa.timezonenow)
hosa.timezonenow.addSubcommand(subcommand =>
    subcommand.setName('gmtplus')
    .setDescription('🕒 Select timezone from GMT to GMT +14')
    .setDescriptionLocalizations(getLoc('desctimezoneplus', '🕒 '))
    .addStringOption(addTimezoneOption('Select timezone', 'selecttimezone', true, timezonesgmtplus))
    .addBooleanOption(addPublicReply())
)
hosa.timezonenow.addSubcommand(subcommand =>
        subcommand.setName('gmtminus')
        .setDescription('🕒 Select timezone from GMT -12 to GMT')
        .setDescriptionLocalizations(getLoc('desctimezoneminus', '🕒 '))
        .addStringOption(addTimezoneOption('Select timezone', 'selecttimezone', true, timezonesgmtminus))
        .addBooleanOption(addPublicReply())
    )
hosa.timezonenow.addSubcommand(subcommand =>
        subcommand.setName('keyzones')
        .setDescription('🕒 Check time in timezone different from GMT')
        .setDescriptionLocalizations(getLoc('desctimezonekey', '🕒 '))
        .addStringOption(addTimezoneOption('Select timezone', 'selecttimezone', true, timezoneskey))
        .addBooleanOption(addPublicReply())
    )
        
hosa.timestampint = new SlashCommandBuilder()
    .setName('timestamp')
    .setDescription('⏳ Create timestamp to embed it in your message!')
    .setDescriptionLocalizations(getLoc('desctimestamp', '⏳ '))
    setAvailable(hosa.timestampint)
    .addIntegerOption(addYearOption('Type Year of timestamp you want to do', 'typetimestampyear', 1901, 2999, true))
    .addStringOption(addMonthOption('Select Month of timestamp you want to do', 'seltimestampmonth', true))
    .addIntegerOption(addDayOption('Type Day of timestamp you want to do', 'typetimestampday', true))
    .addIntegerOption(addHourOption('Type Hour of timestamp you want to do', 'typetimestamphour', false))
    .addIntegerOption(addMinuteOption('Type Minute of timestamp you want to do', 'typetimestampminute', false))
    .addIntegerOption(addSecondOption('Type Second of timestamp you want to do', 'typetimestampsecond', false))
    .addStringOption(addTimezoneOption('Select timezone of timestamp (Default: GMT+0)', 'seltimestamptimezone', false, alltimezones))
    .addStringOption(addStyleOption('Select style of date output', 'selectstyleformat', false))
    .addBooleanOption(addPublicReply())
    
hosa.convertint = new SlashCommandBuilder()
    .setName('convert')
    .setDescription('🔄 Convert UNIX string to Date and backwards')
    setAvailable(hosa.convertint)
hosa.convertint.addSubcommand(subcommand =>
        subcommand.setName('tounix')
        .setDescription('🔄 Convert selected date to UNIX date integer')
        .setDescriptionLocalizations(getLoc('descconverttounix', '🔄 '))
        .addIntegerOption(addYearOption('Type Year you want', 'typeyear', 1601, 3333, true))
        .addStringOption(addMonthOption('Select Month you want', 'selmonth', true))
        .addIntegerOption(addDayOption('Type Day you want', 'typeday', true))
        .addBooleanOption(option =>
            option.setName('displayms')
            .setNameLocalizations(getLoc('arg.displayms'))
            .setDescription('Whether or not to return value with milliseconds')
            .setDescriptionLocalizations(getLoc('returnmilliseconds'))
            .setRequired(true)
        )
        .addIntegerOption(addHourOption('Type Hour you want', 'typehour', false))
        .addIntegerOption(addMinuteOption('Type Minute you want', 'typeminute', false))
        .addIntegerOption(addSecondOption('Type Second you want', 'typesecond', false))
        .addIntegerOption(addMillisecondOption('Type Millisecond you want', 'typemillisecond', false))
        .addStringOption(addTimezoneOption('Select timezone of input (Default: GMT+0)', 'seldatetimezone', false, alltimezones))
    )
hosa.convertint.addSubcommand(subcommand =>
        subcommand.setName('todate')
        .setDescription('🔄 Convert UNIX date integer to Human Date')
        .setDescriptionLocalizations(getLoc('descconverttodate', '🔄 '))
        .addIntegerOption(option =>
            option.setName('unixtime')
            .setNameLocalizations(getLoc('arg.unixtime'))
            .setDescription('Type UNIX Epoch Time Integer')
            .setDescriptionLocalizations(getLoc('typeunixtime'))
            .setMinValue(-8639999999999)
            .setMaxValue(8639999999999)
            .setRequired(true)
        )
        .addBooleanOption(option =>
            option.setName('withms')
            .setNameLocalizations(getLoc('arg.withms'))
            .setDescription('Whether or not to read and return value with milliseconds')
            .setDescriptionLocalizations(getLoc('readwithmilliseconds'))
            .setRequired(true)
        )
        .addStringOption(addTimezoneOption('Select timezone for output (Default: GMT+0)', 'outputtimezone', false, alltimezones))
    )

hosa.calcint = new SlashCommandBuilder()
    .setName('calc')
    .setDescription('🧮 Time and Date Calculator')
    setAvailable(hosa.calcint)
hosa.calcint.addSubcommand(subcommand =>
        subcommand.setName('fromnow')
        .setDescription('🧮 Add or subtract time from the current time')
        .setDescriptionLocalizations(getLoc('desccalcfromnow', '🧮 '))
        //Add or subtract
        .addStringOption(addMathargOption(true))
        //offset to timezone
        .addStringOption(addTimezoneOption('Select timezone of input (Default: GMT+0)', 'seltimezone', false, alltimezones))
        //arg2
        .addIntegerOption(addYearsOption('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)', 'addorsubyears', 0, 1000, false))
        .addIntegerOption(addMonthsOption('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)', 'addorsubmonths', 0, 1000, false))
        .addIntegerOption(addWeeksOption('ADD OR SUBTRACT this amount of Weeks', 'addorsubweeks', 0, 5000, false))
        .addIntegerOption(addDaysOption('ADD OR SUBTRACT this amount of Days', 'addorsubdays', 0, 50000, false))
        .addIntegerOption(addHoursOption('ADD OR SUBTRACT this amount of Hours', 'addorsubhours', 0, 240000, false))
        .addIntegerOption(addMinutesOption('ADD OR SUBTRACT this amount of Minutes', 'addorsubminutes', 0, 1000000, false))
        .addIntegerOption(addSecondsOption('ADD OR SUBTRACT this amount of Seconds', 'addorsubseconds', 0, 100000000, false))
        .addIntegerOption(addMillisecondsOption('ADD OR SUBTRACT this amount of Milliseconds', 'addorsubmilliseconds', 0, 1000000000, false))
        .addBooleanOption(addPublicReply())
    )
    //Calc with custom first arg
hosa.calcint.addSubcommand(subcommand =>
        subcommand.setName('fromdate')
        .setDescription('🧮 Add or subtract time from the specified date')
        .setDescriptionLocalizations(getLoc('desccalcfromdate', '🧮 '))
        //arg1
        .addIntegerOption(addYearOption('Type Year to calculate from', 'typeyeartocountfrom', 1601, 3333, true))
        .addStringOption(addMonthOption('Select Month to calculate from', 'selmonthtocountfrom', true))
        .addIntegerOption(addDayOption('Type Day to calculate from', 'typedaytocountfrom', true))
        .addIntegerOption(addHourOption('Type Hour to calculate from', 'typehourtocountfrom', true))
        .addIntegerOption(addMinuteOption('Type Minute to calculate from', 'typeminutetocountfrom', true))
        .addIntegerOption(addSecondOption('Type Second to calculate from', 'typesecondtocountfrom', true))
        .addIntegerOption(addMillisecondOption('Type Millisecond to calculate from', 'typemillisecondtocountfrom', true))
        //Add or subtract
        .addStringOption(addMathargOption(true))
        //timezone of arg1
        .addStringOption(addTimezoneOption('Select timezone of input (Default: GMT+0)', 'seltimezone', false, alltimezones))
        //arg2
        .addIntegerOption(addYearsOption('ADD OR SUBTRACT this amount of years (Inaccurate. 365 days)', 'addorsubyears', 0, 1000, false))
        .addIntegerOption(addMonthsOption('ADD OR SUBTRACT this amount of months (Inaccurate. 30 days)', 'addorsubmonths', 0, 1000, false))
        .addIntegerOption(addWeeksOption('ADD OR SUBTRACT this amount of Weeks', 'addorsubweeks', 0, 5000, false))
        .addIntegerOption(addDaysOption('ADD OR SUBTRACT this amount of Days', 'addorsubdays', 0, 50000, false))
        .addIntegerOption(addHoursOption('ADD OR SUBTRACT this amount of Hours', 'addorsubhours', 0, 240000, false))
        .addIntegerOption(addMinutesOption('ADD OR SUBTRACT this amount of Minutes', 'addorsubminutes', 0, 1000000, false))
        .addIntegerOption(addSecondsOption('ADD OR SUBTRACT this amount of Seconds', 'addorsubseconds', 0, 100000000, false))
        .addIntegerOption(addMillisecondsOption('ADD OR SUBTRACT this amount of Milliseconds', 'addorsubmilliseconds', 0, 1000000000, false))
        .addBooleanOption(addPublicReply())
    )
    //calculate time between dates
hosa.calcint.addSubcommand(subcommand =>
        subcommand.setName('from-to')
        .setDescription('🧮 Calculate time between two dates')
        .setDescriptionLocalizations(getLoc('desccalcfromto', '🧮 '))
        //first date
        .addIntegerOption(addYearOption('Type first date Year', 'typefirstyear', 1001, 3333, true, 'fromyear', 'arg.fromyear'))
        .addStringOption(addMonthOption('Select first date Month', 'selfirstmonth', true, 'frommonth', 'arg.frommonth'))
        .addIntegerOption(addDayOption('Type first date Day', 'typefirstday', true, 'fromday', 'arg.fromday'))
        //second date
        .addIntegerOption(addYearOption('Type second date Year', 'typesecondyear', 1001, 3333, true, 'toyear', 'arg.toyear'))
        .addStringOption(addMonthOption('Select second date Month', 'selsecondmonth', true, 'tomonth', 'arg.tomonth'))
        .addIntegerOption(addDayOption('Type second date Day', 'typesecondday', true, 'today', 'arg.today'))
        //first time
        .addIntegerOption(addHourOption('Type first date Hour', 'typefirsthour', false, 'fromhour', 'arg.fromhour'))
        .addIntegerOption(addMinuteOption('Type first date Minute', 'typefirstminute', false, 'fromminute', 'arg.fromminute'))
        .addIntegerOption(addSecondOption('Type first date Second', 'typefirstsecond', false, 'fromsecond', 'arg.fromsecond'))
        //second time
        .addIntegerOption(addHourOption('Type second date Hour', 'typesecondhour', false, 'tohour', 'arg.tohour'))
        .addIntegerOption(addMinuteOption('Type second date Minute', 'typesecondminute', false, 'tominute', 'arg.tominute'))
        .addIntegerOption(addSecondOption('Type second date Second', 'typesecondsecond', false, 'tosecond', 'arg.tosecond'))
        .addBooleanOption(addPublicReply())
    )

hosa.randomint = new SlashCommandBuilder()
    .setName('random')
    .setDescription('Get fully or custom range random Date and Time or Integer')
    setAvailable(hosa.randomint)
hosa.randomint.addSubcommand(subcommand =>
        subcommand.setName('date')
        .setDescription('🎲 Get random Date and Time with custom range support. First date: Min, Second date: Max')
        .setDescriptionLocalizations(getLoc('descranddate', '🎲 '))
        //first date
        .addIntegerOption(addYearOption('Type first date Year', 'typefirstyear', 1001, 3939, true, 'fromyear', 'arg.fromyear'))
        //second date
        .addIntegerOption(addYearOption('Type second date Year', 'typesecondyear', 1001, 3939, true, 'toyear', 'arg.toyear'))
        //first date
        .addStringOption(addMonthOption('Select first date Month', 'selfirstmonth', false, 'frommonth', 'arg.frommonth'))
        .addIntegerOption(addDayOption('Type first date Day', 'typefirstday', false, 'fromday', 'arg.fromday'))
        .addIntegerOption(addHourOption('Type first date Hour', 'typefirsthour', false, 'fromhour', 'arg.fromhour'))
        .addIntegerOption(addMinuteOption('Type first date Minute', 'typefirstminute', false, 'fromminute', 'arg.fromminute'))
        .addIntegerOption(addSecondOption('Type first date Second', 'typefirstsecond', false, 'fromsecond', 'arg.fromsecond'))
        //second date
        .addStringOption(addMonthOption('Select second date Month', 'selsecondmonth', false, 'tomonth', 'arg.tomonth'))
        .addIntegerOption(addDayOption('Type second date Day', 'typesecondday', false, 'today', 'arg.today'))
        .addIntegerOption(addHourOption('Type second date Hour', 'typesecondhour', false, 'tohour', 'arg.tohour'))
        .addIntegerOption(addMinuteOption('Type second date Minute', 'typesecondminute', false, 'tominute', 'arg.tominute'))
        .addIntegerOption(addSecondOption('Type second date Second', 'typesecondsecond', false, 'tosecond', 'arg.tosecond'))
        .addBooleanOption(addPublicReply())
    )
hosa.randomint.addSubcommand(subcommand =>
        subcommand.setName('integer')
        .setDescription('🎲 Get random integer with custom range support')
        .setDescriptionLocalizations(getLoc('descrandinteger', '🎲 '))
        .addIntegerOption(option =>
            option.setName('min')
            .setDescription('Type minimum possible integer')
            .setDescriptionLocalizations(getLoc('typemininteger'))
            .setMinValue(-999999999999999)
            .setMaxValue(999999999999999)
            .setRequired(false)
        )
        .addIntegerOption(option =>
            option.setName('max')
            .setDescription('Type maximum possible integer')
            .setDescriptionLocalizations(getLoc('typemaxinteger'))
            .setMinValue(-999999999999999)
            .setMaxValue(999999999999999)
            .setRequired(false)
        )
        .addBooleanOption(addPublicReply())
    )
hosa.randomint.addSubcommand(subcommand =>
        subcommand.setName('dice')
        .setDescription('🎲 Throw a Dice! Also you can choose the dice! (Default: 1 ... 6)')
        .setDescriptionLocalizations(getLoc('descranddice', '🎲 '))
        .addStringOption(option =>
            option.setName('dicetype')
            .setDescription('Select type of dice')
            .setDescriptionLocalizations(getLoc('seldicetype'))
            .setRequired(false)
            .addChoices(dicetypes)
        )
        .addBooleanOption(addPublicReply())
    )

module.exports = { hosa };