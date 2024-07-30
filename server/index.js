const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

const app = express();
const server = http.Server(app);
const io = socketIo(server);

const client = jwksClient({
  jwksUri: 'https://dev-tifz3h2gk6u0ou88.us.auth0.com/.well-known/jwks.json'
});

const players = [];

const verifyPlayer = (token, cb) => {
  if (!token) {
    console.error('Token not provided');
    return cb(new Error('Token not provided'));
  }

  const uncheckedToken = jwt.decode(token, { complete: true });
  if (!uncheckedToken) {
    console.error('Invalid token, cannot decode');
    return cb(new Error('Invalid token'));
  }

  const { kid } = uncheckedToken.header;
  if (!kid) {
    console.error('Invalid token, no kid in header');
    return cb(new Error('Invalid token'));
  }

  client.getSigningKey(kid, (err, key) => {
    if (err) {
      console.error('Error getting signing key:', err);
      return cb(err);
    }

    const signingKey = key.publicKey || key.rsaPublicKey;
    jwt.verify(token, signingKey, cb);
  });
};

const newMaxScoreHandler = (payload) => {
  let foundPlayer = false;
  players.forEach((player) => {
    if (player.id === payload.id) {
      foundPlayer = true;
      player.maxScore = Math.max(player.maxScore, payload.maxScore);
    }
  });

  if (!foundPlayer) {
    players.push(payload);
  }

  io.emit('players', players);
};

io.on('connection', (socket) => {
  const { token } = socket.handshake.query;

  console.log('Received token:', token);

  verifyPlayer(token, (err) => {
    if (err) {
      console.error('Token verification failed:', err);
      socket.disconnect();
      return;
    }
    io.emit('players', players);
  });

  socket.on('new-max-score', newMaxScoreHandler);
});

server.listen(3001, () => {
  console.log('listening on port 3001');
});
