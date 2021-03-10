const { Router } = require('express');
const router = Router();

const data = require('../json/data-creator.json');

// routes
router.get('/creator', function (req, res) {
    res.json(data);
});

module.exports = router;