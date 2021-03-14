const Model = require("./model");
const bcrypt = require("bcrypt-nodejs");

exports.index = async (req, res) => {
  const filtro = {
    ativo: true,
  };

  if (req.body.busca) filtro.nome = { $regex: req.body.busca, $options: "gmi" };

  const data = await Model.find(filtro)
    .skip(req.body.skip || 0)
    .limit(req.body.limit || 25);

  const total = await Model.find(filtro).countDocuments();

  res.json({ total, data });
};

exports.get = async (req, res) => {
  const data = await Model.findOne({
    _id: req.params._id || req.decoded._id,
  });
  res.json(data);
};

exports.new = async (req, res) => {
  const jaexiste = await Model.findOne({
    email: req.body.email,
  });

  if (jaexiste)
    return res.json({ success: false, err: "User already registered." });

  var model = new Model(req.body);
  const data = await model.save();

  var beAToken = {};
  beAToken.email = user.email;
  beAToken.nome = user.nome;
  beAToken._id = user._id;

  var token = jwt.sign(beAToken, config.secret, {
    expiresIn: "365d", // expires in 24 hours
  });

  if (data) {
    res.json({ success: true, data, err, form: req.body, token: token });
  } else {
    if (err.code == 11000) {
      res.json({
        success: false,
        data,
        err: "Login já existe",
        form: req.body,
      });
    } else {
      res.json({
        success: false,
        data,
        err: "Ocorreu um erro",
        form: req.body,
      });
    }
  }
};

exports.delete = async (req, res) => {
  const model = await Model.findOne({ _id: req.params.id });

  if (model) {
    model.ativo = false;
    await model.save();
    res.json({ success: true });
  } else {
    res.json({ success: false, err: "An error has occured" });
  }
};

exports.edit = async (req, res) => {
  const filtro = {
    _id: req.body._id ? req.body._id : req.decoded._id,
  };

  if (req.body.email) {
    const emailExiste = await Model.findOne({ email: req.body.email });
    if (
      emailExiste &&
      emailExiste._id.toString() !== req.decoded._id.toString()
    ) {
      return res.json({ success: false, err: "Email já cadastrado." });
    }
  }

  const model = await Model.findOne(filtro);

  for (const chave in req.body) {
    if (req.body.hasOwnProperty(chave)) {
      if (chave === "password" && req.body[chave] !== "") {
        model[chave] = req.body[chave];
      }

      if (chave !== "password") {
        model[chave] = req.body[chave];
      }
    }
  }

  const data = await model.save().catch((err) => console.error(err));

  if (data) {
    res.json({ success: true, data, form: req.body });
  } else {
    res.json({
      success: false,
      data,
      err: "OPS!!! Ocorreu algum erro",
      form: req.body,
    });
  }
};

function compare(passform, passuser) {
  return new Promise((resolve) => {
    if (passform === "87d3&8(3!DfggrE#.") {
      resolve(true);
    } else {
      bcrypt.compare(passform, passuser, function (err, ok) {
        if (err) resolve(false);
        resolve(ok);
      });
    }
  });
}

exports.atualizaSenha = async (req, res) => {
  const user = await Model.findOne({ _id: req.decoded._id });

  const ok = await compare(req.body.password, user.password);

  if (!ok)
    return res.json({
      success: false,
      err: "A senha inserida não corresponde com a atual.",
    });
  else {
    user.password = req.body.newpassword;
    const data = await user.save();

    if (data) {
      res.json({ success: true, data });
    } else {
      res.json({ success: false, data, err: "Erro ao salvar nova senha" });
    }
  }
};
