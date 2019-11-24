# Discord News Bot
## About
Discord News Bot is a bot that brings the top news headlines to Discord channels.
## Features
* Send Discord message including top headlines
    * !news KEYWORD KEYWORD KEYWORD ...
        * Default: Show 3 relevant articles
    * !news X KEYWORD KEYWORD KEYWORD ...
        * Show X relevant articles (max of 10)
    * !newspop X KEYWORD KEYWORD KEYWORD ...
        * Show X popular articles 
    * !newspub X KEYWORD KEYWORD KEYWORD ...
        * Show X recently published articles 
    * !newsrel X KEYWORD KEYWORD KEYWORD ...
        * Show X relevant articles 
    * !newsth X KEYWORD KEYWORD KEYWORD ...
        * Show X top headlines 
## In action
<a href="https://gyazo.com/ab16b2453bf5db563e25a874ad8b6fd1"><img src="https://i.gyazo.com/ab16b2453bf5db563e25a874ad8b6fd1.png" alt="Image from Gyazo" width="380" height="400"/></a>
## Important Information
Include the file auth.json and paste your Discord Bot Token and NewsAPI key  
{  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'token': 'DISCORD-BOT-TOKEN'  
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'newsapi': 'NEWSAPI-KEY'  
}
## Acknowledgements
* [NewsAPI](https://newsapi.org/): Gathers news headlines in JSON format
* [Axios](https://www.npmjs.com/package/axios): HTTP requests and transformations for JSON data
