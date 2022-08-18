var candidate = {
  name: {
    firstname: "John",
    lastname: "Galt",
    phone: "123-456-7890",
  },
};

candidate.printName = function () {
  const { firstname, lastname } = this.name;
  return `${firstname} ${lastname}`;
};

const target = document.querySelector("#body .info");

const [firstDiv, secondDiv] = target.querySelectorAll("div");
firstDiv.textContent = candidate.name.firstname;
secondDiv.textContent = candidate.printName();
