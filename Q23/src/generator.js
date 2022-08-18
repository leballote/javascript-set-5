const {
  getRandomInteger,
  mod,
  mulAXmodM,
  writeGeneratedData,
} = require("./utils");

function* getNonRepeatingRandomGenerator(lo, hi) {
  const M = hi - lo;
  let p;
  let proot;
  // we use primes as the modulo, and primitive roots as the multiplier, I could have choosen any, and perhaps there are better quality roots. I found them using wolframalpha.com
  if (M < 1 << 13) {
    p = (1 << 13) - 1;
    proot = 8097;
  } else if (M < 1 << 17) {
    p = (1 << 17) - 1;
    proot = 130985;
  } else {
    p = (2 << 32) - 1;
    proot = 7 ** 5;
  }
  const seed = getRandomInteger(0, M);
  let gen = LCG(p, seed, proot, 0);
  for (let i = 0; i < M; i++) {
    let x = gen.next().value;
    while (x > M) {
      x = gen.next().value;
    }
    yield x + lo;
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
