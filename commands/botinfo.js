const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
    
    let bicon = bot.user.displayAvatarURL
        let botembed = new Discord.RichEmbed()
        .setDescription("Botinfo")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("Bot Name", bot.user.username)
        .addField("Bot ID", bot.user.id)
        .addField("Bot Owner", "<@346680223082741770> , <@369005267158827024>  & <@384073151598034944>")
        .addField("Created On", bot.user.createdAt)   
        .setTimestamp();

        message.channel.send(botembed);
};

module.exports.help = {
    name: "botinfo"
};
