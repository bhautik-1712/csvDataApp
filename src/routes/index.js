const express = require('express');
const csvRoute = require('../api/csv/csvRoute');

const router = express.Router();

router.use('/csv', csvRoute);

module.exports = router;