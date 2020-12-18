/**
Your flight to the major airline hub reaches cruising altitude without incident. While you consider checking the in-flight menu for one of those drinks that come with a little umbrella, you are interrupted by the kid sitting next to you.

Their handheld game console won't turn on! They ask if you can take a look.

You narrow the problem down to a strange infinite loop in the boot code (your puzzle input) of the device. You should be able to fix it, but first you need to be able to run the code in isolation.

The boot code is represented as a text file with one instruction per line of text. Each instruction consists of an operation (acc, jmp, or nop) and an argument (a signed number like +4 or -20).

acc increases or decreases a single global value called the accumulator by the value given in the argument. For example, acc +7 would increase the accumulator by 7. The accumulator starts at 0. After an acc instruction, the instruction immediately below it is executed next.
jmp jumps to a new instruction relative to itself. The next instruction to execute is found using the argument as an offset from the jmp instruction; for example, jmp +2 would skip the next instruction, jmp +1 would continue to the instruction immediately below it, and jmp -20 would cause the instruction 20 lines above to be executed next.
nop stands for No OPeration - it does nothing. The instruction immediately below it is executed next.
For example, consider the following program:

nop +0
acc +1
jmp +4
acc +3
jmp -3
acc -99
acc +1
jmp -4
acc +6
These instructions are visited in this order:

nop +0  | 1
acc +1  | 2, 8(!)
jmp +4  | 3
acc +3  | 6
jmp -3  | 7
acc -99 |
acc +1  | 4
jmp -4  | 5
acc +6  |
First, the nop +0 does nothing. Then, the accumulator is increased from 0 to 1 (acc +1) and jmp +4 sets the next instruction to the other acc +1 near the bottom. After it increases the accumulator from 1 to 2, jmp -4 executes, setting the next instruction to the only acc +3. It sets the accumulator to 5, and jmp -3 causes the program to continue back at the first acc +1.

This is an infinite loop: with this sequence of jumps, the program will run forever. The moment the program tries to run any instruction a second time, you know it will never terminate.

Immediately before the program would run an instruction a second time, the value in the accumulator is 5.

Run your copy of the boot code. Immediately before any instruction is executed a second time, what value is in the accumulator?
 */
const path = require("path");
const lineReader = require("line-reader");
const instructions = [];

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  const [operation, argument] = line.split(" ");
  instructions.push({
    operation,
    arg: {
      sign: argument.substring(0, 1),
      value: parseInt(argument.substring(1)),
    },
  });

  if (isLast) {
    const acc = calcAccumulatorValueUntilItEnds(instructions);
    console.log(`Accumulator: ${acc}`);
  }
});

const calcAccumulatorValueUntilItEnds = (instructions) => {
  let currentInstruction = 0;
  let accumulator = 0;
  let instructionsExecuted = new Map();
  const instructionsAlreadyModified = new Map();
  let alreadyModifiedInstruction = false;

  const tempInstructionHolder = {
    modifiedInstructionIndex: undefined,
    accumulatorValueOnModifiedIndex: undefined,
    instructionsExecutedOnModifiedIndex: undefined,
  };
  while (instructions.length !== currentInstruction) {
    // console.log("=====================================");
    // console.log(instructionsExecuted);
    // console.log(currentInstruction);
    // console.log(instructions);
    // console.log(instructionsAlreadyModified);
    // console.log("=====================================");
    if (!instructionsExecuted.has(currentInstruction)) {
      // console.log("instruction not executed");
      const operationData = instructions[currentInstruction];

      switch (operationData.operation) {
        case "acc":
          if (operationData.arg.sign === "+") {
            accumulator += operationData.arg.value;
          } else {
            accumulator -= operationData.arg.value;
          }
          instructionsExecuted.set(currentInstruction, 1);
          currentInstruction++;
          break;
        case "jmp":
          if (!alreadyModifiedInstruction && !instructionsAlreadyModified.has(currentInstruction)) {
            operationData.operation = "nop";
            alreadyModifiedInstruction = true;
            instructionsAlreadyModified.set(currentInstruction, true);
            tempInstructionHolder.modifiedInstructionIndex = currentInstruction;
            tempInstructionHolder.accumulatorValueOnModifiedIndex = accumulator;
            tempInstructionHolder.instructionsExecutedOnModifiedIndex = new Map(Array.from(instructionsExecuted));
          } else {
            instructionsExecuted.set(currentInstruction, 1);
            if (operationData.arg.sign === "+") {
              currentInstruction += operationData.arg.value;
            } else {
              currentInstruction -= operationData.arg.value;
            }
          }
          break;
        case "nop":
          if (!alreadyModifiedInstruction && !instructionsAlreadyModified.has(currentInstruction)) {
            operationData.operation = "jmp";
            alreadyModifiedInstruction = true;
            instructionsAlreadyModified.set(currentInstruction, true);
            tempInstructionHolder.modifiedInstructionIndex = currentInstruction;
            tempInstructionHolder.accumulatorValueOnModifiedIndex = accumulator;
            tempInstructionHolder.instructionsExecutedOnModifiedIndex = new Map(Array.from(instructionsExecuted));
          } else {
            instructionsExecuted.set(currentInstruction, 1);
            currentInstruction++;
          }
          break;
        default:
          throw new Error("Operation not supported");
      }
    } else {
      currentInstruction = tempInstructionHolder.modifiedInstructionIndex;
      accumulator = tempInstructionHolder.accumulatorValueOnModifiedIndex;
      instructionsExecuted = tempInstructionHolder.instructionsExecutedOnModifiedIndex;
      const operationData = instructions[currentInstruction];
      operationData.operation = operationData.operation === "nop" ? "jmp" : "nop";
      alreadyModifiedInstruction = false;
    }
  }
  return accumulator;
};
