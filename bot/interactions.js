const { convertGmtToSeconds, getRandomInt, getDateInt, loadlocale, lunar } = require('./functions.js');

//init localization
locale = loadlocale();
const supportedtimelocale = ["en-US", "ru", "de", "pl", "fr", "ja", "pt-BR", "ko", "bg", "sv-SE", "uk"]; //and en-UK as default

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
    const timezonesel = interaction.options.getString('timezone') || 'GMT';
    let tzoffset = convertGmtToSeconds(timezonesel);
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

tshosa.random = async function(interaction, lang, publicreplylog) {
    if (interaction.options.getSubcommand() === 'date') {
        //Date output locale
        let timelocale;
        if (supportedtimelocale.includes(interaction.locale)) {
            timelocale = interaction.locale
        } else { timelocale = 'en-UK' }
        const randfromyear = interaction.options.getInteger('fromyear');
        const randfrommonth = interaction.options.getString('frommonth');
        const randfromday = interaction.options.getInteger('fromday');
        const randfromhour = interaction.options.getInteger('fromhour');
        const randfrommin = interaction.options.getInteger('fromminute');
        const randfromsec = interaction.options.getInteger('fromsecond');
        const randtoyear = interaction.options.getInteger('toyear');
        const randtomonth = interaction.options.getString('tomonth');
        const randtoday = interaction.options.getInteger('today');
        const randtohour = interaction.options.getInteger('tohour');
        const randtomin = interaction.options.getInteger('tominute');
        const randtosec = interaction.options.getInteger('tosecond');
        //mindate default: -62135596800000
        const mindateint = getDateInt(randfromyear, randfrommonth, randfromday, randfromhour, randfrommin, randfromsec, 0);
        //maxdateint get maximum permitted value when some vars are undefined
        const maxdateint = getDateInt(randtoyear ?? 3333, randtomonth ?? '12', randtoday ?? 31, randtohour ?? 23, randtomin ?? 59, randtosec ?? 59, 0);
        //get random date int
        const randomdateint = getRandomInt(mindateint, maxdateint)
        //convert to date
        const newdate = new Date(randomdateint)
        const randdate = newdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/GMT`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long' })
        console.log(`Date randomized ${randomdateint} ${publicreplylog}`)

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:game_die: ${lang.result}: **__${randdate}__** \n:hourglass_flowing_sand: UNIX: \`${Math.floor(randomdateint / 1000)}\``;
        } else {
            replycontent = `:game_die: Result: **__${randdate}__** \n:hourglass_flowing_sand: UNIX: \`${Math.floor(randomdateint / 1000)}\``;
        }
        await lunar.editReply(interaction, replycontent);
    } else if (interaction.options.getSubcommand() === 'integer') {
        const randintmin = interaction.options.getInteger('min');
        const randintmax = interaction.options.getInteger('max');
        const randominteger = getRandomInt(randintmin, randintmax)
        console.log(`Int randomised ${randominteger} ${publicreplylog}`)

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:game_die: **${lang.randintreply}** \`${randominteger}\``;
        } else {
            replycontent = `:game_die: **Your Random Integer is** \`${randominteger}\``;
        }
        await lunar.editReply(interaction, replycontent);
    } else if (interaction.options.getSubcommand() === 'dice') {
        incrementStat(`randomdice.${interaction.options.getString('dicetype')}`);
        const dicetype = interaction.options.getString('dicetype') || 'D6';
        let randomdice;
        if (dicetype === undefined || dicetype === null) {
            randomdice = getRandomInt(1, 6)
        } else if (dicetype === 'D4') {
            randomdice = getRandomInt(1, 4)
        } else if (dicetype === 'D6') {
            randomdice = getRandomInt(1, 6)
        } else if (dicetype === 'D8') {
            randomdice = getRandomInt(1, 8)
        } else if (dicetype === 'D10') {
            randomdice = getRandomInt(1, 10)
        } else if (dicetype === 'D12') {
            randomdice = getRandomInt(1, 12)
        } else if (dicetype === 'D20') {
            randomdice = getRandomInt(1, 20)
        } else if (dicetype === 'D100') {
            randomdice = getRandomInt(1, 100)
        }
        console.log(`Dice thrown (${dicetype}) ${publicreplylog}`)

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:game_die: *(${dicetype}) ${lang.dicethrown}!* **${lang.result}:** __\`${randomdice}\`__`;
        } else {
            replycontent = `:game_die: *(${dicetype}) Dice Thrown!* **Result:** __\`${randomdice}\`__`;
        }
        await lunar.editReply(interaction, replycontent);
    }
};

