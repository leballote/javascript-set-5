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

const x = new TripletSet();

function findZeroTernaries(nums) {
  const set = new TripletSet();
  const counter = new Map();
  for (const el of nums) {
    counter.set(el, counter.get(el) + 1 || 1);
  }
  for (let i = 0; i < nums.length; i++) {
    const el1 = nums[i];
    for (let j = i + 1; j < nums.length; j++) {
      const el2 = nums[j];
      const sum = el1 + el2;
      let available = counter.get(-sum);
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
test = [1, 2, -2, -1];

let y;
console.log((y = findZeroTernaries(test)));
