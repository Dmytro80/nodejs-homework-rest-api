class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParametersError extends Error {
  constructor(message) {
    super(message);
    this.status = 404;
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

module.exports = { ValidationError, WrongParametersError, tryCatchWrapper };
