//global settings
var express = require("express"),
	app = express(),
	server = require("http").createServer(app),
	io = require("socket.io").listen(server);

server.listen(80);

//static server
app.use(express.static(__dirname));

//routes
app.get("/", function(req, res){
	res.sendfile(__dirname + "/index.html");
});

//socket server
io.sockets.on("connection", function(socket){
	socket.on("client message", function(data){
		io.sockets.emit("server message", data);
	});
});