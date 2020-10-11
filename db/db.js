const mongoose = require('mongoose');
require('dotenv').config();

async function connect() {
    await mongoose.connect(
        process.env.MONGO_URI, 
        {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }
    );
}

async function disconnect() {
    await mongoose.disconnect();
}

module.exports = {
    connect,
    disconnect
};