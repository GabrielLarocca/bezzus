const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  ativo: {
    type: Boolean,
    default: true,
  },
  marca: String,
  titulo: String,
  descricao: String,
  estoque: Number,
  color: String,
  preco: Number,
  produtoFoto: {
    filename: String,
    mimetype: String,
    originalname: String,
    folder: {
      type: String,
      default: "produto",
    },
    size: Number,
    encoding: String,
  },
});

module.exports = mongoose.model("Produto", Schema);
