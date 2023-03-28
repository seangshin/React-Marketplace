import React, { useState, useEffect } from 'react';
import { Button, Table } from 'react-bootstrap';
import { viewCart, removeFromCart } from '../utils/API';
import { Link, useNavigate } from 'react-router-dom';
import Auth from '../utils/auth';

const Cart = (props) => {
  const [cartItems, setCartItems] = useState('');
  const [subtotal, setSubtotal] = useState(0);
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const { showModal2, handleModal2 } = props;
  const navigate = useNavigate();

  const token = Auth.loggedIn() ? Auth.getToken() : null;

  useEffect(() => {
    async function fetchData() {
      try {
        const myData = await viewCart(token);
        const myResults = await myData.json();
        setCartItems(myResults);

        const getSubtotal = myResults.reduce((acc, item) => acc + item.price, 0);
        setSubtotal(getSubtotal);

        const getTax = getSubtotal * 0.06;
        setTax(getTax);

        const getTotal = getSubtotal + getTax;
        setTotal(getTotal);

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

      //recalculate cart subtotal, tax, and total
      const getSubtotal = updatedCartItems.reduce((acc, item) => acc + item.price, 0);
      setSubtotal(getSubtotal);

      const getTax = getSubtotal * 0.06;
      setTax(getTax);

      const getTotal = getSubtotal + getTax;
      setTotal(getTotal);

      // Send a request to your server to update the cart model in the database
      await removeFromCart(itemId, token);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCheckout = async () => {
    try {
      console.log('checkout selected');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {cartItems.length ? (
        <div>

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
              <td><Button className='btn-danger center save-btn-css m-2' onClick={() => handleRemoveItem(item.id)}><i className="fa-solid fa-trash"></i></Button></td>
            </tr>
          ))}
          </tbody>
          </Table>

          <div className="text-right">
            <p>Subtotal: ${subtotal}</p>
            <p>Tax (6%): ${tax}</p>
            <p>Total: ${total}</p>
            <Link to="/checkout"><Button onClick={handleModal2} className='btn-info'>Checkout</Button></Link>
          </div>

        </div>
        ) : (
          <div>No items in your cart.</div>
        )}
    </>
  );
}

export default Cart;