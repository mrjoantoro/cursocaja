const mongoose = require('mongoose');
const config = require("../config");

exports.dbConnect = async (url) => {
    return mongoose.createConnection(url, config.db.config);
};
