//here doesn't specify if it should be deep, shallow or something else for the duplicated elements. I'll assume they should be the same (by reference).
Array.prototype.duplicate = function () {
  return this.concat(this);
};

console.log([1, 2, 3, 4].duplicate());
