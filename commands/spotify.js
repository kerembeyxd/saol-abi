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
        fs.readFile('./accounts/spotify.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/spotify.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('spotify account', `Random account (email:password): \n**${account}**`)
            .setThumbnail('http://static1.squarespace.com/static/5481bc79e4b01c4bf3ceed80/54870eabe4b019ee83106008/5aaa9fd670a6adc35af0f1cb/1521131585367/276f273d11f8b9dbc0a9c55bb38ea8c6.gif?format=1500w')
            .addField('**Kanal**', ` ID ⋙ ${msg.channel.id} `)
            .addField('**Kanal**', ` Adı ⋙ ${msg.channel.name}`)
            .addField('**Kulanıcı**', `ID ⋙ ${msg.author.id}`)
            .addField('**Kulanıcı**', `Adı ⋙ ${msg.author.username}`)
            .setColor('RANDOM')
            .setFooter('Bot made by WoxRae   ')
            
            .setTimestamp();
            msg.author.send(embed);
            msg.reply('ÖZELE BAK MORUK :)')
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
    name: `spotify`,
    description: `Sends you a spotify account!`
};