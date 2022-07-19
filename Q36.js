function myPowerFn(base) {
  return function (exponent) {
    return base ** exponent;
  };
}

var n = myPowerFn(3);
console.log(n(2));
