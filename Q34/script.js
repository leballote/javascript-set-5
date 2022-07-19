import { modelBounce } from "./bouncing.js";

const button = document.getElementById("go-btn");
const ball = document.getElementById("ball");

// how many pixels represent an inch
const inchModel = 50;

// FIXME: it is not working as intended, it could be due to the interval limitation
const fps = 100;

// value to pass to setInterval
const tstep = 1000 / fps;
console.log(tstep);

// how many seconds in real life is a second in the simulation; increase to slow down, decreese to speed up
const modelSeconds = 1;

const dt = 1 / (fps * modelSeconds);

translateYInches(ball, 10);

let interval;
let prevV;
let prevH;
button.addEventListener("click", (ev) => {
  window.count = 0;
  clearInterval(interval);
  const trayectory = modelBounce(dt); //it is an iterator
  translateYInches(ball, 10);
  interval = setInterval(() => {
    let state = trayectory.next().value;
    let { h, v, n } = state;
    if (Math.sign(prevV) != Math.sign(v) && h != 0) {
      console.log(prevH, h);
    }
    prevV = v;
    prevH = h;
    if (n === 0) {
      clearInterval(interval);
    }
    translateYInches(ball, h);
    count += 1;
  }, tstep);
});

function translateYInches(el, px) {
  el.style.transform = `translateY(${-px * inchModel}px)`;
}
