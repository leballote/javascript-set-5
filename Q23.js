//it technically doesn't save the numbers already gotten by the function but it does have some memory which I don't know if it is cheating.
//max is not inclusive
function* randomIterator(min, max) {
  const base = new Array(max - min);
  const n = max - min;
  for (let i = 0; i < n; i++) {
    base[i] = i;
  }
  while (base.length > 0) {
    let randomIndex = getRandomInt(0, base.length);
    yield base.splice(randomIndex, 1)[0];
  }
}

function getRandomFunction(min, max) {
  const it = randomIterator(min, max);
  return function () {
    return it.next().value;
  };
}

function getRandomInt(low = 0, high) {
  return Math.floor(Math.random() * (high - low)) + low;
}

const myRandomFunction = getRandomFunction(0, 50);

for (let i = 0; i < 30; i++) {
  let x = myRandomFunction();
  console.log(x);
}
