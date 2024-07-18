const { ObjectId } = require('mongodb');

exports.getItems = async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({
            error: 'Email, item, and action are required fields'
        });
    }

    try {
        const database = req.app.locals.db;
        const todolists = database.collection('todolists');

        const list = await todolists.findOne({ email: email });

        console.log(list.items);

        const todolist = list.items;
        res.status(200).json({
            message: `api is successful`,
            todolist: todolist
        });

    } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json({
            error: 'Error updating items'
        });
    }
};
