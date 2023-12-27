const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = http.createServer((req , res)=>{
    if (req.url === '/api' && req.method === 'GET') {
        res.end(
            JSON.stringify({
                messege : "this is api"
            })
        )
    }  else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(
            JSON.stringify({
                message: 'Route Not Found: Please use the api/products endpoint',
            })
        );
    }


});


app.listen(3000  , ()=>{
    console.log('listen on port')
})  