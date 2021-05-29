// /** @type {typeof import('telegraf').Telegraf} */
const { match } = require("assert/strict");
const { BITBUCKET } = require("ci-info");
const { time } = require("console");
const { Telegraf } = require("telegraf");
const cron = require("node-cron");

const bot = new Telegraf("1711136458:AAH8wlMvtdcp9RtMLOVJmd3fCqlTWq8XR1w");

bot.start((ctx) => {
  ctx.reply("Welcome");
});

bot.use((ctx) => {
  let message = ctx.message.text;
  let this_regex =
    /[re][mer][emi][imn][ind][nd]\sme\sthis\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\sat\s\d([ap]m|\s[ap]m|:\d\d[ap]m)/i;
  let next_regex =
    /[re][mer][emi][imn][ind][nd]\sme\snext\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)at\s\d([ap]m|\s[ap]m|:\d\d[ap]m)/i;

  let test_this = this_regex.test(message);
  let test_next = next_regex.test(message);

  let match_dot = message.match(/\./);
  let message_second_half = message.slice(match_dot.index);

  let replace_you_i = message.replace(/I/, "you");
  let replace_my_your = replace_you_i.replace(/my/, "your");
  let reply = replace_my_your.replace(/remind\sme/i, "I'll remind you");

  let reply_dot = reply.match(/\./);
  let reply_first_half = reply.slice(0, reply_dot.index);

  let match_this = message.match(/t[hi][ihs][si]/gi);
  let time_now = new Date().toLocaleString();

  if (test_this == 1 || test_next == 1) {
    let day_DAY = thisFunction(message_second_half);
    console.log(day_DAY + "day_DAY");
    console.log(test_this + "test_this");
    let whichDate =
      test_next == 1 ? dateFinder(day_DAY, 1) : dateFinder(day_DAY, 0);
    let date_now = new Date();
    date_now.setDate(date_now.getDate() + whichDate);
    let date_now_string = `${date_now}`;

    console.log(whichDate);
    console.log(date_now_string);
    
    date_now_string = date_now_string.toString();
    let [dayweek, month, day, year, time] = date_now_string.split(" ");
    console.log(dayweek, month, day, year, time);
    cron.schedule(`${0} ${23} ${23} ${day} ${month} * ${year}`, () => {
      bot.telegram.sendMessage(
        ctx.message.chat.id,
        `${"Hey " + ctx.message.chat.first_name + ". " + reply_first_half}`
      );
    });
  } else {
    return ctx.reply("The syntax must be: This/Next dayofweek task");
  }

  console.log(ctx.update);
  console.log(ctx.message.chat.id);
  // let time_now = new Date().toLocaleString();
  // console.log(time_now);
  ctx.reply(reply);
  bot.hears("this", (ctx) => {
    console.log(ctx);
  });
  console.log(match_this); //it returns an array
});

bot.launch();

const dateFinder = (weekday, this_or_next) => {
  let i = this_or_next == 0 ? 0 : 7;
  let limit = this_or_next == 0 ? 7 : 14;
  for (i; i < limit; i++) {
    let d = new Date();
    let dd = d.setDate(d.getDate() + i);
    let d_s = `${d}`;
    console.log(d_s);
    let match_check = d_s.split(" ")[0];
    console.log(match_check);
    console.log(weekday);
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
