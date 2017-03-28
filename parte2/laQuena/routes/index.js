// Import Models and controllers
var express               = require("express")
var establecimientoModel  = require('../models/establecimiento');
var productoModel         = require('../models/producto');
var establecimientoCtrl   = require('../controllers/establecimientos');
var productoCtrl          = require('../controllers/productos');
var bodegaCtrl            = require('../controllers/bodegas');
// Example Route



module.exports = function (app) {

  var router = express.Router();
  router.get('/', function(req, res) {
    res.sendFile("./public/index.html");
  });

  app.use(router);

  // API routes
  var apiLaQuena = express.Router();

  apiLaQuena.route('/establecimientos')
    .get(establecimientoCtrl.findEstablecimientos)
    .post(establecimientoCtrl.addEstablecimiento);

  apiLaQuena.route('/establecimientos/:establecimientoId')
    .get(establecimientoCtrl.findByEstablecimientoId)
    .put(establecimientoCtrl.updateEstablecimiento)
    .delete(establecimientoCtrl.deleteEstablecimiento);

  apiLaQuena.route('/establecimientos/:establecimientoId/bodega')
    .get(bodegaCtrl.findProductsOfBodega)
    .post(bodegaCtrl.addProductoBodega);

  apiLaQuena.route('/establecimientos/:establecimientoId/bodega/:productoId')
    .get(bodegaCtrl.findProductsOfBodegaById)
    .put(bodegaCtrl.updateProductoEstablecimiento)
    .delete(bodegaCtrl.deleteProductoEstablecimiento);

  apiLaQuena.route('/productos')
        .get(productoCtrl.findProductos)
        .post(productoCtrl.addProducto);

  apiLaQuena.route('/productos/:productoId')
        .get(productoCtrl.findByProductoId)
        .put(productoCtrl.updateProducto)
        .delete(productoCtrl.deleteProducto);

  app.use('/api/', apiLaQuena);

}
