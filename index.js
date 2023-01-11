const express = require('express');
const app = express();
const { Joke } = require('./db');
const { Op } = require("sequelize");

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/jokes', async (req, res, next) => {
  var tags = req.query.tags;
  var content = req.query.content;
  try {
    // TODO - filter the jokes by tags and content
    // console.log(tags.split(","))

    if (tags) {
      tags = tags.split(",")
      tags.map((_,i)=>tags[i]="%"+tags[i]+"%")
      return res.send(await Joke.findAll({where: {tags: {[Op.like]: tags}}}))
    }

    if (content) {
      content="%"+content+"%"
      return res.send(await Joke.findAll({where: {joke: {[Op.like]: content}}}))
    }

    res.send(await Joke.findAll());
  } catch (error) {
    console.error(error);
    next(error)
  }
});

// we export the app, not listening in here, so that we can run tests
module.exports = app;
