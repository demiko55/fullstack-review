const axios = require('axios');
const config = require('../config.js');

let getReposByUsername = (/* TODO */user, callback) => {
  // TODO - Use the axios module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  let options = {
    //https://api.github.com/users/USERNAME/repos
    url: 'http://api.github.com/users/'+user.username+'/repos',
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };
  axios.get(options.url, options.headers)
  .then((results)=>{
    //console.log('data type from github', typeof(results.data));
    //console.log('data keys', Object.keys(results));
    //console.log('data from github', results.data);
    callback(null, results.data);
  })
  .catch((err)=>{
    callback(err);
    //console.log('request github err '+ err.message);
  })
}

module.exports.getReposByUsername = getReposByUsername;