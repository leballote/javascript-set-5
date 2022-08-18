var async = {
  getAll: function (urlArray, callback) {
    const promises = [];
    for (const url of urlArray) {
      promises.push(fetch(url));
    }
    Promise.allSettled(promises).then(async (results) => {
      const context = {};
      for (let i = 0; i < results.length; i++) {
        const res = results[i];
        if (res.status === "fulfilled") {
          //I could also check if status == 200 instead of the following condition, but a try catch block seemed more general
          try {
            context[i] = await res.value.json();
          } catch (e) {
            console.error(e);
          }
        }
        //I am not sure what to do with the rejected promises, but without more context, it seems reasonable to me not to include anything, but I could have added the reason of the promise.
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
    "https://pokeapi.co/api/v2/pokemon/notExistentPokemonThatMakesThisRequestFail",
    "https://pokeapi.co/api/v2/pokemon/pikachu",
  ],
  theCallback
);
