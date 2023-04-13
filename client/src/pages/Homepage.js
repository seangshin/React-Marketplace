import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Card, Carousel, Dropdown, Navbar, NavDropdown, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { getItems, addToCart } from '../utils/API';
import Auth from '../utils/auth';
import '../styles/style.css';

const Homepage = ( {searchTerm} ) => {
  const [items, setItems] = useState([]);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const [show, setShow] = useState([false, false, false, false, false, false]);
  
  const handleAddToCart = async (itemId) => {
    console.log(`view selected for item ${itemId}`);//debug
    
    try {
      const response = await addToCart(itemId, token);
    } catch (error) {
      console.log(error);
    }
  };

  const popoverClick = (
    <Popover id="popover-trigger-click" title="Popover bottom">
      <strong className='m-1'>Item added to cart.</strong>
    </Popover>
  );

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getItems();
        const results = await response.json();
        setItems(results);
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  // Filter items based on search term
  const filteredItems = items.filter((item) => {
    return item.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return(
    <>
    
    <Navbar className='border-bottom border-secondary justify-content-between' expand='lg' bg="light">
      <Container>
        <Dropdown show={show[0]} onMouseEnter={() => setShow([true, false, false, false, false, false])}
          onMouseLeave={() => setShow([false, false, false, false, false, false])}>
          <Dropdown.Toggle as="div" id="collasible-nav-dropdown-1" className="dropdowntoggle" >
            Deals
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-1-1">Hair</Dropdown.Item>
            <Dropdown.Item href="#/action-1-2">Tools & Brushes</Dropdown.Item>
            <Dropdown.Item href="#/action-1-3">Nails</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={show[1]} onMouseEnter={() => setShow([false, true, false, false, false, false])}
          onMouseLeave={() => setShow([false, false, false, false, false, false])}>
          <Dropdown.Toggle as="div" id="collasible-nav-dropdown-2" className="dropdowntoggle" >
            Hair Care
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-2-1">Shampoo</Dropdown.Item>
            <Dropdown.Item href="#/action-2-2">Conditioner</Dropdown.Item>
            <Dropdown.Item href="#/action-2-3">Styling</Dropdown.Item>
            <Dropdown.Item href="#/action-2-4">Treatment</Dropdown.Item>
            <Dropdown.Item href="#/action-2-5">Tools & Brushes</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={show[2]} onMouseEnter={() => setShow([false, false, true, false, false, false])}
          onMouseLeave={() => setShow([false, false, false, false, false, false])}>
          <Dropdown.Toggle as="div" id="collasible-nav-dropdown-3" className="dropdowntoggle" >
            Nails
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-3-1">Color</Dropdown.Item>
            <Dropdown.Item href="#/action-3-2">Polish</Dropdown.Item>
            <Dropdown.Item href="#/action-3-3">Press-On & Gel</Dropdown.Item>
            <Dropdown.Item href="#/action-3-4">Dip Powder</Dropdown.Item>
            <Dropdown.Item href="#/action-3-5">Remover</Dropdown.Item>
            <Dropdown.Item href="#/action-3-5">Top & Base Coat</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={show[3]} onMouseEnter={() => setShow([false, false, false, true, false, false])}
          onMouseLeave={() => setShow([false, false, false, false, false, false])}>
          <Dropdown.Toggle as="div" id="collasible-nav-dropdown-4" className="dropdowntoggle" >
          Cosmetics & Skincare
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-4-1">Makeup</Dropdown.Item>
            <Dropdown.Item href="#/action-4-2">Eyelashes</Dropdown.Item>
            <Dropdown.Item href="#/action-4-3">Eye Makeup</Dropdown.Item>
            <Dropdown.Item href="#/action-4-4">Face</Dropdown.Item>
            <Dropdown.Item href="#/action-4-5">Lips</Dropdown.Item>
            <Dropdown.Item href="#/action-4-5">Lotion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={show[4]} onMouseEnter={() => setShow([false, false, false, false, true, false])}
          onMouseLeave={() => setShow([false, false, false, false, false, false])}>
          <Dropdown.Toggle as="div" id="collasible-nav-dropdown-5" className="dropdowntoggle" >
          Purses & Apparel
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item href="#/action-5-1">Makeup</Dropdown.Item>
            <Dropdown.Item href="#/action-5-2">Eyelashes</Dropdown.Item>
            <Dropdown.Item href="#/action-5-3">Eye Makeup</Dropdown.Item>
            <Dropdown.Item href="#/action-5-4">Face</Dropdown.Item>
            <Dropdown.Item href="#/action-5-5">Lips</Dropdown.Item>
            <Dropdown.Item href="#/action-5-5">Lotion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>

        <Dropdown show={show[5]} onMouseEnter={() => setShow([false, false, false, false, false, true])}
          onMouseLeave={() => setShow([false, false, false, false, false, false])}>
          <Dropdown.Toggle as="div" id="collasible-nav-dropdown-6" className="dropdowntoggle" >
          Tools & Supplies
          </Dropdown.Toggle>
          <Dropdown.Menu>
          <Dropdown.Item href="#/action-6-1">Makeup</Dropdown.Item>
            <Dropdown.Item href="#/action-6-2">Eyelashes</Dropdown.Item>
            <Dropdown.Item href="#/action-6-3">Eye Makeup</Dropdown.Item>
            <Dropdown.Item href="#/action-6-4">Face</Dropdown.Item>
            <Dropdown.Item href="#/action-6-5">Lips</Dropdown.Item>
            <Dropdown.Item href="#/action-6-5">Lotion</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
        </Container>
    </Navbar>

    
        
    <div className='carousel-container'>
      <Carousel>

        <Carousel.Item>
          <img
            className="carousel-image"
            src="./assets/GitHub.jpg"
            alt="First slide"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="carousel-image"
            src="./assets/image1.JPG"
            alt="Second slide"
          />
        </Carousel.Item>

      </Carousel>
    </div>

    {filteredItems.length ? (
      <Container>
        <Row xs={1} md={2} lg={4} className='g-4' style={{ display: 'flex'}}>
          {filteredItems.map((item) => {
            if(item) {
              return (
                <Col sm={6} md={3} style={{ display: 'flex', flexDirection: 'column' }}>
                  <Card key={item.id} className='mt-5' style={{ flexGrow: 1 }}>
                    <Card.Img src={`${item.image}`} alt={`The image for ${item.name}`} variant='top' className='p-3'/>
                    <Card.Body className='text-center d-flex flex-column'>
                      <Card.Subtitle className="mt-2">
                      {`${item.name}`}
                      </Card.Subtitle>
                      <Card.Subtitle 
                      className='m-1'>
                      {`${item.description}`}
                      </Card.Subtitle>
                      <div className="mt-auto">
                      <Card.Subtitle className="mt-2">
                        <strong>${item.price}</strong>
                      </Card.Subtitle>
                      {Auth.loggedIn() && (
                        <>
                        <OverlayTrigger trigger="click" placement="bottom" rootClose={true} overlay={popoverClick}>
                          <Button
                            className='center m-2'
                            size="sm"
                            variant="secondary"
                            onClick={() => {handleAddToCart(item.id);}}>
                            Add to Cart
                          </Button>
                          </OverlayTrigger>
                          
                        </>
                      )}
                      
                    </div>
                    </Card.Body>
                  </Card>
                </Col>
              );
            } else return;
          })}
        </Row>
      </Container>
      ) : (
        <Container fluid className='vh-100'>
        </Container>
      )}

      <footer className='bg-footer py-3 mt-5'>
        <Container>
          <Row className="justify-content-center">
            <Col sm={6} md={3} className='text-center'>
              
              <span><strong>11034 Gratiot Ave, Detroit, MI 48213</strong></span>
            </Col>
          </Row>
          <Row className="justify-content-center mt-3">
            <Col sm={12} md={12} className='text-center'>
              <span>@Copyright 2023</span>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col sm={12} md={12} className='text-center'>
              <span>All rights reserved. Powered by seangshin GitHub.</span>
            </Col>
          </Row>
        </Container>
      </footer>

      
    </>

    
  );
};

export default Homepage;