import React from 'react';
import './TodoSearch.css';

function TodoSearch() {

  const  [searchValue, setSearchValue] =  React.useState('')
  const onSearchValueChange = (e)=> {
    console.log(e.target.value)
    setSearchValue(e.target.value)
  }
  return [
    <input
      className="TodoSearch"
      placeholder="Search..."
      value={searchValue}
      onChange={onSearchValueChange}
    />,
    <p>{searchValue}</p>
  ]
}

export { TodoSearch };
