// Since 1.2.x core can be started only by shard manager

const corever = 'v1.2.0';

const { getL, shardStat, lunar } = require('./functions.js');
const { tshosa } = require('./interactions.js');

// Require the necessary discord.js classes
const { MessageFlags, Client, Options, Events, GatewayIntentBits, ActivityType } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({
    intents: [GatewayIntentBits.Guilds],
    makeCache: Options.cacheWithLimits({
        MessageManager: 0, // Not store messages
        ThreadManager: 0,
        UserManager: 0,    // Not store users
        PresenceManager: 0,
        GuildMemberManager: 0,
    }),
    rest: { timeout: 60000 } });

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    //decide if reply be ephemeral (publicreply: false / true)
    let { publicreplylog, isephemeral } = lunar.checkephemeral(interaction);
    if (isephemeral === false) { shardStat(`use.publicreply`) };

    //Get locale obj and null if not found
    const lang = getL(interaction.locale, 'hello') ? `${interaction.locale}` : null;
    shardStat(`interactionlang.${interaction.locale}`);

    //get commandName
    if (interaction.commandName === 'ping') {
        await tshosa.ping(interaction, client, lang);
        shardStat('pingcmd');
    } else if (interaction.commandName === 'about') {
        await tshosa.about(interaction, lang, corever);
        shardStat('aboutcmd');
    } else if (interaction.commandName === 'invite') {
        await tshosa.invite(interaction, lang);
        shardStat('invitecmd');
    } else if (interaction.commandName === 'now') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.now(interaction, lang, publicreplylog)
        shardStat('nowcmd');
    } else if (interaction.commandName === 'timezone') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.timezone(interaction, lang, publicreplylog);
        //subcommand string: interaction.options.getSubcommand()
        shardStat(`timezonecmd.${interaction.options.getSubcommand()}`);
    } else if (interaction.commandName === 'timestamp') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.timestamp(interaction, lang, publicreplylog);
        shardStat(`timestampcmd.${interaction.options.getString('style')}`);
    } else if (interaction.commandName === 'random') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.random(interaction, lang, publicreplylog);
        if (interaction.options.getSubcommand() === 'dice') { shardStat(`randomdice.${interaction.options.getString('dicetype')}`); }
        shardStat(`randomcmd.${interaction.options.getSubcommand()}`);
    } else if (interaction.commandName === 'convert') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.convert(interaction, lang, publicreplylog);
        shardStat(`convertcmd.${interaction.options.getSubcommand()}`);
    } else if (interaction.commandName === 'calc') {
        await interaction.deferReply({ flags: isephemeral ? [MessageFlags.Ephemeral] : [] });
        await tshosa.calc(interaction, lang, publicreplylog)
        shardStat(`calccmd.${interaction.options.getSubcommand()}`);
    }
});

//actions as client ready
client.once(Events.ClientReady, async(readyClient) => {
    //fetch application data
    await readyClient.application.fetch();
    //Installation Counter
    const installCount = readyClient.application.approximateUserInstallCount
    //Login output
    console.log(`Logged in as ${readyClient.user.tag}: Shard ${client.shard.ids[0]}. Approx installs: ${installCount}`);
    shardStat('shardlogin');
    
    //index init
    let currentIndex = 0;
    
    function presenceupdate() {
        //check if client ready
        if (!client.user) return;

        // Update presence only by first shard!
        if (client.shard && client.shard.ids[0] !== 0) return;

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

// Log in to Discord with your client's token
client.login(token).catch((err) => {
    throw err
});
