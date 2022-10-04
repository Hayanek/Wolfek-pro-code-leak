module.exports = {
    name:"stop",
    aliases: ['off', 'return'],
    description:"Zatrzymanie bota!",
    dev: true,
    async run(msg) {
        await msg.channel.send({ content: "Bot OFF"});
        msg.client.destroy();
    }
}