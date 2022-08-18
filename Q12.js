//modyfies date to index months starting at 1 instead of 0
function modifyDate() {
  OriginalDate = globalThis.Date;
  globalThis.Date = class extends OriginalDate {
    constructor(year, month, day) {
      super(year, month - 1, day);
    }

    //there would be many more methods to override, like getLocalMonth, etc, but this is the idea
    getMonth() {
      return super.getMonth() + 1;
    }

    setMonth(month) {
      return super.setMonth(month - 1);
    }
  };
}

modifyDate();

const myMonth = new Date(2021, 1, 20);
console.log(myMonth);
console.log(myMonth.getMonth());
