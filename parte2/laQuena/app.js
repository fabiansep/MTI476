var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    mongoose        = require('mongoose');

    mongoose.Promise = require('bluebird');

var uristring =       process.env.MONGODB_URI ||
      'mongodb://user:userlaquena@ds137110.mlab.com:37110/laquena';

var theport = process.env.PORT || 5000;
// Connection to DB
//mongoose.connect('mongodb://localhost/laquena', function(err, res) {
mongoose.connect(uristring, function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());

// Import Models and controllers
var establecimientoModel  = require('./models/establecimiento')(app, mongoose);
var productoModel         = require('./models/producto')(app, mongoose);
var establecimientoCtrl   = require('./controllers/establecimientos');
var productoCtrl          = require('./controllers/productos');
var bodegaCtrl            = require('./controllers/bodegas');
// Example Route
var router = express.Router();
router.get('/', function(req, res) {
  res.send("Hello world!");
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

// Start server
app.listen(theport, function() {
  console.log("Node server running on http://localhost:"+theport);
});
