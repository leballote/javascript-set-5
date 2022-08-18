const { getRandomInteger } = require("./utils");

function* getNonRepeatingRandomGenerator(lo, hi) {
  const base = new Array(hi - lo);
  const n = hi - lo;
  for (let i = 0; i < n; i++) {
    base[i] = i;
  }
  while (base.length > 0) {
    let randomIndex = getRandomInteger(0, base.length);
    yield base.splice(randomIndex, 1)[0] + lo;
  }
}

module.exports = { getNonRepeatingRandomGenerator };
