// /** @type {typeof import('telegraf').Telegraf} */
const { match } = require("assert/strict");
const { BITBUCKET } = require("ci-info");
const { time } = require("console");
const { Telegraf } = require("telegraf");
const cron = require("node-cron");
// const express = require("express");

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
  //  let reg_this = /t[hi][iohs][si]/i.test(message); //this >> 1 // this next >> 2 //thisnext >>22
  //  let reg_next = /next/i.test(message);
  //   let match_this = message.match(/t[hi][iohs][si]\s(?=mo[nd][dn]ay|tuesday|wednesday|thursday|friday|saturday|sunday)/gi); //match is like slide, not splite (its good)
  //   let match_this2 = message.match(/[^h]/gi); //returns an array with each items being a character NOT mention in the match (via negativa)
  // let answer_match = message.match(
  //   /t[hi][iohs][si]\s(?=mo[nd][dn]ay|tuesday|wednesday|thursday|friday|saturday|sunday)/gi
  // );
  let this_regex =
    /^this\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i;
  let next_regex = /next\s(friday)/;
  let test_this = this_regex.test(message);
  let test_next = next_regex.test(message);
  let replace_you_i = message.replace(/I/, "you");
  let match_you_i = message.match(/I/);
  let replace_my_your = replace_you_i.replace(/my/, "your");
  let reply = replace_my_your.replace(/remind\sme/i, "I'll remind you");
  if (test_this == 1) {
  }
  cron.schedule("*/1 * * * *", () => {
    console.log("running a task every two minutes");
    bot.telegram.sendMessage(ctx.message.chat.id, ctx.reply(reply));
  });
  // console.log(ctx.update)
  // console.log(ctx.message.chat.id)
  let time_now = new Date().toLocaleString();
  console.log(time_now);
  ctx.reply(reply + ". I'll remind you.");

  // console.log(match_this) //it returns an array
});

bot.launch();
