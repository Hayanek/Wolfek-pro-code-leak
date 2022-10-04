const api = require("../../config/api")
module.exports = {
    name: "dog",
    aliases: ['pies'],
    description: "Wysyła randomowego Psa!",
    cooldown: 10,
    async run(msg) {
        try{
            const images = await api(msg.author.username, "Dog");
            msg.channel.send({ files: [ images[0].url ] });
        }catch(e){ return console.log(e) }
    }
}