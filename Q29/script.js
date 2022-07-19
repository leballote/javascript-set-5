const show = document.getElementById("id1");
const div = document.getElementsByTagName("div")[0];

show.addEventListener("click", (ev) => {
  console.log("hey");
  ev.preventDefault();
  div.classList.add("visible");
});
