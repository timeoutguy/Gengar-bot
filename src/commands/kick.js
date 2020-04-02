const { RichEmbed } = require('discord.js')

exports.run = async (client, msg, args) => {
    //Verificando se o usuario que enviou a mensoagem possui permissão para kick
    //Caso não tenha ele envia uma mensagem de erro
    if (!msg.member.hasPermission(['KICK_MEMBERS'])) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você não tem essa permissão")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    //Armazenando o usuario mencionado em uma variavel
    const mentions = msg.guild.member(msg.mentions.users.first());

    //Se nenhum usuario for mencionado ele envia uma mensagem de erro
    if (!mentions) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Esse usúario não existe")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    args.shift(0);//Removendo o usuario mencionado dos args

    const reason = args.join(" ");//Armazenando o motivo

    // Se o motivo for undefined ele envia uma mensagem de erro
    if (!reason) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Razão não informada")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }


    await mentions.kick([reason]); //Kickando o usuario

    //Definindo mensagem do kick
    const embed = new RichEmbed()
        .setColor("#ff9900")
        .setTitle(`Expulsão`)
        .addField("Usuário expulso", `<@${mentions.1.id}>`)
        .addField("Expulso por", `<@${msg.author.id}>`)
        .addField("Motivo", reason)
        .addField("Horário", msg.createdAt)
        .addField("Expulso em", msg.channel)
        .setImage("https://media.giphy.com/media/u2LJ0n4lx6jF6/giphy.gif")
        .setTimestamp()
        .setFooter("GengarBot");

    //Definindo o canal pra enviar a mensaagem de ban
    const kickChannel = msg.guild.channels.find(`name`, "🔥│punição");
    //Mensagem enviada no canal "🔥│punição" informando os dados do ban
    return kickChannel.send(embed).then(msg.delete());

}