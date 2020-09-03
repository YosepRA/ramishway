const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');

const app = express();

// Routes.
const deliveryRoutes = require('./routes/delivery');
const userRoutes = require('./routes/user');

const seeder = require('./seeder');

// Database setup.
mongoose.connect('mongodb://localhost:27017/ramishway', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const dbConnection = mongoose.connection;
dbConnection.on('open', () =>
  console.log('Successfully connected to the Database...')
);
dbConnection.on('error', err =>
  console.error('Database connection error.', err)
);

app.set('port', 3500);
app.use(cors());
app.use(morgan('dev'));
app.use('/api/delivery', deliveryRoutes);
app.use('/api/user', userRoutes);

// seeder();

app.listen(app.get('port'), () =>
  console.log(`Server is running on port ${app.get('port')}...`)
);
