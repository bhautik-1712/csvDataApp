const express = require('express');
const csvController = require('./csvController');

const router = express.Router();

router.get('/fetchCSVData', csvController.fetchCSVData);

router.get('/search', csvController.searchBooksMagazines);

router.get('/sort', csvController.sortBooksMagazines);

router.put('/updateCSV', csvController.updateCSV);

router.post('/knightMoves', csvController.findKnightMoves)

module.exports = router;