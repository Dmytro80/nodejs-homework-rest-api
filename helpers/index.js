class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}

const tryCatchWrapper = (endpointFn) => {
  return async (req, res, next) => {
    try {
      await endpointFn(req, res, next);
    } catch (error) {
      return next(error);
    }
  };
};

module.exports = {
  HttpError,
  tryCatchWrapper,
};
