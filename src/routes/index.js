const router = require('express').Router();

const payment = require('./v1/payment');

router.use('/api/v1/payment', payment);

module.exports = router;
