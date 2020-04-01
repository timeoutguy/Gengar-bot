const { RichEmbed } = require("discord.js");

exports.run = async (client, msg, args) => { 
    if (!msg.member.hasPermission(['BAN_MEMBERS'])) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você não tem essa permissão")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    const user = msg.guild.member(msg.mentions.users.first())

    if (!user) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Esse usúario não existe")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    args.shift(0);

    const reason = args.join(" ");

    if (!reason) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Motivo não informada")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }


    user.kick([reason])

    const embed = new RichEmbed()
        .setColor("#ff0000")
        .setTitle(`🔨 Ban`)
        .addField("Usuário banido", `<@${user.user.id}>`)
        .addField("Banido por", `<@${msg.author.id}>`)
        .addField("Motivo", reason)
        .addField("Horário", msg.createdAt)
        .addField("Banido em", msg.channel)
        .setImage("https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif")
        .setTimestamp()
        .setFooter("GengarBot");

    const kickChannel = msg.guild.channels.find(`name`, "🔥│punição");
    return kickChannel.send(embed).then(msg.delete());
}