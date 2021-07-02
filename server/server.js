const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);
const socket = require('socket.io');
const io = socket(server, {
  cors: '*',
});

let count = 0;

io.on('connection', (socket) => {
  if (count < 2) {
    count++;
    console.log(`Пользователь ${socket.id} подключился`); 
    socket.emit('your id', socket.id);
    socket.on('send message', (body) => {
      io.emit('message', body);
    });

		socket.on('send count', () => {
      io.emit('count', count);
    });

  } else {
		console.log(`Комната переполнена, пользователь ${socket.id} не смог подключиться.`);
    socket.disconnect();
  }

  socket.on('disconnect', () => {
    count--; 
		io.emit('count', count);
    console.log(`Один из собеседников отключился`);
  });
});

server.listen(8000, () => console.log('Сервер стартанул на порту 8000'));
