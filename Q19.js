const toScape = ["\\, *"];

function compare(pattern, string) {
  const n = pattern.length;
  for (let i = 0; i < n; i++) {
    const patternChar = pattern[i];
    const stringChar = string[i];
    if (patternChar === "*") {
      continue;
    }
    if (patternChar !== stringChar) {
      return false;
    }
  }
  return true;
}

function match(pattern, string) {
  for (let i = 0; i < string.length - pattern.length + 1; i++) {
    const subToCheck = string.slice(i, i + pattern.length);
    if (compare(pattern, subToCheck)) {
      return true;
    }
  }
  return false;
}

const test1 = match("ua", "how is your jaguar");
const test2 = match("ho*", "how is your jaguar");
const test3 = match("how*e", "how is your jaguar");
console.log(test1);
console.log(test2);
console.log(test3);
