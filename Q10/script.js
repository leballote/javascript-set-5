class Person {
  static host = "https://myapi.domain";
  static base = "person";
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
  }
  getFullName() {
    return `${this.name} ${this.lastName}`;
  }
  getURLString() {
    const url = new URL(Person.base, Person.host);
    url.searchParams.set("name", this.name);
    url.searchParams.set("lastName", this.lastName);
    return url.toString();
  }
  async request() {
    return fetch(this.getURLString());
  }
}

class Medic extends Person {
  constructor(name, lastName, speciality) {
    super(name, lastName);
    this.speciality = speciality;
  }
}

const George = new Person("George", "Johnson");
const Anna = new Medic("Anna", "Smith", "Odonthology");

console.group("George");
console.log(George.getURLString());
console.groupEnd();

console.group("Anna");
console.log(Anna.getURLString());
console.groupEnd();
