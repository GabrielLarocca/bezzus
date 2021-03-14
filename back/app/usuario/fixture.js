const Model = require("./model");
const config = require("../../config");
const mongoose = require("mongoose");

mongoose.Promise = global.Promise;
mongoose.connect(config.database, {
  keepAlive: true,
  reconnectTries: Number.MAX_VALUE,
});

(async function start() {
  console.log("Register user root");

  let rootExists = await Model.findOne({ email: "root@root.com" });
  if (rootExists) {
    rootExists.password = "root123";
    rootExists.root = true;
    await rootExists.save();
    console.log("User root already exists");
  } else {
    var model = new Model({
      email: "root@root.com",
      password: "root123",
      nome: "Administrador",
      root: true,
    });

    const data = await model.save();

    if (data) {
      console.log("Registered user root");
    } else {
      console.log("Error when registering root", err);
    }
  }
})();
