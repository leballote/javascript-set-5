const show = document.getElementById("id1");
const div = show.previousElementSibling;

show.addEventListener("click", (ev) => {
  ev.preventDefault();
  div.classList.add("visible");
});
