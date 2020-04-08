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

    args.shift(mentions);
    const reason = args.join(" ");

    mentions.setMute(true)

    const embed = new RichEmbed()
        .setColor("#ff9900")
        .setTitle(":mute:  Ta falando bosta?")
        .addField("Usuário silenciado", `<@${mentions.user.id}>`)
        .addField("Silenciado por", `<@${msg.author.id}>`)
        .addField("Motivo", reason)
        .setTimestamp()
        .setFooter("GengarBot")

    return msg.channel.send(embed).then(msg.delete());

}