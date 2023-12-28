const express = require('express')
const app = express()
const port = 3000

app.get('/api' , (req , res) =>{
    res.json({
        messsage : "this is the api call",
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


// http code structure 
// // Importing the http module
// const http = require('http');

// // Creating a server that listens on port 3000
// const server = http.createServer((req, res) => {
//     // Set the response header
//     res.writeHead(200, { 'Content-Type': 'text/plain' });

//     // Send the response body
//     res.end('Hello, World!\n');
// });

// // Start the server on port 3000
// const port = process.env.PORT || 3000;
// server.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}/`);
// });
