const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

fs.readdir("./commands", (err, files) => {

    if(err) console.log(err);

    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if(jsfile.length <= 0){
      console.log("Couldn't find commands.")
      return;
    }

      jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    });

});

bot.on("ready", async () =>  {
    console.log(`${bot.user.username} is online on ${bot.guilds.size} Guilds with ${bot.users.size} Users`)
    bot.user.setActivity(botconfig.game, {type: "PLAYING"});
});


bot.on('voiceStateUpdate', (mold, mnew) => {
    let guild = mnew.guild
          
      let voicealt = mold.voiceChannel
      let voiceneu = mnew.voiceChannel
      let logchannel = guild.channels.find("name", 'log_voice')
      if(!logchannel) return
      if (!voicealt && voiceneu) {
          let joinEmbed = new Discord.RichEmbed()
              .setDescription(`**${mnew.displayName}** joined \`${voiceneu.name}\``)
              .setFooter(new Date())
              .setThumbnail(mnew.displayAvatarURL)
          logchannel.send(joinEmbed)
      }
      else if (voicealt && !voiceneu) {
          let leftEmbed = new Discord.RichEmbed()
              .setDescription(`**${mnew.displayName}** left \`${voicealt.name}\``)
              .setFooter(new Date())
              .setThumbnail(mnew.displayAvatarURL)
              logchannel.send(leftEmbed)      
      }
      else if (voicealt && voiceneu && voicealt.id != voiceneu.id) {
          let wentEmbed = new Discord.RichEmbed()
              .setTitle(`**${mnew.displayName}** went from \`${voicealt.name}\` to \`${voiceneu.name}\``)
              .setFooter(new Date())
              .setThumbnail(mnew.displayAvatarURL)
          logchannel.send(wentEmbed)        
      }
    })


bot.on("message", async message => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;

    let prefix = botconfig.prefix;
    if(!message.content.startsWith(prefix)) return;

    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    let commandfile = bot.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot,message,args)

  });

bot.login(botconfig.token);
