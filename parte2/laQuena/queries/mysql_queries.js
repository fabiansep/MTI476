var promise = require('bluebird');
var mysql     =    require('mysql');
var options = {
  // Initialization Options
  promiseLib: promise
};

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'admin',
    password : '¡Ñoño20016!',
    database : 'laquena',
    debug    :  false
});

function getAllEstablecimientos(req,res,next) {

    pool.getConnection(function(err,connection){
        if (err) {
          //res.json({"code" : 100, "status" : "Error in connection database"});
          return next({"status" : 100, "message" : "Error in connection database"});
        }
        connection.query("CALL SP_GET_ESTABLECIMIENTO (0)",function(err,rows){

            if(!err) {
                res.status(200)
                   .json({
                     status: 'success',
                     data:   rows,
                     message: 'Se han traido todos los establecimientos'
                   });
                          console.log(rows);
            }
            connection.release();
        });

        connection.on('error', function(err) {
              //res.json({"code" : 100, "status" : "Error in connection database"});
              return next({"status" : 100, "message" : "Error in connection database"});
        });
  });
}

module.exports = {
  getAllEstablecimientos: getAllEstablecimientos
};
