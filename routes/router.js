var express = require('express');
var router = express.Router();
var handlers = require('./handlers');


router.get('/', handlers.main);
router.post('/', handlers.send);

module.exports = router;