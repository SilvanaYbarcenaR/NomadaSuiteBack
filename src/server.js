const express = require('express');
const server = express()

server.use(express.json())

server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Origin', 'GET, HEAD, PUT, PATCH, POST, DELETE');
    res.header('Access-Control-Allow-Origin', 'Content-Type');
    next();
})

module.exports = server;