const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ofertaSchema = new Schema({
  fuente: {
    type: String,
    required: true,
  },
  f_publicacion: {
    type: Date,
    required: true,
  },
  tipo: {
    type: String,
  },
  denominacion: {
    type: String,
    required: true,
  },
  convocante: {
    type: String,
    required: true,
  },
  url: {
    type: String,
  },
  f_inicioPresentacion: {
    type: Date,
    required: true,
  },
  f_finPresentacion: {
    type: Date,
    required: true,
  },
  contacto: {
    type: String,
  },
  titulo: {
    type: String,
  },
  plazas: {
    type: Number,
  },
  filters: {
    type: [String],
  },
  createdByUser: {
    type: Boolean
  }
});

module.exports = mongoose.model("Oferta", ofertaSchema);
