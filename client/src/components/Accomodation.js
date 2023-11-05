import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function Accomodation() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState('');
  const [accommodations, setAccommodations] = useState([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCityName(value); // Update the cityName state directly
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitted(true);
  };

  const fetchAccommodations = async () => {
    try {
      console.log("fetching accomodations")
      const response = await axios.get(`/api/accommodations/${cityName}`);
      // console.log(response);
      // setAccommodations(response.data.accommodations);
      const sortedAccommodations = response.data.accommodations.sort((a, b) => b.level - a.level);
      setAccommodations(sortedAccommodations);
      console.log(accommodations);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  React.useEffect(() => {
    if (isSubmitted) {
      fetchAccommodations();
    }
  }, [isSubmitted]);

  const navigateToSignup = () => {
    navigate('/signup');
  };

  const navigateToHome = () => {
    navigate('/');
  };

  const navigateToAcc = () => {
    navigate('/accomodation');
  };

  const navigateToRent = () => {
    navigate('/rental');
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const userInformation = localStorage.getItem('user');
  console.log(userInformation);
  let userPoints;
  let userEmail;
  if (userInformation) {
    const userData = JSON.parse(userInformation);
    userPoints = userData.points;
    userEmail = userData.email;
    console.log(userPoints);
  }

  const [confirmed, setConfirmed] = useState(false);

  const handleConfirmBooking = () => {
    setConfirmed(true);
  };

  const calculateRewardPoints = (level) => {
    switch (level) {
      case 3:
        return 10;
      case 2:
        return 5;
      case 1:
        return 2;
      default:
        return 0;
    }
  };

  const handleBooking = (level) => {
    const confirmed = window.confirm('Are you sure you want to book?');
    if (confirmed) {
      console.log("booking started");
      const rewardPoints = calculateRewardPoints(level); // Use the passed 'level' argument
      axios.get('/api/users/rewards', {
        params: {
          email: userEmail
        }
      }) 
        .then((response) => {
          const existingRewardPoints = response.data.rewardPoints;
          const updatedRewardPoints = existingRewardPoints + rewardPoints;
          localStorage.setItem('user', JSON.stringify({ email: userEmail, points: updatedRewardPoints }));
          axios.post('/api/users/rewards', 
          { email: userEmail, rewardPoints: updatedRewardPoints })
            .then(() => {
              alert(`Booking confirmed! You earned ${rewardPoints} reward points.`);
            })
            .catch((error) => {
              console.error(error);
            });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      window.location('/accomodation');
    }
  };
  

  const isLoggedIn = userInformation ? true : false;
  const rightMarginStyle = {
    marginRight: '4rem', // Right margin
  };

  const backgroundStyle = {
    backgroundImage:
      'url(https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNjb21tb2RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  };

  return (
    <>
      <div style={backgroundStyle}>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand href="/" onClick={navigateToHome}>
              VERDANT VOYAGES
            </Navbar.Brand>
            <Nav className="me-right">
              {isLoggedIn ? (
                <>
                  <Nav.Link style={{fontWeight: 'bold'}} eventKey="disabled">
                {userPoints}🏅
                </Nav.Link>
                  <Nav.Link onClick={handleLogout}>LOG OUT</Nav.Link>
                </>
              ) : (
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
        <Form onSubmit={handleSubmit}>
          <InputGroup className="mb-3 mx-4 my-4">
            <InputGroup.Text>City Name</InputGroup.Text>
            <Form.Control
              aria-label="City Name"
              style={rightMarginStyle}
              value={cityName}
              onChange={handleChange}
            />
          </InputGroup>
          <InputGroup className="mb-3 mx-4 my-4">
            <InputGroup.Text>Check in and Check Out dates</InputGroup.Text>
            <Form.Control type="date" aria-label="Check-in Date" />
            <Form.Control
              type="date"
              aria-label="Check-out Date"
              style={rightMarginStyle}
            />
          </InputGroup>
          <Button
            className="mb-3 mx-4 my-4"
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>

        {/* // <div key={accommodation._id}>
          //   {/* Display accommodation information 
          //   <p>Accommodation Name: {accommodation.name}</p>
          //   <p>Address: {accommodation.address}</p>
          //   <p>Price: {accommodation.price}</p>
          //   <p>Ratings: {accommodation.ratings}</p>
          //   <p>Description: {accommodation.desc}</p>
          // </div> */}
        {accommodations
  .map((accommodation) => (
    <Card key={accommodation._id} style={{ width: '85rem', marginLeft: '2rem', marginTop: '2rem'}}>
      <Card.Body>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            <Card.Title>{accommodation.name}</Card.Title>
            <Card.Text>
              {'🍀'.repeat(accommodation.level)} Level {accommodation.level}
            </Card.Text>
            <Card.Text>Address: {accommodation.address}</Card.Text>
            <Card.Text>Price: ₹{accommodation.price} / night</Card.Text>
            <Card.Text>Ratings: {accommodation.ratings} ⭐️</Card.Text>
            <Card.Text>{accommodation.desc}</Card.Text>
            <Button variant="primary" onClick={() => handleBooking(accommodation.level)}>Book</Button>
          </div>
          <div style={{ flex: 1, textAlign: 'right' }}>
            <img 
            src={accommodation.link} 
            alt="Accommodation Image" 
            style={{ maxWidth: '60%', height: '270px' }} />
          </div>
        </div>
      </Card.Body>
    </Card>
  ))}

      </div>
    </>
  );
}

export default Accomodation;
