import React from 'react';

const Repo = ({repo})=>{

  return (
    <div>
      <a href = {repo.url}>{repo.reponame}</a>
      <i>&nbsp;by&nbsp;{repo.username}</i>
      <span className = 'star'>&nbsp;&nbsp;stars: {repo.stars}</span>
      <span className='description'>&#20;{repo.description}</span>
    </div>
  )
}

export default Repo;

