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
        fs.readFile('./accounts/hulu.txt', 'utf8', function(err, data) {
            if (err) throw err;

            data = data + '';
            var lines = data.split('\n');
            let account = lines[Math.floor(Math.random() * 1)];

            fs.writeFile('./accounts/hulu.txt', lines.slice(1).join('\n'), function(err) {
                if(err) throw err;
            });

            let embed = new Discord.RichEmbed()
            .addField('Hulu Hesap', `Random account (email:password): \n**${account}**`)
            .setThumbnail('https://images.squarespace-cdn.com/content/v1/580f0865e4fcb54017ec02a9/1480529771528-P2RL38OLEVMYPFTFJTDY/ke17ZwdGBToddI8pDm48kDrPwNVXYEunyd5GI-T5dTMUqsxRUqqbr1mOJYKfIPR7LoDQ9mXPOjoJoqy81S2I8N_N4V1vUb5AoIIIbLZhVYxCRW4BPu10St3TBAUQYVKcg9fczVaJk92qV3XWnAqJtnHiN02DyXXBVSr6YS9MzJ3nCmO-2pOmRLPoTHOSjmEm/image-asset.gif')
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
    name: `hulu`,
    description: `Sends you a hulu account!`
};