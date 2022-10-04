const { Permissions : { FLAGS }, WebhookClient, } = require('discord.js');
module.exports = {
    name: "suggestion",
    description: "Ustawia kanał na propozycje",
    options: [
        {
            type: "STRINGCHOICES",
            name: "mode",
            description: "Wybierz co chcesz zrobić",
            required: true,
            options: [
                { name: "Set", value: "set" }, { name: "Reset", value: "reset" }
            ]
        },
        {
            type: "CHANNEL",
            name: "kanal",
            description: "Wybierz kanal który ma być ustawiony.",
            required: false
        },
        {
            type: "STRINGCHOICES",
            name: "komentarz",
            description: "Czy chcesz żeby można było dodawać komentarze do propozycji?.",
            required: false,
            options: [ { name: "Tak", value: "yes" }, { name: "Nie", value: "no" } ]
        }
    ],
    userPermissions: [FLAGS.BAN_MEMBERS, FLAGS.MANAGE_GUILD],
    async run(interaction, blad, sukces, suggest) {
        try{
            suggest.sync()

            const mode = interaction.options.getString('mode')
            const kanal = interaction.options.getChannel('kanal')
            const komentarz = interaction.options.getString('komentarz')
            const istnienie = await suggest.findOne({ where: { guildId: interaction.guild.id } })


            if(mode === `reset`){
                if(!istnienie) return sukces(`Event propozycji został zresetowany`, interaction)
                const hook = new WebhookClient({ id: istnienie.get('webhookId'), token: istnienie.get('webhookToken') })
                hook.delete()
                await suggest.destroy({ where: { guildId: interaction.guild.id } })
                return sukces(`Event propozycji został zresetowany`, interaction)
            }


            if(mode === `set` && komentarz && !kanal){
                if(interaction.options.getSting('komentarz') === "no"){
                    await suggest.update({ comment: false }, { where: { guildId: interaction.guild.id } })
                    return sukces(`Komentarze w propozycjach zostały wyłączone!`, interaction)
                }else if(interaction.options.getSting('komentarz') === "yes"){
                    await suggest.update({ comment: true }, { where: { guildId: minteractionsg.guild.id } })
                    return sukces(`Komentarze w propozycjach zostały włączone!`, interaction)
                }
            }


            if(interaction.options.getString('mode') === `set` && kanal && !komentarz){

            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)
        
            if(!istnienie){
                kanal.createWebhook("Wolfek Propozycje", { avatar: interaction.guild.iconURL({format: "png"}) }).then(async webhook => {
                    await suggest.create({
                        guildId: interaction.guild.id,
                        channelId: kanal.id,
                        webhookId: webhook.id,
                        webhookToken: webhook.token
                    })
                })

                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
            else{
                if(istnienie.channelId === kanal.id) return blad(`Ten kanał jest już ustawiony.!`, interaction)

                let channel = interaction.guild.channels.cache.get(istnienie.get('channelId'))

                const webhooks = await channel.fetchWebhooks();
                const webhook = webhooks.first()

                await webhook.edit({
                    name: "Wolfek Propozycje",
                    avatar: interaction.guild.iconURL({format: "png"}),
                    channel: kanal.id,
                })
               
                await suggest.update({ channelId: kanal.id }, { where: { guildId: interaction.guild.id } })
                return sukces(`Kanał został ustawiony na <#${kanal.id}>!`, interaction)
            }
        }
        if(mode === `set` && komentarz && kanal) {
            if(kanal.type !== "GUILD_TEXT") return blad("Kanał ten nie jest kanałem tekstowym!", interaction)

            if(!istnienie) {
                kanal.createWebhook("Wolfek Propozycje", { avatar: interaction.guild.iconURL({format: "png"}) }).then(async webhook => {
                    let comments
                    if(komentarz === "yes") comments = true 
                    else comments = false
                    await suggest.create({
                        guildId: interaction.guild.id,
                        channelId: kanal.id,
                        webhookId: webhook.id,
                        webhookToken: webhook.token,
                        comment: comments
                    })
                })

                return sukces(`Kanał został ustawiony na <#${kanal.id}> i komentarz jest ${komentarz === "yes" ? "włączony" : "wyłączony"}!`, interaction)
            }
            else {
                if(istnienie.channelId === kanal.id) return blad(`Ten kanał jest już ustawiony!`, interaction)

                let comment 
                let channel = interaction.guild.channels.cache.get(istnienie.get('channelId'))

                const webhooks = await channel.fetchWebhooks();
                const webhook = webhooks.first()

                await webhook.edit({
                    name: "Wolfek Propozycje",
                    avatar: interaction.guild.iconURL({format: "png"}),
                    channel: kanal.id,
                })
                
                if(komentarz === "yes") comment = true
                else comment = false
                await suggest.update({ channelId: kanal.id, comment: comment }, { where: { guildId: interaction.guild.id } })
                return sukces(`Kanał został zmieniony na <#${kanal.id}> i komentarz ustawiony na ${komentarz === "yes" ? "włączony" : "wyłączony"}!`, interaction)


            }










        }
        return blad(`Embed helpa :P`, interaction)
        } catch(e) { console.log(e) }
    }
}