const sgMail = require("@sendgrid/mail");

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    await sgMail.send(data);
  } catch (error) {
    throw error;
  }
};
module.exports = sendEmail;
