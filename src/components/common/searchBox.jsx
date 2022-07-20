import React from 'react';

const SearchBox = ({ value, onChange }) => {
  return (
    <form className="d-flex mt-3 mt-lg-0" role="search">
      <input
        className="form-control me-2 my-3"
        type="search"
        placeholder="Search..."
        aria-label="Search"
        value={value}
        onChange={e => onChange(e.currentTarget.value)}
      >
      </input>
    </form>
  );
}

export default SearchBox;

