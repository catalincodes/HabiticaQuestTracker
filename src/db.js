const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});

mongoose.Promise = Promise;

const dbCredentials = {
  'userName': process.env['MONGO_USER'],
  'userPassword': process.env['MONGO_PASS'],
  'clusterName': process.env['MONGO_CLUSTER'],
  'dbName': process.env['MONGO_DB_NAME'],
};

const dbUrl = `mongodb+srv://${dbCredentials['userName']}:${dbCredentials['userPassword']}@${dbCredentials['clusterName']}.jzutb.mongodb.net/${dbCredentials['dbName']}?retryWrites=true&w=majority`;

const Message = mongoose.model('Message', {
  name: String,
  message: String,
});

/**
 * Connects to the Mongo database using the credentials from ENV
 */
function connect() {
  mongoose.connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true}, (err) => {
    if (err) {
      console.error(err.message);
      throw err;
    } else {
      console.log('mongo db connection - SUCCESSFUL');
    }
  });
}

/**
 * Retrieves all messages from server.
 * @param {*} callback Function to call when results are retrieved
 */
function getAllMessages(callback) {
  Message.find((err, messages) => {
    if (err) throw err;
    callback(messages);
  });
}

/**
 * Retrieves messages from server belonging to a particular user.
 * @param {*} user The name of the user to be retrieved
 * @param {*} callback Function to call when results are retrieved
 */
function getAllMessagesFromUser(user, callback) {
  Message.find({name: user}, (err, messages) => {
    if (err) throw err;
    callback(messages);
  });
}

/**
 * Adds new message record to database
 * @param {*} content Message content to be saved.
 */
function addNewMessage(content) {
  const message = new Message(content);
  message.save();
}

module.exports = {
  connect,
  getAllMessages,
  getAllMessagesFromUser,
  addNewMessage,
};
