const Discord = require('discord.js'); //Importando discord.js
const client = new Discord.Client(); //Iniciando o client
require('dotenv').config();

const prefix = process.env.PREFIX; // Prefixo

client.login(process.env.CLIENT_TOKEN); //fazendo login no client

//Quando o bot estiver pronto ele exibe uma mensagem no console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`); //Mensagem exibida quando o bot está online

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

  if (!msg.content.startsWith(prefix) || msg.author.bot || !msg.guild) return; //Caso a mensagem seja do proprio bot, comece sem o prefixo ou seja enviada  fora do server ele para

  const args = msg.content.slice(prefix.length).trim().split(/ +/g); //removendo o prefixo da mensagem

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