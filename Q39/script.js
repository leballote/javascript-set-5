const toValidate = document.getElementById("input-to-validate");
const feedback = document.getElementById("feedback");

let currentText = toValidate.value;

toValidate.addEventListener("input", (ev) => {
  const newText = ev.target.value;
  if (!isValid(newText)) {
    //this is what I meant, you are not really preventing the user from writing invalid inputs, you are just reverting his invalid input. But I didn't find a workaround and it feels just ok.
    ev.target.value = currentText;
    feedback.innerText = "Invalid input";
    feedback.classList.add("invalid");
  } else {
    currentText = newText;
    feedback.innerText = "";
    feedback.classList.remove("invalid");
  }
});

const layout = {
  1: { prev: null, next: "2" },
  2: { prev: "1", next: "3" },
  3: { prev: "2", next: "4" },
  4: { prev: "3", next: "5" },
  5: { prev: "4", next: "6" },
  6: { prev: "5", next: "7" },
  7: { prev: "6", next: "8" },
  8: { prev: "7", next: "9" },
  9: { prev: "8", next: "0" },
  0: { prev: "9", next: null },

  q: { prev: null, next: "w" },
  w: { prev: "q", next: "e" },
  e: { prev: "w", next: "r" },
  r: { prev: "e", next: "t" },
  t: { prev: "r", next: "y" },
  y: { prev: "t", next: "u" },
  u: { prev: "y", next: "i" },
  i: { prev: "u", next: "o" },
  o: { prev: "i", next: "p" },
  p: { prev: "o", next: null },

  a: { prev: null, next: "s" },
  s: { prev: "a", next: "d" },
  d: { prev: "s", next: "f" },
  f: { prev: "d", next: "g" },
  g: { prev: "f", next: "h" },
  h: { prev: "g", next: "j" },
  j: { prev: "h", next: "k" },
  k: { prev: "j", next: "l" },
  l: { prev: "k", next: ";" },
  ";": { prev: "l", next: null },

  z: { prev: null, next: "x" },
  x: { prev: "z", next: "c" },
  c: { prev: "x", next: "v" },
  v: { prev: "c", next: "b" },
  b: { prev: "v", next: "n" },
  n: { prev: "b", next: "m" },
  m: { prev: "n", next: "," },
  ",": { prev: "m", next: "." },
  ".": { prev: ",", next: "/" },
  "/": { prev: ".", next: null },
};

function getNext(char) {
  return layout[char]?.next;
}

function getPrev(char) {
  return layout[char]?.prev;
}

function isValid(text) {
  let consecutiveLeftRright = 1;
  let consecutiveRightLeft = 1;

  for (let i = 0; i < text.length - 1; i++) {
    const char = text[i];
    const consChar = getNext(char)?.toLowerCase();
    const nextChar = text[i + 1].toLowerCase();
    if (consChar == nextChar) {
      consecutiveLeftRright++;
    } else {
      consecutiveLeftRright = 1;
    }
    if (consecutiveLeftRright >= 4) {
      return false;
    }
  }

  for (let i = 0; i < text.length - 1; i++) {
    const char = text[i];
    const prevChar = text[i + 1].toLowerCase();
    const consChar = getPrev(char)?.toLowerCase();
    if (consChar == prevChar) {
      consecutiveRightLeft++;
    } else {
      consecutiveLeftRright = 1;
    }
    if (consecutiveRightLeft >= 4) {
      return false;
    }
  }

  return true;
}

function printTest(text) {
  console.log(isValid(text), text);
}

//tests for the isValid function
console.group("True");
printTest("hola");
printTest("ho l");
printTest(" hiw");
printTest("holacomo");
printTest("hola como");
printTest("");
printTest("iopa");
console.groupEnd();

console.group("False");
printTest("asdf");
printTest("qwer");
printTest("rewq");
printTest("asdfg");
printTest("gfdsa");

console.groupEnd();
