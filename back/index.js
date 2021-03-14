require("./autoboot");

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");
const config = require("./config");
const jwt = require("./core/jwt");

require("./connection");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cors());

app.get("/api/", function (req, res, next) {
  res.json("online");
});

app.use((req, res, next) => {
  next();
});

app.use("/api/usuario", require("./app/usuario/auth"));
app.use("/api/upload", require("./app/upload"));

jwt.use("/usuario", require("./app/usuario"));
jwt.use("/produtos", require("./app/produtos"));
jwt.use("/upload", require("./app/upload"));

app.use("/api/v1", jwt);

server.listen(config.port, "0.0.0.0");
console.log("Server start: " + config.port);
