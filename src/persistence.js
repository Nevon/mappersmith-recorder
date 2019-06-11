const assert = require("assert");
const fs = require("fs");
const fspath = require("path");
const { promisify } = require("util");

const writeFileAsync = promisify(fs.writeFile);

module.exports = class Persistence {
  constructor({ path }) {
    assert(
      typeof path === "string",
      `"path" is expected to be a string, received ${typeof path}`
    );

    this.path = path;
  }

  fullPath(filename) {
    return fspath.join(this.path, filename);
  }

  async save({ file, name }) {
    const filePath = this.fullPath(name);
    await writeFileAsync(filePath, JSON.stringify(file, null, 2));
    return filePath;
  }
};
