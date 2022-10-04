const { readdirSync } = require("fs")
const chalk = require("chalk")
const colors = require('../config/kolorki.json')
const { Collection, Permissions: { FLAGS }, Permissions, MessageEmbed, Util } = require("discord.js")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { botId } = require("../config/variables");
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = async (client) => {
/*
    let commandsLet = 0
    const commands = []
    
    readdirSync("./src/slashCommands/").map(dir => {
        readdirSync(`./src/slashCommands/${dir}/`).map(cmd=>{
            commandsLet++
            let pull = require(`../slashCommands/${dir}/${cmd}`)
            let Command = new SlashCommandBuilder().setName(String(pull.name).toLowerCase()).setDescription(pull.description);

                if(pull.options && pull.options.length > 0){
                    pull.options.forEach(option  => {
                     if(option.type === "USER" && option.name && option.description){
                        Command.addUserOption((o) => {
                            o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                            return o;
                        })
                    }else if(option.type === "CHANNEL" && option.name && option.description){
                        Command.addChannelOption((o) => {
                            o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                            return o;
                        })
                    }else if(option.type === "ROLE" && option.name && option.description){
                        Command.addRoleOption((o) => {
                            o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                            return o;
                        })
                         
                    }else if(option.type === "STRING" && option.name && option.description){
                        Command.addStringOption((o) => {
                            o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                            return o;
                        })
                    }else if(option.type === "INTEGER" && option.name && option.description){
                        Command.addIntegerOption((o) => {
                            o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                            return o;
                        })
                    }else if(option.type === "STRINGCHOICES" && option.name && option.description && option.options.length > 0){
                        Command.addStringOption((o) => {
                            o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                            .addChoices(option.options.map(c=> [String(c.name).replace(/\s+/g, '_'),String(c.value)] ))
                            return o;
                        })
                    }

                    return Command;
                    })
                }
                commands.push(Command.toJSON())
                client.slashCommands.set(pull.name, pull)
            })
            
        })
    
    
    //ODKOMENTYWAĆ JAK DODACIE NOWĄ KOMENDE ALBO ZMIENICIE JAKIEŚ KOMENDY NAZWE DZIEKUJE DOBRANOC <3
    // const rest = new REST({ version: '9' }).setToken(process.env.token);

    // rest.put(Routes.applicationCommands(botId), { body: commands })
	// .then(() => console.log('Successfully registered application commands.'))
	// .catch(console.error);

    console.log(chalk.greenBright(`✅ Zarejestrowano ${commandsLet} komend`))

    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;

        const cmd = client.slashCommands.get(interaction.commandName);

        if (!cmd) return;

        let embedAuthor = [`${interaction.user.tag}`, interaction.user.avatarURL({ dynamic: true })]

        if(cmd.userPermissions){

            if(!interaction.member.permissionsIn(interaction.channel).has(cmd.userPermissions)){
                let permission 

                if(cmd.userPermissions[0] === FLAGS.ADMINISTRATOR) permission = "ADMINISTRATOR"
                else permission = interaction.member.permissionsIn(interaction.channel).missing(cmd.userPermissions).join(", ")

                const embedBlad = new MessageEmbed()
                .setColor(colors["ErrorColor"])
                .setAuthor(embedAuthor[0], embedAuthor[1])
                .setDescription(`Nie posiadasz permisji do wykonania tej komendy \n> Brakujące permisje to: **\`${permission}\`**`)

                return interaction.reply({embeds: [embedBlad]})
            }
        }
    
        try {
            await cmd.run(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    })*/
}