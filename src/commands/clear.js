const { RichEmbed } = require('discord.js');
import errorMessage from '../utils/errorMessage';

exports.run = async (client, msg, args) => {
    if (!msg.member.hasPermission('MANAGE_CHANNELS')) {
        msg.channel.send(errorMessage("Você não tem essa permissão"))
        return msg.delete()
    }

    const messagesToDelete = parseInt(args) + 1;

    if (messagesToDelete === NaN) {
        msg.channel.send(errorMessage("O número digitado é inválido"))
        return msg.delete()
    }

    if (messagesToDelete < 2) {
        msg.channel.send(errorMessage("O número de mensagens deletadas não pode ser menor que 1"))
        return msg.delete()
    }

    if (messagesToDelete > 100) {
        msg.channel.send(errorMessage("O número digitado não pode ser maior que 100"))
        return msg.delete()
    }

    await msg.channel.fetchMessages({ limit: messagesToDelete })
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