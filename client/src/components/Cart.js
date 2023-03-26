import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { viewCart, removeFromCart } from '../utils/API';

const Cart = () => {
  const [cartItems, setCartItems] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const myData = await viewCart();
        const myResults = await myData.json();
        
        console.log(myResults);
        setCartItems(myResults);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const handleRemoveItem = async (itemId) => {
    try {
      // Remove the item from the cart in React app state
      const updatedCartItems = cartItems.filter(item => item.id !== itemId);
      setCartItems(updatedCartItems);

      // Send a request to your server to update the cart model in the database
      await removeFromCart(itemId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {cartItems.length ? (
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

          {cartItems.map((item, index) => (
          <tr key={index}>
            <td>{index + 1}</td>
            <td>{item.name}</td>
            <td>1</td>
            <td>{item.price}</td>
            <td><Button className='btn-danger center save-btn-css m-2' onClick={() => handleRemoveItem(item.id)}>Remove</Button></td>
          </tr>
        ))}
        </tbody>
        </Table>
        ) : (
          <div>No items in your cart.</div>
        )}
    </>
  );
}

export default Cart;