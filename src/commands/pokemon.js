const { RichEmbed } = require('discord.js');
const axios = require('axios').default;

exports.run = async (client, msg, args) =>{

    const pokemonName = args[0].toLowerCase();

    let pokemonDetails

    await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
        .then((response) => {
            pokemonDetails = response.data;

            if(!pokemonDetails){
                const embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription(`Filme ${movie} não encontrado :frowning: `)
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed).delete()
            }
        })
        .catch((err) => {
            console.log(err);
            const embed = new RichEmbed()
                .setColor("#ff0000")
                .setTitle(":x: Erro")
                .setDescription(`Um erro ocorreu :disappointed:`)
                .setTimestamp()
                .setFooter("GengarBot")
            return msg.channel.send(embed).then(msg.delete());
        })

    let types = [];

    pokemonDetails.types.forEach((type) => {
        types.push(type.type.name);
    });

    const embed = new RichEmbed()
        .setColor("#008000 ")
        .setTitle(`:popcorn:  ${pokemonDetails.name}`)
        .addField("Tipo", types, true)
        .addField("Número Pokedex", pokemonDetails.id, true)
        .addField("Pesquisa feita por", `<@${msg.author.id}>`)
        .setImage(pokemonDetails.sprites.front_default)
        .setTimestamp()
        .setFooter("GengarBot")
    return msg.channel.send(embed).then(msg.delete());

}