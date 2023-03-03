import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { createBid } from '../utils/API';
import Auth from '../utils/auth';

const Profile = () => {
  const [bidData, setBidData] = useState({name: '', description: '', price: '', image: null});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setBidData({ ...bidData, [name]: value });
  };

  const handleImageChange = (event) => {
    setBidData({ ...bidData, image: event.target.files[0] });
  };

  const handleForm = async (event) =>{
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log(bidData);
      const data = await createBid(bidData);
      //Auth.login(data.login.token)
      const results = await data.json();
      console.log(results);
    }
    // try {
    //   console.log(bidData);
    //   const formData = new FormData();
    //   formData.append('name', bidData.name);
    //   formData.append('description', bidData.description);
    //   formData.append('price', bidData.price);
    //   formData.append('image', bidData.image);
    //   console.log(formData);

    //   const data = await createBid(formData);
    //   console.log(data);
    // }
    catch(err){
      console.log(JSON.stringify(err));
    };

    setBidData({name: '', description: '', price: '', image: null});
  };

  return(
    <>
      <Form onSubmit={handleForm} enctype="multipart/form-data" action="/upload" method="POST"> 
        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          name="name"
          value= {bidData.name}
          placeholder="Enter the name of the item." 
          onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control 
          type="text" 
          name="description"
          value= {bidData.description}
          placeholder="Enter a short description."  
          onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control 
          type="text" 
          name="price"
          value= {bidData.price}
          placeholder="Enter a starting price."  
          onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicImage">
          <Form.Label>Image</Form.Label>
          <Form.Control type="file" name="image" onChange={handleImageChange} />
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>  
    </>
  );
};

export default Profile;