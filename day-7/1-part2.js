/**
It's getting pretty expensive to fly these days - not because of ticket prices, but because of the ridiculous number of bags you need to buy!

Consider again your shiny gold bag and the rules from the above example:

faded blue bags contain 0 other bags.
dotted black bags contain 0 other bags.
vibrant plum bags contain 11 other bags: 5 faded blue bags and 6 dotted black bags.
dark olive bags contain 7 other bags: 3 faded blue bags and 4 dotted black bags.
So, a single shiny gold bag must contain 1 dark olive bag (and the 7 bags within it) plus 2 vibrant plum bags (and the 11 bags within each of those): 1 + 1*7 + 2 + 2*11 = 32 bags!

Of course, the actual rules have a small chance of going several levels deeper than this example; be sure to count all of the bags, even if the nesting becomes topologically impractical!

Here's another example:

shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.
In this example, a single shiny gold bag must contain 126 other bags.

How many individual bags are required inside your single shiny gold bag?
 */
const path = require("path");
const lineReader = require("line-reader");

const bagsMap = new Map();

lineReader.eachLine(path.join(__dirname, "input.txt"), function (line, isLast) {
  const [container, containsString] = line.split("contain").map((el) => el.trim());
  const bagsContained = containsString
    .replace(".", "")
    .split(",")
    .map((el) => el.trim());

  bagsContained.forEach((bagContained) => {
    let typeOfBagContained = bagContained;
    let numberOfBagsContained = 1;
    if (bagContained !== "no other bags") {
      const indexOfFirstSpace = bagContained.indexOf(" ");
      const bagsContainedNumber = bagContained.substring(0, indexOfFirstSpace);
      if (bagsContainedNumber === "1") {
        bagContained += "s";
      }

      typeOfBagContained = bagContained.substr(indexOfFirstSpace + 1);
      numberOfBagsContained = bagContained.substr(0, indexOfFirstSpace);
      const currentValue = bagsMap.get(container);
      if (currentValue !== undefined) {
        currentValue.push({
          bagType: typeOfBagContained,
          bagCount: parseInt(numberOfBagsContained),
        });
        bagsMap.set(container, currentValue);
      } else {
        bagsMap.set(container, [
          {
            bagType: typeOfBagContained,
            bagCount: parseInt(numberOfBagsContained),
          },
        ]);
      }
    }
  });

  if (isLast) {
    console.log("bagsMap=====================================");
    console.log(bagsMap);
    console.log("=====================================");
    const countRequiredBagsInside = countAllBagsContained(bagsMap, [
      {
        previousCount: 1,
        bagType: "shiny gold bags",
        bagCount: 1,
      },
    ]);

    console.log(`Total bags contained: ${countRequiredBagsInside - 1}`);
  }
});

/**
 *
 * @param {Map} bagsMap
 * @param {Object[]} bagsToCount
 * @param {Number} total
 */
function countAllBagsContained(bagsMap, bagsToCount) {
  if (bagsToCount.length === 0) {
    return 1;
  } else {
    const elementToCount = bagsToCount.pop();
    if (bagsMap.get(elementToCount.bagType) === undefined) {
      return elementToCount.bagCount;
    } else {
      return (
        elementToCount.bagCount +
        bagsMap.get(elementToCount.bagType).reduce((prev, current) => {
          const childBag = {
            previousCount: elementToCount.bagCount,
            bagType: current.bagType,
            bagCount: current.bagCount,
          };
          const childResult = countAllBagsContained(bagsMap, [childBag]);
          return prev + elementToCount.bagCount * childResult;
        }, 0)
      );
    }
  }
}
