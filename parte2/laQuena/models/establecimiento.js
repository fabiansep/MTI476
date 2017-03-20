var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var establecimientoSchema = new Schema({
  establecimientoId:  { type: Number },
  name:               { type: String },
  legalName:          { type: String },
  email:              { type: String },
  manager:            { type: String },
  country:            {
    iso31661Code:    String ,
    value:           String
  },
  adress:            {
    streetAdress:    String,
    adressLocality:  String,
    adressRegion:    String
  },
  geo:            {
    latitude:        Number,
    longitude:       Number,
  },
  aggregatedRating:            {
    ratingValue:        Number,
    reviewCount:       Number,
  },
  openingHours: [String],
  phoneList:    [String],
});

module.exports = mongoose.model('establecimiento', establecimientoSchema,'establecimiento');


/*
exports = module.exports = function(app, mongoose) {

  var establecimientoSchema = new Schema({
    establecimientoId:  { type: Number },
    name:               { type: String },
    legalName:          { type: String },
    email:              { type: String },
    manager:            { type: String },
    country:            {
      iso31661Code:    String ,
      value:           String
    },
    adress:            {
      streetAdress:    String,
      adressLocality:  String,
      adressRegion:    String
    }
  });

	mongoose.model('establecimiento', tvshowSchema);

};*/
