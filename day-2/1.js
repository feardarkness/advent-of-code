/**
Your flight departs in a few days from the coastal airport; the easiest way down to the coast from here is via toboggan.

The shopkeeper at the North Pole Toboggan Rental Shop is having a bad day. "Something's wrong with our computers; we can't log in!" You ask if you can take a look.

Their password database seems to be a little corrupted: some of the passwords wouldn't have been allowed by the Official Toboggan Corporate Policy that was in effect when they were chosen.

To try to debug the problem, they have created a list (your puzzle input) of passwords (according to the corrupted database) and the corporate policy when that password was set.

For example, suppose you have the following list:

1-3 a: abcde
1-3 b: cdefg
2-9 c: ccccccccc
Each line gives the password policy and then the password. The password policy indicates the lowest and highest number of times a given letter must appear for the password to be valid. For example, 1-3 a means that the password must contain a at least 1 time and at most 3 times.

In the above example, 2 passwords are valid. The middle password, cdefg, is not; it contains no instances of b, but needs at least 1. The first and third passwords are valid: they contain one a or nine c, both within the limits of their respective policies.

How many passwords are valid according to their policies?
 */
const path = require("path");
const lineReader = require("line-reader");

/**
 * Check if the password is valid
 * @param {Number} topRange
 * @param {Number} bottomRange
 * @param {String}} letter
 * @param {String}} password
 */
const isPasswordValid = (topRange, bottomRange, letter, password) => {
  const map = new Map();
  for (let i = 0; i < password.length; i++) {
    const charToAdd = password.charAt(i);
    if (map.has(charToAdd)) {
      const currentValue = map.get(charToAdd);
      map.set(charToAdd, currentValue + 1);
    } else {
      map.set(password.charAt(i), 1);
    }
  }
  return map.get(letter) <= topRange && map.get(letter) >= bottomRange;
};

let validPasswords = 0;
let invalidPasswords = 0;
lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  const map = new Map();

  const [howManyTimes, letterToCheckNotClean, password] = line.split(" ");
  const [bottomRange, topRange] = howManyTimes.split("-").map((element) => Number.parseInt(element));
  const [letterToCheck] = letterToCheckNotClean.split(":");
  if (isPasswordValid(topRange, bottomRange, letterToCheck, password)) {
    validPasswords++;
  } else {
    invalidPasswords++;
  }
  if (isLast) {
    console.log(`Number of valid passwords: ${validPasswords}`);
    console.log(`Number of invalid passwords: ${invalidPasswords}`);
  }
});
