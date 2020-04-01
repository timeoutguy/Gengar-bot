 const { RichEmbed } = require('discord.js');
 const ytdl = require('ytdl-core')

 exports.run = async (client, msg, args, ops) => {
     console.log(args[0])

     if (!msg.member.voiceChannel) {
         let embed = new RichEmbed()
             .setColor("#ff0000")
             .setTitle(":x: Erro")
             .setDescription("Conecte-se a um canal")
             .setTimestamp()
             .setFooter("GengarBot")
         return msg.channel.send(embed)
     }

     if (!args[0]) {
         let embed = new RichEmbed()
             .setColor("#ff0000")
             .setTitle(":x: Erro")
             .setDescription("Digite uma url válida. Ex: ")
             .setTimestamp()
             .setFooter("GengarBot")
         return msg.channel.send(embed)
     }

     if (!ytdl.validateURL(args[0])) {
         let embed = new RichEmbed()
             .setColor("#ff0000")
             .setTitle(":x: Erro")
             .setDescription("Digite uma url válida. Ex: https://www.youtube.com/watch?v=47OAOn9onZI")
             .setTimestamp()
             .setFooter("GengarBot")
         return msg.channel.send(embed)
     }

     let info = await ytdl.getInfo(args[0]);


     let connection = await msg.member.voiceChannel.join()

     let stream = await ytdl(`${args[0]}`)

     let dispatcher = await connection.playOpusStream(stream);

     msg.delete()

     let embed = new RichEmbed()
         .setColor("#7510f7")
         .setTitle(":musical_note: Reproduzindo")
         .addField("Nome", info.title)
         .addField("URL", args[0])
         .addField("Duração", (info.length_seconds / 60).toFixed(2))
         .addField("Adicionada por", msg.author)
         .setImage(info.thumbnail_url)

     msg.channel.send(embed)

 }