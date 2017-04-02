    $(function() {
      console.log('hola');
      $( "p" ).text( "The DOM is now loaded and can be manipulated." );
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

                    alert('hola');
                    console.log(data);

                    },
                    error: function (msg, url, line) {
                        alert('error trapped');
                        console.log(msg);

                    }
                });
    });
