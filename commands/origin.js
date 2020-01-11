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
        fs.readFile('./accounts/origin.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/origin.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('origin account', `Random account (email:password): \n**${account}**`)
            .setThumbnail('https://static.fabrik.io/tno/92d6bd4b77702e48.gif?auto=compress&w=1280&h=1280&fit=max&s=55b1e4310e8305b7923f5c3e707bdc8e')
            .addField('**Channel**', ` ID ⋙ ${msg.channel.id} `)
            .addField('**Channel**', ` Name ⋙ ${msg.channel.name}`)
            .addField('**User**', `ID ⋙ ${msg.author.id}`)
            .addField('**User**', `Name ⋙ ${msg.author.username}`)
            .setColor('RANDOM')
            .setFooter('Yapımcı by WoxRae   ')
            
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
    name: `origin`,
    description: `Sends you a origin account!`
};