/**
Time to check the rest of the slopes - you need to minimize the probability of a sudden arboreal stop, after all.

Determine the number of trees you would encounter if, for each of the following slopes, you start at the top-left corner and traverse the map all the way to the bottom:

Right 1, down 1.
Right 3, down 1. (This is the slope you already checked.)
Right 5, down 1.
Right 7, down 1.
Right 1, down 2.
In the above example, these slopes would find 2, 7, 3, 4, and 2 tree(s) respectively; multiplied together, these produce the answer 336.

What do you get if you multiply together the number of trees encountered on each of the listed slopes?
 */
const path = require("path");
const lineReader = require("line-reader");

let currentPos = 0;
const moveRight = Number.parseInt(process.argv[2]);
const moveDown = Number.parseInt(process.argv[3]);

let numberOfTreesOnMyWay = 0;
let currentlyDown = moveDown - 1;

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  let currentLine = line;
  currentlyDown++;
  // console.log(line);
  // console.log(`${moveDown},${moveRight} -> ${currentlyDown} -> ${currentPos}`);
  if (currentlyDown === moveDown) {
    // console.log("=============================== entra, moving to the right");
    currentlyDown = 0;
    if (currentLine.charAt(currentPos) === "#") {
      numberOfTreesOnMyWay++;
    }
    currentPos = currentPos + moveRight;

    if (currentLine.length < currentPos + 1) {
      currentPos = (currentPos % (currentLine.length - 1)) - 1;
    }
  }

  if (isLast) {
    console.log(`Number of trees in my way: ${numberOfTreesOnMyWay}`);
  }
});
