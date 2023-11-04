import React from 'react';
import {Container} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Navbar} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import {
    MDBCarousel,
    MDBCarouselItem,
  } from 'mdb-react-ui-kit';


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
    <MDBCarousel showControls showIndicators>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={1}
        src='https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dHJhdmVsJTIwYWVzdGhldGljfGVufDB8fDB8fHww'
        style={{ width: '300px', height: '750px' }}
        alt='...'
      >
        <h5 style={{color :`black`, fontWeight : `bold`}}>Verdant Voyages</h5>
        <p style={{color :`black`}}>a user-friendly website that empowers travelers to make eco-friendly choices when it comes to rentals and 
            accommodations while rewarding them for their environmentally conscious decisions. 
            This platform encourages responsible and sustainable tourism by providing a range of features and incentives.</p>
      </MDBCarouselItem>
      <div style={buttonContainerStyle}>
          <div style={buttonStyle} className="button" onClick={navigateToAcc}>Accomodation</div>
          <div style={buttonStyle} className="button" onClick={navigateToRent}>Rental</div>
        </div>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={2}
        src='https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=1000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8fA%3D%3D'
        style={{ width: '300px', height: '750px' }}
        alt='...'
      >
        <h5 style={{color :`black`}}>Verdant Voyages</h5>
        <p style={{color :`black`}}>a comprehensive catalog of eco-friendly accommodations. 
        These listings are carefully curated to ensure they meet specific 
        sustainability criteria and give rewards based on their level of sustainability.</p>
      </MDBCarouselItem>
      <div style={buttonContainerStyle}>
          <div style={buttonStyle} className="button" onClick={navigateToAcc}>Accomodation</div>
          <div style={buttonStyle} className="button" onClick={navigateToRent}>Rental</div>
        </div>
      <MDBCarouselItem
        className='w-100 d-block'
        itemId={3}
        src='https://img.freepik.com/free-photo/hoarfrost-covered-cold-travel-ice_1232-4137.jpg?size=626&ext=jpg&ga=GA1.1.1413502914.1696809600&semt=ais'
        style={{ width: '300px', height: '750px' }}
        alt='...'
      >
        <h5 style={{color :`black`}}>Verdant Voyages</h5>
        <p style={{color :`black`}}>Accommodation listings provide details about the property's green practices, 
        such as renewable energy sources, waste recycling programs, energy-efficient 
        appliances, and water-saving initiatives.</p>
      </MDBCarouselItem>
      <div style={buttonContainerStyle}>
          <div style={buttonStyle} className="button" onClick={navigateToAcc}>Accomodation</div>
          <div style={buttonStyle} className="button" onClick={navigateToRent}>Rental</div>
        </div>
    </MDBCarousel>
    </>
  );
};
const buttonContainerStyle = {
    position: 'absolute',
    top: '45%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'center',
  };
  
  const buttonStyle = {
    backgroundColor: 'transparent',
    fontSize : '20px',
    fontWeight: 'bold',
    color: 'black',
    padding: '20px 40px',
    border: 'solid black',
    cursor: 'pointer',
    marginRight: '100px', 
    marginLeft: '100px'
  };


export default Home;