const HAR = require("har");
const packageJson = require("../../package.json");
const toHAREntry = require("./entry");

module.exports = class Log {
  constructor() {
    this.log = new HAR.Log({
      version: 1.2,
      creator: {
        name: packageJson.name,
        version: packageJson.version
      },
      browser: null
    });
  }

  addEntry({ response, requestTime }) {
    this.log.addEntry(toHAREntry({ response, requestTime }));
  }

  toJSON() {
    return { log: this.log };
  }
};
