import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import { getBids } from '../utils/API';
import Auth from '../utils/auth';

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
    <Jumbotron>

    </Jumbotron>

    {bids.length ? (
      <Container className='container-profile'>
      <CardColumns>
        {bids.map((bid) => {
          if(bid) {
            return (
              <Card key={bid.id} border='border-bottom border-warning' className="cardbody-css" style={{margin: '1rem'}}>
                <Card.Img src={`${bid.image}`} alt={`The image for ${bid.name}`} variant='top' />
                <Card.Body className='text-center'>
                  <Card.Title className="cardtitle m-2">{bid.name}</Card.Title>
                  <Card.Subtitle className="cardprice  m-2">
                  <i className="fa-solid fa-wallet"></i> {`Bid Price: ${bid.price}`}
                  </Card.Subtitle>
                  <Card.Subtitle className="cardrating  m-2"><i className="fa-solid fa-certificate"></i> {`Description: ${bid.description}`}
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
    </>
  );
};

export default Homepage;