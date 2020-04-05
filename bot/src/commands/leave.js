const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {

    //Verificando se o autor da mensagem está em uma sala de voz
    if (!msg.member.voiceChannel) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Conecte-se a um canal")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    //Verificando se o bot está em uma sala de voz
    if (!msg.guild.me.voiceChannel) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("O bot não está em nenhuma sala")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    //Verificando se o bot e o autor estão na mesma sala de voz
    if (msg.guild.me.voiceChannelID !== msg.member.voiceChannelID) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você e o bot não estão na mesma sala")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    msg.guild.me.voiceChannel.leave();  //Bot saindo da sala

    msg.delete() //Deletando mensagem do

    let embed = new RichEmbed()
        .setColor("#7510f7")
        .setTitle(":wave:  Bye")
        .setDescription(`O bot foi removido com sucesso por ${msg.author}`)
        .setTimestamp()
        .setFooter("GengarBot")
    return msg.channel.send(embed)


}