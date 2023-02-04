const nodemailer = require("nodemailer");

const { META_PASSWORD } = process.env;
console.log("META_PASSWORD", META_PASSWORD);

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465,
  secure: true,
  auth: { user: "d.voronievskyi@meta.ua", pass: META_PASSWORD },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

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
  transporter,
};
