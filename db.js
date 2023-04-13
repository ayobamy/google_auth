const mongoose = require('mongoose');

const dbConnect = async () => {
    mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    const db = mongoose.connection;
    db.on('error', () => {
        console.log('Could not connect to database');
    });
    db.once('open', () => {
        console.log('Connected to database');
    });
}

module.exports = dbConnect;
