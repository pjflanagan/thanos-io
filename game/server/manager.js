var express = require('express')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var state = require('./state.js');

io.on('connection', function (socket) {
	const clientID = socket.client.id;
	io.to(`${clientID}`).emit('welcome', clientID);
	state.addUser(clientID);
	console.log('Add User:', clientID);

	socket.on('key', function (data) {
		io.emit('key', data);
	});

	socket.on('disconnect', function () {
		console.log('Remove User:', clientID);
	});
});


module.exports = { express, app, http }