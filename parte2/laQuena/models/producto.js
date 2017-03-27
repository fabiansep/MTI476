var mongoose = require('mongoose'),
    Schema   = mongoose.Schema;


var productoSchema = new Schema({
  productoId:         { type: Number },
  name:               { type: String },
  history:            { type: String },
  clasificationList:  [String]
});

module.exports = mongoose.model('producto', productoSchema,'producto');
