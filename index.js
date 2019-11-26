const TelegramBot = require('node-telegram-bot-api');
const fetch = require("node-fetch");
const { token }= require('./config.json');

const bot = new TelegramBot(token, {polling: true});

async function getjoke(){
  return new Promise (function (resolve){
    fetch("https://icanhazdadjoke.com/", {
      headers: {
        Accept: "application/json"
      }
    }).then(function(response) {
      return response.json();
    }).then(function(json) {
      resolve(json.joke)
    })
  })
}

bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  getjoke().then((joke) => {
    bot.sendMessage(chatId, joke);
  })
});


// bot.onText(/\/echo (.+)/, (msg, match) => {
//   // 'msg' is the received Message from Telegram
//   // 'match' is the result of executing the regexp above on the text content
//   // of the message

//   const chatId = msg.chat.id;
//   const resp = match[1]; // the captured "whatever"

//   // send back the matched "whatever" to the chat
//   bot.sendMessage(chatId, resp);
// });
