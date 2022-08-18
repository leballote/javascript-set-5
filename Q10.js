class Person {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
  }
  getFullName() {
    return `${this.name} ${this.lastName}`;
  }
  generateQueryString() {
    let q = "?";
    for (const key in this) {
      if (this.hasOwnProperty(key)) {
        q += `${encodeURIComponent(key)}=${encodeURIComponent(this[key])}&`;
      }
    }
    return q.replace(/&$/, "");
  }
  async request() {
    return fetch(`https://myApi/person?${this.generateQueryString()}`);
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

console.log(George.generateQueryString());
console.log(Anna.generateQueryString());
