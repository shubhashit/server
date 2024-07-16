const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const todoRoutes = require('./Routes/todoRoutes')
const app = express()
const port = 8000

const { MongoClient, ServerApiVersion , ObjectId} = require('mongodb');
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
        const database = client.db('Student-Database');
        app.locals.db = database
        console.log("locals updated")
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

app.use('/user' , userRoutes);
app.use('/todo', todoRoutes);

// app.post('/createuser', async (req, res) => {
//     console.log(req.body)
//     const { name, email } = req.body;

//     if (!name || !email) {
//         return res.status(400).json({
//             error: 'Name and email are required fields'
//         });
//     }
//     try {
//         const database = client.db('Student-Database'); // Replace with your database name
//         const users = database.collection('users'); // Replace with your collection name
//         const todolists = database.collection('todolists');

        
//         const newUser = { name, email };
//         const result = await users.insertOne(newUser);
//         const id = result.insertedId;
//         const newlist = {"user_id" : id , email , "items" : []};
//         const list = await todolists.insertOne(newlist);
//         console.log(result)
//         res.status(201).json({
//             message: 'User created successfully',
//             user: newUser,
//             list,
//             result: result
//         });
//     } catch (error) {
//         console.error('Error creating user:', error);
//         res.status(500).json({
//             error: 'Error creating user'
//         });
//     }
// });

// app.post('/updateItems', async (req, res) => {
//     const { email, item, action } = req.body;

//     if (!email || !item || !action) {
//         return res.status(400).json({
//             error: 'Email, item, and action are required fields'
//         });
//     }

//     try {
//         const database = client.db('Student-Database'); // Replace with your database name
//         const users = database.collection('users');
//         const todolists = database.collection('todolists');

//         // Find the user by email
//         const user = await users.findOne({ email: email });

//         if (!user) {
//             return res.status(404).json({
//                 error: 'User not found'
//             });
//         }

//         const userId = user._id;

//         // Set up the filter and update document based on the action
//         const filter = await todolists.findOne({ email: email }); // Ensure user_id is correctly formatted
//         let updateDoc;

//         if (action === 'add') {
//             updateDoc = {
//                 $push: { items: item }
//             };
//         } else if (action === 'remove') {
//             updateDoc = {
//                 $pull: { items: item }
//             };
//         } else {
//             return res.status(400).json({
//                 error: 'Invalid action. Use "add" or "remove".'
//             });
//         }

//         // Update the items array in the todolists collection
//         const result = await todolists.updateOne(filter, updateDoc);

//         if (result.matchedCount === 0) {
//             return res.status(404).json({
//                 error: 'Todo list not found for the specified user'
//             });
//         }

//         res.status(200).json({
//             message: `Item ${action}ed successfully`,
//             result: result
//         });
//     } catch (error) {
//         console.error('Error updating items:', error);
//         res.status(500).json({
//             error: 'Error updating items'
//         });
//     }
// });


app.listen(port, async () => {
    try {
        await client.connect();
        console.log(`Example app listening on port ${port}`);
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
        process.exit(1); // Exit the process with a failure code
    }
});
