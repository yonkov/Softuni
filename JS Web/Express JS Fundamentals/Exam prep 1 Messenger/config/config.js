const path = require('path');

module.exports = {
    development: {
        rootFolder: path.normalize(path.join(__dirname, '/../')),
        connectionString: 'mongodb://localhost:27017/exam-prep1-db'
    },
    production: {}
};