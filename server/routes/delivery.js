const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
  res.send('Delivery root');
});

module.exports = router;
