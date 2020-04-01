const Discord = require('discord.js'); //Importando discord.js
const client = new Discord.Client(); //Iniciando o client

const config = require('./config.json'); //Importando o token de login do bot
const commands = require('./commands/comandos') //Objeto com os comanndos do bot

const prefix = config.prefix; // Prefixo
const active = new Map();

client.login(config.token); //fazendo login no client

//Quando o bot estiver pronto ele era imprimir uma mensagem no console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);

  client.user.setPresence({
    status: "online",
    game:{
      name: "Estou comendo o cu de quem ta lendo",
      type: "PLAYING"
    }
  })
});
//Recebe mensagem do usuario
client.on("message", msg => {

  if (!msg.content.startsWith(prefix) || msg.author.bot || !msg.guild) return;

  const args = msg.content.slice(prefix.length).trim().split(/ +/g);

  const command = args.shift().toLowerCase()

  if(!commands[command]){
    const embed = new Discord.RichEmbed()
      .setTitle(":x: Erro")
      .setColor("#7510f7")
      .setDescription(`O comando ${command} não existe`);

    msg.channel.send(embed)

    return;
  }

  let ops = {
    active: active
  }

  commands[command].run(client, msg, args, ops)
  
});
