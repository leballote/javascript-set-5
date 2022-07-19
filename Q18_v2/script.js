let temp;
const candidateTemplate = document.getElementById("candidate-template");
const newCandidateTemplate = document.getElementById("new-candidate-template");
const candidatesTable = document.getElementById("candidates-table");
const candidatesTableBody = document.querySelector(
  "#candidates-table #main-tbody"
);
const addCandidate = document.getElementById("add-candidate");

//event listeners

addCandidate.addEventListener("click", (ev) => {
  ev.preventDefault();
  spanNewCandidate();
});

candidatesTable.addEventListener("click", (ev) => {
  const edit = ev.target.closest(".edit-btn");
  const del = ev.target.closest(".delete-btn");
  const candidateRow = ev.target.closest("candidate-tr");
  if (edit) {
    ev.preventDefault();
    const id = getNumberId(candidateRow.id);
    editCandidateData(id);
    renderTable();
  }
  if (del) {
    ev.preventDefault();
    const id = getNumberId(candidateRow.id);
    deleteCandidateData(id);
    renderTable();
  }
});

async function myFetch(fakeURL, config = {}) {
  const { method = "GET", body, headers } = config;
  const candidates = [
    {
      id: 0,
      name: "Luis",
      lastName: "Ballote",
      phone: "12345678",
    },
    {
      id: 1,
      name: "Hey",
      lastName: "Joe",
      phone: "12345678",
    },
    {
      id: 2,
      name: "Maximiliano",
      lastName: "de Hasburgo",
      phone: "87654321",
    },
  ];

  let resolvedData;
  let resolvedStatus;
  if (method == "GET" || method == "get") {
    resolvedData = candidates;
    resolvedStatus = "200";
  }

  if (method == "POST" || method == "post") {
    resolvedData = body;
  }

  return Promise.resolve(
    JSON.stringify({ data: resolvedData, statusCode: resolvedStatus })
  );
}

let s;
myFetch()
  .then((json) => {
    return JSON.parse(json);
  })
  .then((parsed) => {
    const { data } = parsed;
    renderTable(data);
  });

function renderTable(clientsData) {
  const fragment = new DocumentFragment();
  for (const clientData of clientsData) {
    const candidate = createCandidate(clientData);
    fragment.append(candidate);
  }
  candidatesTableBody.replaceChildren(fragment);
}

function createCandidate(candidateData) {
  const {
    id,
    name: nameData,
    lastName: lastNameData,
    phone: phoneData,
  } = candidateData;
  const candidateRow = candidateTemplate
    .cloneNode(true)
    .content.querySelector(".candidate-tr");

  const candidateNameEl = candidateRow.querySelector(".candidate-name");
  const candidateLastNameEl = candidateRow.querySelector(
    ".candidate-last-name"
  );
  const phoneEl = candidateRow.querySelector(".candidate-phone");

  candidateRow.id = `candidate-${id}`;
  candidateNameEl.textContent = nameData;
  candidateLastNameEl.textContent = lastNameData;
  phoneEl.textContent = phoneData;

  return candidateRow;
}

function spanNewCandidate() {
  const candidateRow = newCandidateTemplate
    .cloneNode(true)
    .content.querySelector(".new-candidate-tr");

  console.log(candidateRow);
  candidatesTableBody.prepend(candidateRow);

  return candidateRow;
}

function getNumberId(str) {
  const { groups } = str.match(/(candidate)-(?<id>\d+)/);
  return groups.id;
}

function pupUpForm() {}
function hideForm() {}

function deleteCandidateData() {}

function createCandidateData() {}

function editCandidateData() {}
