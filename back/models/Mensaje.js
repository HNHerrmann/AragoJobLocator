const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const mensajeSchema = new Schema({
  titulo: {
    type: String,
    required: true,
  },
  participante_1: {
    type: String,
    required: true,
  },
  participante_2: {
    type: String,
    required: true,
  },
  last_date: {
    type: Date,
    required: true,
  },
  mensajes: [{
    emisor:{
      type: String,
      required: true,
    },
    contenido:{
      type: String,
      required: true,
    },
    fecha_msj:{
      type: Date,
      required: true,
    }
  }]
});

module.exports = mongoose.model("Mensaje", mensajeSchema);
