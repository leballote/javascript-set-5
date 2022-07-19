// a)
function reverse(s) {
  let out = "";
  for (let i = s.length - 1; i >= 0; i--) {
    out += s[i];
  }
  return out;
}

const s = "hi how are you";
const s2 = reverse(s);
console.log(s2);

// b)
String.prototype.reverse = function () {
  return reverse(this);
};

const s3 = "hello world".reverse();
console.log(s3);

// c)
String.prototype.reverseWords = function () {
  const tokenized = this.split(" ");
  return tokenized.map((s) => s.reverse()).join(" ");
};

const s4 = "hello world".reverseWords();
console.log(s4);
