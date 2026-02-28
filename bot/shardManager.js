const { ShardingManager } = require('discord.js');
const path = require('node:path');
const { token } = require('./config.json');
const { deployInteractions } = require('./deploy.js');

//Statistics
const { loadStats, incrementStat, statsAutoSave } = require('./botstats.js');
loadStats();
//Autosave stats every (mins)
statsAutoSave(60);

// Deploy interactions on start
(async() => {
    await deployInteractions()
    incrementStat('botlogin');
})();

// Shard Manager
const manager = new ShardingManager(path.join(__dirname, 'index.js'), {
    token: token,
    totalShards: 'auto', // Automaticly decide count of shards
    respawn: true       // Respawn fallen shards
});

manager.on('shardCreate', shard => {
    console.log(`[Timestamp-Hosa Manager] Shard started #${shard.id}`);

    // Listening messages from shard
    shard.on('message', message => {
        // Statistics server. Inside shards use: process.send({ type: 'incrementStat', stat: 'statName' });
        if (message.type === 'incrementStat') {
            incrementStat(message.stat);
        }
    });
});

// Start all shards
manager.spawn()
    .then(() => console.log('[Timestamp-Hosa Manager] All Shards Online!'))
    .catch(console.error);