tshosa.convert = async function(interaction, lang, publicreplylog) {
    if (interaction.options.getSubcommand() === 'tounix') {
        const cvyear = interaction.options.getInteger('year');
        const cvmonth = interaction.options.getString('month');
        const cvday = interaction.options.getInteger('day');
        const cvhour = interaction.options.getInteger('hour');
        const cvmin = interaction.options.getInteger('minute');
        const cvsec = interaction.options.getInteger('second');
        const cvms = interaction.options.getInteger('millisecond');
        const cvmsdisplay = interaction.options.getBoolean('displayms');
        //Offset value to selected timezone
        const timezonesel = interaction.options.getString('timezone') || 'GMT';
        let tzoffset = convertGmtToSeconds(timezonesel);
        //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
        const calctimestamp = getDateInt(cvyear, cvmonth, cvday, cvhour, cvmin, cvsec, cvms);
        //Calculate value in seconds or in ms
        let cvreplystyle;
        let gettimestamp;
        if ( cvmsdisplay === true ) {
            gettimestamp = calctimestamp - tzoffset * 1000
            //adjust interaction reply
            cvreplystyle = lang.milliseconds ?? 'milliseconds';
        } else {
            gettimestamp = Math.floor(calctimestamp / 1000 - tzoffset)
            //adjust interaction reply
            cvreplystyle = lang.seconds ?? 'seconds';
        }
        console.log(`Converted date to ${gettimestamp} ${publicreplylog}`)

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:abacus: **${lang.result}:** \`${gettimestamp}\` *${cvreplystyle} ${lang.since1970} (UNIX)*`;
        } else {
            replycontent = `:abacus: **Result:** \`${gettimestamp}\` *${cvreplystyle} since Jan 1, 1970 (UNIX)*`;
        }
        await lunar.editReply(interaction, replycontent);
    } else if (interaction.options.getSubcommand() === 'todate') {
        const cvmscount = interaction.options.getBoolean('withms');
        const cvtimestamp = interaction.options.getInteger('unixtime');
        //GMT if not defined
        const timezonesel = interaction.options.getString('timezone') || 'GMT';
        //is it milliseconds or seconds
        let cvdate;
        let msdigits;
        if ( cvmscount === true ) {
            cvdate = new Date(cvtimestamp)
            msdigits = '3'
        } else {
            cvdate = new Date(cvtimestamp * 1000)
            //never set it to 0
            msdigits = '1'
        }
        //Date output locale
        let timelocale;
        if (supportedtimelocale.includes(interaction.locale)) {
            timelocale = interaction.locale
        } else { timelocale = 'en-UK' }
        console.log(`Converted ${cvtimestamp} to date ${publicreplylog}`)
        const cvreply = cvdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `${msdigits}`, weekday: 'long' })

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:date: ${locale.ru.result}: **__${cvreply}__**`;
        } else {
            replycontent = `:date: Result: **__${cvreply}__**`;
        }
        await lunar.editReply(interaction, replycontent);
    }
};

tshosa.calc = async function(interaction, lang, publicreplylog) {
    //get Add or Subtract for entire calc command
    var calcmatharg = interaction.options.getString('matharg');
    if (interaction.options.getSubcommand() === 'from-to') {
        const calcfromyear = interaction.options.getInteger('fromyear');
        const calcfrommonth = interaction.options.getString('frommonth');
        const calcfromday = interaction.options.getInteger('fromday');
        const calcfromhour = interaction.options.getInteger('fromhour');
        const calcfrommin = interaction.options.getInteger('fromminute');
        const calcfromsec = interaction.options.getInteger('fromsecond');
        const calctoyear = interaction.options.getInteger('toyear');
        const calctomonth = interaction.options.getString('tomonth');
        const calctoday = interaction.options.getInteger('today');
        const calctohour = interaction.options.getInteger('tohour');
        const calctomin = interaction.options.getInteger('tominute');
        const calctosec = interaction.options.getInteger('tosecond');
        //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
        const calcfromtimestamp = getDateInt(calcfromyear, calcfrommonth, calcfromday, calcfromhour, calcfrommin, calcfromsec, 0);
        const calctotimestamp = getDateInt(calctoyear, calctomonth, calctoday, calctohour, calctomin, calctosec, 0);        
        const calcdiff = Math.floor(Math.abs(calctotimestamp - calcfromtimestamp) / 1000)
        //now we get days, hours, mins and secs from seconds
        const daysdiff = Math.floor(calcdiff / 86400)
        const hoursdiff = Math.floor((calcdiff - (daysdiff * 86400)) / 3600)
        const minsdiff = Math.floor(((calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600))) / 60))
        const secsdiff = Math.floor(calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600) + (minsdiff * 60)))
        console.log(`Diff calculated ${calcdiff} ${publicreplylog}`)

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:white_check_mark: ${lang.datesdiff}: **__${daysdiff} ${lang.days} ${hoursdiff} ${lang.hours} ${minsdiff} ${lang.minutes} ${secsdiff} ${lang.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${lang.seconds}*`;
        } else {
            replycontent = `:white_check_mark: Difference between dates is: **__${daysdiff} Days ${hoursdiff} Hours ${minsdiff} Minutes ${secsdiff} Seconds__** \n:hourglass_flowing_sand: \`${calcdiff}\` *Seconds*`;
        }
        await lunar.editReply(interaction, replycontent);
    } else if (interaction.options.getSubcommand() === 'fromnow' || interaction.options.getSubcommand() === 'fromdate') {
        let calcarg1;
        if (interaction.options.getSubcommand() === 'fromnow') {
            //get current time
            calcarg1 = Date.now()
        } else if (interaction.options.getSubcommand() === 'fromdate') {
            //else set 1st arg from user input
            const calcyear = interaction.options.getInteger('year');
            const calcmonth = interaction.options.getString('month');
            const calcday = interaction.options.getInteger('day');
            const calchour = interaction.options.getInteger('hour');
            const calcmin = interaction.options.getInteger('minute');
            const calcsec = interaction.options.getInteger('second');
            const calcms = interaction.options.getInteger('millisecond');          
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            calcarg1 = getDateInt(calcyear, calcmonth, calcday, calchour, calcmin, calcsec, calcms);
        }
        //if calculating with 1st arg then we setting 2nd arg
        const timezonesel = interaction.options.getString('timezone') || 'GMT';
        const calcarg2y = interaction.options.getInteger('years') * 31536000000;
        const calcarg2m = interaction.options.getInteger('months') * 2592000000;
        const calcarg2w = interaction.options.getInteger('weeks') * 604800000;
        const calcarg2d = interaction.options.getInteger('days') * 86400000;
        const calcarg2h = interaction.options.getInteger('hours') * 3600000;
        const calcarg2min = interaction.options.getInteger('minutes') * 60000;
        const calcarg2s = interaction.options.getInteger('seconds') * 1000;
        const calcarg2ms = interaction.options.getInteger('milliseconds');
        let calcarg2 = calcarg2ms + calcarg2s + calcarg2min + calcarg2h + calcarg2d + calcarg2w + calcarg2m + calcarg2y
        //If subtract then reverting sign of value
        if (calcmatharg === 'Subtract') { calcarg2 = -calcarg2 }
        //Date output locale
        let timelocale;
        if (supportedtimelocale.includes(interaction.locale)) {
            timelocale = interaction.locale
        } else { timelocale = 'en-UK' }
        const calcresult = calcarg1 + calcarg2
        console.log(`Calculated ${calcarg1} + ${calcarg2} ${publicreplylog}`)
        const calcresdate = new Date(calcresult)
        const calcreply = calcresdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `3`, weekday: 'long' })

        //Building response
        let replycontent;
        if (lang) {
            replycontent = `:white_check_mark: ${lang.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${lang.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${lang.localtime}: <t:${Math.floor(calcresult / 1000)}>*`;
        } else {
            replycontent = `:white_check_mark: Result: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` Timestamp to Paste: \`<t:${Math.floor(calcresult / 1000)}>\` Local Time: <t:${Math.floor(calcresult / 1000)}>*`;
        }
        await lunar.editReply(interaction, replycontent);
    }
};

module.exports = { tshosa };