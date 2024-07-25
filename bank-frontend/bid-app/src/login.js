import React, { useState } from 'react';
//import { Container, Form, Button, Alert } from 'react-bootstrap';
import './App.css';

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Password validation
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long.');
      return;
    }

    // Identifier validation
    if (/^\d+$/.test(identifier)) {
      // If identifier contains only numbers
      if (identifier.length !== 10) {
        setErrorMessage('Phone number must contain exactly 10 numeric digits.');
        return;
      }
    } else {
      // If identifier is not numeric, assume it's an email and validate the presence of '@'
      if (!identifier.includes('@')) {
        setErrorMessage('Invalid email address.');
        return;
      }
    }

    // If all validations pass, you can proceed with your login logic
    console.log('Identifier (Email/Phone):', identifier);
    console.log('Password:', password);
  };

  return (
    <Container className="mt-5">
      <h2>Login</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formBasicIdentifier">
          <Form.Label>Email address or Phone number</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter email or phone number" 
            value={identifier} 
            onChange={(e) => setIdentifier(e.target.value)} 
            required 
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </Form.Group>

        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
};

export default LoginPage;
