'use strict';

// https://github.com/riebel/socketio-es6-starter

import express from 'express';
import http from 'http';
import SocketIO from 'socket.io';
import path from 'path';
import { ServerSocket } from './socket.js'
// import compression from 'compression';
// import {validNick, findIndex, sanitizeString} from '../shared/util';

let app = express();
let server = http.Server(app);
let io = new SocketIO(server);
let port = process.env.PORT || 3000;
// let users = [];
// let sockets = {};

app.get('/', function (req, res) {
	res.sendFile(path.resolve(__dirname + '/../client/index.html'));
});

// app.use(compression({}));
app.use('/client', express.static(path.resolve(__dirname + '/../client')));
app.use('/game', express.static(path.resolve(__dirname + '/../game')));

new ServerSocket(io);

server.listen(port, () => {
	console.log('[INFO] Listening on *:' + port);
});