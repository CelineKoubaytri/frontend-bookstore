import React, { useContext, useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const cartTotal = getCartTotal();
  const [address, setAddress] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    clearCart();
    setTimeout(() => navigate('/'), 3000);
  };

  if (submitted) {
    return (
      <Container className="py-5">
        <Card className="text-center p-4">
          <h3>Thank you for your order!</h3>
          <p>Your order has been placed. Please prepare cash for delivery.</p>
          <p>Redirecting to home...</p>
        </Card>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <h2 className="mb-4">Checkout</h2>
      <Row>
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <h5>Order Summary</h5>
              <ul className="list-unstyled">
                {cartItems.map(item => (
                  <li key={item.id} className="mb-2">
                    {item.title} x {item.quantity} - ${item.price * item.quantity}
                  </li>
                ))}
              </ul>
              <hr />
              <strong>Total: ${cartTotal}</strong>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6}>
          <Card>
            <Card.Body>
              <h5>Delivery Details</h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="address">
                  <Form.Label>Shipping Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter your address"
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Check
                    type="radio"
                    label="Cash on Delivery"
                    checked
                    readOnly
                  />
                </Form.Group>
                <Button variant="dark" type="submit" disabled={!address}>
                  Place Order
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}