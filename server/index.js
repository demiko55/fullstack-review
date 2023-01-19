const express = require('express');
let app = express();

const github = require('../helpers/github.js');
const db = require('../database');


// TODO - your code here!
// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));//why we don't need ../client here??
//app.use(express.static(_dirname+'/../client/dist'));
app.use(express.json());

app.post('/repos', function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  //console.log('requset body', req.body);
  var resData = [];
  github.getReposByUsername(req.body, (err, results) => {
    if (err) {
      res.status(404);
      return;
    }
    //what if results if an empty array?
    console.log('results', Array.isArray(results));
    results.forEach((result) => {
      let data = {
        repoid: result.id,
        username: result.owner.login,
        reponame: result.name,
        stars: result.stargazers_count,
        url: result.html_url,
        description: result.description,
      };
      //console.log('organainzed repo', repo);
      db.save(data, (err,repo) => {
        if (err) {
          console.log('store data to db error');
        }else{
          //console.log('repo send from save db', repo);
          resData.push(repo);
          if(resData.length === results.length){
            //console.log(resData);
            res.json(resData);
          }
        }
      });
    });
  })
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.find((err, results) => {
    if (err) {
      console.log('get data from db err');
      return;
    }
    //console.log('server get db find results', results);
    res.json(results);
  });
});

app.get('/userrepos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  console.log('get userrepos req body', req.query);
  db.findUser(req.query, (err, results) => {
    if (err) {
      console.log('get data from db err');
      return;
    }
    //console.log('server get db find results', results);
    res.json(results);
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});

