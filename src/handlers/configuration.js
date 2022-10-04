const { readdirSync } = require("fs")
const chalk = require("chalk")
const { Permissions: { FLAGS }, Permissions } = require("discord.js")
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { blad_interaction } = require('../functions/blad')
const { sukces_interaction } = require('../functions/sukces.js')
const { SlashCommandBuilder } = require('@discordjs/builders');
module.exports = async (client) => {
    //zmienne
    const { developerRole, rolesGuild } = require("../config/variables.js")
    let commandsLet = 0
    let database 
   
    
    const commands = []
    const subCommand = new SlashCommandBuilder().setName("config").setDescription("Konfiguracja funkcji!");

    readdirSync("./src/configuration/").map(cmd => { 

        commandsLet++
        let pull = require(`../configuration/${cmd}`)

        if (pull.name && pull.description) {

            subCommand.addSubcommand((subcommand) => {
                subcommand.setName(String(pull.name).toLowerCase()).setDescription(pull.description)

                if(pull.options && pull.options.length > 0){
                    pull.options.forEach(option  => {
                        if(option.type === "USER" && option.name && option.description){
                            subcommand.addUserOption((o) => {
                                o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                                return o;
                            })
                        }else if(option.type === "CHANNEL" && option.name && option.description){
                            subcommand.addChannelOption((o) => {
                                o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                                return o;
                            })
                        }else if(option.type === "ROLE" && option.name && option.description){
                            subcommand.addRoleOption((o) => {
                                o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                                return o;
                            })
                        }else if(option.type === "STRING" && option.name && option.description){
                            subcommand.addStringOption((o) => {
                                o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                                return o;
                            })
                        }else if(option.type === "INTEGER" && option.name && option.description){
                            subcommand.addIntegerOption((o) => {
                                o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                                return o;
                            })
                        }else if(option.type === "STRINGCHOICES" && option.name && option.description && option.options.length > 0){
                            subcommand.addStringOption((o) => {
                                o.setName(String(option.name).toLowerCase()).setDescription(String(option.description)).setRequired(option.required)
                                .addChoices(option.options.map(c=> [String(c.name).replace(/\s+/g, '_'),String(c.value)] ))
                                return o;
                            })
                        }
                    })
                }
                return subcommand;
            })
            client.configuration.set(pull.name, pull)
        }  
    })
    commands.push(subCommand.toJSON())

      //////////////////////////////////////////////////////////////////////////////////
     // ODKOMENTYWAĆ TO JAK DODACIE NOWĄ KOMENDE ALBO ZMIENICIE JAKIEŚ KOMENDY NAZWE //
    //////////////////////////////////////////////////////////////////////////////////

    const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);
    rest.put(Routes.applicationCommands("761566285913260064"), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);

    console.log(chalk.greenBright(`✅ Zarejestrowano ${commandsLet} komend konfiguracji`))
       
    client.on('interactionCreate', async interaction => {
        if (!interaction.isCommand()) return;
        //if(interaction.options) return 

        const cmd = client.configuration.get(interaction.options.getSubcommand());
        if(!cmd) return 

        //ranga na bota developer
        global.dev = client.guilds.cache.get(rolesGuild).members?.cache?.get(interaction.user.id)?.roles?.cache?.get(developerRole)

        const devRole = client.guilds.cache.get(rolesGuild).roles?.cache?.get(developerRole)

        if(!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD) || !interaction.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR)) return blad(`Nie posiadasz permisji \`MANAGE_GUILD\` lub \`ADMINISTRATOR\` Aby wykonać tą komendę!`, interaction)  

        //jezeli komenda jest dla developera a osoba nim nie jest, to trzeba wyslac wiadomosc i anulowac komende
        if(cmd.dev === true) if(!dev) return blad(`Nie posiadasz globalnej rangi \`${devRole.name}\` aby wykonać tą komendę!`, interaction)

        if(cmd.name !== "settings") database = require(`../databaseModel/${cmd.name}`)
        else database = "null"
        try {
            await cmd.run(interaction, blad_interaction, sukces_interaction, database);
        } catch (error) {
            console.log(error);
            await interaction.reply({ content: 'KOMENDA WALNEŁA ZGŁOŚ PROBLEM U DEVOPERA BOTA DZIEKUJE <3', ephemeral: true });
        }
    })
}