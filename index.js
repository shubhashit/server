const express = require('express')
require('dotenv').config();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./Routes/userRoutes');
const todoRoutes = require('./Routes/todoRoutes')
const app = express()
const port = 8000

const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
const uri = process.env.MONGODB_URI;

// // Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server (optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
        const database = client.db('Student-Database');
        app.locals.db = database
        console.log("locals updated")
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
run().catch(console.dir);

app.use(cors());
app.use(express.json());

app.get('/api' , (req , res) =>{
    res.json({
        messsage : "this is the api call",
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use('/user' , userRoutes);
app.use('/todo', todoRoutes);

app.listen(port, async () => {
    try {
        await client.connect();
        console.log(`Example app listening on port ${port}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with a failure code
    }
});
