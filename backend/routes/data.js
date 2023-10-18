const express = require('express');

const dataController = require('../controllers/data');

const router = express.Router();

router.get('/list', dataController.getList);

router.post('/parse', dataController.parseSQL);

router.post('/rebuild', dataController.rebuild);

router.delete('/:id', dataController.delete);

module.exports = router;
