const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

app.set('port', 3500);
app.use(cors());
app.use(morgan('dev'));

app.get('/api', async (req, res) => {
  res.send('Root route');
});

app.listen(app.get('port'), () =>
  console.log('Server is running on port ' + app.get('port'))
);
