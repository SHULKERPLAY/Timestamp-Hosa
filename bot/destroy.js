const { Client, Routes, Events, GatewayIntentBits } = require('discord.js');
const { token } = require('./config.json');

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

async function destroy() {
    //actions as client ready
    client.once(Events.ClientReady, async(readyClient) => {
        try {
            // Очищаем везде
            await client.rest.put(Routes.applicationCommands(client.user.id), { body: [] });
            console.log(`Interactions deleted for ${readyClient.user.tag}!`);
        } catch (error) {
            console.error('Failed to destroy interactions:', error.message);
        } finally {
            //End session
            client.destroy();
        } 
    });
    // Authorization
    await client.login(token);
}
destroy();