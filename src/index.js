const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
  if (msg.content.toUpperCase()  === 'IMPOSTO') {
    msg.reply('É necessário para que a sociedade se mantenha!');
  }
  if (msg.content.toUpperCase()  === 'ANCAP') {
      msg.reply('Todo ancap é incel!');
  }
  if (msg.content.toUpperCase()  === 'LIVROS'){
      msg.reply('Lista de leituras para o libertário iniciante https://bunkerlibertario.com/lista/lista-de-leituras-para-o-libertario-iniciante/')
  }
  if (msg.content.toUpperCase() === 'ABORTAR'){
      msg.reply('Abortar é bom d++++')
  }
});

console.log(client);
client.login('NjA2OTY4OTc4NTg5NjE0MDgw.XUSzIg.qpKgA_nqcberhrjtP_D-nCrjydk');