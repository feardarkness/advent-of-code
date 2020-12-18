/**
Ding! The "fasten seat belt" signs have turned on. Time to find your seat.

It's a completely full flight, so your seat should be the only missing boarding pass in your list. However, there's a catch: some of the seats at the very front and back of the plane don't exist on this aircraft, so they'll be missing from your list as well.

Your seat wasn't at the very front or back, though; the seats with IDs +1 and -1 from yours will be in your list.

What is the ID of your seat?
 */
const path = require("path");
const lineReader = require("line-reader");

let maxBoardId = 0;
const seatIds = [];

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  let rowBottomLimit = 0;
  let rowTopLimit = 127;
  let seatID;
  const positionChars = line.substring(0, 7);

  positionChars.split("").forEach((positionChar) => {
    const rowModifier = Math.ceil((rowTopLimit - rowBottomLimit) / 2);
    if (positionChar === "F") {
      rowTopLimit -= rowModifier;
    } else {
      rowBottomLimit += rowModifier;
    }
  });
  const row = rowBottomLimit;

  const seatChars = line.substring(7);
  let seatBottomLimit = 0;
  let seatTopLimit = 7;
  seatChars.split("").forEach((positionChar) => {
    const seatModifier = Math.ceil((seatTopLimit - seatBottomLimit) / 2);
    if (positionChar === "L") {
      seatTopLimit -= seatModifier;
    } else {
      seatBottomLimit += seatModifier;
    }
  });
  const seat = seatBottomLimit;
  const boardId = 8 * row + seat;
  seatIds.push(boardId);
  if (maxBoardId < boardId) {
    maxBoardId = boardId;
  }
  console.log(`BoardPass: ${line}, Row: ${row}, Seat: ${seat}, seat ID: ${8 * row + seat}`);

  if (isLast) {
    const sortedSeats = seatIds.sort((a, b) => a - b);
    const seatFound = sortedSeats.find((val, index) => sortedSeats[index + 1] - val !== 1);

    console.log(`Max board Id: ${maxBoardId}`);
    console.log(`My seat: ${seatFound + 1}`);
  }
});
