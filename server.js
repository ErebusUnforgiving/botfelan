const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');
const moment = require('moment')
require('moment-duration-format')
const commands = client.commands = new Discord.Collection();
const aliases = client.aliases = new Discord.Collection();

fs.readdirSync('./commands', { encoding: 'utf8' }).filter(file => file.endsWith(".js")).forEach((files) => {
    let command = require(`./commands/${files}`);
    if (!command.name) return console.log(`Hatalı Kod Dosyası => [/commands/${files}]`)
    commands.set(command.name, command);
    if (!command.aliases || command.aliases.length < 1) return
    command.aliases.forEach((otherUses) => { aliases.set(otherUses, command.name); })
})



//  WATCHING  : !ping izliyor
//  LISTENING : !ping dinliyor
//  PLAYING   : !ping oynuyor 
//  STREAMING : !ping yayında
////----------------------- READY KISMI -----------------------\\\\
client.on('ready', () => {
    client.user.setPresence({ activity: { name: 'Zérø 💖 Erébus' }, status: 'idle' })
    client.channels.cache.get('824149056535789588').join() // ses kanalı İD
    console.log(`Bot ${client.user.tag} Adı İle Giriş Yaptı!`);
  })
////----------------------- CONFIG KISMI -----------------------\\\\
client.config = {
    vipRoles: ['824149056036667400'], //vip
    unregisteres: ['824149056036667396'], // kayıtsız
    maleRoles: ['824149056036667398','824166949562220544'],//erkek
    girlroles: ['824149056036667399','824166949788319775'],// bayan
    mods: ["824149056049774597"], // yetkili
    channelID: '824149056065372199', // kayıt kanalı
    yönetim: ['824149056057245764'] // üst yönetim
}
////----------------------- PREFİX KISMI -----------------------\\\\
client.on('message', message => {
    const prefix = ".";// prefix
    if (!message.guild || message.author.bot || !message.content.startsWith(prefix)) return;
    const args = message.content.slice(1).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if (!cmd) return;
    cmd.run(client, message, args)
})
////----------------------- HEM ETİKET HEMDE TAG ROL KISMI -----------------------\\\\
client.on("userUpdate", async function(oldUser, newUser) { // kod codaredan alınıp editlenmiştir!
    const guildID = "824149056036667392"//sunucu
    const roleID = "824149056036667401"//taglırolü
    const tag = "⁰⁷"//tag
    const chat = '824149056535789592'// chat
    const log2 = '824149057169391628' // log kanalı
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new Discord.MessageEmbed().setAuthor(member.displayName, member.user.avatarURL({ dynamic: true })).setColor('#ff0000').setTimestamp().setFooter('Erébus Was Here!');
    if (newUser.username !== oldUser.username) {
        if (oldUser.username.includes(tag) && !newUser.username.includes(tag)) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(` ${newUser} isminden \`⁰⁷\` çıakrtarak ailemizden ayrıldı!`))
        } else if (!oldUser.username.includes(tag) && newUser.username.includes(tag)) {
            member.roles.add(roleID)
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(${tag})`)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} ismine \`⁰⁷\` alarak ailemize katıldı`))
        }
    }
    if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == "0007" && newUser.discriminator !== "0007") {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketinden \`0007\` çıakrtarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== "0007" && newUser.discriminator == "0007") {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  <@!' + newUser + '> etiketine \`0007\` alarak ailemize katıldı`))
            client.channels.cache.get(chat).send(`${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#0099)`)
        }
    }
  
  })

////----------------------- HOŞGELDİN MESAJI KISMI -----------------------\\\\
client.on('guildMemberAdd', (member) => {

    const mapping = {
        "0": "0", // sayı iDleri
        "1": "1",
        "2": "2",
        "3": "3",
        "4": "4",
        "5": "5",
        "6": "6",
        "7": "7",
        "8": "8",
        "9": "9",
    };
    var toplamüye = member.guild.memberCount
    var emotoplamüye = `${toplamüye}`.split("").map(c => mapping[c] || c).join("")
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [ay], W [hafta], DD [gün]")
    let createAt2 = moment.duration(memberDay).format("DD [gün], HH [saat], mm [dakika]")
    if (memberDay > 604800000) {
        client.channels.cache.get(client.config.channelID).send(` **Suncumuza hoşgeldin** ${member} - \`${member.id}\`

• <#824149056330530871> Kanalını okuduktan sonra Register odalarına girip teyit vermelisin!

•  \`⁰⁷\` Tagımızı alarak  <@&824149056036667401> rolüne sahip olabilirsin! 

• Seninle birlikte **${emotoplamüye}** üyeye ulaştık

• Hesabın **${createAt}** önce açılmış

<@&801110603107663875>`)
    } else {
         client.channels.cache.get('824149056065372199').send(
            new Discord.MessageEmbed()
            .setAuthor(member.user.username, member.user.avatarURL({ dynamic: true }))
            .setDescription(`${member}, Adlı Kullanıcı Sunucuya Katıldı Hesabı **${createAt2}** Önce Açıldığı İçin Şüpheli!`)
            .setTimestamp()
            .setThumbnail(member.user.avatarURL({ dynamic: true }))
            .setFooter(`Erébus Was Here!`))
    }
})

////----------------------- TAG MESAJ KISMI -----------------------\\\\
client.on('message', msg => {
    if (msg.content === '!tag') {
        msg.channel.send(`⁰⁷`); // tagı yazınız
    } else if (msg.content === 'tag') {
        msg.channel.send(`⁰⁷`);// tagı yazınız
    } else if (msg.content === '.tag') {
        msg.channel.send(`⁰⁷`);// tagı yazınız
    } else if (msg.content === ".rol-ver") {
        msg.guild.members.cache.forEach(x => {
            x.roles.add("W")
        })
    }
});


////----------------------- TAG TARAMASI KISMI -----------------------\\\\
setInterval(() => {
    const server = client.guilds.cache.get("824149056036667392"); //Server ID 
    server.members.cache.forEach(async member => {
        if (member.roles.cache.has("824149056036667400") || member.roles.cache.has("824165861337071636")) return; //VİP&BOOSTER ROL İD

/*   Yasaklı Tag    */
   if(member.user.username.includes("tasaklıTAG")){
        member.roles.set(["Yasaklı Tag Rol ID"]).catch(() => {}) 
    }


 if (member.user.username.includes("⁰⁷")) {
            await member.roles.add("824149056036667401").catch(() => {})
        }
        if (!member.user.username.includes("†")) {
            await member.roles.set("824149056036667396")
        }
    })
}, 60 * 1000)// 60(60 saniye) kısmını değiştirebilirsiniz

client.login(process.env.token)//token
