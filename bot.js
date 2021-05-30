// /** @type {typeof import('telegraf').Telegraf} */
const { match } = require("assert/strict");
const { BITBUCKET } = require("ci-info");
const { time } = require("console");
const { Telegraf } = require("telegraf");
const cron = require("node-cron");

const bot = new Telegraf("1711136458:AAH8wlMvtdcp9RtMLOVJmd3fCqlTWq8XR1w");

//INSIGHTS:
//super easy to set the alarm in absolute values. That's what I did by setting the this and next week. That's hard. Setting the time by asking it it's easy af
//my approach is confusing. At some parts I manipulate the current time so I get the time the alarm will be triggered by interpreting the user message. But I only modify some of the variables. So for instance I have the day, month and year of the (future) promise, but the hour and minutes of current time (as those went through my functions without changes)

//have to avoid 00:12pm, and 00:12am (it's not that relevant)
//got an idea, the start message is a tutorial? How so? has a "I'll visit mom this weekend. Remind me in 20 seconds" Try it! If the user actually sends that, it receives an answer from a ctx.hear("I'll visit mom this weekend. Remind me in 20 seconds") as well as the alarm set to 20 seconds! Then it gets the following message:
//"Fantastic! Remember that you can use absolute units (19 of july, 10:41pm/am, 2 pm, 6am) as relative to the moment you talk to me such as next friday, today, tomorrow, in 40 minutes, in 6 hours. However, I don't like units such as 23:32, or 16:00. It's so confusing. "


//to do: more complete /start response (with instructions & everything)
//should have an alarm for "in an hour?"
//thank you? you're welcome
//check current alarms
//make a server retain this stuff (instead of my machine)
//update token
//should get conditionals for other than this & next week
//should have a default for whenever at: is not specified
//improve the instruction for when the syntax is wrong

//premium:
//should have a personal config for whenever at: is not specified
bot.start((ctx) => {
  ctx.reply(`Hi ${ctx.message.chat.first_name}! Thank you for having me`);
  ctx.reply(
    "This is I work: Tell me what to remind you and at which time. That's it. I'll give you an example: I'll visit mom on the weekend. Remind me this saturday at 10am"
  );
});

bot.use((ctx) => {
  let message = ctx.message.text;
  let this_regex =
    /[re][mer][emi][imn][ind][nd]\sme\sthis\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)\sat\s\d[012]?([ap]m|\s[ap]m|:\d\d[ap]m|:\d\d\s[ap]m)/i;
  let next_regex =
    /[re][mer][emi][imn][ind][nd]\sme\snext\s(monday|tuesday|wednesday|thursday|friday|saturday|sunday)at\s\d[012]?([ap]m|\s[ap]m|:\d\d[ap]m|:\d\d\s[ap]m)/i;

  //checks whether is this week or next ()
  let test_this = this_regex.test(message);
  let test_next = next_regex.test(message);

  //match the dot and slice afterwards. It gets the whole command part of the message users send. It only uses the second part as it's the command for the alarm
  let match_dot = message.match(/\./);
  let message_second_half = message.slice(match_dot.index);

  //match the "at" and slice everything afterwards (used to take the hour:minute of the alarm).
  let match_at = message.match(/at\s/);
  let message_time_at = message.slice(match_at.index);
  let message_time_at_wo_at = message_time_at.split("at ")[1];
  console.log(message_time_at_wo_at);

  let is_pm = message_time_at_wo_at.includes("pm") ? 1 : 0;
  let is_am = message_time_at_wo_at.includes("am") ? 1 : 0;

  let message_time_wo_at_wo_pmam = message_time_at_wo_at.split(" ").join("").split("p").join("").split("a").join("").split("m").join("")
  console.log(message_time_wo_at_wo_pmam);


  //replaces the subject from first to second person in sequence
  let replace_you_i = message.replace(/I/, "you");
  let replace_my_your = replace_you_i.replace(/my/, "your");
  let reply = replace_my_your.replace(/remind\sme/i, "I'll remind you");

  //match the dot and slice afterwards. It gets the whole command part of the message users send. It only uses the first part as it's the reason the user set the alarm
  let reply_dot = reply.match(/\./);
  let reply_first_half = reply.slice(0, reply_dot.index);

  //useless?
  let time_now = new Date().toLocaleString();
  //
  //if the command was properly written, it should include instructions to get the alarm this week or the next one
  //************ 
  //************ 
  //************ 
  //************ 
  if ((test_this == 1 || test_next == 1) && (is_pm == 1 || is_am == 1)) {
    //takes the outside, global declared var to return the day of the week from the latter part of the message
    let day_DAY = thisFunction(message_second_half);
    //debugging
    console.log(day_DAY + "day_DAY");
    console.log(test_this + "test_this");
    //if the conditional met was 1 it will add 7 days to the current date( called in the dateFinder function)
    let whichDate =
      test_next == 1 ? dateFinder(day_DAY, 1) : dateFinder(day_DAY, 0);
    //to ensure current date is not modified, we call it again outside dateFinder
    let date_now = new Date();
    date_now.setDate(date_now.getDate() + whichDate);
    //we call it this way to get the humanized formatted date
    let date_now_string = `${date_now}`;
    //debugging to check if the date return is consistent with the message
    console.log(whichDate);
    console.log(date_now_string);
    //however humanizied, the value of the current date is an object (that with console.log looks like a string) so we convert it to a string to use the split() method:
    date_now_string = date_now_string.toString();
    //reestructure every piece of data we need
    let [dayweek, month, day, year, time] = date_now_string.split(" ");
    console.log(dayweek, month, day, year, time);
    //use it as params for the schedule API cron:
    console.log(time + "TIMEEEEEEEE");
    console.log(message_time_at + "TIMEEEEEEEE");
    let minute = message_time_wo_at_wo_pmam.includes(":") ? message_time_wo_at_wo_pmam.split(":")[1] : 0;
    let hour = message_time_wo_at_wo_pmam.includes(":")
      ? message_time_wo_at_wo_pmam.split(":")[0]
      : message_time_wo_at_wo_pmam;
    console.log(minute + "CHINCHANCONGGGG")
    console.log(hour + "CHINCHANCONGGGG")
    console.log(message_time_wo_at_wo_pmam + "CHINCHANCONGGGG")
    console.log(typeof(hour))
    
    hour = is_pm ? parseInt(hour) + 12 : hour;
    hour = hour == 12 ? 0 : hour;
    hour = hour == 24 ? 12 : hour; 
    console.log(hour + " HOUR CONVERTED") 

    cron.schedule(`${0} ${minute} ${hour} ${day} ${month} * ${year}`, () => {
      bot.telegram.sendMessage(
        ctx.message.chat.id,
        `${"Hey " + ctx.message.chat.first_name + ". " + reply_first_half}`
      );
      //we send a message repeating the first half (the reason) converted to the second person
    });
  } else {
    //if the previous condition wasn't met, the bot reminds the actual syntax
    return ctx.reply("The syntax must be: This/Next dayofweek task");
  }
  //debugging
  console.log(ctx.update);
  console.log(ctx.message.chat.id);
  ctx.reply(reply);
  bot.hears("this", (ctx) => {
    console.log(ctx);
  });
}); //here the use method finishes. it's triggered by ANY interaction with the bot

//without this the bot never starts
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
