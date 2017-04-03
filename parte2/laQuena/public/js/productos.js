    $(function() {
      console.log('hola');
      //$( "p" ).text( "The DOM is now loaded and can be manipulated." );
      $('#loading').show();

      $.ajax(
            {
              type: "GET",
              url:  "https://laquena.herokuapp.com/api/productos/",
              data: "",
              headers:{
                  Accept: "application/json; charset=utf-8",
                  "Content-Type": "application/json; charset=utf-8",

              },
              dataType: "json",
              success: function (data) {

                    var element = '';
                    for (i = 0; i <data.length; i++){

                        element = element + '<div class="panel panel-info" vocab="http://schema.org/" typeof="Product"> <!-- panel-info -->\n';
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
                    	element = element + '</div>\n';
                    }
                    $('#loading').hide();
                    $('#producto-list').append(element);
                    //alert('hola');
                    console.log(data);

                    },
                    error: function (msg, url, line) {
                        alert('error trapped');
                        console.log(msg);

                    }
                });
    });
