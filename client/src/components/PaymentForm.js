import React, { useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: elements.getElement(CardElement),
    });

    if (error) {
      setLoading(false);
      setError(error.message);
      return;
    }

    const { id } = paymentMethod;

    try {
      const response = await fetch('/api/bids/charge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1000, // replace with the actual amount you want to charge
          currency: 'usd', // replace with the actual currency you want to charge
          description: 'Test Payment', // replace with the actual description of the payment
          token: {
            id,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      setLoading(false);
      setSuccess(true);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="cardElement">
        <Form.Label>Card Information</Form.Label>
        <CardElement className="form-control" />
      </Form.Group>
      <Button type="submit" disabled={!stripe || loading}>
        Pay
      </Button>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">Payment successful!</Alert>}
    </Form>
  );
};

export default PaymentForm;