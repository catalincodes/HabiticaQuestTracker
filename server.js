const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const mongoose = require('mongoose');
const db = require('./db');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise;

app.get('/messages', (req, res) =>{
  db.getAllMessages( (messages) => res.json(messages));
});

app.get('/messages/:user', (req, res) =>{
  const user = req.params.user;
  db.getAllMessagesFromUser(user, (messages) => res.json(messages));
});

app.post('/messages', async (req, res) => {
  try {
    db.addNewMessage(req.body);
    io.emit('message', req.body);
    res.sendStatus(200);
  } catch (error) {
    res.sendStatus(500);
    return console.error(error);
  } finally {
    console.log('message posted called');
  }
});

io.on('connection', (socket) => {
  console.log(' a user connected');
});

db.connect();

const server = http.listen(process.env.PORT || 3000, () => {
  console.log('server is listening on port', server.address().port);
});
