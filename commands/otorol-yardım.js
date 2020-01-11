const Discord = require('discord.js');
const db = require('quick.db')
exports.run = (client, message, args) => { 
  
  let yardım = new Discord.RichEmbed()
  .setAuthor(`${client.user.username} `,client.user.avatarURL)
  .addField('__**OTOROL ayarlamak**__', '**__$oto-rol-ayarla__ 》 Otorolü Ayarlar.** \n Örnek: `$otorolayarla @rolünüz #logkanalı` \n \n **$oto-rol-msg 》 Otorol Mesajını Ayarlar** \n Örnek: `$otorolmsg -server-, Sunucumuza Hoşgeldin, -uye-! -rol- Adlı Rolün Başarı İle Verildi Seninle Beraber, **-uyesayisi-** Kişiyiz.`')
  .addField('__**Kullanabileceğiniz Değişkenler**__',`
-uye- 》 Üyeyi Etiketler.
-rol- 》 Rolün İsmini Ekler.
-server- 》 Server İsmini Yazar.
-uyesayisi- 》 Üye Sayısını Atar.
-botsayisi- 》 Bot Sayısını Atar.
-kanalsayisi- 》 Kanal Sayısını Atar.
-bolge- 》 Sunucu Bölgesinin İsmini Atar.
( Botun Yetkisi hangi rol verilcekse onun üstünde olmalı.)
`)
 .setColor('RANDOM') 
 message.channel.send(yardım)





  };
exports.conf = {
  enabled: true,  
  guildOnly: false, 
  aliases: [], 
  permLevel: 0
};

exports.help = {
  name: 'otorol',
  description: 'otorol', 
  usage: 'otorol'
};