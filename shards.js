const { ShardingManager } = require('discord.js');
const chalk = require("chalk")
require('dotenv').config();

const manager = new ShardingManager('index.js', { token: process.env.TOKEN  });

manager.on('shardCreate', shard => {
    console.log(chalk.greenBright(`✅ Launched shard ${shard.id}`))
});

manager.spawn({ delay: 10000, timeout: -1 });