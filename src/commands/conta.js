const { RichEmbed } = require('discord.js');

exports.run = (client, msg, args) => {

    const site = args[0]; //Extraindo o site do Args
    const login = args[1]; //Extraindo o login do Args
    const password = args[2]; //Extraindo a senha do Args

    //Se algum dos argumentos for vazio envia uma mensagem de erro
    if(!site || !login || !password){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription(`Você não informou todos os dados`)
            .setTimestamp()
            .setFooter("GengarBot");
        return msg.channel.send(embed).then(msg.delete());
    }

    //Definindo mensagem com os dados da conta
    const embed = new RichEmbed()
        .setColor("#008000")
        .setTitle("Conta")
        .addField("Serviço", site, true)
        .addField("Login", login, true)
        .addField("Senha", password, true)
        .setTimestamp()
        .setFooter("GengarBot");

    //Enviando os dados e reagindo a eles
    return msg.channel.send(embed).then(msg => {
        msg.react("✅");
        msg.react("❌");
    });
};