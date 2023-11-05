import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { MDBCarousel, MDBCarouselItem } from 'mdb-react-ui-kit';
import { Card, Button } from 'react-bootstrap';

function Home() {
  const navigate = useNavigate();

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
  const isLoggedIn = (userInformation ? true : false);

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
              {/* <Nav.Link>
                🏅
                </Nav.Link> */}
              <Nav.Link style={{fontWeight: 'bold'}} eventKey="disabled">
                {userPoints}🏅
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
      <MDBCarousel showControls showIndicators>
        <MDBCarouselItem
          className="w-100 d-block"
          itemId={1}
          src="https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsJTIwYWVzdGhldGljfGVufDB8fDB8fHww"
          style={{ width: '300px', height: '750px' }}
          alt="..."
        >
          <h5 style={{ color: 'black', fontSize: '28px', fontWeight: 'bold' }}>
            Verdant Voyages
          </h5>
          <p style={{ color: 'black', fontSize: '18px' }}>
            A user-friendly website that empowers travelers to make eco-friendly
            choices when it comes to rentals and accommodations while rewarding
            them for their environmentally conscious decisions. This platform
            encourages responsible and sustainable tourism by providing a range
            of features and incentives.
          </p>
        </MDBCarouselItem>
        <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'
        style={{ width: '300px', height: '750px' }}
        alt='...'
      >
        <h5 style={{ color: 'black', fontSize: '28px', fontWeight: 'bold' }}>Verdant Voyages</h5>
        <p style={{ color: 'black', fontSize: '18px' }}>A comprehensive catalog of eco-friendly accommodations. 
        These listings are carefully curated to ensure they meet specific 
        sustainability criteria and give rewards based on their level of sustainability.</p>
      </MDBCarouselItem>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://img.freepik.com/free-photo/hoarfrost-covered-cold-travel-ice_1232-4137.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696809600&semt=ais'
        style={{ width: '300px', height: '750px' }}
        alt='...'
      >
        <h5 style={{ color: 'black', fontSize: '28px', fontWeight: 'bold' }}>Verdant Voyages</h5>
        <p style={{ color: 'black', fontSize: '18px' }}>Accommodation listings provide details about the property's green practices, 
        such as renewable energy sources, waste recycling programs, energy-efficient 
        appliances, and water-saving initiatives.</p>
      </MDBCarouselItem>

        <div style={cardContainerStyle}>
          <CardContainer
            title="Accommodation"
            text="Explore accommodations."
            onClick={navigateToAcc}
            imageUrl="https://images.unsplash.com/photo-1444201983204-c43cbd584d93?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8YWNjb21tb2RhdGlvbnxlbnwwfHwwfHx8MA%3D%3D"
          />
          <CardContainer
            title="Rental"
            text="Discover eco-friendly rentals."
            onClick={navigateToRent}
            imageUrl="https://www.meru.in/assets/corporate/inner-pages/images/car-rentals1.webp"
          />
        </div>
      </MDBCarousel>
    </>
  );
}

const cardContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '35px',
};

const CardContainer = ({ title, text, onClick, imageUrl }) => (
  <Card style={{ width: '18rem', margin: '20px', height: '400px' }}>
    <div style={{ height: '60%', overflow: 'hidden' }}>
      <Card.Img variant="top" src={imageUrl} style={{ objectFit: 'cover', height: '100%' }} />
    </div>
    <Card.Body>
      <Card.Title>{title}</Card.Title>
      <Card.Text>{text}</Card.Text>
      <Button variant="primary" onClick={onClick}>
        Explore
      </Button>
    </Card.Body>
  </Card>
);

export default Home;