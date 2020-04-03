const { RichEmbed } = require('discord.js');

exports.run = async (client, msg, args) => {
    if(!msg.member.hasPermission('MANAGE_CHANNELS')){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("Você não tem essa permissão")
            .setTimestamp()
            .setFooter("GengarBot");
        return msg.channel.send(embed)
    }

    const messagesToDelete = parseInt(args) + 1;

    if(messagesToDelete === NaN){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("O número digitado é inválido")
            .setTimestamp()
            .setFooter("GengarBot");
        return msg.channel.send(embed)
    }

    if(messagesToDelete < 2){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("O número de mensagens deletadas não pode ser menor que 1")
            .setTimestamp()
            .setFooter("GengarBot");
        return msg.channel.send(embed)
    }

    if(messagesToDelete > 100){
        const embed = new RichEmbed()
            .setColor("#ff0000")
            .setTitle(":x: Erro")
            .setDescription("O número digitado não pode ser maior que 100")
            .setTimestamp()
            .setFooter("GengarBot");
        return msg.channel.send(embed)
    }

    await msg.channel.fetchMessages({limit: messagesToDelete })
        .then(messages => {
            msg.channel.bulkDelete(messages);
        });

    const embed = new RichEmbed()
        .setColor("#008000 ")
        .setTitle("Mensagens deletadas")
        .setDescription(`${messagesToDelete - 1} mensagens foram deletadas por <@${msg.author.id}>`)
        .setTimestamp()
        .setFooter("GengarBot");
    return msg.channel.send(embed)
};