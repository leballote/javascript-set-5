var foo = (function () {
  let out = {};
  function private() {
    console.log("Did you call me Mayor bar?");
  }

  out.bar = function () {
    console.log("I am public, let me call the private.");
    private();
  };

  out.test = function () {
    console.log("I am the second public method.");
  };
  return out;
})();

foo.bar();
foo.test();
