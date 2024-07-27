const { ObjectId } = require('mongodb');

exports.createUser = async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required fields'
        });
    }
    try {
        const database = req.app.locals.db;
        const users = database.collection('users');
        const todolists = database.collection('todolists');
        const attendence = database.collection('attendence');

        const newUser = { name, email };
        const result = await users.insertOne(newUser);
        const id = result.insertedId;
        const newlist = { "user_id": id, email, "items": [] };
        // const attende = {"user_id" : id , email};
        // const classes = await attendence.insertOne(attende);
        const list = await todolists.insertOne(newlist);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            list,
            // classes,
            result: result
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Error creating user'
        });
    }
};
