The code:

```
var foo = "hello";
(function () {
   var bar = "World";
   alert( foo + bar);
})();
alert( foo + bar);
```

pops up an alert with the string "helloWorld" from the function execution, and then throw and error because `bar` is not defined;
