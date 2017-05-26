var express = require('express');
var router = express.Router();
var handlers = require('./handlers');


router.get('/', handlers.main);

module.exports = router;