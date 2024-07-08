const express = require('express')
const app = express()
const port = 8000


app.use(express.json());

app.get('/api' , (req , res) =>{
    res.json({
        messsage : "this is the api call",
    })
})

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/api/user', (req, res) => {
    console.log(req.body)
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({
            error: 'Name and email are required fields'
        });
    }

    res.status(201).json({
        message: 'User created successfully',
        user: {
            name,
            email
        }
    });
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
