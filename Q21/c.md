The code:

```
for (let i = 0; i < 5; ++i) {
  setTimeout(function () {
    console.log("counter: ", i);
  }, 100);
}
```

outputs:

```
counter: 1
counter: 2
counter: 3
counter: 4
```

almost instantly between each `console.log`.

The output is expected, and it may be confusing why all are printed almost at the same time, but this happens because, the `setTimeout`s get instantiated without waiting for the other to finish.
