import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Card, Carousel, Navbar, NavDropdown, OverlayTrigger, Popover, Row } from 'react-bootstrap';
import { getItems, addToCart } from '../utils/API';
import Auth from '../utils/auth';
import '../styles/style.css';

const Homepage = ( {searchTerm} ) => {
  const [items, setItems] = useState([]);
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  const [show, setShow] = useState([false, false, false, false]);
  
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
    
    <Navbar className='center' expand='lg' bg="light" >
      <NavDropdown title="Deals" 
        id="collasible-nav-dropdown-1" 
        show={show[0]} onMouseEnter={() => setShow([true, false, false, false])}
        onMouseLeave={() => setShow([false, false, false, false])}>

        <NavDropdown.Item href="#/action-1-1">Hair</NavDropdown.Item>
        <NavDropdown.Item href="#/action-1-2">Tools & Brushes</NavDropdown.Item>
        <NavDropdown.Item href="#/action-1-3">Nails</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Hair Care" 
        id="collasible-nav-dropdown-2" 
        show={show[1]} onMouseEnter={() => setShow([false, true, false, false])}
        onMouseLeave={() => setShow([false, false, false, false])}>

        <NavDropdown.Item href="#/action-2-1">Shampoo</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2-2">Conditioner</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2-3">Styling</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2-4">Treatment</NavDropdown.Item>
        <NavDropdown.Item href="#/action-2-5">Tools & Brushes</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Nails" 
        id="collasible-nav-dropdown-3" 
        show={show[2]} onMouseEnter={() => setShow([false, false, true, false])}
        onMouseLeave={() => setShow([false, false, false, false])}>

        <NavDropdown.Item href="#/action-3-1">Color</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3-2">Polish</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3-3">Press-On & Gel</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3-4">Dip Powder</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3-5">Remover</NavDropdown.Item>
        <NavDropdown.Item href="#/action-3-5">Top & Base Coat</NavDropdown.Item>
      </NavDropdown>

      <NavDropdown title="Cosmetics & Skincare" 
        id="collasible-nav-dropdown-4" 
        show={show[3]} onMouseEnter={() => setShow([false, false, false, true])}
        onMouseLeave={() => setShow([false, false, false, false])}>

        <NavDropdown.Item href="#/action-4-1">Makeup</NavDropdown.Item>
        <NavDropdown.Item href="#/action-4-2">Eyelashes</NavDropdown.Item>
        <NavDropdown.Item href="#/action-4-3">Eye Makeup</NavDropdown.Item>
        <NavDropdown.Item href="#/action-4-4">Face</NavDropdown.Item>
        <NavDropdown.Item href="#/action-4-5">Lips</NavDropdown.Item>
        <NavDropdown.Item href="#/action-4-5">Lotion</NavDropdown.Item>
      </NavDropdown>
    </Navbar>
        
    <div className='carousel-container'>
      <Carousel>

        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="./assets/GitHub.png"
            alt="First slide"
            link="https://github.com/seangshin"
          />
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            src="./assets/li.png"
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