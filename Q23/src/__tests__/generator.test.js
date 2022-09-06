const { getNonRepeatingRandomGenerator } = require("../generator");
const {
  createCounterFromGenerator,
  testNotRepeatedInCounter,
  testAllGeneratedInCounter,
} = require("../tests/utils");

jest.setTimeout(60000);

const tcase1 = [
  [0, 10, 50],
  [1, 2, 10],
  [0, 0, 10],
  [4, 7, 50],
  [500, 10000, 50],
];

//big Numbers
const tcase2 = [
  [5322, 210_000, 2],
  [7000, 2_400_000, 2],
  [3, 2 ** 11 - 1, 2],
];

it.concurrent.each(tcase1)(
  "Not repeated for lo=%i, hi=%i %i times",
  (lo, hi, freq) => {
    for (let i = 0; i < freq; i++) {
      const gen = getNonRepeatingRandomGenerator(lo, hi);
      const counter = createCounterFromGenerator(gen);
      const [ok] = testNotRepeatedInCounter(counter);
      if (ok == false) {
        console.log(counter);
      }
      expect(ok).toBe(true);
    }
  }
);

it.concurrent.each(tcase1)(
  "All numbers in range for lo=%i, hi=%i %i times",
  (lo, hi, freq) => {
    if (freq == undefined) freq = 10;
    for (let i = 0; i < 1; i++) {
      const gen = getNonRepeatingRandomGenerator(lo, hi);
      const counter = createCounterFromGenerator(gen);
      const [ok] = testAllGeneratedInCounter(counter);
      expect(ok).toBe(true);
    }
  }
);

it.concurrent.each(tcase2)("Not repeated for lo=%i, hi=%i", (lo, hi, freq) => {
  if (freq == undefined) freq = 10;
  for (let i = 0; i < 1; i++) {
    const gen = getNonRepeatingRandomGenerator(lo, hi);
    const counter = createCounterFromGenerator(gen);
    const [ok] = testNotRepeatedInCounter(counter);
    if (ok == false) {
      console.log(counter);
    }
    expect(ok).toBe(true);
  }
});

it.concurrent.each(tcase2)(
  "All numbers in range for lo=%i, hi=%i %i times",
  (lo, hi, freq) => {
    if (freq == undefined) freq = 10;
    for (let i = 0; i < 1; i++) {
      const gen = getNonRepeatingRandomGenerator(lo, hi);
      const counter = createCounterFromGenerator(gen);
      const [ok] = testAllGeneratedInCounter(counter);
      expect(ok).toBe(true);
    }
  }
);
