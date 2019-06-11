const HAR = require("har");
const httpStatus = require("http-status");

module.exports = response => {
  const status = response.status();
  return new HAR.Response({
    status,
    statusText: httpStatus[status],
    cookies: [],
    headers: Object.entries(response.headers()).map(
      ([key, value]) => new HAR.Header(key, value)
    ),
    content: new HAR.PostData({
      text: response.rawData(),
      mimeType: response.header("content-type")
    })
  });
};
