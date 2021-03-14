const Model = require("./model");

exports.index = async (req, res) => {
  const filtro = {
    ativo: true,
  };

  if (req.body.busca) {
    filtro.titulo = {
      $regex: req.body.busca
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, ""),
      $options: "gmi",
    };
  }

  var query = Model.find(filtro).sort({ _id: -1 });

  if (!req.body.all) {
    query.skip(req.body.skip || 0);
    query.limit(req.body.limit || 25);
  }

  const data = await query.exec();
  const total = await Model.find(filtro).countDocuments();

  res.json({ total, data });
};

exports.get = async (req, res) => {
  const data = await Model.findOne({ _id: req.params.id });

  if (data) {
    res.json(data);
  } else {
    res.json({ success: false });
  }
};

exports.new = async (req, res) => {
  var model = new Model(req.body);

  const data = await model.save();

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

exports.delete = async (req, res) => {
  const okCamp = await Model.update(
    { _id: req.params.id },
    { $set: { ativo: false } }
  );

  if (okCamp.ok) {
    res.json({ success: true, data: okCamp });
  } else {
    res.json({ success: false, err: "Ocorreu algum erro" });
  }
};

exports.edit = async (req, res) => {
  try {
    const model = await Model.findOne({ _id: req.body._id });

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (model[key] !== req.body[key]) model[key] = req.body[key];
      }
    }

    const data = await model.save();

    if (data) {
      res.json({ success: true, data, form: req.body });
    } else {
      res.json({
        success: false,
        data,
        err: "Erro ao salvar, tente novamente.",
        form: req.body,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      err: err,
    });
  }
};
