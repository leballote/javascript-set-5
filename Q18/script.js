import candidates from "./candidates.js";

window.candidates = candidates;

//templates
const candidateTemplate = document.getElementById("candidate-template");
const candidateEditableTemplate = document.getElementById(
  "candidate-editable-template"
);

//elements
const candidatesTable = document.getElementById("candidates-table");
const candidatesTableBody = document.querySelector(
  "#candidates-table #main-tbody"
);
const candidateForm = document.getElementById("candidate-form");

//buttons or links
const addCandidate = document.getElementById("add-candidate");
const acceptBtn = document.getElementById("accept-btn");
const cancelBtn = document.getElementById("cancel-btn");

//state
const appState = {
  rowsBeingEdited: {},
};

//event listeners

addCandidate.addEventListener("click", (ev) => {
  ev.preventDefault();
  candidateForm.classList.toggle("visible");
  candidateForm.querySelector("input").focus();
});

acceptBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  const formData = new FormData(candidateForm);
  myFetch("http://myApi.com/v1/candidate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  }).then((res) => {
    myFetch("http://myApi.com/v1/candidates")
      .then((res) => JSON.parse(res))
      .then((parsed) => {
        const { data } = parsed;
        renderTable(data);
      });
  });
  candidateForm.classList.remove("visible");
  candidateForm.reset();
});

cancelBtn.addEventListener("click", (ev) => {
  ev.preventDefault();
  candidateForm.classList.remove("visible");
});

candidatesTable.addEventListener("click", (ev) => {
  ev.preventDefault();
  const edit = ev.target.closest(".edit-btn");
  const del = ev.target.closest(".delete-btn");
  const candidateRow = ev.target.closest(".candidate-tr");

  const acceptEdit = ev.target.closest(".accept-edit-btn");
  const cancelEdit = ev.target.closest(".cancel-edit-btn");
  const candidateEditableRow = ev.target.closest(".candidate-editable-tr");
  if (edit) {
    setEditable(candidateRow);
  }
  if (del) {
    const id = getNumberId(candidateRow.id);
    deleteCandidate(candidateRow);
    myFetch(`http://myApi.com/v1/candidate/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    deleteCandidate(candidateRow);
  }
  if (acceptEdit) {
    myFetch(
      `http://myApi.com/v1/candidate/${getNumberId(candidateEditableRow.id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: candidateEditableRow.querySelector(".candidate-name")
            .textContent,
          lastName: candidateEditableRow.querySelector(".candidate-last-name")
            .textContent,
          phone:
            candidateEditableRow.querySelector(".candidate-phone").textContent,
        }),
      }
    )
      .then((res) => JSON.parse(res))
      .then((parsed) => {
        const { data } = parsed;
        returnCandidate(candidateEditableRow, data);
      });
  }
  if (cancelEdit) {
    const id = getNumberId(candidateEditableRow.id);
    console.log(id, appState.rowsBeingEdited[getIdFromNumber(id)]);
    returnCandidate(
      candidateEditableRow,
      appState.rowsBeingEdited[getIdFromNumber(id)]
    );
    delete appState.rowsBeingEdited[getIdFromNumber(id)];
  }
});

myFetch(`http://myApi.com/v1/candidates`)
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

function getDataFromElement(cand) {
  if (cand == "string") cand = document.getElementById(cand);
  const out = {
    id: getNumberId(cand.id),
    name: cand.querySelector(".candidate-name").textContent,
    lastName: cand.querySelector(".candidate-last-name").textContent,
    phone: cand.querySelector(".candidate-phone").textContent,
  };
  return out;
}

function getNumberId(str) {
  const { groups } = str.match(/(candidate)-(?<id>\d+)/);
  return groups.id;
}

function getIdFromNumber(id) {
  return `candidate-${id}`;
}

function setEditable(cand) {
  if (typeof cand == "string") cand = document.getElementById(cand);
  const id = cand.id;
  appState.rowsBeingEdited[id] = getDataFromElement(cand);
  console.log(appState);
  const editableCand = createEditable(cand);
  cand.parentElement.replaceChild(editableCand, cand);
}

function createEditable(cand) {
  const candidateEditableEl = candidateEditableTemplate
    .cloneNode(true)
    .content.querySelector(".candidate-editable-tr");

  const nameEl = candidateEditableEl.querySelector(".candidate-name");
  const lastNameEl = candidateEditableEl.querySelector(".candidate-last-name");
  const phoneEl = candidateEditableEl.querySelector(".candidate-phone");

  nameEl.innerText = cand.querySelector(".candidate-name").innerText;
  lastNameEl.innerText = cand.querySelector(".candidate-last-name").innerText;
  phoneEl.innerText = cand.querySelector(".candidate-phone").innerText;

  candidateEditableEl.id = cand.id;

  return candidateEditableEl;
}

function deleteCandidate(cand) {
  cand.remove();
}

function returnCandidate(candidateEditableRow, candidateData) {
  if (candidateEditableRow === "string") {
    candidateEditableRow = document.getElementById(candidateEditableRow);
  }
  candidateEditableRow.parentElement.replaceChild(
    createCandidate(candidateData),
    candidateEditableRow
  );
}

//simulates my server
async function myFetch(urlString, config = {}) {
  let { method = "GET", body = "{}" } = config;
  body = JSON.parse(body);

  let resolvedData;
  let resolvedStatus;
  const url = new URL(urlString);
  const [, , resource, id] = url.pathname.split("/");

  if (method == "GET" || method == "get") {
    if (resource == "candidates") {
      resolvedData = candidates.getList();
      resolvedStatus = "200";
    }
    if (resource == "candidate") {
      resolvedData = candidates.get(id);
    }
  }

  if (method == "POST" || method == "post") {
    const inserted = candidates.insert(body);
    resolvedData = inserted;
    resolvedStatus = "201";
  }

  if (method == "DELETE" || method == "delete") {
    const deleted = candidates.delete(id);
    resolvedData = deleted;
    resolvedStatus = "202";
  }

  if (method == "PUT" || method == "put") {
    try {
      const updated = candidates.update(id, body);
      resolvedData = updated;
      resolvedStatus = "200";
    } catch {
      resolvedData = {};
      resolvedStatus = "204";
    }
  }

  return new Promise((resolve) => {
    setTimeout(
      resolve(
        JSON.stringify({ data: resolvedData, statusCode: resolvedStatus })
      ),
      300
    );
  });
}
