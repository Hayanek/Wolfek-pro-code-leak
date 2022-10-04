function clean(text) {
    if (typeof(text) === "string")
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}

const { MessageEmbed } = require('discord.js');
const colors = require('../../config/kolorki.json');
const Discord = require('discord.js');
module.exports = {
    name: "eval",
    description: "Wykonywanie kodu z poziomu chatu discorda",
    usage: "<kod>",
    args: true,
    dev: true,
    async run(msg, args, blad, sukces){
    try {

        if(args[0].toLowerCase().includes(".env") || args[0].toLowerCase().includes("token")){
            const emoji = msg.client.emojis.cache.get("846684347913863178");
            return msg.channel.send({ content: emoji.toString()})
        }

        const codeToEval = args.join(" ");
        let evaled = eval(codeToEval);
        if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);

        const embedEval = new MessageEmbed()
        .setTitle(`Eval: 💻`)
        .addField(`Evaled: 📥`, `\`\`\`js\n${codeToEval}\n\`\`\``, false)
        .addField(`Output: 📤`, `\`\`\`js\n${clean(evaled)}\n\`\`\``, false)
        .setColor(colors["Green"])
        .setTimestamp()
        return msg.channel.send({ embeds: [embedEval]})

        } catch (e){
            const embedEval = new MessageEmbed()
            .setTitle(`Eval: 💻`)
            .addField(`Error: ❌`, `\`\`\`${e}\`\`\``, true)
            .setColor(colors["Red"])
            .setTimestamp()
            return msg.channel.send({ embeds: [embedEval]})
        }
    }
}