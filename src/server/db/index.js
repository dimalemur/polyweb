const bluebird = require('bluebird');
import config from '../config';
import mongoose from 'mongoose';


mongoose.Promise = bluebird;
mongoose.connect(config.database ,err => {
    if (err) throw err;

    console.log('Mongo is connected');
})