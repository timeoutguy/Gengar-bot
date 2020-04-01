const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {

    if (!msg.member.voiceChannel) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Conecte-se a um canal")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    if (!msg.guild.me.voiceChannel) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("O bot não está em nenhuma sala")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    if (msg.guild.me.voiceChannelID !== msg.member.voiceChannelID) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você e o bot não estão na mesma sala")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    msg.guild.me.voiceChannel.leave();

    msg.delete()

    let embed = new RichEmbed()
        .setColor("#7510f7")
        .setTitle(":middle_finger: Fui embora")
        .setDescription(`O bot foi removido com sucesso por ${msg.author}`)
        .setTimestamp()
        .setFooter("GengarBot")
    return msg.channel.send(embed)


}