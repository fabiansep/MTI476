var mongoose = require('mongoose');
var establecimiento  = mongoose.model('establecimiento');
var producto  = mongoose.model('producto');
var libxmljs = require('libxmljs');
var funciones =require('./funciones');

//GET - Return all products of one Establecimiento in the laquena DB
exports.findProductsOfBodega = function(req, res) {

  console.log('GET /establecimientos/'+req.params.establecimientoId+'/bodega');

  var filter = {legalName:0,
                geo:0,
                __v:0,
                email:0,
                adress:0,
                country:0,
                manager:0,
                phoneList:0,
                openingHours:0,
                aggregatedRating:0,
                "bodega.productoId.name":0
              };

	establecimiento.find({'establecimientoId':req.params.establecimientoId},
                       filter,
                       function(err, establecimientos) {
                         producto.populate(establecimientos
                                        , {path:'bodega.productoId'}
                                        , function(err,establecimientos){
                                              if(err) res.send(500, err.message);

                                         	   var response = funciones.responseType(req);
                                         		 if(response=="json")
                                         		   exportToJSon(res,establecimientos,-1);
                                         		 else if(response=="xml")
                                         			 exportToXML(res,establecimientos,-1);
                                         		 else if(response=="html")
                                               exportToHTML(res,establecimientos,-1);
                                        }
                                      );

                  	});

};


//GET - Return one product  with specified establecimientoId
exports.findProductsOfBodegaById = function(req, res) {

		var response = funciones.responseType(req);

    var filter = {legalName:0,
                  geo:0,
                  __v:0,
                  email:0,
                  adress:0,
                  country:0,
                  manager:0,
                  phoneList:0,
                  openingHours:0,
                  aggregatedRating:0,
                  "bodega.productoId.name":0
                };

	  console.log('GET /establecimiento/'+req.params.establecimientoId +'/bodega/'+ req.params.productoId);

		if (isNaN(parseInt(req.params.productoId))){
			if(req.params.productoId.indexOf(".") == -1){
				res.status(400)
				 	 .set('Content-Type','text/json')
				   .send('{ "status":400,"type": "error", "description": "Valid format is int dot {html,json,xml}. Missing dot." }');
					 return;
			}
			else{
						var extension = req.params.productoId.substr(req.params.productoId.indexOf(".")+1);
					 	if (extension != 'json' || extension != 'xml' || extension != 'html'){
							res.status(415)
							   .set('Content-Type','text/json')
							   .send('{ "status":415,"type": "error", "description": "Valid format is int dot {html,json,xml}. Missing dot." }');
								 return;
						}
						else {
							var processed_id =  parseInt(req.params.productoId.substr(0,req.params.productoId.indexOf(".")));
							if(isNaN(processed_id)){
								res.status(415)
								   .set('Content-Type','text/json')
								   .send('{ "status":415,"type": "error", "description": "Identifier MUST be an Number (NaN is returned)" }');
									 return;
							}
						}
			}
		}
		req.params.productoId = parseInt(req.params.productoId);


    establecimiento.find({'establecimientoId':req.params.establecimientoId},
                         filter,
                         function(err, establecimientos) {
                           producto.populate(establecimientos
                                          , {path:'bodega.productoId'}
                                          , function(err,establecimientos){
                                                if(err) res.send(500, err.message);

                                           	   var response = funciones.responseType(req);
                                           		 if(response=="json")
                                           		   exportToJSon(res,establecimientos,req.params.productoId);
                                           		 else if(response=="xml")
                                           			 exportToXML(res,establecimientos,req.params.productoId);
                                           		 else if(response=="html")
                                                 exportToHTML(res,establecimientos,req.params.productoId);
                                          }
                                        );

                    	});
};

