const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {
    if (!msg.member.hasPermission(['MUTE_MEMBERS'])) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você não tem essa permissão")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    const mentions =  msg.guild.member(msg.mentions.users.first());

    if(!mentions){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você não informou o alvo")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    mentions.setMute(false)

    const embed = new RichEmbed()
        .setColor("#008000")
        .setTitle(":white_check_mark: Pode falar bosta denovo")
        .setDescription(`O <@${mentions.user.id}> pode voltar a falar`)
        .addField("Unmute por",  `<@${msg.author.id}>`)
        .setTimestamp()
        .setFooter("GengarBot")

    return msg.channel.send(embed).then(msg.delete());

}