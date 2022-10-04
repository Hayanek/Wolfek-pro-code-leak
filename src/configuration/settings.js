const { Permissions : { FLAGS }, MessageEmbed } = require('discord.js');
const colors = require('../config/kolorki.json')
const { prefixDefault } = require('../config/variables')
module.exports = {
    name: "settings",
    description: "Pokazuje aktualnie włączone fukncje na serwerze",
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
    async run(msg, blad, sukces) {
        let pomocnicza
        let pomocnicza2

        let prefixx = require(`../databaseModel/prefix`)
        let prefix_ = await prefixx.findOne({ where: { guildId: msg.guild.id } })
        prefixx.sync()

        let AntiAd = require(`../databaseModel/antiAd`)
        let AntiAd_ = await AntiAd.findOne({ where: { guildId: msg.guild.id } })
        AntiAd.sync()


        let liczenie = require(`../databaseModel/counts`)
        let liczenie_ = await liczenie.findOne({ where: { guildId: msg.guild.id } })
        liczenie.sync()

        let logs = require(`../databaseModel/logs`)
        let logs_ = await logs.findOne({ where: { guildId: msg.guild.id } })
        logs.sync()

        let memy = require(`../databaseModel/memy`)
        let memy_ = await memy.findOne({ where: { guildId: msg.guild.id } })
        memy.sync()

        let verification = require(`../databaseModel/verification`)
        let verification_ = await verification.findOne({ where: { guildId: msg.guild.id } })
        verification.sync()

        let sugestie = require(`../databaseModel/suggestion`)
        let sugestie_ = await sugestie.findOne({ where: { guildId: msg.guild.id } })
        sugestie.sync()

        let welcome = require(`../databaseModel/welcome`)
        let welcome_ = await welcome.findOne({ where: { guildId: msg.guild.id } })
        welcome.sync()

        let leave = require(`../databaseModel/leave`)
        let leave_ = await leave.findOne({ where: { guildId: msg.guild.id } })
        leave.sync()

        let snipes = require(`../databaseModel/snipes`)
        let snipes_ = await snipes.findOne({ where: { guildId: msg.guild.id } })
        snipes.sync()

        if(liczenie_) pomocnicza = liczenie_.repeat
        if(sugestie_) pomocnicza2 = sugestie_.comment

        let prefix = prefix_ ? prefix_.prefix : prefixDefault 



        

        const embed = new MessageEmbed()
        .setColor(colors["embed"])
        .setTitle(`Ustawione funkcje na serwerze:`)
        .addField(`<:Oznakowanie:875324525460475966> Prefix`, `\`${prefix}\``)
        .addField(`<:link:888100932028600340> AntiAd *(anty reklama)*`, `${AntiAd_ ? `<:przelacznikON:919318872006463529> | Włączony` : "<:przelacznikOFF:919318872081965066> | Wyłączony"}`)
        .addField(`<:Czytanie:875324526433566731> Counts *(liczenie)*`, `${liczenie_ ? `<:przelacznikON:919318872006463529> | <#${liczenie_.channelId}>` : "<:przelacznikOFF:919318872081965066> | Brak kanału"}\n${pomocnicza ? `<:przelacznikON:919318872006463529>` : "<:przelacznikOFF:919318872081965066>"} | Powtarzanie osoby`)
        .addField(`<a:Menu:875324525443711000> Logs *(logi)*`, `${logs_ ? `<:przelacznikON:919318872006463529> | <#${logs_.channelId}>` : "<:przelacznikOFF:919318872081965066> | Brak kanału"}`)
        .addField(`<:Usmiech:875324525728894976> Memy`, `${memy_ ? `<:przelacznikON:919318872006463529> | <#${memy_.channelId}>` : "<:przelacznikOFF:919318872081965066>"} | Brak kanału`)
        .addField(`<:Regulamin:875324525481439283> Verification *(weryfikacja)*`, `${verification_ ? `<:przelacznikON:919318872006463529> | <#${verification_.channelId}>` : "<:przelacznikOFF:919318872081965066> | Brak kanału"}`)
        .addField(`<a:dodaj:875324525884088350> Suggestion *(sugestie)*`, `${sugestie_ ? `<:przelacznikON:919318872006463529> | <#${sugestie_.channelId}>` : "<:przelacznikOFF:919318872081965066> | Brak kanału"}\n${pomocnicza2 ? `<:przelacznikON:919318872006463529>` : "<:przelacznikOFF:919318872081965066>"} | Komentarz`)
        .addField(`<a:Join1:875806819023486996> Powitania *(welcome)*`, `${welcome_ ? `<:przelacznikON:919318872006463529> | <#${welcome_.channelId}>\nWiadomość | \`\`${welcome_.message}\`\`` : "<:przelacznikOFF:919318872081965066> | Brak kanału"}`)
        .addField(`<a:Leave1:875806868646293645> Żegnania *(leave)*`, `${leave_ ? `<:przelacznikON:919318872006463529> | <#${leave_.channelId}>\nWiadomość | \`\`${leave_.message}\`\`` : "<:przelacznikOFF:919318872081965066> | Brak kanału"}`)
        .addField(`<:link:888100932028600340> Snipe *(snipes)*`, `${snipes_ ? `<:przelacznikON:919318872006463529> | Włączony` : "<:przelacznikOFF:919318872081965066> | Wyłączony"}`)
        .setFooter({ text: "Aby zmienić ustawienia powyższych funkcji użyj komendy /config <nazwa funkcji>" })
        msg.reply({embeds: [embed]})
    }
}