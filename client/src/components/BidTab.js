import React, { useState, useEffect } from 'react';
import { Button, Card, CardColumns, Container, Tab, Tabs } from 'react-bootstrap';
import { getMe, createBid } from '../utils/API';
import Auth from '../utils/auth';

const BidTab = () => {
  const [myBids, setMyBids] = useState('');

  const handleDeleteBid = async (bidId) => {
    console.log(`view selected for bid ${bidId}`);
  }

  useEffect(() => {
    async function fetchData() {
      try {
        //const response = await getBids();
        //const results = await response.json();

        const myData = await getMe();
        const myResults = await myData.json();
        
        console.log(myResults);
        setMyBids(myResults.bids);
        
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  return (
    
    <Tabs
      defaultActiveKey="bids"
      id="categories"
      className="mb-3"
    >
      <Tab eventKey="bids" title="Bids">
      {myBids.length ? (
        <Container>
        <CardColumns>
          {myBids.map((bid) => {
            if(bid) {
              return (
                <Card key={bid.id} style={{margin: '1rem'}}>
                  <Card.Img src={`${bid.image}`} alt={`The image for ${bid.name}`} variant='top' />
                  <Card.Body className='text-center'>
                    <Card.Title className="m-2">{bid.name}</Card.Title>
                    <Card.Subtitle className="m-2">
                    <i className="fa-solid fa-wallet"></i> {`Bid Price: ${bid.price}`}
                    </Card.Subtitle>
                    <Card.Subtitle className="cardrating  m-2"><i className="fa-solid fa-certificate"></i> {`Description: ${bid.description}`}
                    </Card.Subtitle>
                    {Auth.loggedIn() && (
                    <Button 
                      className='btn-danger center save-btn-css m-2'
                      variant="secondary" size="sm"
                      onClick={() => handleDeleteBid(bid.id)}>
                       Delete
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
      </Tab>

      <Tab eventKey="account" title="Account">
        <Container>
          <p>Account info...</p>
        </Container>
      </Tab>

      <Tab eventKey="settings" title="Settings">
        <Container>
          <p>Settings...</p>
        </Container>
      </Tab>
    </Tabs>
    
  );
}

export default BidTab;