import React, { useState } from 'react';

const Search = ({ onSearch, update }) => {

  const[term, setTerm] = useState('')

  const onChange = (e) => {
    setTerm(e.target.value);
    update(e.target.value);//Do we need this? everytime we type something in the input, it will automatically search the input value's repo from mongodb.
  }

  const search = () => {
    onSearch(term);
  }

  return (
    <div>
      <h4>Add more repos!</h4>
      Enter a github username: <input value={term} onChange={onChange}/>
      <button onClick={search}> Add Repos </button>
    </div>
  );
}

export default Search;