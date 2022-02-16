const express = require('express');

const router = express.Router({ mergeParams: true });

router.post('/', require('./create'));
router.get('/', require('./getAll'));

module.exports = router;