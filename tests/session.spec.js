const MockDate = require("mockdate");
const { Session } = require("../");
const MockPersistence = require("./helpers/mockPersistence");

describe("Session", () => {
  beforeEach(() => {
    MockDate.set("2019-06-10T08:00:00.000Z");
  });

  afterEach(() => {
    MockDate.reset();
  });

  it("saves with the current timestamp as a suffix", async () => {
    const persistence = new MockPersistence();
    const session = new Session({ persistence, name: "test" });

    const filePath = await session.save();

    expect(persistence.getFiles()[filePath]).toMatchSnapshot();
  });
});
