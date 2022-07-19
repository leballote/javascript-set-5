function max(iterable) {
  max = -Infinity;
  for (const el of iterable) {
    max = el > max ? el : max;
  }
  return max;
}

const x = max([1, 8, 3, 4]);

console.log(x);
