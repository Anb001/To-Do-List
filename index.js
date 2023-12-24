const express = require('express');
const port = 8000;
const path = require('path');
const http = require('http');

const list = require('./config/mongo');

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('assets'));
app.use(express.urlencoded());
app.use(express.json());

app.get('/', function (req, res) {
    list.find({})
        .then((lists) => {
            res.render('home', { tasks: lists })
        })
        .catch((err) => {
            console.log("error encountered", err);
        })
});

app.post('/add-task', function (req, res) {
    list.create({
        task: req.body.task
    })
        .then((newlist) => {
            console.log(newlist);
            return res.redirect('back');
        })
        .catch((err) => {
            console.log("error encountered", err);
        })
});
app.get('/delete-task/', function (req, res) {
    let id = req.query.id;


    list.findByIdAndDelete(id)
        .then(() => {
            return res.redirect('back');
        })
        .catch((err) => {
            console.log("error encountered", err);

        })

});
app.listen(port, function (err) {
    if (err) {
        console.log("We have encountered an error", err);
        return;
    }
    else {
        console.log("Successfully Running on Port : ", port);
    }
});