const table = document.querySelector("table");
//the table should include a tbody and a thead but we'll work around it
const tbody = table.querySelector("tbody");
const thead = table.querySelector("tr");

//state variables
let reverse = false;

thead.querySelector("td:nth-child(2)").addEventListener("click", sortByAge);

let temp;
function sortByAge(ev) {
  const rows = tbody.querySelectorAll("tr:not(:first-child) ");

  const rowsAges = Array.prototype.map.call(rows, (row) => {
    return [parseInt(row.querySelector("td:nth-child(2)").textContent), row];
  });

  let sortedRows = rowsAges.sort(([age1, row1], [age2, row2]) => {
    return (-1) ** -reverse * (age1 - age2);
  });
  reverse = !reverse;
  temp = sortedRows.map(([age, row]) => row);

  tbody.replaceChildren(thead, ...sortedRows.map(([age, row]) => row));
}
