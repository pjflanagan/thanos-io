var { express, app, http } = require('./server/server.js');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/index.html');
});

app.use('/game', express.static(__dirname + '/game/'))
app.use('/client', express.static(__dirname + '/client/'))


http.listen(3000, function () {
	console.log('listening on *:3000');
});