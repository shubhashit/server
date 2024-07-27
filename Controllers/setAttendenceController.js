const { ObjectId } = require('mongodb');

exports.setAttendence = async (req, res) => {
    const { email, date , period , marked } = req.body;

    if (!email) {
        return res.status(400).json({
            error: 'Email, item, and action are required fields'
        });
    }

    try {
        console.log("here")
        const database = req.app.locals.db;
        const attendence = database.collection('attendence');
        const query = { email, date };
        const result = await attendence.find(query).toArray();
        console.log(result)
        // const list = await attendence.findOne({ email: email });

        // console.log(list.class);

        if (result.length == 0) {
            const attende = { email , date , classes : { [period]  : marked}};
            const classes = await attendence.insertOne(attende);

            res.status(200).json({
                message: `api is successful`,
                classes
            });
        }
        else{
            const updateQuery = { email, date };
            const updateData = { $set: { [`classes.${period}`]: marked} };
            const updateResult = await attendence.updateOne(updateQuery, updateData);

            res.status(200).json({
                message: `api is successful`,
                updateResult
            });
        }



        

    } catch (error) {
        console.error('Error updating items:', error);
        res.status(500).json({
            error
        });
    }
};
