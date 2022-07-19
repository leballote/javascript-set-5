The code:

```
if( [] ) console.log("array is true");
if ([] == true) console.log("array == true");
```

outputs: "array is true".

the first if statement goes through because an array is truthy

the second condition is not true because of how loosely equals works.

First, the right side is transformed to number:

`ToNumber(true) = 1`

yielding,

`[] == 1`

The left sidegets transformed into primitive:

`ToPrimitive([]) = ""`,

yielding:

`"" == 1`

and finally, the string becomes number:

`ToNumber("") = 0`,

and we have:

`0 === 1`,

which evaluates to `false`.
