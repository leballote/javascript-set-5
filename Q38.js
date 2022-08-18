class Character {
  constructor({ name, strength, maxHp, hp }) {
    this.name = name;
    this.strength = strength;
    this.hp = hp || maxHp;
  }

  basicAtack(target) {
    target.hp = Math.max(target.hp - this.strength, 0);
  }
}

class Elf extends Character {
  constructor({ name, strength, magicalPower, maxHp, hp, maxMana, mana }) {
    super({ name, strength, maxHp, hp });
    this.magicalPower = magicalPower;
    this.maxMana = maxMana;
    this.mana = mana || maxMana;
  }

  getGreeting() {
    return "I am an elf";
  }

  magicalArrow(target) {
    if (this.mana < 20) {
      return false;
    }
    target.hp = Math.max(target.hp - this.magicalPower * 1.5, 0);
    this.mana = Math.max(this.mana - 20, 0);
    return true;
  }

  elfSing(target) {
    target.strength -= 2;
  }
}

class Orc extends Character {
  constructor({ name, strength, maxHp, hp, maxWrath, wrath }) {
    super({ name, strength, maxHp, hp });
    this.maxWrath = maxWrath;
    this.wrath = wrath || 0;
  }

  getGreeting() {
    return "Hi, I am an orc";
  }

  charge(target) {
    target.hp = Math.max(target.hp - this.wrath - 15 - this.strength, 0);
    this.wrath += 1;
    return true;
  }

  basicAtack(target) {
    super.basicAtack(target);
    this.wrath += 1;
  }
}

const john = new Elf({
  name: "John",
  strength: 5,
  magicalPower: 20,
  maxHp: 120,
  maxMana: 200,
});

const argh = new Orc({ name: "Argh", strength: 15, maxHp: 150, maxWrath: 50 });

console.log("Argh's strength: ", argh.strength);
john.elfSing(argh);
console.log("Argh's strength: ", argh.strength);
console.log();
console.log("John's HP", john.hp);
argh.charge(john);
console.log("John's HP", john.hp);
console.log(argh);