//POST - Insert a new product into bodega of establecimiento the laquena db
exports.addProductoBodega= function(req, res) {
    console.log('POST /establecimientos/'+req.params.establecimientoId+'/bodega');

    producto.find({'productoId':req.body.productoId}, function(err,producto_){
          console.log(producto_);
          if(err)
            return res.status(500).send(err.message);


          var bodega_ = { productoId: producto_[0]._id,
                          stock:      req.body.stock,
                          price:      req.body.price};

          establecimiento.find({'establecimientoId':req.params.establecimientoId}, function(err, establecimiento_) {



              establecimiento_[0].bodega.push(bodega_);

              console.log(establecimiento_[0]);

              establecimiento_[0].save(function(err) {
              if(err)
                return res.status(500).send(err.message);
                res.status(201)
                   .set('Content-Type','text/json')
                   .location('/establecimientos/'+ establecimiento_.establecimientoId+'/bodega/'+req.body.productoId)
                   .send('{ "status":201,"type": "success"}');
              });
    });

		});

};

//PUT - Insert a new establecimiento in the laquena db
exports.updateProductoEstablecimiento= function(req, res) {
    console.log('PUT');

		/*
		 * check supported Content-Type if doesn't match, either do transform or send 415 responses (media no supported)
		 */

     console.log(req.body);

     producto.find({'productoId':req.params.productoId}, function(err,producto_){

           if(err)
             return res.status(500).send(err.message);


           var bodega_ = { productoId: producto_[0]._id,
                           stock:      req.body.stock,
                           price:      req.body.price};

           establecimiento.find({'establecimientoId':req.params.establecimientoId}, function(err, establecimiento_) {

              console.log(bodega_);

              for( i = 0; i < establecimiento_[0].bodega.length;i++){
                  console.log('if '+ establecimiento_[0].bodega[i].productoId + "=="+ bodega_.productoId);

                  if(establecimiento_[0].bodega[i].productoId+'' == bodega_.productoId+''){
                    console.log('ava');
                    establecimiento_[0].bodega[i].stock = bodega_.stock;
                    establecimiento_[0].bodega[i].price = bodega_.price;
                  }

              }


               console.log(establecimiento_[0]);

               establecimiento_[0].save(function(err) {
               if(err)
                 return res.status(500).send(err.message);
                 res.status(200)
                    .set('Content-Type','text/json')
                    .location('/establecimientos/'+ establecimiento_.establecimientoId+'/bodega/'+req.body.productoId)
                    .send('{ "status":200,"type": "success"}');
               });
     });

 		});

};


//DELETE - Delete a establecimiento with specified establecimientoId
exports.deleteProductoEstablecimiento = function(req, res) {
  console.log('PUT');

  /*
   * check supported Content-Type if doesn't match, either do transform or send 415 responses (media no supported)
   */

   console.log(req.body);

   producto.find({'productoId':req.params.productoId}, function(err,producto_){

         if(err)
           return res.status(500).send(err.message);

         var productoId =  producto_[0]._id;

         establecimiento.find({'establecimientoId':req.params.establecimientoId}, function(err, establecimiento_) {

            var indexToDelete = -1;

            for( i = 0; i < establecimiento_[0].bodega.length;i++){

                if(establecimiento_[0].bodega[i].productoId+'' == productoId+''){

                      indexToDelete = i;

                }

            }

              if(indexToDelete != -1)
                establecimiento_[0].bodega.splice(indexToDelete,1);

             console.log(establecimiento_[0]);

             establecimiento_[0].save(function(err) {
             if(err)
               return res.status(500).send(err.message);
               res.status(204)
                  .set('Content-Type','text/json')
                  .location('/establecimientos/'+ establecimiento_.establecimientoId+'/bodega/'+req.body.productoId)
                  .send('{ "status":204,"type": "success"}');
             });
   });

  });
};

/*
 * Exports result to XML establecimiento
 */
