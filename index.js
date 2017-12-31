const botSettings = require("./botsettings.json");
const Discord = require('discord.js');
const prefix = botSettings.prefix

const bot = new Discord.Client();

bot.on("ready", async () => {
    console.log(`${bot.user.username} is on and monitoring!`);

    try {
        let link = await bot.generateInvite(botSettings.permissions);
        console.log(link);
    } catch(e) {
        console.log(e.stack);
    }
});

bot.on('message', async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let messageArray = message.content.split(" ");
    let command = messageArray[0];
    let args = messageArray.slice(1);

    if(!command.startsWith(prefix)) return;

    if(command === `${prefix}userinfo`) {
        let embed = new Discord.RichEmbed();
            .setAuthor(`${message.author.username}`);
            .setDescription("This is the user's info!");
            .setColor("#9B59B6");
            .addField("Full Username", `${message.author.username}#${message.author.discriminator}`);
            .addField("ID", `${message.author.id}`);
            .addField("Created At", `${message.author.createdAt}`);   

        message.channel.sendEmbed(embed);

        return;
    }
});

bot.login(botSettings.token);