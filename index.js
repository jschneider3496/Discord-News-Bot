const auth = require('./auth.json');
const Discord = require('discord.js');
const NewsAPI = require('newsapi');
const Request = require('requests');
const fetch = require('node-fetch');
const bot = new Discord.Client();
const newsapi = new NewsAPI(auth.newsapi);



/* Command prefix */
const PREFIX = "!";

/* Bot start up message */
bot.on('ready', () => {
    console.log("Bot is ready for action!");
});

/* Bot functionality */
bot.on('message', msg => {
    const search = msg.content.substring(PREFIX.length);
    /* Splitting user message into arguments */
    let args = msg.content.substring(PREFIX.length).split(" ");


    /* First argument is word directly following PREFIX (!) */
    /* Ex: !ping */
    /* args[0] is "ping" */
    switch (args[0]) {
        case 'ping':
            msg.channel.sendMessage('pong');
            break;
        case 'clear':
            if (!args[1])
                msg.reply("Error: Define number for clear")
            else
                msg.channel.bulkDelete(args[1]);
            break;
        case 'repeat':
            msg.channel.sendMessage(search);
            break;
        case 'news':
            var url = 'https://newsapi.org/v2/top-headlines?' +
                'country=us&' +
                'apiKey=' + auth.newsapi;
            var req = new Request(url);
            fetch(req)
                .then(function (response) {
                    console.log(response.json());
                })
            break;
    }

});

/* auth.json has the bot token */
bot.login(auth.token);