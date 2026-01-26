const corever = 'v1.1.1';
const supportedtimelocale = ["en-US", "ru", "de", "pl", "fr", "ja", "pt-BR", "ko", "bg", "sv-SE", "uk"]; //and en-UK as default

const { convertGmtToSeconds, getRandomInt, getDateInt, loadlocale, getLoc, lunar } = require('./functions.js');
const { hosa } = require('./builder.js');
const { tshosa } = require('./interactions.js');


//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');

// Require the necessary discord.js classes
const { Client, Routes, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { createInterface } = require('node:readline');
const { token } = require('./config.json');

let locale; //Initialize localization
async function preinit() {
    loadStats();
    statsAutoSave(60); //Autosave stats every (mins)
    //loading bot localization
    locale = loadlocale();
}
preinit();



// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], rest: { timeout: 60000 } });

//Convert builder objects to JSON
const hosajson = Object.values(hosa).map(command => command.toJSON());
//Define commands
const commands = [ hosajson ];

const rl = createInterface({ input: process.stdin, output: process.stdout });

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    //decide if reply be ephemeral (publicreply: false / true)
    let { publicreplylog, isephemeral } = await lunar.isephemeral(interaction);
    if (isephemeral = false) incrementStat(`use.publicreply`);

    //Get locale obj and null if not found
    const lang = locale[interaction.locale] || null;
    incrementStat(`interactionlang.${interaction.locale}`);

    //get commandName
    if (interaction.commandName === 'ping') {
        await tshosa.ping(interaction, client, lang);
        incrementStat('pingcmd');
    } else if (interaction.commandName === 'about') {
        await tshosa.about(interaction, lang);
        incrementStat('aboutcmd');
    } else if (interaction.commandName === 'invite') {
        await tshosa.invite(interaction, lang);
        incrementStat('invitecmd');
    } else if (interaction.commandName === 'now') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.now(interaction, lang, publicreplylog)
        incrementStat('nowcmd');
    } else if (interaction.commandName === 'timezone') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.timezone(interaction, lang, publicreplylog);
        //subcommand string: interaction.options.getSubcommand()
        incrementStat(`timezonecmd.${interaction.options.getSubcommand()}`);
    } else if (interaction.commandName === 'timestamp') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.timestamp(interaction, lang, publicreplylog);
        incrementStat(`timestampcmd.${interaction.options.getString('style')}`);
    } else if (interaction.commandName === 'random') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        incrementStat(`randomcmd.${interaction.options.getSubcommand()}`);
        if (interaction.options.getSubcommand() === 'date') {
            await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
            //Date output locale
            if (supportedtimelocale.includes(interaction.locale)) {
                var timelocale = interaction.locale
            } else { var timelocale = 'en-UK' }
            var randfromyear = interaction.options.getInteger('fromyear');
            var randfrommonth = interaction.options.getString('frommonth');
            var randfromday = interaction.options.getInteger('fromday');
            var randfromhour = interaction.options.getInteger('fromhour');
            var randfrommin = interaction.options.getInteger('fromminute');
            var randfromsec = interaction.options.getInteger('fromsecond');
            var randtoyear = interaction.options.getInteger('toyear');
            var randtomonth = interaction.options.getString('tomonth');
            var randtoday = interaction.options.getInteger('today');
            var randtohour = interaction.options.getInteger('tohour');
            var randtomin = interaction.options.getInteger('tominute');
            var randtosec = interaction.options.getInteger('tosecond');
            //mindate default: -62135596800000
            var mindateint = getDateInt(randfromyear, randfrommonth, randfromday, randfromhour, randfrommin, randfromsec, 0);
            //maxdateint get maximum permitted value when some vars are undefined
            var maxdateint = getDateInt(randtoyear ?? 3333, randtomonth ?? '12', randtoday ?? 31, randtohour ?? 23, randtomin ?? 59, randtosec ?? 59, 0);
            //get random date int
            var randomdateint = getRandomInt(mindateint, maxdateint)
            //convert to date
            var newdate = new Date(randomdateint)
            var randdate = newdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/GMT`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'long' })
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
            var randintmin = interaction.options.getInteger('min');
            var randintmax = interaction.options.getInteger('max');
            var randominteger = getRandomInt(randintmin, randintmax)
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
            var dicetype = interaction.options.getString('dicetype');
            if (dicetype === undefined || dicetype === null) {
                var dicetype = 'D6'
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
    } else if (interaction.commandName === 'convert') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        incrementStat(`convertcmd.${interaction.options.getSubcommand()}`);
        if (interaction.options.getSubcommand() === 'tounix') {
            var cvyear = interaction.options.getInteger('year');
            var cvmonth = interaction.options.getString('month');
            var cvday = interaction.options.getInteger('day');
            var cvhour = interaction.options.getInteger('hour');
            var cvmin = interaction.options.getInteger('minute');
            var cvsec = interaction.options.getInteger('second');
            var cvms = interaction.options.getInteger('millisecond');
            var cvmsdisplay = interaction.options.getBoolean('displayms');
            //Offset value to selected timezone
            var timezonesel = interaction.options.getString('timezone');
            if (timezonesel === undefined || timezonesel === null) {
                var tzoffset = 0
            } else { var tzoffset = convertGmtToSeconds(timezonesel) }
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            var calctimestamp = getDateInt(cvyear, cvmonth, cvday, cvhour, cvmin, cvsec, cvms);
            let cvreplystyle;
            //Calculate value in seconds or in ms
            if ( cvmsdisplay === true ) {
                var gettimestamp = calctimestamp - tzoffset * 1000
                //adjust interaction reply
                cvreplystyle = lang.milliseconds ?? 'milliseconds';
            } else {
                var gettimestamp = Math.floor(calctimestamp / 1000 - tzoffset)
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
            var cvmscount = interaction.options.getBoolean('withms');
            var cvtimestamp = interaction.options.getInteger('unixtime');
            var timezonesel = interaction.options.getString('timezone');
            if (timezonesel === undefined || timezonesel === null) {
                var timezonesel = 'GMT'
            }
            //is it milliseconds or seconds
            if ( cvmscount === true ) {
                var cvdate = new Date(cvtimestamp)
                var msdigits = '3'
            } else {
                var cvdate = new Date(cvtimestamp * 1000)
                //never set it to 0
                var msdigits = '1'
            }
            //Date output locale
            if (supportedtimelocale.includes(interaction.locale)) {
                var timelocale = interaction.locale
            } else { 
                var timelocale = 'en-UK'
            }
            console.log(`Converted ${cvtimestamp} to date ${publicreplylog}`)
            var cvreply = cvdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `${msdigits}`, weekday: 'long' })

            //Building response
            let replycontent;
            if (lang) {
                replycontent = `:date: ${locale.ru.result}: **__${cvreply}__**`;
            } else {
                replycontent = `:date: Result: **__${cvreply}__**`;
            }
            await lunar.editReply(interaction, replycontent);
        }
    } else if (interaction.commandName === 'calc') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        incrementStat(`calccmd.${interaction.options.getSubcommand()}`);
        //get Add or Subtract for entire calc command
        var calcmatharg = interaction.options.getString('matharg');
        if (interaction.options.getSubcommand() === 'from-to') {
            var calcfromyear = interaction.options.getInteger('fromyear');
            var calcfrommonth = interaction.options.getString('frommonth');
            var calcfromday = interaction.options.getInteger('fromday');
            var calcfromhour = interaction.options.getInteger('fromhour');
            var calcfrommin = interaction.options.getInteger('fromminute');
            var calcfromsec = interaction.options.getInteger('fromsecond');
            var calctoyear = interaction.options.getInteger('toyear');
            var calctomonth = interaction.options.getString('tomonth');
            var calctoday = interaction.options.getInteger('today');
            var calctohour = interaction.options.getInteger('tohour');
            var calctomin = interaction.options.getInteger('tominute');
            var calctosec = interaction.options.getInteger('tosecond');
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            var calcfromtimestamp = getDateInt(calcfromyear, calcfrommonth, calcfromday, calcfromhour, calcfrommin, calcfromsec, 0);
            var calctotimestamp = getDateInt(calctoyear, calctomonth, calctoday, calctohour, calctomin, calctosec, 0);        
            var calcdiff = Math.floor(Math.abs(calctotimestamp - calcfromtimestamp) / 1000)
            //now we get days, hours, mins and secs from seconds
            var daysdiff = Math.floor(calcdiff / 86400)
            var hoursdiff = Math.floor((calcdiff - (daysdiff * 86400)) / 3600)
            var minsdiff = Math.floor(((calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600))) / 60))
            var secsdiff = Math.floor(calcdiff - ((daysdiff * 86400) + (hoursdiff * 3600) + (minsdiff * 60)))
            console.log(`Diff calculated ${calcdiff} ${publicreplylog}`)   

            //Building response
            let replycontent;
            if (lang) {
                replycontent = `:white_check_mark: ${lang.datesdiff}: **__${daysdiff} ${lang.days} ${hoursdiff} ${lang.hours} ${minsdiff} ${lang.minutes} ${secsdiff} ${lang.seconds}__** \n:hourglass_flowing_sand: \`${calcdiff}\` *${lang.seconds}*`;
            } else {
                replycontent = `:white_check_mark: Difference between dates is: **__${daysdiff} Days ${hoursdiff} Hours ${minsdiff} Minutes ${secsdiff} Seconds__** \n:hourglass_flowing_sand: \`${calcdiff}\` *Seconds*`;
            }
            await lunar.editReply(interaction, replycontent);
        } else if (interaction.options.getSubcommand() === 'fromnow') {
            //get current time
            var calcarg1 = Date.now()
        } else if (interaction.options.getSubcommand() === 'fromdate') {
            //else set 1st arg from user input
            var calcyear = interaction.options.getInteger('year');
            var calcmonth = interaction.options.getString('month');
            var calcday = interaction.options.getInteger('day');
            var calchour = interaction.options.getInteger('hour');
            var calcmin = interaction.options.getInteger('minute');
            var calcsec = interaction.options.getInteger('second');
            var calcms = interaction.options.getInteger('millisecond');          
            //getDateInt(year, 'month', day, hour, min, sec, ms). Month is required to be 'string'
            var calcarg1 = getDateInt(calcyear, calcmonth, calcday, calchour, calcmin, calcsec, calcms);
        }
        if (interaction.options.getSubcommand() === 'fromnow' || interaction.options.getSubcommand() === 'fromdate') {
            //if calculating with 1st arg then we setting 2nd arg
            var timezonesel = interaction.options.getString('timezone');
            var calcarg2y = interaction.options.getInteger('years') * 31536000000;
            var calcarg2m = interaction.options.getInteger('months') * 2592000000;
            var calcarg2w = interaction.options.getInteger('weeks') * 604800000;
            var calcarg2d = interaction.options.getInteger('days') * 86400000;
            var calcarg2h = interaction.options.getInteger('hours') * 3600000;
            var calcarg2min = interaction.options.getInteger('minutes') * 60000;
            var calcarg2s = interaction.options.getInteger('seconds') * 1000;
            var calcarg2ms = interaction.options.getInteger('milliseconds');
            var calcarg2 = calcarg2ms + calcarg2s + calcarg2min + calcarg2h + calcarg2d + calcarg2w + calcarg2m + calcarg2y
            //If subtract then reverting sign of value
            if (calcmatharg === 'Subtract') { var calcarg2 = -calcarg2 }
            if (timezonesel === undefined || timezonesel === null) {
                var timezonesel = 'GMT'
            }
            //Date output locale
            if (supportedtimelocale.includes(interaction.locale)) {
                var timelocale = interaction.locale
            } else {
                var timelocale = 'en-UK'
            }
            var calcresult = calcarg1 + calcarg2
            console.log(`Calculated ${calcarg1} + ${calcarg2} ${publicreplylog}`)
            var calcresdate = new Date(calcresult)
            var calcreply = calcresdate.toLocaleString(`${timelocale}`, { timeZone: `Etc/${timezonesel}`, timeZoneName: 'longOffset', day: 'numeric', month: 'long', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', fractionalSecondDigits: `3`, weekday: 'long' })

            //Building response
            let replycontent;
            if (lang) {
                replycontent = `:white_check_mark: ${lang.result}: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` ${lang.timestamp}: \`<t:${Math.floor(calcresult / 1000)}>\` ${lang.localtime}: <t:${Math.floor(calcresult / 1000)}>*`;
            } else {
                replycontent = `:white_check_mark: Result: **__${calcreply}__** \n:hourglass_flowing_sand: *UNIX: \`${calcresult}\` Timestamp to Paste: \`<t:${Math.floor(calcresult / 1000)}>\` Local Time: <t:${Math.floor(calcresult / 1000)}>*`;
            }
            await lunar.editReply(interaction, replycontent);
        }
    }
});

