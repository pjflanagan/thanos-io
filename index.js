var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/gameplay/index.html');
});

app.use(express.static(__dirname + '/gameplay/'))

// TODO: move this into the manager
io.on('connection', function (socket) {
	console.log('a user connected');

	socket.on('key', function (data) {
		io.emit('key', data);
	});

	socket.on('disconnect', function () {
		console.log('user disconnected');
	});
});

http.listen(3000, function () {
	console.log('listening on *:3000');
});