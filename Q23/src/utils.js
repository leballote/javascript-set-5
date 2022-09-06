const fs = require("fs/promises");

// utils
function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

//real modulo operator (i.e. positive)
function mod(a, M) {
  let res = a % M;
  if (res < 0) {
    return M + res;
  } else {
    return res;
  }
}

function mulAXmodM(a, X, M) {
  let ans = 0;
  while (X) {
    if (X & 1) ans = (ans + a) % M;
    a = (a + a) % M;
    X = X >> 1;
  }
  return ans;
}

//writes all the generated sequence to data.csv
//Also, it prints in cyan all the repeated numbers in the sequence
async function writeGeneratedData(gen, out = "./data/data.csv") {
  const mem = {};
  await fs.writeFile("./data.csv", "number\n");
  for (const X of gen) {
    if (mem[X] == 0 || mem[X] == null) {
      mem[X] = 1;
      // console.log(X);
      fs.appendFile(out, String(X) + "\n");
    } else {
      mem[X]++;
      console.log("\x1b[36m%s\x1b[0m", X);
    }
  }
}

module.exports = {
  getRandomInteger,
  mod,
  mulAXmodM,
  writeGeneratedData,
};
