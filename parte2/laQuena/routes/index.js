var express = require('express');
var router = express.Router();
var app    = require('../app');
var mongoose = require('mongoose');
// Import Models and controllers
var models     = require('../models/establecimiento')(app, mongoose);
var establecimientoCtrl = require('../controllers/establecimientos');

var db = require('../queries/queries');
var db_mysql = require('../queries/mysql_queries');
/**
 * @swagger
 * definition:
 *   Puppy:
 *     properties:
 *       name:
 *         type: string
 *       breed:
 *         type: string
 *       age:
 *         type: integer
 *       sex:
 *         type: string
 */
 /**
 * @swagger
 * /api/puppies:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns all puppies
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of puppies
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.get('/api/puppies', db.getAllPuppies);
/**
 * @swagger
 * /api/puppies/{id}:
 *   get:
 *     tags:
 *       - Puppies
 *     description: Returns a single puppy
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: Puppy's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: A single puppy
 *         schema:
 *           $ref: '#/definitions/Puppy'
 */
router.get('/api/puppies/:id', db.getSinglePuppy);
/**
* @swagger
* /api/establecimiento:
*   get:
*     tags:
*       - establecimiento
*     description: Returns all establecimiento
*     produces:
*       - application/json
*     responses:
*       200:
*         description: An array of establecimiento
*         schema:
*           $ref: '#/definitions/Puppy'
*/
router.get('/api/establecimiento', establecimientoCtrl.findEstablecimientos);
module.exports = router;
