import { RichEmbed } from 'discord.js';
import errorMessage from '../utils/errorMessage';

exports.run = (client, msg, args) => {
  if (!msg.member.hasPermission(['MUTE_MEMBERS'])) {
    msg.channel.send(errorMessage('Você não tem essa permissão'));
    return msg.delete();
  }

  const mentions = msg.guild.member(msg.mentions.users.first());

  if (!mentions) {
    msg.channel.send(errorMessage('Você não informou o alvo'));
    return msg.delete();
  }

  args.shift(mentions);
  const reason = args.join(' ');

  mentions.setMute(true);

  const embed = new RichEmbed()
    .setColor('#ff9900')
    .setTitle(':mute:  Ta falando bosta?')
    .addField('Usuário silenciado', `<@${mentions.user.id}>`)
    .addField('Silenciado por', `<@${msg.author.id}>`)
    .addField('Motivo', reason)
    .setTimestamp()
    .setFooter('GengarBot');

  return msg.channel.send(embed).then(msg.delete());
};
