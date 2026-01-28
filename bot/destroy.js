const { Client, Routes, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds], rest: { timeout: 60000 } });

//actions as client ready
client.once(Events.ClientReady, async(readyClient) => {
    //fetch application data
    await readyClient.application.fetch();
    //Login output
    console.log(`Interactions deleted for ${readyClient.user.tag}!`);
    client.destroy();
});

//prelogin
(async() => {
    try {
        await client.login(token);
        
        // Очищаем везде
        await client.rest.put(Routes.applicationCommands(client.user.id), { body: [] });
        console.log('Slash commands interactions deleted!');
    } catch (error) {
        console.error(error);
    }
})();