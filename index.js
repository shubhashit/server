const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();

app.get('/' , (req , res)=>{
    res.send('hellow world')
})

app.get('/api' , (req , res)=>{
    res.json({
        messege : 'this is a test api route',
        status : "400"
    })
})
app.listen(3000,'0.0.0.0' , ()=>{
    console.log('listen on port')
})