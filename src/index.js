const Discord = require('discord.js'); //Importando discord.js
const client = new Discord.Client(); //Iniciando o client

const login = require('./login.json'); //Importando o token de login do bot

client.login(login.token); //fazendo login no client

//Objeto com os comanndos do bot
const comandos = {
  gado(msg) {
    msg.reply('Para ver meus comandos digite "gado_help"');
  },
  gado_abortar(msg) {
    msg.reply('Abortar é bom d++++');
  },
  gado_ancap(msg) {
    msg.reply('Todo ancap é incel');
  },
  gado_imposto(msg) {
    msg.reply('É roubo')
  },
}

//Quando o bot estiver pronto ele era imprimir uma mensagem no console
client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

//Mensagem de boas vindas
client.on('guildMemberAdd', member => {
  let channel = member.guild.channels.find(ch => ch.name === 'bem-vindo');

  channel.send(`Bem vindo ao servidor, ${member}. Para ver meus comandos digite "gado_help"`);
})

//Recebe mensagem do usuario
client.on("message", msg => {
  let messageContent = msg.content; //Armazenando o conteudo da mensagem
  let command = comandos[messageContent.toLowerCase()]; //Buscando o comando no objeto

  if(msg.author.bot) return;
  if(msg.channel.type === "dm") return;

  //Verificando se o comando existe
  if (command) {
    command(msg)
  }
  if (messageContent === "gado_help") {
    for (const command in comandos) {
      msg.channel.send(command)
    }
  }
});
