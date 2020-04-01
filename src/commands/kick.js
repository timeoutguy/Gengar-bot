const { RichEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission(['KICK_MEMBERS'])) {
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
            .setDescription("Razão não informada")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }


    user.kick([reason])

    const embed = new RichEmbed()
        .setColor("#ff9900")
        .setTitle(`Expulsão`)
        .addField("Usuário expulso", `<@${user.user.id}>`)
        .addField("Expulso por", `<@${msg.author.id}>`)
        .addField("Motivo", reason)
        .addField("Horário", msg.createdAt)
        .addField("Expulso em", msg.channel)
        .setImage("https://media.giphy.com/media/u2LJ0n4lx6jF6/giphy.gif")
        .setTimestamp()
        .setFooter("GengarBot");

    const kickChannel = msg.guild.channels.find(`name`, "🔥│punição");
    return kickChannel.send(embed).then(msg.delete());

}