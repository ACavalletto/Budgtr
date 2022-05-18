const express = require('express')
const app = express()
const port = 3000
const expenses = require('./models/budget.js')

let balance = accountBalance(expenses);


app.use('/public', express.static('public'));
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
    res.send("Budgtr")
})

app.get("/budgtr", (req, res) => {
    res.render("index.ejs", {expenses: expenses, balance: balance});
})

app.get("/budgtr/new", (req, res) => {
    res.render("new.ejs")
})

app.post("/budgtr", (req, res) => {
    expenses.push(req.body)
    balance += req.body.amount;
    res.redirect("/budgtr")
})

app.get("/budgtr/:index", (req, res) => {
    const {date, name, from, amount, tags} = expenses[req.params.index]
    res.render("show.ejs", {date,name, from, amount, tags})
})

function accountBalance(expenses) {
    let total = 0;
    for (let i = 0; i < expenses.length; i++) {
        total += expenses[i].amount
    }
    return total;
}

app.listen(port, () => {
    console.log('listening on port: ' + port)
})