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
        case 'news':                    /* Show popular news */       
        case 'newspop':                 /* Show popular news */  
            getNews(args, "pop");
            break;
        case 'newspub':                 /* Show recently published news */  
            getNews(args, "pub");
            break;
        case 'newsrel':                 /* Show relevant news */  
            getNews(args, "rel");
            break;
        case 'newsth':                  /* Show top headlines */  
            getNews(args, "th");
            break;
    }

    function getNews(args, sortBy) {
        /* Uses newsapi for news data */

        /* Determine the count (if there is one) */
        var count; /* How many titles to show */
        var firstWord; /* Index of first search keyword */

        if (!args[1]) {
            msg.channel.sendMessage("Please indicate keywords.");
            return;
        } else if (isNaN(args[1])) { /* Default: No arguments or no number, show 3 */
            count = 3;
            firstWord = 1;
        } else if (!args[2]) {
            msg.channel.sendMessage("Please indicate keywords.");
            return;
        } else if (parseInt(args[1]) > 10) { /* Case: Over 10 (takes too long) */
            msg.channel.sendMessage("Max number of articles I can fetch is 10.");
            count = 10;
            firstWord = 2;
        } else {
            count = parseInt(args[1]);
            firstWord = 2;
        }

        var url;
        var lastWeek = getLastWeek(); /* Get last week for most recent headlines */

        switch (sortBy) {                                   /* How news will be sorted */
            case 'pop':                                     /* Popularity */
                url = 'https://newsapi.org/v2/everything?' +
                    'apiKey=' + auth.newsapi +
                    "&from=" + lastWeek +
                    "&sortBy=popularity";
                break;
            case 'pub':                                     /* Publish date */
                url = 'https://newsapi.org/v2/everything?' +
                    'apiKey=' + auth.newsapi +
                    "&from=" + lastWeek +
                    "&sortBy=publishedAt";
                break;
            case 'rel':                                     /* Relevance */
                url = 'https://newsapi.org/v2/everything?' +
                    'apiKey=' + auth.newsapi +
                    "&from=" + lastWeek +
                    "&sortBy=relevancy";
                break;
            case 'th':                                      /* Top headline */
                url = 'https://newsapi.org/v2/top-headlines?country=us' +
                    '&apiKey=' + auth.newsapi;
                break;
        }

        /* Append search keywords */
        for (var i = firstWord; i < args.length; i++)
            url = url.concat("&q=", args[i]);

        msg.channel.send(url);
        /* Returns JSON object with news data that can be iterated over. */
        axios(url)
            .then(function (response) {
                /* JSON data containing article information */
                var jsonData = response.data.articles;

                if (jsonData.length < count) {
                    msg.channel.send("Not that many articles, sending " + jsonData.length + " instead.")
                    count = jsonData.length;
                }

                /* Print in chat titles of articles */
                for (var i = 0; i < count; i++) {
                    const newsEmbed = new Discord.RichEmbed()
                        .setColor('#4DF4F6')
                        .setTitle("Article " + (i + 1) + ": " + jsonData[i].title)
                        .setURL(jsonData[i].url)
                        .addField('Description', jsonData[i].description)
                        .addField('Published', jsonData[i].publishedAt)
                        .setImage(jsonData[i].urlToImage);
                    msg.channel.send(newsEmbed);
                }
            }).catch((err) => {
                console.log(err);
            });
    }
});

/* Returns last week in xx/xx/xxxx format */
function getLastWeek() {
    var today = new Date();
    var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 7);
    var lastWeekMonth = lastWeek.getMonth() + 1;
    var lastWeekDay = lastWeek.getDate();
    var lastWeekYear = lastWeek.getFullYear();
    var lastWeekDisplayPadded = ("00" + lastWeekMonth.toString()).slice(-2) + "/"
        + ("00" + lastWeekDay.toString()).slice(-2) + "/" + ("0000" + lastWeekYear.toString()).slice(-4);
    return lastWeekDisplayPadded;
}

/* auth.json has the bot token */
bot.login(auth.token);