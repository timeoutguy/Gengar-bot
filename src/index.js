const Discord = require('discord.js');
const client = new Discord.Client(); //Iniciando o client
require('dotenv').config();

const PREFIX = process.env.PREFIX; // Prefixo
const TOKEN = process.env.CLIENT_TOKEN;

client.login(TOKEN) //fazendo login no client

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: "online", //Status do bot
    game: { //Mensagem do bot
      name: "Em desenvolvimento",
      type: "PLAYING"
    }
  })
});

//Recebe mensagem do usuario
client.on("message", msg => {

  //Caso a mensagem seja do proprio bot, comece sem o prefixo ou seja enviada na DM, a mensagem é ignorada
  if (!msg.content.startsWith(PREFIX) || msg.author.bot || !msg.guild) return;

  const args = msg.content.slice(PREFIX.length).trim().split(/ +/g); //removendo o prefixo da mensagem

  const command = args.shift().toLowerCase()  //Separado o comando dos argumentos

  try {

    let Path = require('./commands/' + command + ".js") //Definindo o arquivo do comando
    return Path.run(client, msg, args) //Executando o comando

  } catch (err) {

    const embed = new Discord.RichEmbed() //Definindo mensagem caso o comanndo não exista
      .setTitle(":x: Erro")
      .setColor("#7510f7")
      .setDescription(`O comando ${command} não existe`);

    console.log(err)

    return msg.channel.send(embed).then(msg.delete()); //Enviando a mensagem e deletando a do usuario

  }
});