const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const request = require("request");
const cheerio = require("cheerio");

//require models
const db = require("./models");
//set port
const PORT = 8080;

//initialize express;
const app = express();

//log requests using morgan
app.use(logger("dev"));

//use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
//serve public folder as a static directory
app.use(express.static("public"));

//connect to mongodb


mongoose.connect("mongodb://localhost/news-scraper");

//routes

app.get("/scrape", function(req, res) {

    request("https://www.theonion.com/c/news-in-brief", function (error, response, html) {

        var $ = cheerio.load(html);

        $("article").each(function (i, element) {
            var result = {};

            result.title = $(this).find("h1.entry-title").find("a").text();
            result.link = $(this).find("a").attr("href");
            result.snippet = $(this).find("div.entry-summary").find("p").text();
            result.saved = false;

            db.Article.create(result)
                .then(function(dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function(err) {
                    return res.json(err);
                });
        });
        res.send("scraped");
    });
});

app.get("/articles", function (req, res) {

  db.Article.find({
    saved: false,
  })
    .then(function(dbArticle) {
      res.json(dbArticle);
    })
    .catch(function(err) {
      res.json(err);
    });
});

app.get("/articles/save/:id", function (req, res) {

  db.Article.findByIdAndUpdate(req.params.id, {$set: {saved: true}}, {new: true}, function (err, savedArticle) {
      if (err) throw (err);
      res.json(savedArticle);
    });
});

app.get("/articles/saved", function (req, res) {

  db.Article.find({
    saved: true,
  })
    .then( function (dbArticle) {
      res.json(dbArticle);
    })
    .catch( function (err) {
      res.json(err);
    });
});

app.get("/articles/remove/:id", function (req, res) {
    db.Article.deleteOne({
      _id: req.params.id
    })
      .then( function(dbArticle) {
        window.redirect("/article/saved");
      })
      .catch( function (err) {
        res.json(err);
      });
});

app.listen(PORT, function() {
    console.log("App running: " + PORT);
});