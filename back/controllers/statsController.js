const Offer = require("../models/Oferta");
const filterService = require("../service/filterService")

exports.getOffersCreatedByDay = function (req, res ) {
  if(req.session.Admin) {
    Offer.aggregate([{$group: {_id: '$f_publicacion', count: {$count: {}}}}])
      .sort('_id').exec((err, offers) => {
      let newOffers = offers.map(function (offer, index, array) {
        return {_id: new Date(offer._id).toLocaleDateString(), count: offer.count}
      })
      return res.status(200).send(newOffers);
    });
  }else {return res.status(403);}
}

exports.getOffersByFilters = function (req, res ) {
  if(req.session.Admin) {
    Offer.aggregate([{$unwind: '$filters'}]).sortByCount('$filters').exec((err, offers) => {
      return res.status(200).send(offers);
    });
  }else {return res.status(403);}
};
