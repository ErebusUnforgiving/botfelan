const Discord = require('discord.js');
const db = require('quick.db');

module.exports = {
    name: 'erkek',
    aliases: ['erkek', 'e', 'man', 'boy'],
    run: async(client, message, args) => {
        let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Erébus Was Here!');
        let embed2 = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('#640032').setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Erébus Was Here!');

        if (!client.config.mods.some(id => message.member.roles.cache.has(id))) {
            return message.channel.send(embed.setDescription("Komutu kullanan kullanıcıda yetki bulunmamakta!"))
        }
        
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!member) return message.channel.send(embed.setDescription("Kullanıcı bulunamadı veya etiketlenmedi!"))
      
        let name = args[1]
        if (!name) return message.channel.send(embed.setDescription("Kullanıcı için bi isim yazılmak zorunda!"))

        let age = args[2]
        if (!age) return message.channel.send(embed.setDescription("Kullanıcı için bir yaş yazılmak zorunda!"))

        if (!["⁰⁷"].some(ss => member.user.username.toLowerCase().includes(ss)) && member.user.discriminator !== "0007" && !message.guild.members.cache.get(member.id).roles.cache.has('824149056036667400' && '824165861337071636')) {
            return message.channel.send(new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setDescription("Kullanıcının kayıt olabilmesi için boost basmalı veya tag almalı!").setTimestamp().setThumbnail(message.author.avatarURL).setFooter('Vip almak için : .vip @kullanıcı/id'))
        }
        message.guild.members.cache.get(member.id).setNickname(`⁰⁷ ${name} | ${age}`)
        db.push(`isimler_${member.id}`, ` \`⁰⁷ ${name} | ${age}\` (<@&824149056036667398>,<@&824166949562220544>)`);
        db.set(`kayıt_${member.id}`, true)
        db.add(`erkek_${message.author.id}`, 1)
        await message.guild.members.cache.get(member.id).roles.remove(client.config.unregisteres)
        await message.guild.members.cache.get(member.id).roles.add(client.config.maleRoles)
        message.channel.send(embed2.setDescription(`${member} adlı kullanıcı\`⁰⁷ ${name} | ${age}\` isminde  kayıt edildi! Kullanıcıya verilen roller: <@&824149056036667398>,<@&824166949562220544>`)

        )
    }
}
