function createCounterFromGenerator(gen) {
  const counter = {};
  for (const el of gen) {
    if (!(el in counter)) {
      counter[el] = 1;
    } else {
      counter[el]++;
    }
  }
  return counter;
}

function testNotRepeatedInCounter(counter) {
  for (let [num, c] of Object.entries(counter)) {
    if (c > 1) {
      return [false, num];
    }
  }
  return [true, null];
}

function testAllGeneratedInCounter(counter, lo, hi) {
  for (let num = lo; num < hi; num++) {
    if (!(num in counter)) {
      return [false, num];
    }
  }
  return [true, null];
}

module.exports = {
  createCounterFromGenerator,
  testNotRepeatedInCounter,
  testAllGeneratedInCounter,
};
