const { install, uninstall, mockClient } = require("mappersmith/test");
const MockDate = require("mockdate");
const { RecorderMiddleware, Session } = require("../");
const MockPersistence = require("./helpers/mockPersistence");
const createClient = require("./helpers/client");
const statusFixture = require("./helpers/fixtures/currentStatus");
const createSubscriberFixture = require("./helpers/fixtures/createSubscriber");

describe("Recorder Middleware", () => {
  beforeEach(() => {
    MockDate.set("2019-06-10T08:00:00.000Z");
    install();
  });

  afterEach(() => {
    uninstall();
    MockDate.reset();
  });

  it("records each request and response", async () => {
    const persistence = new MockPersistence();
    const session = new Session({ persistence, name: "github" });

    const client = createClient({
      middleware: [RecorderMiddleware({ session })]
    });

    mockClient(client)
      .resource("Status")
      .method("current")
      .with({ foo: "bar", baz: 1 })
      .status(200)
      .response(statusFixture);

    mockClient(client)
      .resource("Incidents")
      .method("all")
      .status(500);

    const response = await client.Status.current({ foo: "bar", baz: 1 });

    MockDate.set("2019-06-10T08:00:01.000Z");
    await client.Incidents.all().catch(() => {});
    expect(response.data()).toEqual(statusFixture);

    await session.save();
    session.reset();

    expect(persistence.getFiles()).toMatchSnapshot();
  });

  it("includes post data", async () => {
    const persistence = new MockPersistence();
    const session = new Session({ persistence, name: "github" });

    const client = createClient({
      middleware: [RecorderMiddleware({ session })]
    });

    const requestParams = {
      body: { email: "tyler@statuspage.io", incident: "n4zblpn6p2kq" }
    };
    mockClient(client)
      .resource("Subscribers")
      .method("create")
      .with(requestParams)
      .status(201)
      .response(createSubscriberFixture);

    await client.Subscribers.create(requestParams);

    await session.save();
    expect(
      persistence.getFiles()["github-1560153600000.har"].log.entries[0]._request
        .postData
    ).toMatchSnapshot();
  });
});
