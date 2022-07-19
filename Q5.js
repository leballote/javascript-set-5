// It doesn't really say what I have to d

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function something(s) {
  const tokenized = s.split(" ");
  const lastToken = tokenized.at(-1);
  const lastTokenIndex = MONTHS.indexOf(lastToken);
  const out = tokenized
    .flatMap((el) => {
      if (el == lastToken) {
        return [el, MONTHS[(lastTokenIndex + 1) % MONTHS.length]];
      } else {
        return el;
      }
    })
    .join(" ");
  return out;
}

const input = "January February March January February March";
let output = something(input);

console.log(output);

output = something(output);

console.log(output);
