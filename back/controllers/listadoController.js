//import dateFormat from "date-format";
//const Dateformat = require("dateformat");
const Offer = require("../models/Oferta");


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
