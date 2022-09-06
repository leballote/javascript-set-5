const {
  getRandomInteger,
  mod,
  mulAXmodM,
  writeGeneratedData,
} = require("./utils");

function* getNonRepeatingRandomGenerator(lo = 0, hi) {
  const M = hi - lo;
  let p;
  let proot;
  // we use primes as the modulo, and primitive roots as the multiplier, I could have choosen any, and perhaps there are better quality roots. I found them using wolframalpha.com
  if (M < 1 << 13) {
    p = (1 << 13) - 1;
    proot = 8_097;
    // 2**17 - 1
  } else if (M <= 131_071) {
    p = 131_071;
    proot = 130_985;
  } else if (M <= 13_098_511) {
    p = 13_098_511;
    proot = 13_098_413;
  } else {
    p = 1_073_741_789;
    proot = 1_073_741_699;
  }
  const seed = getRandomInteger(1, M);
  let gen = LCG(p, seed, proot, 0);
  for (let i = 0; i < M; i++) {
    let x = gen.next().value;
    while (x > M) {
      x = gen.next().value;
    }
    yield x + lo - 1;
  }
}

function* LCG(M, seed, a, c) {
  let X = seed;
  for (let i = 0; i < M; i++) {
    X = (mulAXmodM(a, X, M) + mod(c, M)) % M;
    yield X;
  }
}

module.exports = { getNonRepeatingRandomGenerator };
