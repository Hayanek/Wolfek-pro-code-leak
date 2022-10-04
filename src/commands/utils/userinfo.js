const { MessageEmbed } = require(`discord.js`);
const moment = require(`moment`);
const colors = require('../../config/kolorki.json');
module.exports = {
    name: "userinfo",
    aliases: ['user-info', 'user'],
    description: "Informacje o użytkowniku",
    usage: "<użytkownik>",
    async run(msg, args, blad){
        try{
            moment.locale("pl")

            let Target

            if(msg.mentions.users.first()) Target = msg.guild.members.cache.get(msg.mentions.users.first().id)
            else Target = await msg.guild.members.fetch({ user: args[0] })

            if(!args[0]) {
                const userinfo = new MessageEmbed()
                .setColor(colors["MainColor"])
                .setTitle(`Informacje o użytkowniku`)
                .addField(`<:Osoby:875324526496473138> Użytkownik`,`**> ${msg.author}**`, true)
                .addField(`<a:telewizor:875324525586313236> ID użytkownika:`,`**> \`${msg.author.id}\`**`, true)
                .addField(`<:Kawusia:875324526588723210> Nitro:`, `**> ${msg.author.premiumSubscriptionCount ? 'Tak' : 'Nie'}**`, false)
                .addField(`<:Flaga:875324525791817798> Najwyższa rola użytkownika:`,`**> ${String (msg.member.roles.cache.first(1)).replace("@everyone", "Brak")}**`)
                .addField(`<a:Rertyosoby:875324526848778260> Data dołaczenia na serwer`,`**> ${moment(msg.member.joinedAt).format('LLL')} (${moment(msg.member.joinedAt).fromNow()})**`)
                .addField(`<a:Join1:875806819023486996> Data stworzenia konta`,`**> ${moment(msg.author.createdAt).format('LLL')} (${moment(msg.author.createdAt).fromNow()})**`)
                .setThumbnail(msg.author.displayAvatarURL({dynamic: true}))

                msg.reply({embeds: [userinfo], allowedMentions: {repliedUser: false}})

            }else if(args[0] && Target){
                const userinfo = new MessageEmbed()
                .setColor(colors["MainColor"])
                .setTitle(`Informacje o użytkowniku`)
                .addField(`<:Osoby:875324526496473138> Użytkownik`,`**> ${Target}**`, true)
                .addField(`<a:telewizor:875324525586313236> ID użytkownika:`,`**> \`${Target.id}\`**`, true)
                .addField(`<:Kawusia:875324526588723210> Nitro:`, `**> ${Target.premiumSubscriptionCount ? 'Tak' : 'Nie'}**`,false)
                .addField(`<:Flaga:875324525791817798> Najwyższa rola użytkownika:`,`**> ${String (Target.roles.cache.first(1)).replace("@everyone", "Brak")}**`)
                .addField(`<a:Rertyosoby:875324526848778260> Data dołaczenia na serwer`,`**> ${moment(Target.joinedAt).format('LLL')} (${moment(Target.joinedAt).fromNow()})**`)
                .addField(`<a:Join1:875806819023486996> Data stworzenia konta`,`**> ${moment(Target.user.createdAt).format('LLL')} (${moment(Target.user.createdAt).fromNow()})**`)
                .setThumbnail(Target.displayAvatarURL({dynamic: true}))

                msg.reply({embeds: [userinfo], allowedMentions: { repliedUser: false }})
            }
        }catch(r) { blad("osoba", msg), console.log(r) }
     }
}
