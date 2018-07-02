const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.reply("you dont have Permission to do that!");
    let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!rMember) return message.reply("i couldn't find a user.");
    let role = args.join(" ").slice(22);
    if(!role) return message.reply("you dont have specified a role.");
    let gRole = message.guild.roles.find(`name`, role);
    if(!gRole) return message.reply("i couldn't find that role.");

    if(!rMember.roles.has(gRole.id)) return message.reply("he/she doesn't have that role.");
    await(rMember.removeRole(gRole.id));

    try{
      await rMember.send(`you removed from the ${gRole.name} role.`);
    }catch(e){
      message.channel.send(`<@${rMember.id}>, i removed the role ${gRole.name} from you. We tried to DM you, but your DM are locked.`)
  }
}

module.exports.help = {
  name: "removerole"
}
