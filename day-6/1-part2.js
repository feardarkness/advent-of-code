/**
As you finish the last group's customs declaration, you notice that you misread one word in the instructions:

You don't need to identify the questions to which anyone answered "yes"; you need to identify the questions to which everyone answered "yes"!

Using the same example as above:

abc

a
b
c

ab
ac

a
a
a
a

b
This list represents answers from five groups:

In the first group, everyone (all 1 person) answered "yes" to 3 questions: a, b, and c.
In the second group, there is no question to which everyone answered "yes".
In the third group, everyone answered yes to only 1 question, a. Since some people did not answer "yes" to b or c, they don't count.
In the fourth group, everyone answered yes to only 1 question, a.
In the fifth group, everyone (all 1 person) answered "yes" to 1 question, b.
In this example, the sum of these counts is 3 + 0 + 1 + 1 + 1 = 6.

For each group, count the number of questions to which everyone answered "yes". What is the sum of those counts?
 */
const path = require("path");
const lineReader = require("line-reader");
const _ = require("underscore");

let totalAnsweredYes = 0;

let yesResponses = null;
lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  if (line === "") {
    totalAnsweredYes += yesResponses.length;
    yesResponses = null;
  } else {
    const onePersonYesResponses = [];
    line.split("").forEach((answer) => onePersonYesResponses.push(answer));
    if (yesResponses === null) {
      yesResponses = onePersonYesResponses;
    } else {
      yesResponses = _.intersection(yesResponses, onePersonYesResponses);
    }
    console.log(yesResponses);
  }

  console.log(line);
  if (isLast) {
    totalAnsweredYes += yesResponses.length;
    console.log(`Total questions answered yes by everyone in the group: ${totalAnsweredYes}`);
  }
});
