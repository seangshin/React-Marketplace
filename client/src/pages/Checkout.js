import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Form, Row } from 'react-bootstrap';
import { checkout } from '../utils/API';

const Checkout = () => {
  const [formData, setFormData] = useState({ cardNumber: '', expDate: '', cvc: '', name: '', address: '', amount: 0.01 });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleForm = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      console.log(formData);
      // const data = await checkout(formData);
      // //Auth.login(data.login.token)
      // const results = await data.json();
      // console.log(results);
    }
    catch(err){
      console.log(JSON.stringify(err));
    };

    setFormData({cardNumber: '', expDate: '', cvc: '', name: '', address: ''});
  }

  return(
    <>
    <div className="d-flex justify-content-center align-items-center vh-100">
    <Container fluid>
      <Row>
        <Col className='p-5' style={{ backgroundColor: 'lightblue' }} md={{ span: 4, offset: 4 }}>
        <Form onSubmit={handleForm}> 
        <Form.Group controlId="formBasicCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control 
          type="text" 
          name="cardNumber"
          value= {formData.cardNumber}
          placeholder="Card number" 
          onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicExpDate">
          <Form.Label>Expiration Date</Form.Label>
          <Form.Control 
          type="text" 
          name="expDate"
          value= {formData.expDate}
          placeholder="MM/YYYY"  
          onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicCVC">
          <Form.Label>Security Code</Form.Label>
          <Form.Control 
          type="number" 
          name="cvc"
          value= {formData.cvc}
          placeholder="Security code"  
          onChange={handleInputChange}/>
        </Form.Group>

        <Form.Group controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control 
          type="text" 
          name="name"
          value= {formData.name}
          placeholder="Cardholder's name" 
          onChange={handleInputChange}
          />
        </Form.Group>

        <Form.Group controlId="formBasicAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control 
          type="text" 
          name="address"
          value= {formData.address}
          placeholder="Billing address" 
          onChange={handleInputChange}
          />
        </Form.Group>
          <Button disabled={!(formData.cardNumber && formData.expDate && formData.cvc && formData.name && formData.address)}
            type='submit'
            variant='success'>
            Submit
          </Button>
      </Form>
        </Col>
      </Row>
    </Container>
    </div>
    </>
  );
};

export default Checkout;