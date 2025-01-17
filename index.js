const express = require("express");
const bodyParser = require("body-parser");
const routes = require("./routes");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) =>
  res.status(200).json({
    message: "Welcome to the drivers api home page",
  })
);

app.use("/api/v1", routes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is listening to port ${PORT}`);
});

module.exports = app;
