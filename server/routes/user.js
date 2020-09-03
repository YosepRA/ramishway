const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('User root');
});

module.exports = router;
