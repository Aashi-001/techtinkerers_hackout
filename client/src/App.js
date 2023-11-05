import Home from './components/Home';
import Signup from './components/Signup';
import Accomodation from './components/Accomodation';
import Rentals from './components/Rentals';
import Login from './components/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path ="/" element = {<Home />} />
        <Route path ="/accomodation" element = {<Accomodation />} />
        <Route path ="/rental" element = {<Rentals />} />
        <Route path ="/signup" element = {<Signup />} />
        <Route path ="/login" element = {<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
