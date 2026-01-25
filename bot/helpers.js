const { timestampstyles, monthsoption, alltimezones, mathargs } = require('./constants.js');
const { getLoc } = require('./functions.js');

//Helpers
//.setDefaultMemberPermissions(0) restricts usage to admins only. 
//.setContexts(0, 1, 2) 0 - Can be used in server channels, 1 - Can be used in DM with app's bot user, 2 - Can be used in private channels without inviting the bot
//.setIntegrationTypes(0, 1) - 0 - Can be used with bot installed on server, 1 - can be used with bot installed as User App
const setAvailable = (builder) => builder.setIntegrationTypes(0, 1).setContexts(0, 1, 2);

//decide if reply be ephemeral (publicreply: false / true)
const addPublicReply = () => (option) => {
    option.setName('publicreply')
    .setDescription('Make the result visible to everyone in the chat')
    .setDescriptionLocalizations(getLoc('publicreply'))
    .setRequired(false);
    return option;
};

//Year option
//Undefined values will be filled with default. addYearOption('desc', 'descarg', undefined, undefined, undefined) will be ('desc', 'descarg', 1901, 2999, false)
const addYearOption = (description = ' ', descriptionKey = ' ', min = 1901, max = 2999, isrequired = false, name = 'year', nameKey = 'arg.year') => (option) => {
    option.setName(name)
    .setNameLocalizations(getLoc(nameKey))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Month option
const addMonthOption = (description = ' ', descriptionKey = ' ', isrequired = false, name = 'month', nameKey = 'arg.month') => (option) => {
    option.setName(name)
    .setNameLocalizations(getLoc(nameKey))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setRequired(isrequired)
    .addChoices(monthsoption);
    return option;
};

//Day option
const addDayOption = (description = ' ', descriptionKey = ' ', isrequired = false, name = 'day', nameKey = 'arg.day') => (option) => {
    option.setName(name)
    .setNameLocalizations(getLoc(nameKey))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(1)
    .setMaxValue(31)
    .setRequired(isrequired);
    return option;
};

//Hour option
const addHourOption = (description = ' ', descriptionKey = ' ', isrequired = false, name = 'hour', nameKey = 'arg.hour') => (option) => {
    option.setName(name)
    .setNameLocalizations(getLoc(nameKey))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(0)
    .setMaxValue(23)
    .setRequired(isrequired);
    return option;
};
//Minute option
const addMinuteOption = (description = ' ', descriptionKey = ' ', isrequired = false, name = 'minute', nameKey = 'arg.minute') => (option) => {
    option.setName(name)
    .setNameLocalizations(getLoc(nameKey))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(0)
    .setMaxValue(59)
    .setRequired(isrequired);
    return option;
};

//Second option
const addSecondOption = (description = ' ', descriptionKey = ' ', isrequired = false, name = 'second', nameKey = 'arg.second') => (option) => {
    option.setName(name)
    .setNameLocalizations(getLoc(nameKey))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(0)
    .setMaxValue(59)
    .setRequired(isrequired);
    return option;
};
//millisecond option
const addMillisecondOption = (description = ' ', descriptionKey = ' ', isrequired = false) => (option) => {
    option.setName('millisecond')
    .setNameLocalizations(getLoc('arg.millisecond'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(0)
    .setMaxValue(999)
    .setRequired(isrequired);
    return option;
};

//Years option
const addYearsOption = (description = ' ', descriptionKey = ' ', min = 0, max = 1000, isrequired = false) => (option) => {
    option.setName('years')
    .setNameLocalizations(getLoc('arg.years'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Months option
const addMonthsOption = (description = ' ', descriptionKey = ' ', min = 0, max = 1000, isrequired = false) => (option) => {
    option.setName('months')
    .setNameLocalizations(getLoc('arg.months'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Weeks option
const addWeeksOption = (description = ' ', descriptionKey = ' ', min = 0, max = 5000, isrequired = false) => (option) => {
    option.setName('weeks')
    .setNameLocalizations(getLoc('arg.weeks'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(false);
    return option;
};

//Days option
const addDaysOption = (description = ' ', descriptionKey = ' ', min = 0, max = 50000, isrequired = false) => (option) => {
    option.setName('days')
    .setNameLocalizations(getLoc('arg.days'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Hours option
const addHoursOption = (description = ' ', descriptionKey = ' ', min = 0, max = 240000, isrequired = false) => (option) => {
    option.setName('hours')
    .setNameLocalizations(getLoc('arg.hours'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Minutes option
const addMinutesOption = (description = ' ', descriptionKey = ' ', min = 0, max = 240000, isrequired = false) => (option) => {
    option.setName('minutes')
    .setNameLocalizations(getLoc('arg.minutes'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Seconds option
const addSecondsOption = (description = ' ', descriptionKey = ' ', min = 0, max = 100000000, isrequired = false) => (option) => {
    option.setName('seconds')
    .setNameLocalizations(getLoc('arg.seconds'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};

//Milliseconds option
const addMillisecondsOption = (description = ' ', descriptionKey = ' ', min = 0, max = 100000000, isrequired = false) => (option) => {
    option.setName('milliseconds')
    .setNameLocalizations(getLoc('arg.milliseconds'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setMinValue(min)
    .setMaxValue(max)
    .setRequired(isrequired);
    return option;
};
//Timezone option
const addTimezoneOption = (description = ' ', descriptionKey = ' ', isrequired = false, choices = alltimezones) => (option) => {
    option.setName('timezone')
    .setNameLocalizations(getLoc('arg.timezone'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setRequired(isrequired)
    .addChoices(choices);
    return option;
};

//Style option
const addStyleOption = (description = ' ', descriptionKey = ' ', isrequired = false) => (option) => {
    option.setName('style')
    .setNameLocalizations(getLoc('arg.style'))
    .setDescription(description)
    .setDescriptionLocalizations(getLoc(descriptionKey))
    .setRequired(isrequired)
    .addChoices(timestampstyles);
    return option;
};

//Add or Subtract option
const addMathargOption = (isrequired = true) => (option) => {
    option.setName('matharg')
    .setNameLocalizations(getLoc('arg.matharg'))
    .setDescription('ADD OR SUBTRACT')
    .setDescriptionLocalizations(getLoc('addorsub'))
    .setRequired(isrequired)
    .addChoices(mathargs);
    return option;
};

//export
module.exports = { setAvailable, addPublicReply, addYearOption, addMonthOption, addDayOption, addHourOption, addMinuteOption, addSecondOption, addMillisecondOption, addYearsOption, addMonthsOption, addWeeksOption, addDaysOption, addHoursOption, addMinutesOption, addSecondsOption, addMillisecondsOption, addTimezoneOption, addStyleOption, addMathargOption };