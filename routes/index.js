
'use strict';

const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.json({'index': 'gtfo'});
});

module.exports = router;