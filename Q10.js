class Person {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
  }
  getFullName() {
    return `${this.name} ${this.lastName}`;
  }
}

class Medic extends Person {
  constructor(name, lastName, speciality) {
    super(name, lastName);
    this.speciality = speciality;
  }
}

async function requestPerson(person) {
  return fetch(
    `https://myApi/person?name=${encodeURIComponent(
      person.name
    )}&lastName=${encodeURIComponent(person.lastName)}`
  );
}
