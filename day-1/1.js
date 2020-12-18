const path = require("path");
const lineReader = require("line-reader");

// const check = (mapWithNumbers) =>

const map = new Map();
const expectedResult = 2020;

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  const number = Number.parseInt(line);
  map.set(Number.parseInt(line), true);
  const expectedNumber = expectedResult - number;
  if (map.has(expectedNumber)) {
    console.log(`Number found: ${expectedNumber} and ${number}`);
    console.log(expectedNumber * number);
    return false;
  }
});
