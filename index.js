const express = require('express'),
    app = express(),
    bodyParser = require('body-parser')
require('express-async-errors')
const db = require('./db'),
    employeeRoutes = require('./controller/employeeController')

app.use(bodyParser.json())
app.use('/api/employees', employeeRoutes)
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status || 500).send('something went wrong')
})

db.query('SELECT 1')
    .then(data => {
        console.log('success!', data)
        app.listen(3000, () => console.log('server started at 3000'))
    })
    .catch(e => console.log('error', e))
