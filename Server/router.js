const express = require('express');
const authentication = require('./controllers/authentication.controller');
const router = express.Router();

router.post('/signup', authentication.register);
router.post('/authenticate', authentication.authenticate);
module.exports = router;
