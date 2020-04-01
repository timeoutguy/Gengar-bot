const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {

    const site = args[0];
    const login = args[1];
    const password = args[2];

    if(!site || !login || !password){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription(`Você não informou todos os dados`)
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed).then(msg.delete())
    }

    const embed = new RichEmbed()
        .setColor("#008000")
        .setTitle("Conta")
        .addField("Serviço", site, true)
        .addField("Login", login, true)
        .addField("Senha", password, true)
        .setTimestamp()
        .setFooter("GengarBot")
    
    return msg.channel.send(embed).then(msg => {
        msg.react("✅")
        msg.react("❌")
    })
}