const mongoose = require('mongoose');

function connectMongoDB(url) {
    mongoose.connect(url)
        .then(() => console.log('MongoDB Connected!'))
        .catch(() => console.log('Error, MongoDB not connected!'));
}

module.exports = connectMongoDB;