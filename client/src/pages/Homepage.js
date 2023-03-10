import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns, CardGroup, Carousel, Row } from 'react-bootstrap';
import { getBids } from '../utils/API';
import Auth from '../utils/auth';
import '../styles/style.css';

const Homepage = () => {
  const [bids, setBids] = useState('');
  
  const handleViewBid = async (bidId) => {
    console.log(`view selected for bid ${bidId}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await getBids();
        const results = await response.json();
        setBids(results);
        console.log(results);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, []);

  return(
    <>
    <div className='carousel-container pt-2 border'>
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

    {bids.length ? (
      <Container>
      <CardColumns>
        {bids.map((bid) => {
          if(bid) {
            return (
              <Card key={bid.id} style={{margin: '1rem'}}>
                <Card.Header>
                  <Row>
                    <Col>{bid.name}</Col>
                    <Col className="text-right"><i class="fa-solid fa-dollar-sign"></i>{`${bid.price}`}</Col>
                  </Row>
                </Card.Header>
                <Card.Img src={`${bid.image}`} alt={`The image for ${bid.name}`} variant='top' />
                <Card.Body className='text-center'>
                  <Card.Subtitle className="m-2">
                  <i className="fa-solid fa-wallet"></i> {`Bid Price: ${bid.price}`}
                  </Card.Subtitle>
                  <Card.Subtitle className="m-2"><i className="fa-solid fa-certificate"></i> {`Description: ${bid.description}`}
                  </Card.Subtitle>
                  {Auth.loggedIn() && (
                  <Button 
                    className='btn-info center save-btn-css m-2'
                    variant="secondary" size="sm"
                    onClick={() => handleViewBid(bid.id)}>
                      View
                  </Button>
                )}
                </Card.Body>
              </Card>
            );
          } else return;
        })}
      </CardColumns>
      </Container>
      ) : (
        <div></div>
      )}


    {/* {bids.length ? (
      
      <Row xs={1} md={2} className="g-4 p-4">
      {Array.from({ length: 4 }).map((_, idx) => (
        <Col>
        
          <Card>
            <Card.Img variant="top" src="holder.js/100px160" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
          
        </Col>
))}
    </Row>
      
      ) : (
        <div>No bids</div>
      )} */}
    </>
  );
};

export default Homepage;