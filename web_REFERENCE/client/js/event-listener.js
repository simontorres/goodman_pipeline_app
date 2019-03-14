var socket = io.connect('http://ctioy9.ctio.noao.edu:3000');

socket.on('messages', function(data) {
    console.log(data)
    // socket.emit('join', 'Hello world from client');
});

socket.on('messages', function(data) {
    alert(data);
});