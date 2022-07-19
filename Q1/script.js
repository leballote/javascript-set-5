const square = document.getElementById("square");
const button = document.getElementById("move-btn");

button.addEventListener("click", (ev) => {
  moveLeft(square, 500);
});

function translate(el, px) {
  el.style.transform = `translateX(${px}px)`;
}

function moveLeft(el, px) {
  let curr = 0;
  const interval = setInterval(() => {
    if (curr < px) {
      translate(el, (curr += 10));
    } else {
      console.log("clearing");
      clearInterval(interval);
    }
  }, 10);
}
