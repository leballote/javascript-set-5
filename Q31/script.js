const togglables = document.querySelectorAll("p:nth-child(2n)");
document.body.addEventListener("click", (ev) => {
  const toggler = ev.target.closest("p:nth-child(2n + 1)");
  if (toggler) {
    const toToggle = toggler.nextElementSibling;
    if (!toToggle.classList.contains("visible")) {
      for (const togglable of togglables) {
        togglable.classList.remove("visible");
      }
    }
    toToggle.classList.toggle("visible");
  }
});

const p = document.querySelector("p");
