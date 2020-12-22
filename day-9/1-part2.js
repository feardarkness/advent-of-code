/**
The final step in breaking the XMAS encryption relies on the invalid number you just found: you must find a contiguous set of at least two numbers in your list which sum to the invalid number from step 1.

Again consider the above example:

35
20
15
25
47
40
62
55
65
95
102
117
150
182
127
219
299
277
309
576
In this list, adding up all of the numbers from 15 through 40 produces the invalid number from step 1, 127. (Of course, the contiguous set of numbers in your actual list might be much longer.)

To find the encryption weakness, add together the smallest and largest number in this contiguous range; in this example, these are 15 and 47, producing 62.

What is the encryption weakness in your XMAS-encrypted list of numbers?
 */
const path = require("path");
const lineReader = require("line-reader");

const PREAMBLE_LENGTH = 25;
let availableNumbers = [];
let allNumbers = [];
let lineNumber = 0;

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  if (lineNumber >= PREAMBLE_LENGTH) {
    if (!checkIfIsSumOfPreviousValues(availableNumbers, parseInt(line))) {
      findContiguousSet(allNumbers, parseInt(line));
      console.log(`Number which is not the sum of previous values: ${line}`);
      return false;
    }
    availableNumbers = availableNumbers.slice(1);
  }
  allNumbers.push(parseInt(line));
  availableNumbers.push(parseInt(line));
  lineNumber++;
  if (isLast) {
    console.log(`Everything is right!!!`);
  }
});

const checkIfIsSumOfPreviousValues = (availableNumbers, expectedResult) => {
  let numberFound = false;
  let index = 0;
  for (let number of availableNumbers) {
    index++;
    const numberToSearch = expectedResult - number;
    if (searchInArrayStartingAt(availableNumbers, index, numberToSearch)) {
      numberFound = true;
    }
  }
  return numberFound;
};

/**
 *
 * @param {Integer[]} numbers
 * @param {Integer} positionToStart
 * @param {Integer} numberToSearch
 */
const searchInArrayStartingAt = (numbers, positionToStart, numberToSearch) => {
  let found = false;
  for (let i = positionToStart; i < numbers.length && !found; i++) {
    if (numbers[i] === numberToSearch) {
      found = true;
    }
  }
  return found;
};

/**
 *
 * @param {Integer[]} allNumbers
 * @param {Integer} additionToFind
 */
const findContiguousSet = (allNumbers, additionToFind) => {
  let numbersToAdd = [];
  let partialAddition = 0;
  let notFound = true;

  for (let i = 0; i < allNumbers.length && notFound; i++) {
    numbersToAdd.push(allNumbers[i]);
    partialAddition += allNumbers[i];
    let keepGoing = true;
    for (let j = i + 1; j <= allNumbers.length && keepGoing; j++) {
      if (partialAddition + allNumbers[j] <= additionToFind) {
        partialAddition += allNumbers[j];
        numbersToAdd.push(allNumbers[j]);
      } else {
        keepGoing = false;
        console.log("numbersToAdd=====================================");
        console.log(numbersToAdd);
        console.log("=====================================");
      }
    }
    console.log("partialAddition=====================================");
    console.log(partialAddition);
    console.log(additionToFind);
    console.log("=====================================");
    if (partialAddition === additionToFind) {
      console.log("numbersToAdd=====================================");
      console.log(numbersToAdd);
      console.log("=====================================");
      const orderedNumbers = numbersToAdd.sort((a, b) => a - b);
      console.log(
        `Smallest and largest numbers found: ${orderedNumbers[0]} + ${orderedNumbers[orderedNumbers.length - 1]} = ${
          orderedNumbers[0] + orderedNumbers[orderedNumbers.length - 1]
        }`
      );
      notFound = false;
    } else {
      console.log("notFound=====================================");
      numbersToAdd = [];
      partialAddition = 0;
    }
  }
};
