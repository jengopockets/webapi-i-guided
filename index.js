// import express from 'express'
const express = require('express');

const Hubs = require('./data/hubs-model.js');
//Hubs has find(), findById(),add(), remove(), update() methods

const server = express();

server.use(express.json())

server.get('/', (req, res) => {
    res.send('hello world')
});

// seee a list of Hubs(like a slack channel)/hubs

server.get('/hubs', (req, res) => {
    Hubs.find()
    .then(hubs => {
        //.json will convert the data passed to JSON
        // also tells the client we're sending JSON through and HTTP header
        res.status(201).json(hub);
    })
    .catch(error => {
        res.status(500).json({ message: 'error with list'});
    });
});

//Create a Hub
server.post('/hubs', (req, res) => {
    //axios.post('/hubs, hubData). then(), .catch()
    //http message => {headers:{}, body:{}}
    const hubInformation = req.body;
    Hubs.add(hubInformation)
    .then(hub => {
        res.status(201).json(hub);
    })
    .catch(error => {
        res.status(500).json({message: 'error'})
    });
});

//Dellete a hub

server.delete('/hubs/:id', (req, res) => {
    const hubId = req.params.id;
    Hubs.remove(hubId)
    .then(hub => {
        res.status(200). json({ message: 'DELETED'});
    })
    .catch(error => {
        res.status(500).json({ message: "Error"})
    });
});

//Update
server.put('/hubs/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    Hubs.update(id, changes)
      .then(updated => {
        if (updated) {
          res.status(200).json(updated);
        } else {
          res.status(404).json({ message: 'hub not found' });
        }
      })
      .catch(error => {
        res.status(500).json({ message: 'error updating hub' });
      });
  });


const port = 8000;
server.listen(port, () => console.log('api running'));