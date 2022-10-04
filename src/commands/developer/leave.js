module.exports = {
    name: "leave",
    description: "Komenda do wyjscia bota z serwera",
    usage: "<id serwera>",
    dev: true,
    async run(msg, args, blad, sukces){
        try{
            let serwer = msg.client.guilds.cache.get(args[0])

            if(serwer) return serwer.leave().then(sukces(`Pomyślnie opuściłem *${serwer.name}*(\`${serwer.id}\`)`, msg))
            else msg.guild.leave().then(sukces(`Pomyślnie opuściłem *${msg.guild.name}*(\`${msg.guild.id}\`)`, msg)) 
        } catch(e) {
            blad(e, msg)
            console.log(e)
        }
    }
}