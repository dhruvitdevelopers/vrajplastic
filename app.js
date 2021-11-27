const express = require("express");
const path = require("path");
const fs = require("fs");
const app = express();
const port = 8000;
const bodyparser = require("body-parser");
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/reqplastic', { useNewUrlParser: true });

var requirementSchema = new mongoose.Schema({
    name: String,
    comname: String,
    phone: String,
    email: String,
    productname: String,
});

var requirement = mongoose.model('requirement', requirementSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {

    const params = { 'title': 'Vraj plastic' }
    res.status(200).render('home.pug', params);
})
app.get('/requirement', (req, res) => {

    const params = { 'title': 'Vraj plastic' }
    res.status(200).render('requirement.pug', params);
});
app.post('/requirement', (req, res) => {
    var myData = new requirement(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch(() => {
        res.status(400).send("item was not saved to the databse");
    });
});
app.get('/contact', (req, res) => {

    const params = { 'title': 'Vraj plastic' }
    res.status(200).render('contact.pug', params);
});
app.get('/about', (req, res) => {

    const params = { 'title': 'Vraj plastic' }
    res.status(200).render('about.pug', params);
});


app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});
