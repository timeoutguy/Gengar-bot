import { RichEmbed } from 'discord.js';
import errorMessage from '../utils/errorMessage';

exports.run = (client, msg) => {
  // Verificando se o autor da mensagem está em uma sala de voz
  if (!msg.member.voiceChannel) {
    msg.channel.send(errorMessage('Conecte-se a um canal'));
    return msg.delete();
  }

  // Verificando se o bot está em uma sala de voz
  if (!msg.guild.me.voiceChannel) {
    msg.channel.send(errorMessage('O bot não está em nenhuma sala'));
    return msg.delete();
  }

  // Verificando se o bot e o autor estão na mesma sala de voz
  if (msg.guild.me.voiceChannelID !== msg.member.voiceChannelID) {
    msg.channel.send(errorMessage('Você e o bot não estão na mesma sala'));
    return msg.delete();
  }

  msg.guild.me.voiceChannel.leave(); // Bot saindo da sala

  msg.delete(); // Deletando mensagem do

  const embed = new RichEmbed()
    .setColor('#7510f7')
    .setTitle(':wave:  Bye')
    .setDescription(`O bot foi removido com sucesso por ${msg.author}`)
    .setTimestamp()
    .setFooter('GengarBot');
  return msg.channel.send(embed);
};
