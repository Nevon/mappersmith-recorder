const HAR = require("har");

module.exports = response => {
  const request = response.request();
  const path = request.path();

  return new HAR.Request({
    url: request.url(),
    method: request.method().toUpperCase(),
    headers: Object.entries(request.headers()).map(
      ([key, value]) => new HAR.Header(key, value)
    ),
    // Replace with request.queryString() to make sure it's normalized
    queryString: path.includes("?")
      ? path
          .split("?")[1]
          .split("&")
          .map(param => {
            const [key, value] = param.split("=");
            return { name: key, value };
          })
      : null
  });
};
