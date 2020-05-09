import mongoose from 'mongoose';
import config from '../config';

const bluebird = require('bluebird');

mongoose.Promise = bluebird;
mongoose.connect(config.database, (err) => {
  if (err) throw err;

  console.log('Mongo is connected');
});
