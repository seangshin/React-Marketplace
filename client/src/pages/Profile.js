import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button,  Form, Jumbotron, Modal } from 'react-bootstrap';
import { createItem } from '../utils/API';
import Auth from '../utils/auth';
import ItemTab from '../components/ItemTab';

const Profile = () => {
  const [itemData, setitemData] = useState({name: '', description: '', price: 0, image: null, options: [false, false, false, false]});
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const token = Auth.loggedIn() ? Auth.getToken() : null;
  useEffect(() => {
    if (!Auth.loggedIn()) {
      alert('Please log in.');
      navigate('/');
    }
  }, [navigate]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setitemData({ ...itemData, [name]: value });
  };

  const handleImageChange = (event) => {
    setitemData({ ...itemData, image: event.target.files[0] });
  };

  const handleOptionChange = (index) => {
    const options = [...itemData.options];
    options[index] = !options[index];
    setitemData({ ...itemData, options });
    console.log(itemData); //debug
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
      console.log(itemData);
      const data = await createItem(itemData, token);
      const results = await data.json();
      console.log(results);
    }
    catch(err){
      console.log(JSON.stringify(err));
    };

    setitemData({name: '', description: '', price: 0, image: null, options: [false, false, false ,false]});
    setShowModal(false);
  };

  return(
    <>
      <Jumbotron style={{ backgroundImage: 'url("./assets/jtron.png")' }}>
        <h2>Your Account</h2>
      </Jumbotron>
      
      <div>
      <div className='pb-4 pl-4'>
        <Button variant="secondary" onClick={() => setShowModal(true)}>+ New Item</Button>
      </div>
      
      <ItemTab token={token}/>
      </div>

      {/* set modal data up */}
      <Modal
          size='lg'
          show={showModal}
          onHide={() => setShowModal(false)}
          aria-labelledby='signup-modal'>
          {/* tab container to do either signup or login component */}
          <Modal.Header closeButton>
            <Modal.Title>Create a new item</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleForm} enctype="multipart/form-data" action="/api/items" method="post"> 
              <Form.Group controlId="formBasicName">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                type="text" 
                name="name"
                value= {itemData.name}
                placeholder="Enter the name of the item." 
                onChange={handleInputChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control 
                type="text" 
                name="description"
                value= {itemData.description}
                placeholder="Enter a short description."  
                onChange={handleInputChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control 
                type="number" 
                name="price"
                value= {itemData.price}
                placeholder="Enter a price."  
                onChange={handleInputChange}/>
              </Form.Group>

              <Form.Group controlId="formBasicImage">
                <Form.Label>Image</Form.Label>
                <Form.Control type="file" name="image" onChange={handleImageChange} />
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check 
                type="checkbox" 
                label="Hair" 
                onChange={() => handleOptionChange(0)}
                />
                <Form.Check 
                type="checkbox" 
                label="Nails" 
                name="check"
                onChange={() => handleOptionChange(1)}
                />
                <Form.Check 
                type="checkbox" 
                label="Cosmetic & Skincare" 
                name="check"
                onChange={() => handleOptionChange(2)}
                />
                <Form.Check 
                type="checkbox" 
                label="Misc" 
                name="check"
                onChange={() => handleOptionChange(3)}
                />
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