// If you want to find the word the in the string The dog chased the cat, you could use the following regular expression: /the/
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr);
//JavaScript has multiple ways to use regexes. One way to test a regex is using the .test() method. The .test() method takes the regex, applies it to a string (which is placed inside the parentheses), and returns true or false if your pattern finds something or not.

// You can search for multiple patterns using the alternation or OR operator: |.
//yes or no, the regex you want is /yes|no/.
// /yes|no|maybe/.

// You can also extract the actual matches you found with the .match() method.
"string".match(/regex/);
/regex/.test("string"); //its the reverse order
//it extracts the word from the string
let testStr = "Repeat, Repeat, Repeat";
let ourRegex = /Repeat/;
testStr.match(ourRegex); //Here match would return ["Repeat"].
let repeatRegex = /Repeat/g; 
testStr.match(repeatRegex);//["Repeat", "Repeat", "Repeat"]
//ok so Im going to use it to check

let twinkleStar = "Twinkle, twinkle, little star";
let starRegex = /twinkle/gi; 
let result = twinkleStar.match(starRegex); 

let exampleStr = "Let's have fun with regular expressions!";
let unRegex = /.un/;
let result = unRegex.test(exampleStr);

let quoteSample = "The quick brown fox jumps over the lazy dog.";
let alphabetRegex = /[a-z]/gi; // Change this line
let result = quoteSample.match(alphabetRegex); // Change this line

let quoteSample = "Blueberry 3.141592653s are delicious.";
let myRegex = /[h-s2-6]/ig; // Change this line
let result = quoteSample.match(myRegex); // Change this line

// For example, /[^aeiou]/gi matches all characters that are not a vowel. Note that characters like ., !, [, @, / and white space are matched - the negated vowel character set only excludes the vowel characters.

let quoteSample = "3 blind mice.";
let myRegex = /[^0-9aeiou]/gi; // ^ negates
let result = quoteSample.match(myRegex); //matches all characters that are not a number or a vowel.

let difficultSpelling = "Mississippi";
let myRegex = /s+/g; // Change this line
let result = difficultSpelling.match(myRegex);

let chewieRegex = /Aa*/; //Aaaaaaaarrgh (returns Aaaaaaaaa)

let result = chewieQuote.match(chewieRegex);

let text = "<h1>Winter is coming</h1>";
let myRegex = /<.*?>/; // Change this line
let result = text.match(myRegex);

// In an earlier challenge, you used the caret character (^) inside a character set to create a negated character set in the form [^thingsThatWillNotBeMatched]. Outside of a character set, the caret is used to search for patterns at the beginning of strings.
let firstString = "Ricky is first and can be found.";
let firstRegex = /^Ricky/;
firstRegex.test(firstString);
let notFirst = "You can't find Ricky now.";
firstRegex.test(notFirst);

let caboose = "The last car on a train is the caboose";
let lastRegex = /caboose$/; // searches caboose at the end of the string
let result = lastRegex.test(caboose);

let quoteSample = "The five boxing wizards jump quickly.";
let alphabetRegexV2 = /\w/gi; // Change this line
let result = quoteSample.match(alphabetRegexV2).length; //returns the amount of characters

// You can search for the opposite of the \w with \W. Note, the opposite pattern uses a capital letter. This shortcut is the same as [^A-Za-z0-9_].

let shortHand = /\W/;
let numbers = "42%";
let sentence = "Coding!";
numbers.match(shortHand);
sentence.match(shortHand);
// The first match call would return the value ["%"] and the second would return ["!"].

// The shortcut to look for digit characters is \d, with a lowercase d. This is equal to the character class [0-9]
// Use the shorthand character class for non-digits \D to count how many non-digits are in movie titles.


let username = "JackOfAllTrades";
let userCheck = /^[a-z][a-z]+\d*$|^[a-z]\d\d+$/i;
let result = userCheck.test(username);

// Usernames can only use alpha-numeric characters.

// The only numbers in the username have to be at the end. There can be zero or more of them at the end. Username cannot start with the number.

// Username letters can be lowercase and uppercase.

// Usernames have to be at least two characters long. A two-character username can only use alphabet letters as characters.

// You can search for whitespace using \s, which is a lowercase s. This pattern not only matches whitespace, but also carriage return, tab, form feed, and new line characters. You can think of it as similar to the character class [ \r\t\f\n\v].

// You can also search for everything except whitespace.
let whiteSpace = "Whitespace. Whitespace everywhere!";
let nonSpaceRegex = /\S/g;
whiteSpace.match(nonSpaceRegex).length;

// Recall that you use the plus sign + to look for one or more characters and the asterisk * to look for zero or more characters


let A4 = "aaaah";
let A2 = "aah";
let multipleA = /a{3,5}h/;
multipleA.test(A4);
multipleA.test(A2);
// The first test call would return true, while the second would return false.

let ohStr = "Ohhh no";
let ohRegex = /Oh{3,6}\sno/; 
let multipleA = /ha{3,}h/; //no upper limit

// Sometimes the patterns you want to search for may have parts of it that may or may not exist.
let american = "color";
let british = "colour";
let rainbowRegex = /colou?r/;

let pwRegex =   /(?=\w{6})(?=\w*\d{2})/;
//matches passwords that are greater than 5 characters long, and have two consecutive digits.

let myString = "Eleanor Roosevelt";
let myRegex = /(Franklin|Eleanor).*Roosevelt/;
let result = myRegex.test(myString); // Change this line
// After passing the challenge experiment with myString and see how the grouping works

let wrongText = "The sky is silver.";
let silverRegex = /silver/;
wrongText.replace(silverRegex, "blue");


let hello = "   Hello, World!  ";
let wsRegex =  /^\s+|\s+$/g; // 
let result = hello.replace(wsRegex, ""); // 



remind me that this friday is my mom's birthday
This saturday I have chess classes. Remind me friday at night
Friday night I go to my gf house. Remind me in the morning./at 2pm.
next week I start the gym wednesdays and friday.


replace "I" for "you" and "my" for "your" and remind me for "I'll remind you" and reply "Ok" This saturday + "You" have chess classes.  "I'll remind you friday at night".

this\s?=(dayofweek) + remind me\s?=(dayofweek)//setDate of this//
next\s?=(dayofweek) + remind me\s?=(dayofweek)//setDate of next//
I have chess classes this saturday. Remind me friday at night
Remind me friday at night I have chess classes this saturday

this friday I have chess classes
next friday I have chess classes