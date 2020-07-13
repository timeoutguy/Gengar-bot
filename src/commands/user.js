import { RichEmbed } from 'discord.js';
import errorMessage from '../utils/errorMessage';

exports.run = (client, msg, args) => {
  const user = msg.mentions.users.first();

  if (!user) {
    msg.channel.send(errorMessage(`:x: Erro usuário ${args} não encontrado`));
    return msg.delete();
  }

  const embed = new RichEmbed()
    .setColor('#7510f7')
    .setTitle('Informações do usuário')
    .setImage(user.avatarURL)
    .addField('Username', user.username, true)
    .addField('Código', `#${user.discriminator}`, true)
    .setTimestamp()
    .setFooter('GengarBot');

  return msg.channel.send(embed).then(msg.delete());
};
