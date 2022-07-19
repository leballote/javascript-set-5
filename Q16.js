var candidate = {
  name: {
    firstname: "John",
    lastname: "Galt",
    phone: "123-456-7890",
  },
};

//I supposed you couldn't touch the candidate object.
candidate.printName = function () {
  const { firstname, lastname } = this.name;
  return `${firstname} ${lastname}`;
};

console.log(candidate.printName());
