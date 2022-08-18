function propDiff(a, b, eqFn = (x, y) => x === y) {
  if (typeof a != "object" || typeof b != "object") {
    throw new TypeError(`both arguments should be objects`);
  }
  const out = [];
  if (a == null) {
    return Object.keys(b);
  }
  if (b == null) {
    return propDiff(b, a);
  }
  const keys = Object.keys({ ...a, ...b });
  for (const key of keys) {
    if (!Object.prototype.hasOwnProperty.call(a, key)) {
      out.push(key);
    } else if (!Object.prototype.hasOwnProperty.call(b, key)) {
      out.push(key);
    } else if (!eqFn(a[key], b[key])) {
      out.push(key);
    }
  }
  return out;
}

const x = {
  p1: 1,
  p2: 2,
  p3: 3,
  p4: 4,
};

const y = {
  p1: "hey",
  p2: 2,
  p3: "wow",
  p4: 4,
};

console.log(propDiff(x, y));
console.log(propDiff({ a: undefined }, {}));

const x2 = Object.create(null);
x2["p1"] = 3;
const y2 = { p1: 4 };

console.log(propDiff(x2, y2));
