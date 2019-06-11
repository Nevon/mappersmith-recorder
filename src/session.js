const Log = require("./har/log");

const EXTENSION = ".har";

module.exports = class Session {
  constructor({ name, persistence }) {
    this.log = new Log();
    this.persistence = persistence;
    this.name = name.endsWith(EXTENSION)
      ? name.slice(0, name.indexOf(EXTENSION))
      : name;
  }

  addEntry({ response, requestTime }) {
    this.log.addEntry({ response, requestTime });
  }

  async save() {
    const name = `${this.name}-${new Date().getTime()}.har`;
    return await this.persistence.save({ file: this.log, name });
  }

  reset() {
    this.log = new Log();
  }
};
