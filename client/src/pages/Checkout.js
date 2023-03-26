import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
//import PaymentForm from '../components/PaymentForm';

const Checkout = () => {
  const [formData, setformData] = useState({cardNumber: null, expDate: null, cvc: null, name: '', address: ''});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setformData({ ...formData, [name]: value });
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
      // const data = await createBid(formData);
      // //Auth.login(data.login.token)
      // const results = await data.json();
      // console.log(results);
    }
    catch(err){
      console.log(JSON.stringify(err));
    };

    setformData({name: '', description: '', price: 0, image: null});
  }

  return(
    <>
      <Form onSubmit={handleForm}> 
          <Form.Group controlId="formBasicCardNumber">
            <Form.Label>Card Number</Form.Label>
            <Form.Control 
            type="text" 
            name="name"
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
            name="CVC"
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

        </Form>
    </>
  );
};

export default Checkout;