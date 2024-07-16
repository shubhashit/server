const { ObjectId } = require('mongodb');

exports.updateItems = async (req, res) => {
    const { email, item, action } = req.body;

    if (!email || !item || !action) {
        return res.status(400).json({
            error: 'Email, item, and action are required fields'
        });
    }

    try {
        const database = req.app.locals.db;
        const users = database.collection('users');
        const todolists = database.collection('todolists');

        const user = await users.findOne({ email: email });

        if (!user) {
            return res.status(404).json({
                error: 'User not found'
            });
        }

        const filter = { user_id: user._id };
        let updateDoc;

        if (action === 'add') {
            updateDoc = { $push: { items: item } };
        } else if (action === 'remove') {
            updateDoc = { $pull: { items: item } };
        } else {
            return res.status(400).json({
                error: 'Invalid action. Use "add" or "remove".'
            });
        }

        const result = await todolists.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
            return res.status(404).json({
                error: 'Todo list not found for the specified user'
            });
        }

        res.status(200).json({
            message: `Item ${action}ed successfully`,
            result: result
        });
    } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json({
            error: 'Error updating items'
        });
    }
};
