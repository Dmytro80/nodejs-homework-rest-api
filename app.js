const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const usersRouter = require("./routes/api/users.js");
const contactsRouter = require("./routes/api/contacts");

const { transporter } = require("./helpers");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const email = {
  to: "vdrabota@icloud.com",
  from: "d.voronievskyi@meta.ua",
  subject: "Confirm your email",
  html: "<h1>Confirm your email</h1>",
  text: "Confirm your email",
};

transporter
  .sendMail(email)
  .then(() => console.log("Email send success"))
  .catch((e) => console.log(e.message));

app.use("/api/users", usersRouter);
app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  const { status = 500, message = "Internal Server Error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
