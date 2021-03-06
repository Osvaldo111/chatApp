var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
    res.sendFile(__dirname + '/socket.html');
});

io.on('connection', function(socket){
    console.log('a user connected');

    // io.emit('this', "Helllllllo");

    socket.on('chat message', function(msg){
        console.log('message: ' + msg.message + " username " + msg.name);

        io.emit('chatting', msg.message);
        // Broadcast sento to everyone except the sender
        // socket.broadcast.emit('this','Doe');
        /*This is to emit to everyone in the room "chat message"*/
        //io.emit('chat', msg.message);
        //socket.to('game').emit('game', "let's play a game");


        /*This is to emit to each indivicual by their username*/
        /*Pass the name in the "msg"*/
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});