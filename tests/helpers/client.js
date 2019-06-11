const forge = require("mappersmith").default;

const manifest = {
  clientId: "github",
  middleware: [],
  host: "https://kctbh9vrtdwd.statuspage.io",
  headers: { Accepts: "application/json" },
  resources: {
    Status: {
      current: {
        path: "/api/v2/status.json"
      }
    },
    Incidents: {
      all: {
        path: "/api/v2/incidents.json"
      }
    },
    Subscribers: {
      create: {
        path: "/api/v2/subscribers.json",
        method: "post"
      }
    }
  }
};

module.exports = ({ middleware = [] }) =>
  forge({ ...manifest, middleware: [...manifest.middleware, ...middleware] });
