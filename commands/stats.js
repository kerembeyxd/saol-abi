const Discord = require('discord.js');
var fs = require('fs'); //FileSystem
let conf = JSON.parse(fs.readFileSync("./config.json", "utf8")); //Config file

module.exports.run = async (client, msg, args, config) => {
  var resp = 
    "**Bot statistics**:\n" +
    "Servers: " + client.guilds.size + "\n" + 
    "Users: " + client.users.size + "\n" + 
    "**Server statistics**:\n" +
    "Members: " + msg.guild.memberCount + "\n" + 
    "Online: " + msg.guild.members.filter(o => o.presence.status === 'online').size + "\n" +
    "Away: " + msg.guild.members.filter(i => i.presence.status === 'idle').size + "\n" +
    "Offline: " + msg.guild.members.filter(a => a.presence.status === 'offline').size;

  let embed = new Discord.RichEmbed()
    .setThumbnail('https://66.media.tumblr.com/7f0bf36eb2d24ebba452750a3e78475e/tumblr_pmblx3uVSZ1xinfpio2_r1_500.gif')
    .setColor(0xffffff)
    .setDescription(resp)
    .setTitle("Stats")
    .setFooter(msg + " | Owners : " );

  msg.channel.send(embed);
}
module.exports.help = {
    name: `stats`,
    description: `stats server`
};