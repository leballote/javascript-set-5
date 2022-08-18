const { plot } = require("nodeplotlib");
const { getNonRepeatingRandomGenerator } = require("./generator");
//The old generator with memory will serve as ground truth
const {
  getNonRepeatingRandomGenerator: getNonRepeatingRandomGeneratorGT,
} = require("./oldGenerator");
const { writeGeneratedData } = require("./utils");

const [lo, hi] = [500, 1000];
const gen = getNonRepeatingRandomGenerator(lo, hi);
const x = [];
const y = [];
let count = 0;
for (const num of gen) {
  x.push(count++);
  y.push(num);
}

const data = [
  {
    x,
    y,
    mode: "markers",
    type: "scatter",
  },
];

const genGT = getNonRepeatingRandomGeneratorGT(lo, hi);
const xGT = [];
const yGT = [];

count = 0;
for (const num of genGT) {
  xGT.push(count++);
  yGT.push(num);
}

const gt = [
  {
    x: xGT,
    y: yGT,
    mode: "markers",
    type: "scatter",
  },
];

plot(data, { title: "LCG", xaxis: { title: "iter" }, yaxis: { title: "out" } });
plot(gt, {
  title: "Ground Truth",
  xaxis: { title: "iter" },
  yaxis: { title: "out" },
});

// // writes the data into ./data/data.csv and prints in console repeated elements (if any)
// writeGeneratedData(gen);
