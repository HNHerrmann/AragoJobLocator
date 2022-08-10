//import dateFormat from "date-format";
//const Dateformat = require("dateformat");
const Offer = require("../models/Oferta");
const filterService = require("../service/filterService")



exports.getOffersNoParam = function (req, res )  {

  Offer.find({}).sort('-f_publicacion').exec((err,offers) => {
    console.log(offers)
    return res.status(200).send(offers);
  });
};

exports.getOffersParam = function (req, res )  {
  const { filtros } = req.body;

  Offer.find({filters: { $all: req.body } }).sort('-f_publicacion').exec((err,offers) => {
    offers.forEach(function(offer, index,offers){
      /*console.log(offer.f_publicacion)
      const date = new Date(offer.f_publicacion);
      console.log(date);
      console.log(date.toLocaleDateString());
      console.log(date.toISOString());
      offer.f_publicacion='test0';
      offers[index].f_publicacion='test';
      console.log(offer.f_publicacion)*/
  });
    return res.status(200).send(offers);
    //offers.map(function (offer,index,offers){
     //offer.f_publicacion=new Date(offer.f_publicacion).toLocaleDateString()});
     // console.log(offers)
  //});
})};

exports.createOffer = function (req, res, next) {
  const {fuente, f_publicacion, tipo, denominacion, convocante, url, f_inicioPresentacion,
    f_finPresentacion, contacto, titulo, plazas, filters, createdByUser} = req.body;

    let newOffer = new Offer({
      fuente: req.session.username,
      f_publicacion: f_publicacion,
      tipo: tipo,
      denominacion: denominacion,
      convocante: convocante,
      url: url,
      f_inicioPresentacion: f_inicioPresentacion,
      f_finPresentacion: f_finPresentacion,
      contacto: contacto,
      titulo: titulo,
      plazas: plazas,
      filters: filterService.obtainFilters(fuente,convocante),
      createdByUser: createdByUser
    });

    if(newOffer.valueOf().denominacion==null || newOffer.valueOf().denominacion==""){
      return res.status(400).send("Puesto nulo");
    };
    if(newOffer.valueOf().convocante==null || newOffer.valueOf().convocante==""){
      return res.status(400).send("Convocante nulo");
    };
    if(newOffer.valueOf().tipo==null){
    return res.status(400).send("Tipo nulo");
    };
    if(newOffer.valueOf().f_inicioPresentacion==null){
      return res.status(400).send("Incio nulo");
    };
    if(newOffer.valueOf().f_finPresentacion==null){
      return res.status(400).send("Fin nulo");
    };


    Offer.create(newOffer, function (err) {
      if (err) {
        return res.status(400).send("Algo ha ido mal");
      }
      return res.status(200).send({message: "Chachi"});
    })
};
