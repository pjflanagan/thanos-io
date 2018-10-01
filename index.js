var { express, app, http } = require('./manager/manager.js');

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/gameplay/index.html');
});

app.use(express.static(__dirname + '/gameplay/'))

http.listen(3000, function () {
	console.log('listening on *:3000');
});