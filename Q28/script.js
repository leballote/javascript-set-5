var async = {
  getAll: function (urlArray, callback) {
    const promises = [];
    for (const url of urlArray) {
      promises.push(fetch(url));
    }
    Promise.all(promises).then(callback);
  },
};
