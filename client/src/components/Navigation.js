import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import SearchBar from './SearchBar';
import Cart from './Cart';
import Auth from '../utils/auth';

const Navigation = () => {
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLoggedIn(Auth.loggedIn());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleModal2 = () => {
    setShowModal2(false);
  };

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            <img
              alt=""
              src="./assets/market.png"
              width="50"
              height="50"
              className="d-inline-block center"
            />
            <span className="ml-2">Marketplace</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>

            <SearchBar />

            <Nav 
              className="ml-auto"
              style={{ maxHeight: '100px' }}
              navbar>
              {/* if user is logged in show saved books and logout */}
              {loggedIn ? (
                <>
                  <Nav.Link as={Link} to='/profile'>Profile</Nav.Link>
                  <Nav.Link onClick={() => setShowModal2(true)}>My Cart</Nav.Link>
                  <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal1(true)}>Login/Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      {/* set modal 1 data up */}
      <Modal
        size='lg'
        show={showModal1}
        onHide={() => setShowModal1(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal1(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal1(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>

       {/* set modal 2 data up */}
       <Modal
        size='lg'
        show={showModal2}
        onHide={() => setShowModal2(false)}
        aria-labelledby='cart-modal'>
        <Modal.Header closeButton>
          <Modal.Title id='cart-modal'>
              Your Cart
          </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Cart showModal2={showModal2} handleModal2={handleModal2} />
          </Modal.Body>
        </Modal>
    </>
  )
}

export default Navigation;
