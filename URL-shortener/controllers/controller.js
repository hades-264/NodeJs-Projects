const Url = require('../models/model');
const shortid = require('shortid');

async function handleGenerateShortUrl(req, res) {
    const body = req.body;
    if (!body.url) {
        return res.status(404).json({ error: 'url is required' });
    }

    const shortID = shortid.generate();

    await Url.create({
        shortId: shortID,
        redirectUrl: body.url,
        visitHistory: []
    })

    return res.json({ id: shortID });
}

async function handleGetShortUrl(req, res) {
    const shortId = req.params.shortId;

    const entry = await Url.findOneAndUpdate(
        {
            shortId
        },
        {
            $push: {
                visitHistory: {
                    timestamp: Date.now()
                }
            }
        });

    return res.redirect(entry.redirectUrl);
}

async function handleGetAnalytics(req, res) {
    const shortId = req.params.shortId;
    const result = await Url.findOne({shortId});
    return res.json({
        totalClicks: result.visitHistory.length,
        analytics: result.visitHistory
    });
}

module.exports = {
    handleGenerateShortUrl,
    handleGetShortUrl,
    handleGetAnalytics
}