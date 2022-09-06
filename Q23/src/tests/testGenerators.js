//this file was supposed to create tests, only passing the table of cases but had an error regarding the time per test

const { getNonRepeatingRandomGenerator } = require("../generator");
const {
  createCounterFromGenerator,
  testNotRepeatedInCounter,
  testAllGeneratedInCounter,
} = require("./utils");

const runTCaseNonRepeated = (tcase) => {
  test.each(tcase)("Not repeated for lo=%i, hi=%i", (lo, hi, freq) => {
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
};

const runTCaseAllNumbersGenerated = (tcase) => {
  test.each(tcase)(
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
};

module.exports = {
  runTCaseNonRepeated,
  runTCaseAllNumbersGenerated,
};
