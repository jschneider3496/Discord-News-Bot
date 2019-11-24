const auth = require('./auth.json');
const Discord = require('discord.js');
const NewsAPI = require('newsapi');
const Request = require('requests');
const fetch = require('node-fetch');
const axios = require('axios');
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
        /* Lists args[1] number of top-headlines from U.S. */
        case 'news':
            /* Uses newsapi for news data */
             // Determine the count (if there is one)
             var count; /* How many titles to show */
             var firstWord;
             if(!args[1] || isNaN(args[1])) {
             	count = 5;
              firstWord = 1;
             }     
            else if (parseInt(args[1]) > 10) { /* Case: Over 10 (takes too long) */
              msg.channel.sendMessage("Max number of articles I can fetch is 10.");
              count = 10;
              firstWord = 2;
            } else {
            count = parseInt(args[1]);
            firstWord = 2;
            }
            	
      
            /* Uses newsapi for news data */
            var url = 'https://newsapi.org/v2/top-headlines?' +
                'country=us&' +
                'apiKey=' + auth.newsapi;
                
            for(var i = firstWord; i < args.length; i++) {
               url = url.concat("&q=", args[i]); 
            }    
            /* Returns JSON object with news data that can be iterated over. */
            /* Currently shows titles */
            axios(url)
                .then(function (response) {


                    /* JSON data containing article information */
                    var jsonData = response.data.articles;

                    if(jsonData.length < count)
                    	count = jsonData.length;

                    /* Print in chat titles of articles */
                    for (var i = 1; i < count + 1; i++) {
                        const newsEmbed = new Discord.RichEmbed()
                            .setColor('#4DF4F6')
                            .setTitle("Article " + i + ": " + jsonData[i].title)
                            .setURL(jsonData[i].url)
                            .setDescription(jsonData[i].description)
                            .setImage(jsonData[i].urlToImage);
                        msg.channel.send(newsEmbed);
                    }
                }).catch((err) => {
                    console.log(err);
                });
            break;
    }
});

/* auth.json has the bot token */
bot.login(auth.token);