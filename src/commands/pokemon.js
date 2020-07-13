import { RichEmbed } from 'discord.js';
import axios from 'axios';
import errorMessage from '../utils/errorMessage';

exports.run = async (client, msg, args) => {
  const pokemonName = args[0].toLowerCase();

  let pokemonDetails;

  await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
    .then((response) => {
      pokemonDetails = response.data;

      if (!pokemonDetails) {
        msg.channel.send(errorMessage(`Pokemon ${pokemonName} não encontrado :frowning: `));
        return msg.delete();
      }
    })
    .catch(() => {
      msg.channel.send(errorMessage('Um erro ocorreu :disappointed:'));
      return msg.delete();
    });

  const types = [];

  pokemonDetails.types.forEach((type) => {
    types.push(type.type.name);
  });

  const embed = new RichEmbed()
    .setColor('#008000 ')
    .setTitle(`:dragon:   ${pokemonDetails.name.toUpperCase()}`)
    .addField('Tipo', types, true)
    .addField('Número Pokedex', pokemonDetails.id, true)
    .addField('Pesquisa feita por', `<@${msg.author.id}>`)
    .setImage(pokemonDetails.sprites.front_default)
    .setTimestamp()
    .setFooter('GengarBot');
  return msg.channel.send(embed).then(msg.delete());
};
