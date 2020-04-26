import React from 'react';
import '../styles/searchBox.css'

const SearchBox = ({handleQuery, searchQuery}) => {
    return <input
        className="search-box"
        type="text"
        placeholder="find another location and press enter..."
        onChange={handleQuery}
        onKeyDown={searchQuery}
    />
}

export default SearchBox;
