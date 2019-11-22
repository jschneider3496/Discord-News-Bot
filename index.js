const Discord = require('discord.js');
const bot = new Discord.Client();
const auth = require('./auth.json');

/* Command prefix */
const PREFIX = "!";

/* Bot start up message */
bot.on('ready', () => {
    console.log("Bot is ready for action!");
});

/* Bot functionality */
bot.on('message', msg => {
    /* Splitting user message into arguments */
    let args = msg.content.substring(PREFIX.length).split(" ");

    /* First argument is word directly following PREFIX (!) */
    /* Ex: !ping */
    /* args[0] is "ping" */
    switch (args[0]) {
        case 'ping':
            msg.channel.sendMessage('pong');
            break;
    }

});

/* auth.json has the bot token */
bot.login(auth.token);