// /** @type {typeof import('telegraf').Telegraf} */
const { match } = require("assert/strict");
const { BITBUCKET } = require("ci-info");
const { time } = require("console");
const { Telegraf } = require("telegraf");
const cron = require("node-cron");
// const express = require("express");

const bot = new Telegraf("1711136458:AAH8wlMvtdcp9RtMLOVJmd3fCqlTWq8XR1w");

bot.start((ctx) => {
  ctx.reply("Welcome");
});

// bot.hears(" ", (ctx) => {
//   ctx.reply("Welcome " + ctx.message.text);
// });
// // bot.hears("this", (ctx) => {

// //   ctx.reply("Welcome " + ctx.message.text);
// // });

bot.use((ctx) => {
  let message = ctx.message.text;
  let date;
  //  let reg_this = /t[hi][iohs][si]/i.test(message); //this >> 1 // this next >> 2 //thisnext >>22
  //  let reg_next = /next/i.test(message);
  //   let match_this = message.match(/t[hi][iohs][si]\s(?=mo[nd][dn]ay|tuesday|wednesday|thursday|friday|saturday|sunday)/gi); //match is like slide, not splite (its good)
  //   let match_this2 = message.match(/[^h]/gi); //returns an array with each items being a character NOT mention in the match (via negativa)
  // let answer_match = message.match(
  //   /t[hi][iohs][si]\s(?=mo[nd][dn]ay|tuesday|wednesday|thursday|friday|saturday|sunday)/gi
  // );
  let this_regex =
    /^this\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i;
  let next_regex =
    /next\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i;
  let test_this = this_regex.test(message);
  let test_next = next_regex.test(message);
  let replace_you_i = message.replace(/I/, "you");
  let match_you_i = message.match(/I/);
  let replace_my_your = replace_you_i.replace(/my/, "your");
  let reply = replace_my_your.replace(/remind\sme/i, "I'll remind you");
  let match_this = message.match(/t[hi][ihs][si]/gi);
  let time_now = new Date().toLocaleString();
  // To add Days
  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }
      let d = new Date();
  d.setDate(d.getDate() + 5);
  console.log(`${d}`)
  console.log(addDays(5));
  let [time_date, time_exact] = time_now.split(", ");
  let [time_exact_hour, time_exact_min, time_exact_sec_am] =
    time_exact.split(":");
  let [time_exact_sec, time_exact_am_pm] = time_exact_sec_am.split(" ");

  if (test_this == 1 || test_next == 1) {
    let day_DAY = thisFunction(reply);
    console.log(day_DAY)

    let whichDate =
      test_next == 1 ? dateFinder(day_DAY, 1) : dateFinder(day_DAY, 0);

    console.log(whichDate)
    console.log(time_now);
    console.log(time_date);
    console.log(time_exact);
    console.log(time_exact_hour);
    console.log(time_exact_min);
    console.log(time_exact_sec);
    console.log(time_exact_am_pm);
  }
  let replace = "*/1";
  cron.schedule(`${replace} * * * *`, () => {
    bot.telegram.sendMessage(
      ctx.message.chat.id,
      `${"Hey " + ctx.message.chat.first_name + ". " + reply}`
    );
  });
  console.log(ctx.update);
  console.log(ctx.message.chat.id);
  // let time_now = new Date().toLocaleString();
  // console.log(time_now);
  ctx.reply(reply + ". I'll remind you.");
  bot.hears("this", (ctx) => {
    console.log(ctx);
  });
  console.log(match_this); //it returns an array
});

bot.launch();

const dateFinder = (weekday, this_or_next) => {
  let i = this_or_next == 0? 0 : 7;
  let limit = this_or_next == 0 ? 7 : 14;
  for (i; i < limit; i++) {
    let d = new Date();
    let dd = d.setDate(d.getDate() + i);
    let d_s = `${d}`
    console.log(d_s);
    let match_check = d_s.split(" ")[0];
    console.log(match_check)
    console.log(weekday)
    console.log(d.setDate(d.getDate() + i));

    if (match_check.toUpperCase() == weekday) {
      return i;
    }
  }
};

const thisFunction = (message) => {
  let day = message.match(
    /(monday|tuesday|wednesday|thursday|friday|saturday|sunday)/i
  );
  console.log(day[0]);
  if (day[0] == "monday") {
    return "MON";
  } else if (day[0] == "tuesday") {
    return "TUE";
  } else if (day[0] == "wednesday") {
    return "WED";
  } else if (day[0] == "thursday") {
    return "THU";
  } else if (day[0] == "friday") {
    return "FRI";
  } else if (day[0] == "saturday") {
    return "SAT";
  } else if (day[0] == "sunday") {
    return "SUN";
  } else {
    return "*";
  }
};
