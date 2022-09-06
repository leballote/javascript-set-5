const async = require("async");

function theCallback() {
  console.log(this);
}

// console.log(async);

async.all(
  [
    "https://pokeapi.co/api/v2/pokemon/ditto",
    "https://pokeapi.co/api/v2/pokemon/nonExistentPokemonThatMakesThisRequestFail",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
  ],
  theCallback
);
