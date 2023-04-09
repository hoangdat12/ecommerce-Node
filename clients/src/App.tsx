import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Login from './page/Login';
import Register from './page/Register';
import ActivateAccount from './page/ActivateAccount';
import Home from './page/Home';
import Banner from './page/Banner';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/activate' element={<ActivateAccount />} />

        <Route path='/banner' element={<Banner />} />
        <Route path='/' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
