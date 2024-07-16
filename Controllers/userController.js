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

        const newUser = { name, email };
        const result = await users.insertOne(newUser);
        const id = result.insertedId;
        const newlist = { "user_id": id, email, "items": [] };
        const list = await todolists.insertOne(newlist);
        res.status(201).json({
            message: 'User created successfully',
            user: newUser,
            list,
            result: result
        });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({
            error: 'Error creating user'
        });
    }
};
