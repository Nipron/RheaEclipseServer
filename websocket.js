const ws = require('ws');

const express = require('express')

const CONNECTION_URL = "mongodb+srv://test:test@cluster0.rcivy.azure.mongodb.net/?retryWrites=true&w=majority"

const PORT = process.env.PORT || 5000

const wss = new ws.Server({
    port: PORT,
}, () => console.log(`Server started on 5000 X3X`))

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message)
        switch (message.event) {
            case 'message':
                broadcastMessage(message)
                break;
            case 'connection':
                broadcastMessage(message)
                break;
        }
    })
})

function broadcastMessage(message, id) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message))
    })
}