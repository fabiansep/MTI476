/*//File: controllers/establecimiento.js
var mongoose = require('mongoose');
var establecimiento  = mongoose.model('establecimiento');

//GET - Return all establecimiento in the DB
exports.findAllEstablecimiento = function(req, res) {
    establecimiento.find(function(err, establecimientos) {
    if(err) res.send(500, err.message);
    console.log('GET /establecimiento')
        res.status(200).jsonp(establecimientos);
    });
};


*/
var mongoose = require('mongoose');
var establecimiento  = mongoose.model('establecimiento');
var libxmljs = require("libxmljs");

//GET - Return all tvshows in the DB
exports.findEstablecimientos = function(req, res) {
	establecimiento.find(function(err, establecimientos) {
    if(err) res.send(500, err.message);
    console.log('GET /establecimientos');

    console.log(req.headers);
    console.log(req.originalUrl);
    console.log(establecimientos[0].establecimientoId);

    exportToXML(res,establecimientos);
		//res.status(200).jsonp(establecimientos);
	});
};

/*
 * Exports result to XML establecimiento
 */
function exportToXML(res,establecimientos){

  var xml = '<?xml version="1.0" encoding="UTF-8"?> \n';
  xml = xml +' <establecimientos>\n'

  var test;

  for(i= 0; i < establecimientos.length;i++){

    xml = xml + ' <establecimiento establecimientoId=\''+ establecimientos[i].establecimientoId+'\'>\n';
    xml = xml + '   <name>'+establecimientos[i].name+'</name>\n';
    xml = xml + '   <legalName>'+establecimientos[i].legalName+'</legalName>\n';
    xml = xml + '   <email>'+establecimientos[i].email+'</email>\n';
    xml = xml + '   <manager>'+establecimientos[i].manager+'</manager>\n';
    xml = xml + '   <country iso31661Code=\'' + establecimientos[i].country.iso31661Code+'\'>' +establecimientos[i].country.value + '</country>\n';
    xml = xml + ' 	<address>\n';
    xml = xml + '   	<streetAddress>' + establecimientos[i].adress.streetAdress +'</streetAddress>\n';
    xml = xml + '   	<addressLocality>' + establecimientos[i].adress.adressLocality +'</addressLocality>\n';
    xml = xml + '   	<addressRegion>' + establecimientos[i].adress.adressRegion +'</addressRegion>\n';
    xml = xml + ' 	</address>\n';
    xml = xml + ' 	<geo>\n';
    xml = xml + '   	<latitude>' + establecimientos[i].geo.latitude +'</latitude>\n';
    xml = xml + '   	<longitude>' + establecimientos[i].geo.longitude +'</longitude>\n';
    xml = xml + ' 	</geo>\n';
    xml = xml + ' 	<aggregatedRating>\n';
    xml = xml + '   	<ratingValue>' + establecimientos[i].aggregatedRating.ratingValue +'</ratingValue>\n';
    xml = xml + '   	<reviewCount>' + establecimientos[i].aggregatedRating.reviewCount +'</reviewCount>\n';
    xml = xml + ' 	</aggregatedRating>\n';
    xml = xml + ' 	<openingHours>\n';
    for(j=0; j< establecimientos[i].openingHours.length;j++){

          xml = xml + '   	<openingHour>'+ establecimientos[i].openingHours[j]+'</openingHour>\n';
    }
    xml = xml + ' 	</openingHours>\n';

		xml = xml + ' 	<phoneList>\n';
    for(j=0; j< establecimientos[i].phoneList.length;j++){

          xml = xml + '   	<phone>'+ establecimientos[i].phoneList[j]+'</phone>\n';
    }
    xml = xml + ' 	</phoneList>\n';

    xml = xml + ' </establecimiento>\n'

  }
  xml = xml+' </establecimientos>'


  var xmlDoc = libxmljs.parseXml(xml);
  res.status(200)
     .set('Content-Type','text/xml')
     .send(xmlDoc.toString());
}
/*
 *
 */
function exportToHTML(){

}
/*
 *
 */
function exportToJSon(){

}