//actions as client ready
client.once(Events.ClientReady, async(readyClient) => {
    //fetch application data
    await readyClient.application.fetch();
    //Installation Counter
    const installCount = readyClient.application.approximateUserInstallCount
    //Login output
    console.log(`Logged in as ${readyClient.user.tag}. Approx installs: ${installCount}`);
    incrementStat('botlogin');
    
    //Bot Presence List
    const presencelist = [
        { name: `📙 /about • ${corever}`, type: ActivityType.Streaming },
        { name: `🎲 /random • Throw a Dice!`, type: ActivityType.Streaming },
        { name: `⏱ /now • ${installCount}+ installs!`, type: ActivityType.Streaming },
        { name: `⌛ /timestamp • Try it!`, type: ActivityType.Streaming },
        { name: `🔗 /invite • Join Us!`, type: ActivityType.Streaming },
        { name: `🧮 /calc • The Date calc!`, type: ActivityType.Streaming },
        { name: `🔄 /convert • UNIX Time!`, type: ActivityType.Streaming },
        { name: `🕒 /timezone • What time is it?`, type: ActivityType.Streaming }
    ];
    
    //index init
    let currentIndex = 0;
    
    function presenceupdate() {
        //check if client ready
        if (!client.user) return;
        //Set Presence
        client.user.setPresence({
            activities: [presencelist[currentIndex]],
            status: 'online',
        });
        //next index (0 in the end)
        currentIndex = (currentIndex + 1) % presencelist.length;
    };
    
    //Update presence on Login
    presenceupdate()
    //Update presence every (x, ms)
    setInterval(presenceupdate, 1800000);
});

//prelogin
(async() => {
    //auth
    const question = (q) => new Promise((resolve) => rl.question(q, resolve));

    // Log in to Discord with your client's token
    await client.login(token).catch((err) => {
      throw err
    });
    
    //app commands registration
    await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });
})();