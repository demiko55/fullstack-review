import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
import axios from 'axios';

const App = () => {

  const [repos, setRepos] = useState([]);

  const getAllRepos = ()=>{
    // $.ajax({
    //   url: 'http://localhost:1128/repos',
    //   type: 'get',
    //   dataType:'application/json',
    //   success: function(data){
    //     console.log('ajax get data', data);
    //     setRepos(data);
    //   }
    // })
    let url = 'http://localhost:1128/repos';
    axios.get(url)
    .then(res=>{
      //console.log(res);
      setRepos(res.data);
    })
    .catch(err=>{
      console.log('get data from server: '+err.message);
    });
  }
  useEffect(()=>{
    getAllRepos()
  },[]);

  const search = (term) => {
    let usernameObj = {'username': term};
    $.ajax({
      url: 'http://localhost:1128/repos',
      type: 'post',
      data: JSON.stringify(usernameObj),
      contentType: 'application/json',
      success: function(data){
        console.log('ajax get response data after post', data);
        setRepos(data);
      }
    })
    console.log(`${term} was searched`);
  }

  const update = (term)=>{
    console.log('update term', term);
    let url = 'http://localhost:1128/userrepos';
    axios.get(url, {params: {username: term}})
    .then(res=>{
      //console.log(res);
      setRepos(res.data);
    })
    .catch(err=>{
      console.log('get data from server: '+err.message);
    });
  }


  return (
    <div>
      <h1>Github Fetcher</h1>
      <RepoList repos={repos}/>
      <Search onSearch={search} update = {update}/>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('app'));