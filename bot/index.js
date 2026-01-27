const corever = 'v1.1.1';

const { loadlocale, lunar } = require('./functions.js');
const { hosa } = require('./builder.js');
const { tshosa } = require('./interactions.js');

//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');

// Require the necessary discord.js classes
const { Client, Routes, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');

//initialize statistics
loadStats();
statsAutoSave(60); //Autosave stats every (mins)
//loading bot localization
const locale = loadlocale();

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], rest: { timeout: 60000 } });

//Convert builder objects to JSON
const hosajson = Object.values(hosa).map(command => command.toJSON());
//Define commands
const commands = [ hosajson ];

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
        await tshosa.random(interaction, lang, publicreplylog);
        incrementStat(`randomcmd.${interaction.options.getSubcommand()}`);
    } else if (interaction.commandName === 'convert') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.convert(interaction, lang, publicreplylog);
        incrementStat(`convertcmd.${interaction.options.getSubcommand()}`);
    } else if (interaction.commandName === 'calc') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.calc(interaction, lang, publicreplylog)
        incrementStat(`calccmd.${interaction.options.getSubcommand()}`);
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
    // Log in to Discord with your client's token
    await client.login(token).catch((err) => {
      throw err
    });
    
    //app commands registration
    await client.rest.put(Routes.applicationCommands(client.user.id), { body: commands });
})();