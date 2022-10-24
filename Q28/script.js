var async = {
  getAll: function (urlArray, callback) {
    const promises = [];
    for (const url of urlArray) {
      promises.push(fetch(url));
    }
    Promise.allSettled(promises).then((results) => {
      const context = {};
      for (let i = 0; i < results.length; i++) {
        context[i + 1] = results[i];
      }
      callback.call(context);
    });
  },
};

function theCallback() {
  console.log(this);
}

async.getAll(
  [
    "https://pokeapi.co/api/v2/pokemon/ditto",
    "https://nonExistentApiThatWouldMakeThisRequestFail.co/api/v1/something",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
    "https://pokeapi.co/api/v2/pokemon/nonExistentPokemon",
  ],
  theCallback
);
