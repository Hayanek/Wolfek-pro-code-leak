const { MessageAttachment } = require("discord.js");
QRCode = require('qrcode');
module.exports = {
    name: "qr",
    aliases: ["qrcode", "qr-code"],
    description: "Generator kodu qr",
    usage: "<tekst/link>",
    cooldown: 10,
    args: true,
    async run(msg, args) {
        const arks = [...args].slice(0).join(" ")

        let image = await QRCode.toBuffer(arks)

        let obaz = new MessageAttachment(image, "qrcode.png")

        msg.channel.send({ files: [obaz] })
    }
}