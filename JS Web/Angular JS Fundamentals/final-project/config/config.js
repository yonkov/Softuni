module.exports = {
  development: {
    port: process.env.PORT || 5000,
    dbPath: 'mongodb://localhost:27017/angular-project-db'
    //dbPath: 'mongodb+srv://Admin:<Admin>@cluster1-cgfto.mongodb.net/test?retryWrites=true'
  },
  production: {
    port: process.env.PORT || 5000,
    dbPath: 'mongodb+srv://Admin:<Admin>@cluster1-cgfto.mongodb.net/test?retryWrites=true'
  }
};