const Mensaje = require("../models/Mensaje");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const userController = require('../controllers/userController')


exports.getMensajes = function (req,res) {
  console.log(req.query)
  //Usar esta cuando se mejore mensaje para pasar de ser un tablon a ser una conversación
  //Mensaje.find({$or:[{participante_1:req.session.username},{participante_2:req.session.username}] }).sort('-last_date').exec((err,mensajes) => {
  Mensaje.find({$or:[{participante_1:req.session.username},{participante_1:req.session.username}] }).sort('-last_date').exec((err,mensajes) => {
  return res.status(200).send(mensajes);
  });
};

exports.createConvo = function (req,res,next) {

  const {last_date, titulo, participante_1, participante_2, mensajes} = req.body;
  const username = req.session.username;

  let newMensaje = new Mensaje({
    last_date: last_date,
    titulo: titulo,
    participante_1: participante_1,
    participante_2: username,
    mensajes: [
      {
        emisor: username,
        contenido: mensajes[0].contenido,
        fecha_msj: mensajes[0].fecha_msj
      }
    ]
  });

  Mensaje.create(newMensaje, function (err) {
    if (err) {
      return res.status(400).send("Algo ha ido mal");
    }
    return res.status(200).send({message: "Chachi"});
  })
};
