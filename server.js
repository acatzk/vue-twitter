const express = require('express')
// const { Server } = require('ws')

const app = express()

app.use(express.static(__dirname + "/dist/"))
app.get(/.*/, function(req, res) {
    res.sendFile(__dirname + "/dist/index.html")
})



const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server running in port: ${port}`))


// const wss = new Server({ app })

// wss.on('connection', (ws) => {
//     console.log('Client connected');
//     ws.on('close', () => console.log('Client disconnected'));
// });


// setInterval(() => {
//     wss.clients.forEach((client) => {
//       client.send(new Date().toTimeString());
//     });
//   }, 1000);


// var HOST = location.origin.replace(/^http/, 'ws')
// var ws = new WebSocket(HOST);
// var el;

// ws.onmessage = function (event) {
//     el = document.getElementById('app');
//     el.innerHTML = 'Server time: ' + event.data;
// };