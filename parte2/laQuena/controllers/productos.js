
var mongoose = require('mongoose');
var producto  = mongoose.model('producto');
//var libxmljs = require('libxmljs');
var funciones =require('./funciones');

//GET - Return all productos in the laquena DB
exports.findProductos = function(req, res) {
	producto.find({},{_id:0,__v:0},function(err, productos) {
    if(err) res.send(500, err.message);
    console.log('GET /productos');

		var response = funciones.responseType(req);

		if(response=="json")
			exportToJSon(res,productos)
		else if(response=="xml")
			exportToXML(res,productos);
		else if(response=="html")
			exportToHTML(res,productos);
		console.log(req);

    //console.log(productos[0].productoId);

	});
};


//GET - Return a producto with specified productoId
exports.findByProductoId = function(req, res) {

		var response = funciones.responseType(req);

	  console.log('GET /productos/' + req.params.productoId);

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
    producto.find({'productoId':req.params.productoId},{_id:0,__v:0}, function(err, producto_) {
    if(err) return res.send(500, err.message);
			if (response == 'json')
				exportToJSon(res,producto_[0]);
			else if(response=='xml')
					exportToXML(res,producto_);
			else if(response=='html')
					exportToHTML(res,producto_);
    });
};

//POST - Insert a new producto in the laquena db
exports.addProducto = function(req, res) {
    console.log('/productos/ POST');

    var producto_ = new producto({
				productoId:	0,
        name:    						req.body.name,
        history:						req.body.history,
        clasificationList:  req.body.clasificationList

    });
				console.log(producto_);
		producto.find({},{productoId:2}) //fin the max value of productoId
										.sort({productoId:-1})
										.limit(1)
										.exec(function(err,producto){
											  if(producto == null || producto =='')
													producto_.productoId =  1;
												else
													producto_.productoId = producto[0].productoId + 1;

												producto_.save(function(err, producto_) { // Do the Insert
																if(err)
																	return res.status(500).send( err.message);
																res.status(201)
																	 .set('Content-Type','text/json')
																	 .location('/productos/'+ producto_.productoId)
																	 .send('{ "status":201,"type": "success", "productoId": "'+producto_.productoId+'" }');
												});

										});
};

//PUT - Insert a new producto in the laquena db
exports.updateProducto = function(req, res) {
    console.log('/productos/ PUT');

		/*
		 * check supported Content-Type if doesn't match, either do transform or send 415 responses (media no supported)
		 */
		 //console.log(req.params.productoId);
		 //console.log(req.body);


		producto.find({'productoId':req.params.productoId}, function(err, producto_) {
			producto_[0].name   							= req.body.name;
			producto_[0].history    					= req.body.history;
			producto_[0].clasificationList 		= req.body.clasificationList;

			console.log(producto_[0]);
			producto_[0].save(function(err) {
				if(err)
				return res.status(500).send(err.message);		
				exportToJSon(res,producto_[0]);
			});
		});

};


//DELETE - Delete a producto with specified productoId
exports.deleteProducto = function(req, res) {
		console.log('DELETE /productos/' + req.params.productoId);

    producto.remove({'productoId':req.params.productoId}, function(err, producto_) {
            if(err) return res.status(500).send(err.message);
      			res.status(204).send();
    });
};

/*
 * Exports result to XML producto
 */
function exportToXML(res,productos){

  var xml = '<?xml version="1.0" encoding="UTF-8"?> \n';
  xml = xml +' <productos>\n'

  var test;

  for(i= 0; i < productos.length;i++){

    xml = xml + ' <producto productoId=\''+ productos[i].productoId+'\'>\n';
    xml = xml + '   <name>'+productos[i].name+'</name>\n';
    xml = xml + '   <history>'+productos[i].history+'</history>\n';
    xml = xml + ' 	<clasificationList>\n';
    for(j=0; j< productos[i].clasificationList.length;j++){
          xml = xml + '   	<clasification>'+ productos[i].clasificationList[j]+'</clasification>\n';
    }
    xml = xml + ' 	</clasificationList>\n';
    xml = xml + ' </producto>\n'

  }
  xml = xml+' </productos>'


  res.status(200)
     .set('Content-Type','text/xml')
     .send(xml);
}
/*
 *
 */
function exportToHTML(res,productos){
	var html;

	html = '<!DOCTYPE html>\n';
	html = html + '<html>\n';
	html = html + '<head>\n';
	html = html + '	<meta charset="UTF-8">\n';
	html = html + '	<title>Listado de Productos</title>\n';
	html = html + '</head>\n';
	html = html + '<body>\n';

	for(i= 0; i < productos.length;i++){

		html = html + '	<div id="'+productos[i].productoId+'">\n';
		html = html + '		<h3>'+productos[i].name+'</h3>\n';
		html = html + '		<p>'+productos[i].history+'</p>\n';
		html = html + '		<p>Clasficacion: </p>\n';

    for(j=0; j< productos[i].clasificationList.length;j++){
          html = html + '<a href="">'+productos[i].clasificationList[j]+'</a>\n';
    }
		html = html + '	</div>\n';
  }


	html = html + '</body>\n';
	html = html + '</html>\n';
	console.log(html);

	res.status(200)
     .set('Content-Type','text/html')
     .send(html);
}

function exportToJSon(res,productos){
	res.status(200).jsonp(productos);
}
