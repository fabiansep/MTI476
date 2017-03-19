var promise = require('bluebird');
var mysql     =    require('mysql');
var libxmljs = require("libxmljs");

var consultas = require("./test.js")


var options = {
  // Initialization Options
  promiseLib: promise
};


var result;

var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'admin',
    password : '¡Ñoño2016!',
    database : 'laquena',
    debug    :  false
});

function getAllEstablecimientos(req,res,next) {

    var headers = req.headers;


    pool.getConnection(function(err,connection){
        if (err) {
          //res.json({"code" : 100, "status" : "Error in connection database"});
          return next({"status" : 100, "message" : "Error in connection database"});
        }


        //connection.query("CALL laquena.SP_GET_ESTABLECIMIENTO(0);",function(err,rows){
        connection.query("select * from establecimiento",function(err,rows){
            if(!err) {

              //console.log(headers);
              //console.log(req);

              //console.log(rows);

              var result = establecimientoToXML(rows);
              connection.release();
              //console.log(result);
              res.status(200)
                 .set('Content-Type','text/xml')
                 .send(result);
/*
                res.status(200)
                   .json({
                     status: 'success',
                     data:   result,
                     message: 'Se han traido todos los establecimientos'
                   });*/
                          //console.log(rows);
            }

        });

        connection.on('error', function(err) {
              //res.json({"code" : 100, "status" : "Error in connection database"});
              return next({"status" : 100, "message" : "Error in connection database"});
        });
  });
}

function establecimientoToXML(data){

  var xml = '<?xml version="1.0" encoding="UTF-8"?> ';
  xml = xml +' <establecimientos>'
  for(i= 0; i < data.length;i++){

      xml = xml + ' <establecimiento establecimientoId=\''+ data[i].establecimientoId+'\'';
      xml = xml + '   name =\''+data[i].name+'\'';
      xml = xml + '   legalName =\''+data[i].legalName+'\'';
      xml = xml + '   email =\''+data[i].email+'\'';
      xml = xml + '   manager =\''+data[i].manager+'\'';
      xml = xml + ' >\n';

      xml = xml + '   <country iso31661Code=\'' + data[i].manager
                //+'\'>' +data[i].countryName + '</country>';
                  +'\'>' +data[i].name + '</country>';
      xml = xml + ' <address>\n';
      xml = xml + '   <streetAddress>' + data[i].streetAdress +'</streetAddress>\n';
      xml = xml + '   <addressLocality>' + data[i].adressLocality +'</addressLocality>\n';
      xml = xml + '   <addressRegion>' + data[i].adressRegion +'</addressRegion>\n';
      xml = xml + ' </address>\n';

      xml = xml + ' <geo>\n';
      xml = xml + '   <latitude>' + data[i].latitude +'</latitude>\n';
      xml = xml + '   <longitude>' + data[i].longitude +'</longitude>\n';
      xml = xml + ' </geo>\n';

      xml = xml + ' <aggregatedRating>\n';
      xml = xml + '   <ratingValue>' + data[i].ratingValue +'</ratingValue>\n';
      xml = xml + '   <reviewCount>' + data[i].reviewCount +'</reviewCount>\n';
      xml = xml + ' </aggregatedRating>\n';

      consultas.getOpeningHour(data[i].establecimientoId,function(err,rows){

        if(err)
          console.log(err);
        else {
          xml = xml + '<openingHours>\n'
          for(j=0;j< rows.length;j++){
            xml= xml +'<openingHour>' + rows[j].description + '</openingHour>';
          }
          xml = xml + '</openingHours>\n'
        }

      });
      //console.log(data[i].establecimientoId);

      xml = xml + ' </establecimiento>'
      console.log('xml =' + xml);
                        /* +'name'=""+data.name+"";*/
      /*+'>'
      +'<caca>dd</caca>'
      +'</establecimiento';*/
  }

 xml = xml+' </establecimientos>'
  //xml = xml + '<msj>Hola</msj>';


  var xmlDoc = libxmljs.parseXml(xml);
  //console.log(xmlDoc.toString());
  return xmlDoc.toString();

}


module.exports = {
  getAllEstablecimientos: getAllEstablecimientos
};
