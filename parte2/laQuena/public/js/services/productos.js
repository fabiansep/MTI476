angular.module('productoService', [])

    // super simple service
    // each function returns a promise object
    .factory('productos', function($http) {
        return {
            get : function() {
                return $http.get('/api/productos');
            },
            create : function(productoData) {
                return $http.post('/api/productos', productoData);
            },
            delete : function(productoId) {
                return $http.delete('/api/productos/' + productoId);
            }
        }
    });
