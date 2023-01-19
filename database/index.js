const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

//const Promise = require('promise');

let repoSchema = mongoose.Schema({
  // TODO: your schema here!
  repoid: {type: Number, unique: true},
  username: String,
  reponame: String,
  stars: Number,
  url: String,
  description: String,
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (/* TODO */data, callback) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  //console.log('db save data', data);
  let repo = new Repo(data);
  repo.save((err, repo)=>{
    if(err){
      callback(err);
      return;
    }
    callback(null, repo);
  })
}
// let save1 = (repos)=>{
//   return Promise.all(repos.map(repo=>{
//     return new Repo(repo).save();
//   }))
//   //return Repo.create(repos);
// }

let find = (callback)=>{
  Repo.find({}, (err, data)=>{
    if(err){
      callback(err);
      return;
    }
    //console.log('db find data', data.length);
    callback(null, data);
  }).limit(25).sort('-stars');
}

let findUser = (term, callback)=>{
  Repo.find(term, (err, data)=>{
    if(err){
      callback(err);
      return;
    }
    callback(null, data);
  }).sort('-stars').limit(25);
}

module.exports.save = save;
module.exports.find = find;
module.exports.findUser = findUser;