// this seems to take into acount repeated numbers
function findIntersection(a, b) {
  const out = [];
  for (const el of a) {
    if (b.includes(el)) {
      out.push(el);
    }
  }
  return out;
}

const arr1 = [2, 3, 5, 3];
const arr2 = [3, 4, 3, 5, 3, 6, 8];
const inter = findIntersection(arr1, arr2);

console.log(inter);
