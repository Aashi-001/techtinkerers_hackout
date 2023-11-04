import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const navigate = useNavigate();
    const navigateToSignup = () => {
        navigate('/signup');
      };
    
      const navigateToHome = () => {
        navigate('/');
      };

      const handlesubmit = () => {
        navigate('/');
      }
    //   const navigateToAcc = () => {
    //     navigate('/accomodation');
    //   };
    //   const navigateToRent = () => {
    //     navigate('/rental');
    //   };
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="/" onClick={navigateToHome}>VERDANT VOYAGES</Navbar.Brand>
        <Nav className="me-right">
          <Nav.Link href="/signup" onClick={navigateToSignup}>SIGN-UP / LOG-IN</Nav.Link>
        </Nav>
      </Container>
    </Navbar>
    <Form>
      <Form.Group className="mb-3 mx-4 my-4" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3 mx-4 my-4" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3 mx-4 my-4" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group>
      <Button className='mb-3 mx-4 my-4' variant="primary" type="submit" onClick={handlesubmit}>
        Submit
      </Button>
    </Form>
    </>
  )
}

export default Signup