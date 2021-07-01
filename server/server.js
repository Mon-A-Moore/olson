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
    console.log('Пользователь подключился'); // world
    socket.emit('your id', socket.id);
    socket.on('send message', (body) => {
      io.emit('message', body);
    });
  } else {
    socket.disconnect();
  }

  socket.on('disconnect', (socket) => {
    count--; // убираем юзера с нужным из массива подключенных юзеров при отключении
    console.log('Пользователь отключился');
  });
});

server.listen(8000, () => console.log('Сервер стартанул на порту 8000'));
