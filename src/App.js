import React from 'react';
import './App.css';
import './assets/css/theme.css'

import NavBar from './components/Navbar'

import Routes from './routes'

function App() {
  return (
    <>
      <NavBar className='navbar-align' bgColor='dark' variant='dark' textNavbar='SoftExpert' />

      <div className='container'>
        <Routes />
      </div>
    </>
  );
}

export default App
