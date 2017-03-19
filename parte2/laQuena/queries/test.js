var db = require('../db.js')

exports.getOpeningHour= function( establecimientoId, done) {
  db.get().query('SELECT description FROM laquena.openingHour where establecimientoId =' +  establecimientoId, function (err, rows) {
    if (err) return done(err,null);
    done(null, rows);
  })
}
