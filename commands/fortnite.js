const Discord = require('discord.js');
const fs = require('fs');
const cooldown = new Set();

module.exports.run = async (client, msg, args, config) => {
    if(cooldown.has(msg.author.id)) {
        msg.reply(`You need to wait ${config.COOLDOWN} minutes to use this command again!`)
            .then((m) => {
                msg.delete();

                setTimeout(() => {
                    m.delete();
                }, 5000);
            });
    } else {
        fs.readFile('./accounts/fortnite.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/fortnite.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Fortnite account', `Random account (email:password): \n**${account}**`)
            .setThumbnail('https://66.media.tumblr.com/7f0bf36eb2d24ebba452750a3e78475e/tumblr_pmblx3uVSZ1xinfpio2_r1_500.gif')
            .addField('**Kanal**', ` ID ⋙ ${msg.channel.id} `)
            .addField('**Kanal**', ` Adı ⋙ ${msg.channel.name}`)
            .addField('**Kulanıcı**', `ID ⋙ ${msg.author.id}`)
            .addField('**Kulanıcı**', `Adı ⋙ ${msg.author.username}`)
            .setColor('RANDOM')
            .setFooter('Bot made by Nights   ')
            
            
            .setTimestamp();

            msg.author.send(embed);

            msg.reply('I\'ve sent you the account! Please check your DM!')
                .then(m => {
                    setTimeout(() => {
                        m.delete();
                    }, 5000);
                });

            cooldown.add(msg.author.id);
            setTimeout(() => {
                cooldown.delete(msg.author.id);
            }, config.COOLDOWN * 60 * 1000);
        });
    }
};

module.exports.help = {
    name: `fortnite`,
    description: `Sends you a Fortnite account!`
};