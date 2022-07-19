// swaps array elements in place
function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}

//in-place
function moveZerosInPlace(arr) {
  let j = arr.length - 1;
  for (let i = 0; i < arr.length - 1; i++) {
    if (i >= j) {
      return;
    }
    if (arr[i] === 0) {
      while (arr[j] === 0 && j >= 1) {
        j--;
      }
      if (j === 0) {
        return;
      } else {
        swap(arr, i, j);
        j--;
      }
    }
  }
}

function moveZeros(arr, copyFn = (el) => el) {
  //copy fn defines how every element will be copied in the map

  //alterlatively we have copied the array since the beginning, but then the map would have created another shallow copy, so I think this way is slightly more eficcient
  let zeros = [];
  let out = arr.flatMap((el, i) => {
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
