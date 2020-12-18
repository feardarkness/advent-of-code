/**
While it appears you validated the passwords correctly, they don't seem to be what the Official Toboggan Corporate Authentication System is expecting.

The shopkeeper suddenly realizes that he just accidentally explained the password policy rules from his old job at the sled rental place down the street! The Official Toboggan Corporate Policy actually works a little differently.

Each policy actually describes two positions in the password, where 1 means the first character, 2 means the second character, and so on. (Be careful; Toboggan Corporate Policies have no concept of "index zero"!) Exactly one of these positions must contain the given letter. Other occurrences of the letter are irrelevant for the purposes of policy enforcement.

Given the same example list from above:

1-3 a: abcde is valid: position 1 contains a and position 3 does not.
1-3 b: cdefg is invalid: neither position 1 nor position 3 contains b.
2-9 c: ccccccccc is invalid: both position 2 and position 9 contain c.
How many passwords are valid according to the new interpretation of the policies?


 */
const path = require("path");
const lineReader = require("line-reader");

/**
 * Check if the password is valid
 * @param {Number} index1
 * @param {Number} index2
 * @param {String}} letter
 * @param {String}} password
 */
const isPasswordValid = (index1, index2, letter, password) => {
  let totalFound = 0;
  if (password[index1 - 1] === letter) {
    totalFound++;
  }
  if (password[index2 - 1] === letter) {
    totalFound++;
  }
  return totalFound === 1;
};

let validPasswords = 0;
let invalidPasswords = 0;
lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  const map = new Map();

  const [indexPair, letterToCheckNotClean, password] = line.split(" ");
  const [index1, index2] = indexPair.split("-").map((element) => Number.parseInt(element));
  const [letterToCheck] = letterToCheckNotClean.split(":");
  if (isPasswordValid(index2, index1, letterToCheck, password)) {
    validPasswords++;
  } else {
    invalidPasswords++;
  }
  if (isLast) {
    console.log(`Number of valid passwords: ${validPasswords}`);
    console.log(`Number of invalid passwords: ${invalidPasswords}`);
  }
});
