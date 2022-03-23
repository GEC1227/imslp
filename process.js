// This file processes IMSLP data

const help = require("./help");
const fs = require("fs");

const data = fs.readFileSync("data/imslp-data_1647911713015.json", "utf-8");
const imslpData = JSON.parse(data);

const getCompositionsByComposer = (composer, imslpData) => {
  const arr = [];
  for (let obj of imslpData) {
    if (obj.composer === composer) {
      arr.push(obj.composition);
    }
  }
  return arr;
};

const Composer = function (name) {
  this.name = name;
  this.works = getCompositionsByComposer(this.name, imslpData);
  this.exportWorks = function () {
    help.writeFile(
      `./data/Compositions by ${this.name}.txt`,
      this.works.join("\n")
    );
  };
};

// Frequently uploaded composers
const Vivaldi = new Composer("Vivaldi, Antonio");
const Bach = new Composer("Bach, Johann Sebastian");
const Handel = new Composer("Handel, George Frideric");
const Mozart = new Composer("Mozart, Wolfgang Amadeus");
const Beethoven = new Composer("Beethoven, Ludwig van");
const Brahms = new Composer("Brahms, Johannes");
const Chopin = new Composer("Chopin, Frédéric");
const Debussy = new Composer("Debussy, Claude");
const Tchaikovsky = new Composer("Tchaikovsky, Pyotr");

console.log(Mozart.works);
