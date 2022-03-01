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
    console.log(offers)
    return res.status(200).send(offers);
  });
};
