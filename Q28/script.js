var async = {
  getAll: function (urlArray, callback) {
    const promises = [];
    for (const url of urlArray) {
      promises.push(fetch(url));
    }
    Promise.allSettled(promises).then(async (results) => {
      const context = [];
      for (let i = 0; i < results.length; i++) {
        const res = results[i];
        context[i] = res?.value ?? res.reason;
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
  ],
  theCallback
);