function exportToXML(res,establecimientos,productoId){

  var xml = '<?xml version="1.0" encoding="UTF-8"?> \n';
  xml = xml +' <bodega>\n'

  var test;

  for(i= 0; i < establecimientos.length;i++){

    xml = xml + '   <establecimiento establecimientoId=\''+ establecimientos[i].establecimientoId+'\'>'+establecimientos[i].name+'</establecimiento>\n';
    xml = xml + ' 	<productos>\n';
    for(j=0; j< establecimientos[i].bodega.length;j++){

         if(productoId == -1 || establecimientos[i].bodega[j].productoId.productoId ==productoId){
            xml = xml + '   	<producto productoID=\''+ establecimientos[i].bodega[j].productoId.productoId+'\' name=\''+establecimientos[i].bodega[j].productoId.name+'\'>\n';
            xml = xml + '   	   <stock>'+establecimientos[i].bodega[j].stock +'</stock>\n';
            xml = xml + '   	       <price>\n';
            xml = xml + '   	           <value>'+establecimientos[i].bodega[j].price.value+'</value>\n';
            xml = xml + '   	           <currency>'+establecimientos[i].bodega[j].price.currency+'</currency>\n';
            xml = xml + '   	       </price>\n';
            xml = xml + '   	</producto>\n';
        }
    }
    xml = xml + ' 	</productos>\n';


  }
  xml = xml+' </bodega>'
  console.log(xml);
  var xmlDoc = libxmljs.parseXml(xml);
  res.status(200)
     .set('Content-Type','text/xml')
     .send(xmlDoc.toString());
}
/*
 *
 */
 function exportToHTML(res,establecimientos,productoId){
 	var html;

 	html = '<!DOCTYPE html>\n';
 	html = html + '<html>\n';
 	html = html + '<head>\n';
 	html = html + '	<meta charset="UTF-8">\n';
 	html = html + '	<title>Listado de Productos '+establecimientos[0].name+'</title>\n';
 	html = html + '</head>\n';
 	html = html + '<body>\n';





    for(i= 0; i < establecimientos.length;i++){

      html = html + '<h1>Productos de '+establecimientos[i].name+'</h1>\n';

      html = html + '<table>\n';
      html = html + '<tr>\n';
      html = html + ' <th>Id</th>\n';
      html = html + ' <th>Nombre</th>\n';
      html = html + ' <th>Stock</th>\n';
      html = html + ' <th>Precio</th>\n';
      html = html + '</tr>\n';


      for(j=0; j< establecimientos[i].bodega.length;j++){

           if(productoId == -1 || establecimientos[i].bodega[j].productoId.productoId ==productoId){
              html = html + '<tr>\n';
                html = html + ' <td>'+establecimientos[i].bodega[j].productoId.productoId+'</td>\n';
                html = html + ' <td>'+establecimientos[i].bodega[j].productoId.name+'</td>\n';
                html = html + ' <td>'+establecimientos[i].bodega[j].stock+'</td>\n';
                html = html + ' <td>'+establecimientos[i].bodega[j].price.currency+' '+establecimientos[i].bodega[j].price.value+'</td>\n';
              html = html + '</tr>\n';
          }
      }
    }

  html = html + '</table>\n';

 	html = html + '</body>\n';
 	html = html + '</html>\n';
 	console.log(html);

 	res.status(200)
      .set('Content-Type','text/html')
      .send(html);
 }
/*
 *
 */
function exportToJSon(res,establecimientos,productoId){

  var json = "{";
  var count = 0;

  for(i= 0; i < establecimientos.length;i++){

    json = json + '"establecimientoId":'+establecimientos[i].establecimientoId+",";
    json = json + '"name":"'+establecimientos[i].name+ '",';
    json = json + '"productos": ['



    for(j=0; j< establecimientos[i].bodega.length;j++){
      if(productoId == -1 || establecimientos[i].bodega[j].productoId.productoId ==productoId){
          if(count != 0)
            json = json + ','

          json = json + '{';
          json = json + '"productoID":'+establecimientos[i].bodega[j].productoId.productoId+",";
          json = json + '"name":"'+establecimientos[i].bodega[j].productoId.name+'",';
          json = json + '"stock":'+establecimientos[i].bodega[j].stock+ ",";
          json = json + '"price": {';
          json = json + '"value":'+establecimientos[i].bodega[j].price.value+ ",";
          json = json + '"currency":"'+establecimientos[i].bodega[j].price.currency+'"';
          json = json + '}';
          json = json + '}';

          count++;
      }
    }
    json = json + ']'
    json = json + '}'


  }
  console.log(json);

	res.status(200).jsonp(JSON.parse(json));
}
