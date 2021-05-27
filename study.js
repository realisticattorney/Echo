// If you want to find the word the in the string The dog chased the cat, you could use the following regular expression: /the/
let testStr = "freeCodeCamp";
let testRegex = /Code/;
testRegex.test(testStr);
//JavaScript has multiple ways to use regexes. One way to test a regex is using the .test() method. The .test() method takes the regex, applies it to a string (which is placed inside the parentheses), and returns true or false if your pattern finds something or not.

// You can search for multiple patterns using the alternation or OR operator: |.
//yes or no, the regex you want is /yes|no/.
// /yes|no|maybe/.

// You can also extract the actual matches you found with the .match() method.