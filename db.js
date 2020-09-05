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

var Message = mongoose.model('Message', {
    name: String,
    message: String
});

/**
 * Connects to the Mongo database using the credentials from ENV
 */
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

/**
 * Retrieves all messages from server.
 * @param: callback function to call when results are retrieved
 */
function getAllMessages(callback) {
    Message.find((err, messages) => {
        if (err) throw err
        callback(messages);
    });
}

function getAllMessagesFromUser(user, callback) {
    Message.find({name: user}, (err, messages) => {
        if (err) throw err
        callback(messages);
    });
}

function getMessageModel() {
    return Message;
}

module.exports = { 
    connect,
    getAllMessages,
    getAllMessagesFromUser,
    getMessageModel
};