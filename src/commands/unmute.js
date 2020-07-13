import { RichEmbed } from 'discord.js';
import errorMessage from '../utils/errorMessage';

exports.run = (client, msg) => {
  if (!msg.member.hasPermission(['MUTE_MEMBERS'])) {
    msg.channel.send(errorMessage('Você não tem essa permissão'));
    return msg.delete();
  }

  const mentions = msg.guild.member(msg.mentions.users.first());

  if (!mentions) {
    msg.channel.send(errorMessage('Você não informou o alvo'));
    return msg.delete();
  }

  mentions.setMute(false);

  const embed = new RichEmbed()
    .setColor('#008000')
    .setTitle(':white_check_mark: Pode falar bosta denovo')
    .setDescription(`O <@${mentions.user.id}> pode voltar a falar`)
    .addField('Unmute por', `<@${msg.author.id}>`)
    .setTimestamp()
    .setFooter('GengarBot');

  return msg.channel.send(embed).then(msg.delete());
};
