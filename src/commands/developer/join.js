module.exports = {
    name: "join",
    description: "Invite do serwera w ktorym jest bot",
    usage: "<id serwera>",
    dev: true,
    async run(msg, args) {
		console.log(msg.client.guilds.cache.get(args[0]))
		
		let kanalek = msg.client.guilds.cache.get(args[0])

        const randomKanal = kanalek.channels.cache.filter(channel => {return channel.type === 'GUILD_TEXT'}).first()
        
        msg.client.channels.cache.get(randomKanal.id).createInvite({unique: true}).then(invite => {
            msg.reply("https://discord.gg/" + invite.code)
        })
    }
}