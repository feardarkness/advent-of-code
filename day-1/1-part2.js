const path = require("path");
const lineReader = require("line-reader");

// const check = (mapWithNumbers) =>

const map = new Map();
const THIS_YEAR = 2020;

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  const number = Number.parseInt(line);
  const keys = map.keys();

  for (let key of keys) {
    const expectedNumber = THIS_YEAR - number - key;
    if (map.has(expectedNumber)) {
      console.log(`Number found: ${expectedNumber},  ${number} and ${key}`);
      console.log(expectedNumber * number * key);
      return false;
    }
  }

  map.set(Number.parseInt(line), true);
});
