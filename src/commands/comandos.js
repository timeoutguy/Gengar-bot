const { RichEmbed } = require('discord.js');
const ytdl = require('ytdl-core-discord');
const giphyRandom = require('giphy-random');

const API_GIPHY = "oqgHY5xbXCPTdEQNLxwvkJGFe7qBRG5G";

module.exports = { 
    kick: {
        usage: "kick", // Comando
        desc: "Expulsa um usúario do servidor",  // Descrição do Comando
        run: async (client, msg, args) => { // Função do comando

            if(!msg.member.hasPermission(['KICK_MEMBERS'])){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Você não tem essa permissão")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            let user = msg.guild.member(msg.mentions.users.first())

            if(!user){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Esse usúario não existe")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            args.shift(0);

            let reason = args.join(" ");

            if(!reason){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Razão não informada")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            const { data } = await giphyRandom(API_GIPHY, {
                tag: "kick"
            })


            user.kick([reason])

            let embed = new RichEmbed()
                    .setColor("#7510f7")
                    .setTitle(`:leg: o usúario ${user} foi kickado`)
                    .setDescription(reason)
                    .setImage(data.image_original_url)
                    .setTimestamp()
                    .setFooter("GengarBot")
            return msg.channel.send(embed)

        }
    },

    user:{
        usage: "info",
        desc: "Exibe informações de um usúario",
        run: (client, msg, args) => {

            let user = msg.mentions.users.first();

            if(!user) return;
            
            const embed = new RichEmbed()
                .setColor("#7510f7")
                .setTitle("Informações do usuário")
                .setImage(user.avatarURL)
                .addField("Username", user.username, true)
                .addField("Código", `#${user.discriminator}`, true)
                .setTimestamp()
                .setFooter("GengarBot")
                
            console.log(msg.mentions.roles)
            msg.channel.send(embed).then(msg.delete())
        }
        
    },
    
    sorteio:{
        usage: "sorteio",
        desc: "Comando for fun",
        run: (client, msg, args) => {

            msg.channel.send("Sorteio pau no seu cú").then(msg.delete())
            
        }
    },

    play:{
        usage: "play",
        desc: "Reproduz uma música",
        run: async (client, msg, args, ops) => {

            console.log(args[0])

            if(!msg.member.voiceChannel){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Conecte-se a um canal")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            if(!args[0]){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Digite uma url válida. Ex: ")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            if(!ytdl.validateURL(args[0])){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Digite uma url válida. Ex: https://www.youtube.com/watch?v=47OAOn9onZI")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            let info = await ytdl.getInfo(args[0]);

            
            let connection = await msg.member.voiceChannel.join()

            let stream = await ytdl(`${args[0]}`)

            let dispatcher = await connection.playOpusStream(stream);

            msg.delete()

            let embed = new RichEmbed()
                .setColor("#7510f7")
                .setTitle(":musical_note: Reproduzindo")
                .addField("Nome", info.title)
                .addField("URL", args[0])
                .addField("Duração", (info.length_seconds / 60).toFixed(2))
                .addField("Adicionada por", msg.author)
                .setImage(info.thumbnail_url)

            msg.channel.send(embed)
            
        }
    },
    leave: {
        usage: "leave",
        desc: "Faz o bot sair da sala e para a música",
        run: (client, msg, args) => {

            if(!msg.member.voiceChannel){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Conecte-se a um canal")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            if(!msg.guild.me.voiceChannel){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("O bot não está em nenhuma sala")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            if(msg.guild.me.voiceChannelID !== msg.member.voiceChannelID){
                let embed = new RichEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: Erro")
                    .setDescription("Você e o bot não estão na mesma sala")
                    .setTimestamp()
                    .setFooter("GengarBot")
                return msg.channel.send(embed)
            }

            msg.guild.me.voiceChannel.leave();

            msg.delete()

            let embed = new RichEmbed()
                    .setColor("#7510f7")
                    .setTitle(":middle_finger: Fui embora")
                    .setDescription(`O bot foi removido com sucesso por ${msg.author}`)
                    .setTimestamp()
                    .setFooter("GengarBot")
            return msg.channel.send(embed)

            
        }
    }
    
}