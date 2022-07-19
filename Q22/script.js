const chameleon = document.getElementById("chameleon");

chameleon.addEventListener("click", changeColor);

function changeColor(ev) {
  const el = ev.target;
  el.style.backgroundColor = getRandomColor();
}

function getRandomInt(low = 0, high) {
  return Math.floor(Math.random() * (high - low)) + low;
}

getRandomInt(10);

function getRandomColor() {
  let out = [null, null, null];
  out = out.map((el) => getRandomInt(0, 256));
  return `rgb(${out.join()})`;
}

console.log(getRandomColor());
