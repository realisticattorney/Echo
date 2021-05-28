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