const api = require("../../config/api")
module.exports = {
    name: "cat",
    aliases: ['kot'],
    description: "Wysyła randomowego Kota!",
    cooldown: 10,
    async run(msg) {
        try{
            const images = await api(msg.author.username, `Cat`);
            msg.channel.send({ files: [ images[0].url ] });
        }catch(e){ return console.log(e) }
    }
}