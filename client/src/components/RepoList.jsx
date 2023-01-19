import React from 'react';
import Repo from './Repo.jsx';

const RepoList = ({ repos }) => (
  <div>
    <h4> Repo List Component </h4>
    There are {repos.length} repos.
    {repos.map((repo, index)=>
    <Repo repo = {repo} key = {index}/>)
    }
  </div>
)

export default RepoList;