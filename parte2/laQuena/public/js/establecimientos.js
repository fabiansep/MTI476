    $(function() {
      console.log('hola');
      //$( "p" ).text( "The DOM is now loaded and can be manipulated." );
      $('#loading').show();

      $.ajax(
            {
              type: "GET",
              url:  "https://laquena.herokuapp.com/api/establecimientos/",
              data: "",
              headers:{
                  Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8",

              },
              dataType: "json",
              success: function (data) {

                    var element = '';
                    for (i = 0; i <data.length; i++){

                      element = element + '<div class="panel panel-default">\n';
                      element = element + ' <div class="panel-heading">\n';
                      element = element + '   <h4 class="panel-title">\n';
                      element = element + '     <a data-toggle="collapse" data-parent="#establecimientoList" href="#collapse'+data[i].establecimientoId+'">'+data[i].name+'</a>\n';
                      element = element + '   </h4>\n';
                      element = element + ' </div>\n';

                      element = element + '<div id="collapse'+data[i].establecimientoId+'" class="panel-collapse collapse">\n'
                      element = element + '<div class="panel-body">\n';

                      element = element + ' <p>Nombre Legal:'+data[i].legalName+'</p>\n';
                      element = element + ' <p>Manager:'+data[i].manager+'</p>\n';
                      element = element + ' <p>Direccion:'+data[i].adress.streetAdress+', '
                                        + data[i].adress.adressLocality
                                        + ', '
                                        + data[i].adress.adressRegion
                                        +'</p>\n';
                      element = element + ' <p>Pais:'+data[i].country.value+'</p>\n';

                      element = element + ' <p>Geo:'+data[i].geo.latitude
                                        + ','
                                        + data[i].geo.longitude
                                        +'</p>\n';

                      element = element + ' <p>Horarios de Atencion:</p>\n';

                      element = element + '<ul>\n';
                      for(j=0; j< data[i].openingHours.length;j++){
                        element = element + ' <li>'+data[i].openingHours[j]+'</li>\n';
                      }
                      element = element + '</ul>\n';

                      element = element + ' <p>Telefonos:</p>\n';

                      element = element + '<ul>\n';
                      for(j=0; j< data[i].phoneList.length;j++){
                        element = element + ' <li>'+data[i].phoneList[j]+'</li>\n';
                      }
                      element = element + '</ul>\n';
                      element = element + ' <p>email:'+data[i].email+'</p>\n';


                      element = element + ' <p>Rating:</p>\n';
                      element = element + '<ul>\n';
                      element = element + '<li>Calificacion:'+data[i].aggregatedRating.ratingValue+' </li>\n';
                      element = element + '<li>Votos:'+data[i].aggregatedRating.reviewCount+' </li>\n';
                      element = element + '<ul>\n';

                      element = element + ' </div>\n';
                      element = element + ' </div>\n';
                      element = element + ' </div>\n';
                      /*
                    	element = element + '	<div class="panel-heading">\n'
                    	element = element + '		<h3 class="panel-title"><span property="name"> '+data[i].name+'</span></h3>\n';
                    	element = element + '	</div>\n';
                    	element = element + '	<div class="panel-body">\n';
                    	element = element + '		<span property="description">'+data[i].history+'</span>\n';
                    	element = element + '	</div> \n';
                    	element = element + ' 	<div class="clasification">\n';
                      for(j = 0; j < data[i].clasificationList.length;j++){
                          element = element + '		<span class="badge badge-info clasification">'+data[i].clasificationList[j]+'</span>\n';
                      }
                    	element	= element +	'	</div>\n';
                    	element = element + '</div>\n';*/
                    }
                    $('#loading').hide();
                    $('#establecimientoList').append(element);
                    //alert('hola');
                    console.log(data);

                    },
                    error: function (msg, url, line) {
                        alert('error trapped');
                        console.log(msg);

                    }
                });
    });
