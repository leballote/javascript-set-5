function fib(n) {
  fib.memo = fib.memo || {};
  if (n == 0) return 0;
  if (n == 1) return 1;
  if (fib.memo.hasOwnProperty(n)) {
    return fib.memo[n];
  } else {
    fib.memo[n] = fib(n - 1) + fib(n - 2);
    return fib.memo[n];
  }
}

console.log(fib.memo);
console.log(fib(10));
console.log(fib(5));
console.log(fib.memo);
