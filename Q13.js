function toUnixStamp(date) {
  return Math.floor(date.getTime() / 1000);
}

Date.prototype.nextDay = function () {
  const out = new Date(this);
  const newDay = out.getDate() + 1;
  out.setDate(newDay);
  return out;
};

const x = new Date(2020, 7, 26);
const y = new Date(2020, 0, 31);
console.log(x.nextDay());
console.log(y.nextDay());
