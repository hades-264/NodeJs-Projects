const express = require('express');
const { handleGenerateShortUrl, handleGetShortUrl, handleGetAnalytics } = require('../controllers/controller');

const router = express.Router();

router.post('/', handleGenerateShortUrl);
router.get('/:shortId', handleGetShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics);

module.exports = router;