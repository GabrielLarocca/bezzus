const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const config = require("../../../config");
const Usuario = require("../model");

exports.login = async (req, res) => {
  const user = await Usuario.findOne({ email: req.body.email });

  if (!user) {
    res.json({
      success: false,
      err: "Usuario não encontrada",
      email: req.body.email,
    });
  } else {
    bcrypt.compare(req.body.password, user.password, async function (err, ok) {
      if (ok) {
        console.log("Login de Usuario " + user.name + " : " + user.email);

        user.pushToken = req.body.pushToken;
        await user.save();

        var beAToken = {};
        beAToken.email = user.email;
        beAToken.nome = user.nome;
        beAToken._id = user._id;

        var token = jwt.sign(beAToken, config.secret, {
          expiresIn: "365d", // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          err: "Login efetuado com sucesso!",
          token: token,
        });
      } else {
        res.json({ success: false, err: "Usuario não encontrado" });
      }
    });
  }
};

exports.registrar = async (req, res) => {
  const jaexiste = await Usuario.findOne({
    email: req.body.email,
  });

  if (jaexiste)
    return res.json({
      success: false,
      err:
        "Usuario já existe, efetue login ou cadastre uma nova conta com outros dados.",
    });

  var usuario = new Usuario(req.body);
  const data = await usuario.save();

  var beAToken = {};
  beAToken.email = data.email;
  beAToken.nome = data.nome;
  beAToken._id = data._id;

  var token = jwt.sign(beAToken, config.secret, {
    expiresIn: "365d", // expires in 24 hours
  });

  if (data) {
    res.json({ success: true, data, form: req.body, token: token });
  } else {
    res.json({ success: false, data, err: "Ocorreu um erro", form: req.body });
  }
};
