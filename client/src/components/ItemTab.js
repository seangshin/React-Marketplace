import React, { useState, useEffect } from 'react';
import { Button, Card, CardColumns, Container, Tab, Tabs } from 'react-bootstrap';
import { getMe, removeItem } from '../utils/API';
import Auth from '../utils/auth';

const ItemTab = (props) => {
  const [myItems, setMyItems] = useState('');

  const handleDeleteItem = async (itemId) => {
    console.log(`view selected for item ${itemId}`);

    try {
      // Remove the item from the cart in React app state
      const updatedItems = myItems.filter(item => item.id !== itemId);
      setMyItems(updatedItems);

      // Send a request to your server to update the cart model in the database
      await removeItem(itemId, props.token);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const myData = await getMe(props.token);
        const myResults = await myData.json();
        
        console.log(myResults);//debug
        setMyItems(myResults);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [props.token]);

  return (
    <Tabs
      defaultActiveKey="items"
      id="categories"
      className="mb-3"
    >
      <Tab eventKey="items" title="Items">
      {myItems.length ? (
        <Container>
        <CardColumns>
          {myItems.map((item) => {
            if(item) {
              return (
                <Card key={item.id} style={{margin: '1rem'}}>
                  <Card.Img src={`${item.image}`} alt={`The image for ${item.name}`} variant='top' />
                  <Card.Body className='text-center'>
                    <Card.Title className="m-2">{item.name}</Card.Title>
                    <Card.Subtitle className="m-2">
                    <i className="fa-solid fa-wallet"></i> {`Item Price: ${item.price}`}
                    </Card.Subtitle>
                    <Card.Subtitle className="cardrating  m-2"><i className="fa-solid fa-certificate"></i> {`Description: ${item.description}`}
                    </Card.Subtitle>
                    {Auth.loggedIn() && (
                    <Button 
                      className='btn-danger center save-btn-css m-2'
                      variant="secondary" size="sm"
                      onClick={() => handleDeleteItem(item.id)}>
                       <i className="fa-solid fa-trash"></i>
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

export default ItemTab;