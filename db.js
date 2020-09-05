var mongoose = require('mongoose');
const env = require('dotenv').config({path: __dirname + '/.env'})

mongoose.Promise = Promise;

const dbCredentials = {
    "userName" : process.env['MONGO_USER'],
    "userPassword" : process.env['MONGO_PASS'],
    "clusterName" : process.env['MONGO_CLUSTER'],
    "dbName" : process.env['MONGO_DB_NAME']
}

var dbUrl = `mongodb+srv://${dbCredentials["userName"]}:${dbCredentials["userPassword"]}@${dbCredentials["clusterName"]}.jzutb.mongodb.net/${dbCredentials["dbName"]}?retryWrites=true&w=majority`;

function connect() {
    mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true} ,(err) => {
        if (err) {
            console.error(err.message);
            throw err;
        }
        else {
            console.log('mongo db connection - SUCCESSFUL');
        }
    })
}

module.exports = { connect };