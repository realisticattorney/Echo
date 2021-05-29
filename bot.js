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

// bot.hears(" ", (ctx) => {
//   ctx.reply("Welcome " + ctx.message.text);
// });
// // bot.hears("this", (ctx) => {

// //   ctx.reply("Welcome " + ctx.message.text);
// // });

bot.use((ctx) => {
  let message = ctx.message.text;
  let this_regex =
    /[re][mer][emi][imn][ind][nd]\sme\son\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\sat\s\d([ap]m|\s[ap]m|:\d\d[ap]m)/i;
  let next_regex =
    /[re][mer][emi][imn][ind][nd]\sme\snext\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)at\s\d([ap]m|\s[ap]m|:\d\d[ap]m)/i;

  let test_this = this_regex.test(message);
  let test_next = next_regex.test(message);
  let match_dot = message.match(/\./)
  let message_first_half = message.slice(0, match_dot.index);
  let message_second_half = message.slice(match_dot.index); 

  let replace_you_i = message.replace(/I/, "you");
  let replace_my_your = replace_you_i.replace(/my/, "your");
  let reply = replace_my_your.replace(/remind\sme/i, "I'll remind you");

  let match_this = message.match(/t[hi][ihs][si]/gi);
 let time_now = new Date().toLocaleString();
  console.log(message_first_half) 
  console.log(message_second_half)
  // To add Days
  function addDays(days) {
    var result = new Date();
    result.setDate(result.getDate() + days);
    return result;
  }
  let d = new Date();
  d.setDate(d.getDate() + 5);
  console.log(`${d}`);
  console.log(addDays(5));
  let [time_date, time_exact] = time_now.split(", ");
  let [time_exact_hour, time_exact_min, time_exact_sec_am] =
    time_exact.split(":");
  let [time_exact_sec, time_exact_am_pm] = time_exact_sec_am.split(" ");

  if (test_this == 1 || test_next == 1) {
    let day_DAY = thisFunction(message_second_half);
    console.log(day_DAY);

    let whichDate =
      test_next == 1 ? dateFinder(day_DAY, 1) : dateFinder(day_DAY, 0);
    let date_now = new Date();
    let date_now_s = date_now.setDate(date_now.getDate() + whichDate);
    let date_now_string = `${date_now}`;

    console.log(whichDate);
    console.log(date_now);
    console.log(date_now_string);
    let [alarm_year, alarm_month, alarm_day_hour] = date_now
      .toISOString()
      .split("-");
    let [alarm_day, alarm_time] = alarm_day_hour.split("T");
    alarm_time = alarm_time.split(".")[0];
    let [alarm_h, alarm_m, alarm_s] = alarm_time.split(":");
    console.log(alarm_year);
    console.log(alarm_month);
    console.log(alarm_day_hour);
    console.log(alarm_day);
    console.log(alarm_time);
    console.log(alarm_h);
    console.log(alarm_m);
    console.log(alarm_s);
    console.log(time_date);
    console.log(time_exact);
    console.log(time_exact_hour);
    console.log(time_exact_min);
    console.log(time_exact_sec);
    console.log(time_exact_am_pm);
    let replace = "*/1";
    cron.schedule(
      `${0} ${40} ${21} ${alarm_day} ${alarm_month} * ${alarm_year}`,
      () => {
        bot.telegram.sendMessage(
          ctx.message.chat.id,
          `${"Hey " + ctx.message.chat.first_name + ". dsdasdasda" + reply}`
        );
      }
    );
  } else {
    return ctx.reply("The syntax must be: This/Next dayofweek task");
  }

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
