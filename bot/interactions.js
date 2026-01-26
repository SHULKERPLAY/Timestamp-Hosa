const { convertGmtToSeconds, getRandomInt, getDateInt, loadlocale, getLoc, lunar } = require('./functions.js');

//init localization
locale = loadlocale();

function tshosa() {};
tshosa.ping = async function(interaction, client, lang) {
    //Counting latency
    const latency = Date.now() - interaction.createdTimestamp;
    const apiLatency = Math.round(client.ws.ping);

    let replycontent;
    if (lang) {
        //Building response
        replycontent = `:ping_pong: *${lang.pong}!* ${lang.latency} ${latency} ${lang.milliseconds}! ${lang.apilatency} ${apiLatency} ${lang.milliseconds}.`;
    } else {
        //if locale not supported
        replycontent = `:ping_pong: *Pong!* Latency ${latency} ms! API Latency ${apiLatency} ms.`;
    }
    await lunar.reply(interaction, replycontent, true);
};

tshosa.about = async function(interaction, lang) {
    //Building response
    let replycontent;
    if (lang) {
        replycontent = `${lang.aboutcmd} \n:sparkles: ${lang.coreversion} ${corever} \n\n ${lang.aboutanounce}`;
    } else {
        replycontent = `:alarm_clock: Create timestamps for your messages with `/timestamp`, calculate dates with `/calc`! Check the full command list for more features! \n:knot: Noticed a localization error or a bug? Have a feature request? [Visit our GitHub](https://github.com/SHULKERPLAY/Timestamp-Hosa)! \n :gift_heart: [Support Server](https://discord.gg/e2HcXrQ) - <@459657842895486977> \n\n[Terms of Service](https://lunarcreators.ru/timestamp-hosa/tos/) and [Privacy Policy](https://lunarcreators.ru/timestamp-hosa/privacy/) \n:sparkles: Core version: ${corever} \n\n${locale.en_us.aboutanounce}`;
    }
    await lunar.reply(interaction, replycontent, true);
};

tshosa.about = async function(interaction, lang) {
    //Building response
    let replycontent;
    if (lang) {
        replycontent = `${lang.aboutcmd} \n:sparkles: ${lang.coreversion} ${corever} \n\n ${lang.aboutanounce}`;
    } else {
        replycontent = `:alarm_clock: Create timestamps for your messages with `/timestamp`, calculate dates with `/calc`! Check the full command list for more features! \n:knot: Noticed a localization error or a bug? Have a feature request? [Visit our GitHub](https://github.com/SHULKERPLAY/Timestamp-Hosa)! \n :gift_heart: [Support Server](https://discord.gg/e2HcXrQ) - <@459657842895486977> \n\n[Terms of Service](https://lunarcreators.ru/timestamp-hosa/tos/) and [Privacy Policy](https://lunarcreators.ru/timestamp-hosa/privacy/) \n:sparkles: Core version: ${corever} \n\n${locale.en_us.aboutanounce}`;
    }
    await lunar.reply(interaction, replycontent, true);
};

tshosa.invite = async function(interaction, lang) {
    //Building response
    let replycontent;
    if (lang) {
        replycontent = `${lang.invitecmd}`;
    } else {
        replycontent = `:gift_heart: Add the app to your profile or server through the [Discord App Directory](https://discord.com/discovery/applications/1449839745910964254)! \n*By installing it to your profile, you can use the app's commands in any of your chats* \n\n[Or invite the bot to your server directly](https://discord.com/oauth2/authorize?client_id=1449839745910964254&permissions=277025410048&integration_type=0&scope=bot)`;
    }
    await lunar.reply(interaction, replycontent, true);
};

tshosa.now = async function(interaction, lang, publicreplylog) {
    //Reply with current timestamp
    const nowtimestamp = Math.floor(Date.now() / 1000)
    const style = interaction.options.getString('style');
    const styles = {
        'ShortT': ':t', 'MediumT': ':T', 'ShortD': ':d', 
        'LongD': ':D', 'LongDshortT': ':f', 'FullDshortT': ':F',
        'ShortDshortT': ':s','ShortDmediumT': ':S', 'Relative': ':R'
    };
    // Using '' if style is null or undefined
    const nowstyle = styles[style] ?? '';
    console.log(`Tstamp created (/now) ${publicreplylog}`)

    //Building response
    let replycontent;
    if (lang) {
        replycontent = `${lang.now}: <t:${nowtimestamp}${nowstyle}> \n${lang.timestamp}: \`<t:${nowtimestamp}${nowstyle}>\``;
    } else {
        replycontent = `Now: <t:${nowtimestamp}${nowstyle}> \nTimestamp: \`<t:${nowtimestamp}${nowstyle}>\``;
    }
    await lunar.editReply(interaction, replycontent);
};

tshosa.timezone = async function(interaction, lang, publicreplylog) {
    const tztimestamp = Date.now()
    const tzdate = new Date(tztimestamp)
    //get timezone string from options and reply with user locale
    const timezonesel = interaction.options.getString('timezone') ?? 'GMT';
    let timelocale;
    if (supportedtimelocale.includes(interaction.locale)) {
        timelocale = interaction.locale
    } else { timelocale = 'en-UK' }
    console.log(`Tzone checked Etc/${timezonesel} ${publicreplylog}`)
    const result = tzdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long' })

    //Building response
    let replycontent;
    if (lang) {
        replycontent = `:alarm_clock: ${lang.nowintz}: **__${result}__** \n*${lang.localtime}: <t:${Math.floor(tztimestamp / 1000)}:F>*`;
    } else {
        replycontent = `:alarm_clock: Now in this timezone: **__${result}__** \n*Local Time: <t:${Math.floor(tztimestamp / 1000)}:F>*`;
    }
    await lunar.editReply(interaction, replycontent);
};

tshosa.timestamp = async function(interaction, lang, publicreplylog) {
    const tsyear = interaction.options.getInteger('year');
    const tsmonth = interaction.options.getString('month');
    const tsday = interaction.options.getInteger('day');
    const tshour = interaction.options.getInteger('hour');
    const tsmin = interaction.options.getInteger('minute');
    const tssec = interaction.options.getInteger('second');
    const style = interaction.options.getString('style');
    //Offset value to selected timezone
    const timezonesel = interaction.options.getString('timezone');
    let tzoffset;
    if (timezonesel === undefined || timezonesel === null) {
        tzoffset = 0
    } else { tzoffset = convertGmtToSeconds(timezonesel); }
    //Test if option is specified and set postfix to timestamp
    const styles = {
        'ShortT': ':t', 'MediumT': ':T', 'ShortD': ':d', 
        'LongD': ':D', 'LongDshortT': ':f', 'FullDshortT': ':F',
        'ShortDshortT': ':s','ShortDmediumT': ':S', 'Relative': ':R'
    };
    const tsstyle = styles[style] ?? '';
    //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
    const gettimestamp = getDateInt(tsyear, tsmonth, tsday, tshour, tsmin, tssec, 0) / 1000 - tzoffset;
    console.log(`Tstamp created ${gettimestamp} ${publicreplylog}`)

    //Building response
    let replycontent;
    if (lang) {
        replycontent = `:white_check_mark: ${lang.preview}: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **${lang.timestamp}:** \`<t:${gettimestamp}${tsstyle}>\``;
    } else {
        replycontent = `:white_check_mark: Preview: <t:${gettimestamp}${tsstyle}> \n:arrow_right: **Timestamp to Paste:** \`<t:${gettimestamp}${tsstyle}>\``;
    }
    await lunar.editReply(interaction, replycontent);
};