import React, { useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    //setCartItems([...cartItems, item]);
  };

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Qty</th>
          <th colSpan={2}>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>GMC</td>
          <td>1</td>
          <td>$10000</td>
          <td><Button className='btn-danger center save-btn-css m-2'>Remove</Button></td>
        </tr>
        <tr>
          <td>2</td>
          <td>PC</td>
          <td>1</td>
          <td>$1000</td>
          <td><Button className='btn-danger center save-btn-css m-2'>Remove</Button></td>
        </tr>
      </tbody>
    </Table>
  );
}

export default Cart;