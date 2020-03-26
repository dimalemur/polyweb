
import mongoose from 'mongoose';

const dbConnectUrl = '';

mongoose
    .connect(dbConnectUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .catch();

export const db = mongoose.connection;