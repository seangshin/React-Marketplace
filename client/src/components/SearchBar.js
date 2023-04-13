import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInput = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    // Perform search operation with the search term
    handleSearch(value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    // Perform search operation with the search term
  };

  return (
    <div className='d-flex mx-auto'>
      <Form className="d-flex">
        <Form.Control
          onChange={handleInput}
          value={searchTerm}
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
          style={{ width: '50vw' }}
        />
        <Button onClick={handleSearch} className="ml-2" variant="outline-success"><i className="fa-solid fa-magnifying-glass"></i></Button>
      </Form>
    </div>
  );
}

export default SearchBar;