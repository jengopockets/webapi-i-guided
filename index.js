// import express from 'express'
const express = require('express');

server.get('/', (req, res) => {
    res.send('hello world')
});

const server = express();
const port = 8000;
server.listen(port, () => console.log('api running'));