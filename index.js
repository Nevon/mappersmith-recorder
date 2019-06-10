const RecorderMiddleware = require("./src/middleware");
const Session = require("./src/session");
const FileSystemPersistence = require("./src/persistence");

module.exports = {
  RecorderMiddleware,
  Session,
  FileSystemPersistence
};
