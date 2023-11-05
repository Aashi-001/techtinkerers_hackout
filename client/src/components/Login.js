import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const navigate = useNavigate();

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const navigateToHome = () => {
    navigate('/');
  };
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios.post('/api/login', formData)
      .then((response) => {
        const data = response.data;
        console.log(data);
        if (data.success) {
          alert('Login successful'); 
          localStorage.setItem('user', JSON.stringify(data.user))
          // localStorage.setItem('points', JSON.stringify(data.points));
          window.location = '/';
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('An error occurred during login');
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    // localStorage.removeItem("points");
    navigate("/");
  };

  const userInformation = localStorage.getItem('user');
  console.log(userInformation);
  let userPoints;
  if (userInformation) {
    const userData = JSON.parse(userInformation);
    userPoints = userData.points;
    console.log(userPoints);
  }
//   console.log("type of ");
//   console.log(typeof userPoints);
  const isLoggedIn = userInformation ? true : false;

  return (
    <>
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/" onClick={navigateToHome}>
            VERDANT VOYAGES
          </Navbar.Brand>
          <Nav className="me-right">
            {isLoggedIn ? (
                <>
              <Nav.Link style={{fontSize: `25px`}}>
                🏅
                </Nav.Link>
              <Nav.Link eventKey="disabled" disabled>
                {userPoints}
                </Nav.Link>
              <Nav.Link onClick={handleLogout}>LOG OUT</Nav.Link>
                </>
            ) : (
              // User is not logged in, so show "Sign Up" and "Log In" links
              <>
                <Nav.Link href="/signup" onClick={navigateToSignup}>
                  SIGN-UP
                </Nav.Link>
                <Nav.Link href="/login" onClick={navigateToSignup}>
                  LOG-IN
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
      <div
        className="background-container"
        style={{
          backgroundImage: `url(https://c4.wallpaperflare.com/wallpaper/452/338/415/balls-wood-nature-wallpaper-preview.jpg)`,
          backgroundSize: 'cover', // Adjust the background size
          backgroundRepeat: 'no-repeat', // Prevent background image from repeating
        }}
      >
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
          <Form style={formStyle} onSubmit={handleSubmit}>
            <Form.Group controlId="formName">
              <Form.Label style={labelStyle}>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group controlId="formEmail">
              <Form.Label style={labelStyle}>Email address</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={inputStyle}
              />
              <Form.Text className="text-muted" style={textStyle}>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPhoneNumber">
              <Form.Label style={labelStyle}>Phone Number</Form.Label>
              <Form.Control
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Form.Group controlId="formPassword">
              <Form.Label style={labelStyle}>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={inputStyle}
              />
            </Form.Group>

            <Button variant="primary" type="submit" style={buttonStyle}>
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    </>
  );
}

const formStyle = {
  padding: '20px',
  margin: '20px',
  border: '1px solid #ccc',
  background: 'rgba(243, 229, 245, 0.8)',
};

const labelStyle = {
  fontWeight: 'bold',
};

const inputStyle = {
  marginBottom: '10px',
};

const textStyle = {
  fontSize: '14px',
};

const buttonStyle = {
  marginTop: '10px',
};

export default Login;