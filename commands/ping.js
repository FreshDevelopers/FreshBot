const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
    let pingembed = new Discord.RichEmbed()
    .setTitle(":ping_pong: **Pong!**")
    .addField("My Ping", bot.ping + "ms")
    .setColor(0x2ecc71);

    message.channel.send(pingembed);
}

module.exports.help = {
    name: "ping"
}
