function myLog() {
  return {
    bar: "bar",
    foo: "foo",
    prop: function () {
      var self = this;
      console.log(self.bar);
      console.log(this.foo);
      (function () {
        console.log(self.bar);
        console.log(this.foo);
      })();
    },
  };
}

var obj = myLog();
obj.prop();
