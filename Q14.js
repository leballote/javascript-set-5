function passedTwo(...args) {
  if (args.includes(2)) {
    console.log("yey, you passed 2 within your arguments :)");
  } else {
    console.log("you didn't include 2 in your arguments :(");
  }
}

passedTwo(3, 5, 2, 5);
passedTwo(3, 5, 10, 5);
passedTwo();
passedTwo(2);
passedTwo([2, 2, 2]);
