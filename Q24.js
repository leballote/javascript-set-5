function removeOne(arr, element) {
  const index = arr.indexOf(element);
  return arr.splice(index, 1);
}

function removeAll(arr, element) {
  let index;
  let fromIndex = 0;
  while ((index = arr.indexOf(element, fromIndex)) !== -1) {
    arr.splice(index, 1);
    fromIndex = index;
  }
}

function removeElements(arr, elements) {
  for (const el of elements) {
    removeAll(arr, el);
  }
}

let x = [1, 2, 3, 4, 4, 2, 3, 2];
removeAll(x, 2);
console.log(x);

let y = [1, 2, 3, 4, 4, 2, 3, 2];
removeElements(y, [2, 3]);
console.log(y);
