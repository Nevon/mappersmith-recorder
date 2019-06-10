const assert = require("assert");

const RecorderMiddlewareFactory = ({ session } = {}) => {
  assert(!!session, '"session" is required');

  return ({ mockRequest }) => {
    let requestTime;

    return {
      prepareRequest(next) {
        if (mockRequest) {
          return next();
        }

        return next().then(request => {
          requestTime = new Date();
          return request;
        });
      },

      response(next) {
        return next()
          .then(response => {
            session.addEntry({ response, requestTime });
            return response;
          })
          .catch(response => {
            if (response.enhance) {
              session.addEntry({ response, requestTime });
            }
            throw response;
          });
      }
    };
  };
};

module.exports = RecorderMiddlewareFactory;
