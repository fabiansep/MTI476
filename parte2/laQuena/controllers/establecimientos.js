
var mongoose = require('mongoose');
var establecimiento  = mongoose.model('establecimiento');
var libxmljs = require('libxmljs');
var funciones =require('./funciones');

//GET - Return all establecimientos in the laquena DB
exports.findEstablecimientos = function(req, res) {

	establecimiento.find({},{_id:0,__v:0,bodega:0},function(err, establecimientos) {
    if(err) res.send(500, err.message);
    console.log('GET /establecimientos');

		var response = funciones.responseType(req);

		if(response=="json")
			exportToJSon(res,establecimientos)
		else if(response=="xml")
			exportToXML(res,establecimientos);
		else if(response=="html")

		console.log(req);

    //console.log(establecimientos[0].establecimientoId);

	});
};


//GET - Return a establecimiento with specified establecimientoId
exports.findByEstablecimientoId = function(req, res) {

		var response = funciones.responseType(req);

	  console.log('GET /establecimiento/' + req.params.establecimientoId);

		if (isNaN(parseInt(req.params.establecimientoId))){
			if(req.params.establecimientoId.indexOf(".") == -1){
				res.status(400)
				 	 .set('Content-Type','text/json')
				   .send('{ "status":400,"type": "error", "description": "Valid format is int dot {html,json,xml}. Missing dot." }');
					 return;
			}
			else{
						var extension = req.params.establecimientoId.substr(req.params.establecimientoId.indexOf(".")+1);
					 	if (extension != 'json' || extension != 'xml' || extension != 'html'){
							res.status(415)
							   .set('Content-Type','text/json')
							   .send('{ "status":415,"type": "error", "description": "Valid format is int dot {html,json,xml}. Missing dot." }');
								 return;
						}
						else {
							var processed_id =  parseInt(req.params.establecimientoId.substr(0,req.params.establecimientoId.indexOf(".")));
							if(isNaN(processed_id)){
								res.status(415)
								   .set('Content-Type','text/json')
								   .send('{ "status":415,"type": "error", "description": "Identifier MUST be an Number (NaN is returned)" }');
									 return;
							}
						}
			}
		}
		req.params.establecimientoId = parseInt(req.params.establecimientoId);
    establecimiento.find({'establecimientoId':req.params.establecimientoId},{_id:0,__v:0,bodega:0}, function(err, establecimiento_) {
    if(err) return res.send(500, err.message);
			if (response == 'json')
				exportToJSon(res,establecimiento_[0]);
			else if(response=='xml')
					exportToXML(res,establecimiento_);
			else if(response=='html')
					res.status(200).jsonp(establecimiento_);
    });
};

//POST - Insert a new establecimiento in the laquena db
exports.addEstablecimiento = function(req, res) {
    console.log('POST');
    var establecimiento_ = new establecimiento({
				establecimientoId:	0,
        name:    						req.body.name,
        legalName:					req.body.legalName,
        email:  						req.body.email,
        manager:   					req.body.manager,
        country:  					req.body.country,
        adress:    					req.body.adress,
        geo:  							req.body.geo,
				phoneList:  				req.body.phoneList,
				openingHours: 			req.body.openingHours,
				aggregatedRating:		req.body.aggregatedRating

    });

		establecimiento.find({},{establecimientoId:2}) //fin the max value of establecimientoId
										.sort({establecimientoId:-1})
										.limit(1)
										.exec(function(err,establecimiento){
												console.log("a:*" +establecimiento+'*');
											  if(establecimiento == null || establecimiento =='')
													establecimiento_.establecimientoId =  1;
												else
													establecimiento_.establecimientoId = establecimiento[0].establecimientoId + 1;

												establecimiento_.save(function(err, establecimiento_) { // Do the Insert
																if(err)
																	return res.status(500).send( err.message);
																res.status(201)
																	 .set('Content-Type','text/json')
																	 .location('/establecimientos/'+ establecimiento_.establecimientoId)
																	 .send('{ "status":201,"type": "success", "establecimientoId": "'+establecimiento_.establecimientoId+'" }');
												});

										});
};

//PUT - Insert a new establecimiento in the laquena db
exports.updateEstablecimiento = function(req, res) {
    console.log('PUT');

		/*
		 * check supported Content-Type if doesn't match, either do transform or send 415 responses (media no supported)
		 */
		establecimiento.find({'establecimientoId':req.params.establecimientoId}, function(err, establecimiento_) {
			establecimiento_[0].name   						= req.body.name;
			establecimiento_[0].legalName    			= req.body.legalName;
			establecimiento_[0].email 							= req.body.email;
			establecimiento_[0].manager  					= req.body.manager;
			establecimiento_[0].country	 					= req.body.country;
			establecimiento_[0].adress   					= req.body.adress;
			establecimiento_[0].geo 								= req.body.geo;
			establecimiento_[0].phoneList 					= req.body.phoneList;
			establecimiento_[0].openingHours 			= req.body.openingHours;
			establecimiento_[0].aggregatedRating		= req.body.aggregatedRating;

			establecimiento_[0].save(function(err) {
				if(err)
				return res.status(500).send(err.message);
				res.status(200)
					 .jsonp(establecimiento_);
			});
		});

};


//DELETE - Delete a establecimiento with specified establecimientoId
exports.deleteEstablecimiento = function(req, res) {
		console.log('DELETE /establecimientos/' + req.params.establecimientoId);

    establecimiento.remove({'establecimientoId':req.params.establecimientoId}, function(err, establecimiento_) {
            if(err) return res.status(500).send(err.message);
      			res.status(204).send();
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
function exportToJSon(res,establecimiento){
	res.status(200).jsonp(establecimiento);
}
