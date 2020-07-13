import { RichEmbed } from 'discord.js';
import axios from 'axios';
import errorMessage from '../utils/errorMessage';

const API_KEY = 'f70e0643c5fb15cdc6c02c8721a54994';

exports.run = async (client, msg, args) => {
  const movie = args.join(' ');

  let movieDetails;

  await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=pt-BR&query=${movie}&page=1&include_adult=true`)
    .then((response) => {
      movieDetails = response.data.results[0];
    })
    .catch(() => {
      msg.channel.send(errorMessage('Um erro ocorreu :disappointed:'));
      return msg.delete();
    });

  if (!movieDetails) {
    msg.channel.send(errorMessage(`Filme ${movie} não encontrado :frowning: `));
    return msg.delete();
  }

  const embed = new RichEmbed()
    .setColor('#008000 ')
    .setTitle(`:popcorn:  ${movieDetails.title}`)
    .addField('Avaliação', movieDetails.vote_average, true)
    .addField('Data de lançamento', movieDetails.release_date, true)
    .addField('Pesquisa feita por', `<@${msg.author.id}>`)
    .setImage(`http://image.tmdb.org/t/p/w185${movieDetails.poster_path}`)
    .setTimestamp()
    .setFooter('GengarBot');
  return msg.channel.send(embed).then(msg.delete());
};
