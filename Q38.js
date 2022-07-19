// NOTE: the explanation is at the end
// a function to work as a fallback
function decorate(ob, race, charClass) {
  return new Proxy(ob, {
    get(target, prop) {
      return target.prop ?? race.prototype[prop] ?? charClass.prototype[prop];
    },
  });
}

class Elf {
  static spellList = {
    elfSing(target) {
      target.strength -= 2;
    },
  };
  constructor(char, { mana }) {
    char.mana = mana;
    return char;
  }

  elfTalk() {
    return "I am an elf";
  }
}

class Orc {
  constructor(char, { wrath }) {
    char.wrath = wrath;
    return char;
  }
}

class Healer {
  constructor(char, { healPower }) {
    char.healPower = healPower;
    return char;
  }
  heal(target, healAmount) {
    target.currentHp = Max(target.hp + healAmount * healPower, target.hp);
  }
}

class Warrior {
  constructor(char) {
    const dec = decorate(char, Warrior);
    return char;
  }

  attack(target, attackStrength) {
    Character.attack(target, attackStrength * 1.5);
  }

  warriorTalk() {
    return "I am a warrior";
  }
}

class Character {
  constructor({ name, hp, strength, race, charClass, currentHp }) {
    this.name = name;
    this.hp = hp;
    this.currentHp = currentHp ?? this.hp;
    this.strength = strength;
  }

  attack(target) {
    if (target.isTargeteable) {
      target.receiveDamage();
    }
  }

  receiveDamage(attacker) {
    this.hp -= attacker.strength;
  }
}

function createCharacter(
  race,
  charClass,
  props = {},
  raceProps = {},
  charClassProps = {}
) {
  let char = new race(
    new charClass(new Character(props), charClassProps),
    raceProps
  );
  return decorate(char, race, charClass);
}

let eric = createCharacter(
  Elf,
  Warrior,
  {
    name: "john",
    hp: 150,
    strength: 20,
  },
  { mana: 3 },
  {}
);

console.log(eric.warriorTalk(), eric.elfTalk());
console.log(eric);

/*
My thought process:

I wanted to simulate a really simple game, but what I wanted to focus on specifically, was on character classes (warrior, healer, etc, also, we'll call it charClass to avoid confusion) and races (elf, human, orc, etc):
A character has a class and a race, which gives him acess to special abilities.

I could have used simple inheritance, but then, I would have had to make multiple classes for each combination, e.g. ElfWarrior, OrcWarrior, ElfMage, OrcMage, etc.

Then I thought on the mixin pattern, but you add functionality to a class and not to the instance.

you could add the race and the charClass as strings and make the validations all in the Character class, but that seems way too bad, and monolithic.

Also I thought maybe the character is not just an object but a proxy. And looking for a method if not found in the instance or the prototype, it would look up for it in the race or charClass object, serving as a "second prototype".

Also,  I've found many similarities with multiple inheritance, which seems to be an antipattern, but really can't think on a better alternative yet, and I have spent way too much time on this problem.
*/
