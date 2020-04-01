const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {

    let user = msg.mentions.users.first();

    if (!user) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(`:x: Erro usuário ${args} não encontrado`)
            .setTimestamp()
            .setFooter("GengarBot")

        return msg.channel.send(embed).then(msg.delete())
    };

    const embed = new RichEmbed()
        .setColor("#7510f7")
        .setTitle("Informações do usuário")
        .setImage(user.avatarURL)
        .addField("Username", user.username, true)
        .addField("Código", `#${user.discriminator}`, true)
        .setTimestamp()
        .setFooter("GengarBot")

    return msg.channel.send(embed).then(msg.delete())
}