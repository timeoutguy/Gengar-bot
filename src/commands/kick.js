import { RichEmbed } from 'discord.js';
import errorMessage from '../utils/errorMessage';

exports.run = async (client, msg, args) => {
  // Verificando se o usuario que enviou a mensoagem possui permissão para kick
  // Caso não tenha ele envia uma mensagem de erro
  if (!msg.member.hasPermission(['KICK_MEMBERS'])) {
    msg.channel.send(errorMessage('Você não tem essa permissão'));
    return msg.delete();
  }

  // Armazenando o usuario mencionado em uma variavel
  const mentions = msg.guild.member(msg.mentions.users.first());

  // Se nenhum usuario for mencionado ele envia uma mensagem de erro
  if (!mentions) {
    msg.channel.send(errorMessage('Esse usúario não existe'));
    return msg.delete();
  }

  args.shift(0);// Removendo o usuario mencionado dos args

  const reason = args.join(' ');// Armazenando o motivo

  // Se o motivo for undefined ele envia uma mensagem de erro
  if (!reason) {
    msg.channel.send(errorMessage('Razão não informada'));
    return msg.delete();
  }
  await mentions.kick([reason]); // Kickando o usuario

  // Definindo mensagem do kick
  const embed = new RichEmbed()
    .setColor('#ff9900')
    .setTitle('Expulsão')
    .addField('Usuário expulso', `<@${mentions.user.id}> `)
    .addField('Expulso por', `<@${msg.author.id}> `)
    .addField('Motivo', reason)
    .addField('Horário', msg.createdAt)
    .addField('Expulso em', msg.channel)
    .setImage('https://media.giphy.com/media/u2LJ0n4lx6jF6/giphy.gif')
    .setTimestamp()
    .setFooter('GengarBot');

  // Definindo o canal pra enviar a mensaagem de ban
  const kickChannel = msg.guild.channels.find('name', '🔥│punição');
  // Mensagem enviada no canal "🔥│punição" informando os dados do ban
  return kickChannel.send(embed).then(msg.delete());
};
