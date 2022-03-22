// This file contains helper functions

const fs = require("fs");

function writeFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) return console.log(err);
  });
}

function appendFile(fileName, data, dataType) {
  if (dataType === "json") {
    fs.appendFile(fileName, JSON.stringify(data), "utf-8", (err) => {
      if (err) return console.log(err);
    });
  } else if (dataType === "text") {
    fs.appendFile(fileName, data, "utf-8", (err) => {
      if (err) return console.log(err);
    });
  } else {
    throw new Error(
      'Please specify either "json" or "text" as the third argument of the appendFile function.'
    );
  }
}

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
async function pause(ms) {
  await timeout(ms);
  console.log(`pausing for ${ms} ms`);
}

function timestamp() {
  const currentDate = new Date();
  return currentDate.getTime();
}

module.exports = {
  writeFile,
  appendFile,
  timeout,
  pause,
  timestamp,
};
