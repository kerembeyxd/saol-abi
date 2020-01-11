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
        fs.readFile('./accounts/disney.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/disney.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Disney  Hesap', `Random account (email:password): \n**${account}**`)
            .setThumbnail('https://media1.tenor.com/images/b74869faf0d840eddc66df40d6d1e1f5/tenor.gif?itemid=13721891')
            .addField('**Kanal**', ` ID ⋙ ${msg.channel.id} `)
            .addField('**Kanal**', ` Adı ⋙ ${msg.channel.name}`)
            .addField('**Kulanıcı**', `ID ⋙ ${msg.author.id}`)
            .addField('**Kulanıcı**', `Adı ⋙ ${msg.author.username}`)
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
    name: `disney`,
    description: `Sends you a disney account!`
};