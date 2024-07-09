const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 8000

const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Shubh:Shubh2003@database-1-1.sq87qo0.mongodb.net/?retryWrites=true&w=majority&appName=Database-1-1";

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
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
}
run().catch(console.dir);


app.use(express.json());

app.get('/api' , (req , res) =>{
    res.json({
        messsage : "this is the api call",
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/user', async (req, res) => {
    console.log(req.body)
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required fields'
        });
    }

    // res.status(201).json({
    //     message: 'User created successfully',
    //     user: {
    //         name,
    //         email
    //     }
    // });

    try {
        const database = client.db('Student-Database'); // Replace with your database name
        const users = database.collection('users'); // Replace with your collection name

        const newUser = { name, email };
        const result = await users.insertOne(newUser);
        console.log(result)
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            result: result
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Error creating user'
        });
    }
});

app.listen(port, async () => {
    try {
        await client.connect();
        console.log(`Example app listening on port ${port}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with a failure code
    }
});
