//I am assuming that we can't use Array.prototype.flat

function flat(array) {
  // console.log("array", array);
  let ans = [];
  if (!Array.isArray(array)) {
    return array;
  }
  for (const el of array) {
    if (Array.isArray(el)) {
      ans.push(...flat(el));
    } else {
      ans.push(flat(el));
    }
  }
  return ans;
}

console.log(
  flat([
    1,
    [2, [3, 4, [5, 6]]],
    7,
    [8, 9, [10, 11, [12, 13, [14, 15]]]],
    16,
    17,
  ])
);
console.log([]);
