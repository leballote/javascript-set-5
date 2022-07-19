import SimpleDB from "./database.js";

const candidates = new SimpleDB("candidates");

if (candidates.size == 0) {
  candidates.insert({
    name: "Luis",
    lastName: "Ballote",
    phone: "12345678",
  });

  candidates.insert({
    name: "Hey",
    lastName: "Joe",
    phone: "12345678",
  });

  candidates.insert({
    name: "Max",
    lastName: "Heisenberg",
    phone: "87654321",
  });
}

export default candidates;
