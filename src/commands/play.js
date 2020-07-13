import { RichEmbed } from 'discord.js';
import ytdl from 'ytdl-core';
import errorMessage from '../utils/errorMessage';

exports.run = async (client, msg, args) => {
  if (!msg.member.voiceChannel) {
    msg.channel.send(errorMessage('Conecte-se a um canal'));
    return msg.delete();
  }

  if (!args[0]) {
    msg.channel.send(errorMessage('Digite uma url válida. Ex: https://www.youtube.com/watch?v=47OAOn9onZI'));
    return msg.delete();
  }

  if (!ytdl.validateURL(args[0])) {
    msg.channel.send(errorMessage('Digite uma url válida. Ex: https://www.youtube.com/watch?v=47OAOn9onZI'));
    return msg.delete();
  }

  const info = await ytdl.getInfo(args[0]);

  const connection = await msg.member.voiceChannel.join();

  const stream = await ytdl(`${args[0]}`);

  await connection.playOpusStream(stream);

  msg.delete();

  const embed = new RichEmbed()
    .setColor('#7510f7')
    .setTitle(':musical_note: Reproduzindo')
    .addField('Nome', info.title)
    .addField('URL', args[0])
    .addField('Duração', (info.length_seconds / 60).toFixed(2))
    .addField('Adicionada por', msg.author)
    .setImage(info.thumbnail_url);

  return msg.channel.send(embed);
};
