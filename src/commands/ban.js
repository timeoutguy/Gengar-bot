const { RichEmbed } = require("discord.js");

exports.run = async (client, msg, args) => {
    //Verificando se o usuario que enviou a mensoagem possui permissão para banir
    //Caso não tenha ele envia uma mensagem de erro
    if (!msg.member.hasPermission(['BAN_MEMBERS'])) {
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você não tem essa permissão")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    //Armazenando o usuario mencionado em uma variavel
    const mentions = msg.guild.member(msg.mentions.users.first())

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

    args.shift(0); //Removendo o usuario mencionado dos args

    const reason = args.join(" "); //Armazenando o motivo


    // Se o motivo for undefined ele envia uma mensagem de erro
    if (!reason) {
        let embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Motivo não informada")
            .setTimestamp()
            .setFooter("GengarBot")
        return msg.channel.send(embed)
    }

    await mentions.ban() // Banindo o usuario

   //Definindo mensagem do ban
    const embed = new RichEmbed()
        .setColor("#ff0000")
        .setTitle(`🔨 Ban`)
        .addField("Usuário banido", `<@${mentions.user.id}>`)
        .addField("Banido por", `<@${msg.author.id}>`)
        .addField("Motivo", reason)
        .addField("Horário", msg.createdAt)
        .addField("Banido em", msg.channel)
        .setImage("https://media.giphy.com/media/fe4dDMD2cAU5RfEaCU/giphy.gif")
        .setTimestamp()
        .setFooter("GengarBot");

    //Definindo o canal pra enviar a mensaagem de ban
    const banChannel = msg.guild.channels.find(`name`, "🔥│punição");
    //Mensagem enviada no canal "🔥│punição" informando os dados do ban
    return banChannel.send(embed).then(msg.delete());
}