// This file contains the main script, which gets data from the IMSLP API

const help = require("./help");
const fs = require("fs");
const axios = require("axios");

// according to IMSLP, type 1 = composer; type 2 = composition
const composer = 1; // not currently supported
const composition = 2;

const getImslpData = async (type = composition, start = 0, end = 1000) => {
  const timestamp = help.timestamp();
  help.writeFile(`./data/imslp-data_${timestamp}.json`, "");
  help.writeFile(`./logs/log_${timestamp}.txt`, "");
  let data = [];
  try {
    let moreAvailable = true;
    while (start < end && moreAvailable) {
      let url = `http://imslp.org/imslpscripts/API.ISCR.php?account=worklist/disclaimer=accepted/sort=parent/type=${type}/start=${start}/retformat=json`;
      console.log(`requesting ${url}`);
      help.appendFile(
        `./logs/log_${timestamp}.txt`,
        `requesting ${url}\n`,
        "text"
      );
      axios
        .get(url)
        .then((res) => {
          let dataObj = res.data;
          for (let obj in dataObj) {
            data.push({
              composer: dataObj[obj]?.intvals?.composer,
              composition: dataObj[obj]?.intvals?.worktitle,
            });
          }
          console.log(`processed compositions ${start}-${start + 999}`);
          help.appendFile(
            `./logs/log_${timestamp}.txt`,
            `processed compositions ${start}-${start + 999}\n`,
            "text"
          );
          start += 1000;
          moreAvailable = dataObj.metadata.moreresultsavailable;
        })
        .catch((err) => console.log(err));
      await help.pause(10000);
    }
    help.appendFile(`./data/imslp-data_${timestamp}.json`, data, "json");
  } catch (err) {
    console.log(`Oh no! ${err}.`);
    help.appendFile(`./logs/log_${timestamp}.txt`, `Oh no! ${err}`, "text");
    help.appendFile(`./data/imslp-data_${timestamp}.json`, data, "json");
    return;
  }
};

getImslpData(composition, 0, 250000);
