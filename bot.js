// /** @type {typeof import('telegraf').Telegraf} */
const { BITBUCKET } = require("ci-info");
const { Telegraf } = require("telegraf");

const bot = new Telegraf("1711136458:AAH8wlMvtdcp9RtMLOVJmd3fCqlTWq8XR1w");

// bot.start((ctx) => {
//   ctx.reply("Welcome");
// });

// bot.hears(" ", (ctx) => {
//   ctx.reply("Welcome " + ctx.message.text);
// });
// // bot.hears("this", (ctx) => {

// //   ctx.reply("Welcome " + ctx.message.text);
// // });


bot.use((ctx) => {
 let message = ctx.message.text;
 let reg_this = /this/i.test(message); //this >> 1 // this next >> 2 //thisnext >>22
 let reg_next = /next/i.test(message); 

  ctx.reply(reg_this + reg_next)
})

bot.launch();
