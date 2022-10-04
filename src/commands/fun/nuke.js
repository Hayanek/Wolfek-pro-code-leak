module.exports = {
    name: "nuke",
    description: "Kaboom Serwer (Fake)",
    cooldown: 10,
    async run(msg) {
        //msg.delete()
        msg.reply({
            content: `https://tenor.com/view/explosion-mushroom-cloud-atomic-bomb-bomb-boom-gif-4464831`,
            allowedMentions: {repliedUser: false}
        }).then(m => m.react('💥'))  
    }
}