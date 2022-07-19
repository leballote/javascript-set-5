document.body.addEventListener("click", (ev) => {
  const p = ev.target.closest("p:nth-child(2n + 1)");
  if (p) {
    const toToggle = p.nextElementSibling;
    toToggle.classList.toggle("visible");
  }
});

const p = document.querySelector("p");
