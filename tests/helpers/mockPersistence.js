module.exports = class MockPersistence {
  constructor() {
    this.files = {};
  }

  getFiles() {
    return this.files;
  }

  clearFiles() {
    this.files = {};
  }

  async save({ file, name }) {
    this.files[name] = file;
    return name;
  }
};
