// This file processes IMSLP data

const help = require("./help");
const fs = require("fs");

const data = fs.readFileSync("data/imslp-data_1647911713015.json", "utf-8");
const imslpData = JSON.parse(data);

// parse IMSLP data for compositions
const getWorks = (composer, imslpData) => {
  const arr = [];
  for (let obj of imslpData) {
    if (obj.composer === composer) {
      arr.push(obj.composition);
    }
  }
  return arr;
};

// parse IMSLP data for opus numbers
const getWorkNumbers = (works) => {
  const workRegExp =
    /([Oo][Pp]\.[0-9]{1,3}\s)?[A-Za-z]+(\s|\.)?\s?([0-9]+|[IVX]+[a-z]?\:[0-9]+)([A-Za-z]{1})?(\/[0-9]{1,4}([A-Za-z]{1})?)?$/;
  return works.map((work) => {
    let index = work.search(workRegExp);
    if (index !== -1) {
      return work.slice(index, work.length);
    } else {
      return `Unable to parse a work number for ${work}`;
    }
  });
};

// build composers
const Composer = function (name) {
  this.name = name;
  this.works = getWorks(this.name, imslpData);
  this.workNumbers = getWorkNumbers(this.works);
  this.exportData = function (data) {
    if (data === "works") {
      help.writeFile(
        `./data/compositions-${this.name}.txt`,
        this.works.join("\n")
      );
    } else if (data === "work numbers") {
      help.writeFile(
        `./data/opus numbers-${this.name}.txt`,
        this.workNumbers.join("\n")
      );
    }
  };
};

/* 
Well-known composers whose music is public domain
and frequently uploaded to DSPs
*/

const Bach = new Composer("Bach, Johann Sebastian");
const Beethoven = new Composer("Beethoven, Ludwig van");
const Brahms = new Composer("Brahms, Johannes");
const Chopin = new Composer("Chopin, Frédéric");
const Debussy = new Composer("Debussy, Claude");
const Grieg = new Composer("Grieg, Edvard");
const Handel = new Composer("Handel, George Frideric");
const Haydn = new Composer("Haydn, Joseph");
const Joplin = new Composer("Joplin, Scott");
const Liszt = new Composer("Liszt, Franz");
const Mahler = new Composer("Mahler, Gustav");
const Mendelssohn = new Composer("Mendelssohn, Felix");
const Mozart = new Composer("Mozart, Wolfgang Amadeus");
const Ravel = new Composer("Ravel, Maurice");
const Satie = new Composer("Satie, Eric");
const Scarlatti = new Composer("Scarlatti, Alessandro");
const Schumann = new Composer("Schumann, Robert");
const Scriabin = new Composer("Scriabin, Aleksandr");
const Schubert = new Composer("Schubert, Franz");
const Tchaikovsky = new Composer("Tchaikovsky, Pyotr");
const Vivaldi = new Composer("Vivaldi, Antonio");
