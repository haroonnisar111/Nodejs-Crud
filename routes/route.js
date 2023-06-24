const express = require('express');
const router = express.Router();
const path = require('path');

router.get('/new-page', (req, res) => {
  res.redirect(301, '/');
});
router.get('/*', (req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'views', 'test123.html'));
});
module.exports = router;
