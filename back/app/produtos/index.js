const express = require("express");
const routes = express.Router();

const controller = require("./controller");

routes.post("/list", controller.index);
routes.get("/:id", controller.get);
routes.post("/", controller.new);
routes.put("/", controller.edit);
routes.delete("/:id", controller.delete);

module.exports = routes;
