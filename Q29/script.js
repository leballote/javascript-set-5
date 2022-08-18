const show = document.getElementById("id1");
//maybe this? still doesn't seem too robust to me
const div = show.previousElementSibling;

show.addEventListener("click", (ev) => {
  ev.preventDefault();
  div.classList.add("visible");
});
