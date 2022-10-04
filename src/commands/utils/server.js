const { MessageEmbed } = require('discord.js');
const moment = require(`moment`);
const colors = require('../../config/kolorki.json');
module.exports = {
   name:"server",
   description:"Pokazuję informajce na temat tego serwera!",
   aliases: ["server-info", "serverinfo"],
   async run(msg) {
      moment.locale("pl")

      let embed = new MessageEmbed()
      .setTitle(`**Informacje o serwerze!**`)
      .addField(`<:Serwery:875324525821165569> Własciel serwera`,`**> <@${msg.guild.ownerId}>**`, false)
      .addField(`<a:telewizor:875324525586313236> ID serwera`, `**> \`${msg.guild.id}\`**`, false)
      .addField(`<:Osoby:875324526496473138> Statystyki`,`**> Użytkownicy: ${msg.guild.memberCount - msg.guild.members.cache.filter(m=>m.user.bot).size}\n > Boty: ${msg.guild.members.cache.filter(m=>m.user.bot).size}**`, false)
      .addField(`<a:Wiadomosc:875324526412574760> Kanały`,`**> Tekstowe: ${msg.guild.channels.cache.filter(m => m.type === 'GUILD_TEXT').size}\n > Głosowe: ${msg.guild.channels.cache.filter(m => m.type === 'GUILD_VOICE').size}**`, false)
      .addField(`<:Flaga:875324525791817798> Poziom boost`,`**> ${msg.guild.premiumSubscriptionCount ? '1' : '2' , '3' , 'Brak'}**`)
      .addField(`<a:Flagaplus:875324526550986763> Data stworzenia`,`**> ${moment(msg.guild.createdAt).format('LLL')} (${moment(msg.guild.createdAt).fromNow()})**`, false)
      .setColor(colors["MainColor"])
      .setFooter({ text: msg.author.username})
      .setThumbnail(msg.guild.iconURL())
      .setTimestamp()
      
      return msg.channel.send({embeds: [embed], allowedMentions: { repliedUser: false }});
   }
}