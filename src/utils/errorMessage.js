import { RichEmbed } from 'discord.js';

const errorMessage = desc => {
    const embed = new RichEmbed()
        .setColor("#ff0000")
        .setTitle(":x: Erro")
        .setDescription(desc)
        .setTimestamp()
        .setFooter("GengarBot")
    return embed
}

export default errorMessage;