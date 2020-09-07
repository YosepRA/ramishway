const express = require('express');
const router = express.Router();
const Delivery = require('../models/Delivery');

const { insensitiveRegex, getFiltersFromQuery } = require('../helpers');

router.get('/', async (req, res) => {
  try {
    /* 
      - searchMode: _id, shipNumber, owner
      - searchKey: 'foobar'
      - filters: { fieldName: 'foo,bar' }
      - sortKey: '-registerDate'
      - pageSize: '10'
      - currentPage: '3'
    */
    const { searchMode, searchKey, sortKey, pageSize, currentPage } = req.query;

    // Start building up queries.
    let query = {};

    // Search query mode and value.
    if (searchKey) {
      query[searchMode] =
        searchMode === '_id' ? searchKey : insensitiveRegex(searchKey);
    }

    // Parse filters.
    let filterFields = getFiltersFromQuery(req.query, ['fishType']);

    query = { ...query, ...filterFields };

    let paginationOptions = {
      page: Number(currentPage),
      limit: Number(pageSize),
      sort: sortKey,
    };

    let deliveries = await Delivery.paginate(query, paginationOptions);

    res.send(deliveries);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

module.exports = router;
