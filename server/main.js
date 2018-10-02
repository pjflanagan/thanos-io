'use strict';

// https://github.com/riebel/socketio-es6-starter

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';
import { ServerSocket } from './socket.js'
// import compression from 'compression';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

// app.use(compression({}));
app.use('/client', express.static(path.resolve(__dirname + '/../client')));
app.use('/shared', express.static(path.resolve(__dirname + '/../shared')));

new ServerSocket(io);

server.listen(port, () => {
	console.log('[INFO] Listening on *:' + port);
});