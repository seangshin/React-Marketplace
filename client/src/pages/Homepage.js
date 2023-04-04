import React, { useState, useEffect } from 'react';
import { Button, Container, Col, Card, Carousel, Dropdown, Jumbotron, Row } from 'react-bootstrap';
import { getItems, addToCart } from '../utils/API';
import Auth from '../utils/auth';
import SearchBar from '../components/SearchBar';
import '../styles/style.css';

const Homepage = () => {
  const [items, setItems] = useState('');
  const token = Auth.loggedIn() ? Auth.getToken() : null;
  
  const handleAddToCart = async (itemId) => {
    console.log(`view selected for item ${itemId}`);//debug

    try {
      const response = await addToCart(itemId, token);
    } catch (error) {
      console.log(error);
    }
  }

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

  return(
    <>
    <Jumbotron className="my-jumbotron jumbotron-no-margin" style={{ backgroundImage: 'url("./assets/jtron.png")'}}>

      <Container className='center'><SearchBar /></Container>

      <Container className='center'>
        <Row className="justify-content-between mt-4">
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Deals
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Hair</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Tools & Brushes</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Nail</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Hair Care
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Shampoo</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Conditioner</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Styling</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Treatment</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
          <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Nails
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Color</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Polish</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Press-on & Gel</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Dip Powder</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Nail Polish Remover</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Top & Base Coat</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
          <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                Cosmetics & Skincare
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="#/action-1">Makeup</Dropdown.Item>
                <Dropdown.Item href="#/action-2">Eyelashes</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Eye Makeup</Dropdown.Item>
                <Dropdown.Item href="#/action-4">Face</Dropdown.Item>
                <Dropdown.Item href="#/action-5">Lips</Dropdown.Item>
                <Dropdown.Item href="#/action-6">Tools & Brushes</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
      </Container>

    </Jumbotron>

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

    {items.length ? (
      <Container>
        <Row xs={1} md={2} lg={4} className='g-4' style={{ display: 'flex'}}>
          {items.map((item) => {
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
                      <Button
                        className='center m-2'
                        size="sm"
                        variant="secondary"
                        onClick={() => handleAddToCart(item.id)}>
                        Add to Cart
                      </Button>
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