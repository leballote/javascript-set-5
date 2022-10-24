const square = document.getElementById("square");
const button = document.getElementById("move-btn");

const startingPosition = 1000;

square.style.transform = `translateX(${startingPosition}px)`;

button.addEventListener("click", (ev) => {
  moveLeft(square, 1000);
});

function translate(el, px) {
  el.style.transform = `translateX(${px}px)`;
}
//oops
function moveLeft(el, px) {
  let curr = startingPosition;
  const interval = setInterval(() => {
    if (Math.abs(startingPosition - curr) < px) {
      translate(el, (curr -= 10));
    } else {
      clearInterval(interval);
    }
  }, 10);
}
