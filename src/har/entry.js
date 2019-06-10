const HAR = require("har");
const toHARRequest = require("./request");
const toHARResponse = require("./response");

module.exports = ({ response, requestTime }) => {
  const harRequest = toHARRequest(response);
  const harResponse = toHARResponse(response);

  return new HAR.Entry({
    startedDateTime: requestTime,
    request: harRequest,
    response: harResponse
  });
};
