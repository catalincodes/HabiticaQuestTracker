var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongoose = require('mongoose');
const db = require('./db');

app.use(express.static(__dirname));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

mongoose.Promise = Promise;

app.get('/messages', (req, res) =>{
    db.getAllMessages( (messages) => res.json(messages));
})

app.get('/messages/:user', (req, res) =>{
    var user = req.params.user;

    db.getAllMessagesFromUser(user, (messages) => res.json(messages))
})

app.post('/messages', async (req, res) => {
    try {
        db.addNewMessage(req.body);    
        io.emit('message', req.body);
        res.sendStatus(200);
    } catch (error) {
        res.sendStatus(500);
        return console.error(error);
    } finally {
        console.log('message posted called')
    }
})

io.on('connection', (socket) => {
    console.log(' a user connected')
})

db.connect();

var server = http.listen(process.env.PORT || 3000, () => {
    console.log('server is listening on port', server.address().port)
})