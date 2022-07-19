//TODO: try to make it faster. In theory, it runs in O(n**2) and I don't think it can be asymptotically faster, but I feel we can reduce the constant factor.
class TripletSet {
  constructor(sep = ",") {
    this.sep = sep;
    this.set = new Set();
  }

  has(triplet) {
    return this.set.has(this.#stringify(triplet));
  }

  add(triplet) {
    return this.set.add(this.#stringify(triplet.sort()));
  }

  #stringify(triplet) {
    return triplet.join(this.sep);
  }

  #destringify(tripletString) {
    return tripletString.split(this.sep).map((el) => parseInt(el));
  }

  *[Symbol.iterator]() {
    for (const el of this.set) {
      yield this.#destringify(el);
    }
  }

  toString() {
    const { map } = Array.prototype;
    return new Set(
      map.call(this.set, (el) => this.#destringify(el))
    ).toString();
  }
}

function findZeroTernaries(nums) {
  const set = new TripletSet();
  const counter = new Map();
  for (const el of nums) {
    counter.set(el, counter.get(el) + 1 || 1);
  }
  const keys = [...counter.keys()];
  for (let i = 0; i < keys.length; i++) {
    const el1 = keys[i];
    const am1 = counter.get(el1);
    for (let j = i; j < keys.length; j++) {
      const el2 = keys[j];
      if (el1 === el2 && am1 - 1 < 1) {
        continue;
      }
      const sum = el1 + el2;
      let available = counter.get(-sum || 0);
      if (el1 === -sum) {
        available -= 1;
      }
      if (el2 === -sum) {
        available -= 1;
      }
      if (available > 0) {
        set.add([el1, el2, -sum]);
      }
    }
  }
  return [...set];
}

let test = [3, 2, 1, 0, -3, 2, 2, -2];
test = [-1, 0, 1, 2, -1, -4];

let y;
console.log((y = findZeroTernaries(test)));
