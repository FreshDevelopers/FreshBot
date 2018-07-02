const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {

  //.addrole @ThisIsAFreakinMember#0001 @Fluffy
  if(!message.member.hasPermission("MANGE_ROLES")) return message.reply("you dont have Permission to do that!");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rMember) return message.reply("i couldn't find a user.");
  let role = args.join(" ").slice(22);
  if(!role) return message.reply("you dont have specified a role.");
  let gRole = message.guild.roles.find(`name`, role);
  if(!gRole) return message.reply("i couldn't find that role.");

  if(rMember.roles.has(gRole.id));
  await(rMember.addRole(gRole.id));

    try{
      await rMember.send(`i had give you the role ${gRole.name}.`)
    }catch(e){
      message.channel.send(`<@${rMember.id}>, i've added the role ${gRole.name} to you. We tried to DM them, but their DMs are locked.`);
  }
}

module.exports.help = {
  name: "addrole"
}
