const express = require('express');
const router = express.Router();

const { createShortUrl } = require('../controllers/shortner');
router.post('/shortner', createShortUrl);
const { getShortUrl } = require('../controllers/finder');
router.get('/finder/:shortUrl', getShortUrl);

module.exports = router;