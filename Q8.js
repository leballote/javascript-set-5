//in-place
function moveZerosInPlace(arr) {
  let zerosCount = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] == 0) {
      zerosCount++;
    } else {
      arr[i - zerosCount] = arr[i];
    }
  }
  for (let i = arr.length - zerosCount; i < arr.length; i++) {
    arr[i] = 0;
  }
}

function moveZeros(arr, copyFn = (el) => el) {
  //copy fn defines how every element will be copied in the map

  //alterlatively we have copied the array since the beginning, but then the map would have created another shallow copy, so I think this way is slightly more eficcient
  let out = arr.flatMap((el) => {
    if (el === 0) {
      //desappear the zeros when flatting
      return [];
    }
    return copyFn(el);
  });
  const zerosCount = arr.length - out.length;
  for (let i = 0; i < zerosCount; i++) {
    out.push(0);
  }
  return out;
}

//In place test
console.group("In place test");
const x = [2, 0, 4, 5, 0, 2, 0, 0, 3];
console.log(x);
moveZerosInPlace(x);
console.log(x);
console.groupEnd("In place test");

//Copy test
console.group("With copy test");
const y = [2, 0, 4, 5, 0, 2, 0, 0, 3];
const z = moveZeros(y);

console.log(y);
console.log(z);
console.groupEnd("With copy test");
