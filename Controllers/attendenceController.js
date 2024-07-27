const { ObjectId } = require('mongodb');

exports.getCurrentattendence = async (req, res) => {
    const { email , date } = req.body;

    if (!email || !date) {
        return res.status(400).json({
            error: 'Email and date are required fields'
        });
    }

    try {
        const database = req.app.locals.db;
        const attendence = database.collection('attendence');
        const query = { email, date };
        const result = await attendence.find(query).toArray();
        console.log(result)

        

        res.status(200).json({
            message: `api is successful`,
            classes : result[0].classes
        });

    } catch (error) {
        console.error('Error :', error);
        res.status(500).json({
            error
        });
    }
};
