'use strict';

var express = require('express');
var controller = require('./thing.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/:librosId', controller.show);
router.post('/', controller.create);
router.put('/:librosId', controller.upsert);
router.delete('/:librosId', controller.destroy);

module.exports = router;
