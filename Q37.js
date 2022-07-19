String.prototype.exclamation = function () {
  return `${this}!`;
};

add = (...nums) => nums.reduce((acc, val) => acc + val, 0);

console.log("hello".exclamation() == "hello!");
console.log("hello world".exclamation() == "hello world!");

console.log(add(2, 5) == 7);
console.log(add(7, 11) == 18);
console.log(add(12, 8, 5, 6) == 31);
console.log(add() == 0);
