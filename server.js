const express = require('express')
const app = express()
const port = 3000
const expenses = require('./models/budget.js')
app.use('/public', express.static('public'));

app.get("/", (req, res) => {
    res.send("Budgtr")
})

app.get("/budgtr", (req, res) => {
    res.render("index.ejs", {expenses: expenses});
})

app.listen(port, () => {
    console.log('listening on port: ' + port)
})