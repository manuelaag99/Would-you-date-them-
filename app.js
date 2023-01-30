require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");


const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.set("strictQuery", false);
mongoose.connect("mongodb+srv://admin-manuelaag99:" + process.env.CLUSTERKEY + "@cluster0.flg1i8i.mongodb.net/wydtDB", {useNewUrlParser: true});

const entrySchema = new mongoose.Schema({
    item: {
        type: String,
        required: true
    },
    category: {
        type: Number,
        min: 1,
        max: 3,
        required: true
    },
    submitter: {
        type: String,
        required: false
    }
});

const Entry = new mongoose.model("Entry", entrySchema) 

app.get("/", function(req, res) {
    res.render("home")
});

app.get("/playGame", function(req, res) {
    res.render("gameScreen")
});

app.get("/contributeToGame", function(req, res) {
    res.render("contribute")
});

app.get("/instructions", function(req, res) {
    res.render("instructions")
});

app.post("/playGame", function(req, res) {
    res.render("gameScreen")
})

app.post("/playGameOn", function(req, res) {
    res.render("gameScreen") // check this
})

app.post("/contributeToGame", function(req, res) {
    const entryAdd = new Entry({
        item: req.body.entry,
        category: req.body.category,
        submitter: req.body.submitter
    });
    entryAdd.save(function(err, docs) {
        if (err) {
            console.log(err)
        } else {
            console.log(docs)
        }
    });
    res.redirect("/contributeToGame");
})

app.listen(3000, function(req, res) {
    console.log("This server is running on port 3000.")
});