import React, { useState, useEffect } from 'react';
import { Button, Card, CardColumns, Col, Container, Form, Jumbotron,Modal } from 'react-bootstrap';
import { getMe, createBid } from '../utils/API';
import Auth from '../utils/auth';
import BidTab from '../components/BidTab';

const Profile = () => {
  const [bidData, setBidData] = useState({name: '', description: '', price: '', image: null});
  //const [myBids, setMyBids] = useState('');
  const [showModal, setShowModal] = useState(false);

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
    catch(err){
      console.log(JSON.stringify(err));
    };

    setBidData({name: '', description: '', price: '', image: null});
    setShowModal(false);
  };

  return(
    <>
    <Jumbotron>
      <h2>Your Account</h2>
    </Jumbotron>
    
    <div>
    <div className='pb-4 pl-4'>
      <Button variant="secondary" onClick={() => setShowModal(true)}>+ New Bid</Button>
    </div>
    
    <BidTab />
    </div>

    {/* set modal data up */}
    <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Modal.Header closeButton>
        <Modal.Title>Create a new bid</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <Form onSubmit={handleForm} enctype="multipart/form-data" action="/api/bids" method="post"> 
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

      </Form>  
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleForm}>
          Submit 
        </Button>
      </Modal.Footer>
      </Modal>
    </>
  );
};

export default Profile;