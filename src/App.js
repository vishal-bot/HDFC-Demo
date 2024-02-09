import './App.css';
import Login from './Login.jsx';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './Header.jsx';
import ToDo from './Component/ToDo.jsx';
import Projects from './Component/Projects.jsx';
import About from './Component/About.jsx';
import Contact from './Component/Contact.jsx';
import Footer from './Footer.jsx';
import Dashboard from './Component/Dashboard.jsx';
import Temp from './Component/Temp.jsx';
import { useEffect } from 'react';

import { useLocation } from 'react-router-dom';

import "preline/preline";

function App() {

  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  useEffect(() => {
    require('preline/preline');
  }, []);

  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <Header/>
        <Routes>
          <Route path='/' element={<Dashboard />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/ToDo' element={<ToDo />}></Route>
          <Route path='/about' element={<About />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/Temp' element={<Temp />}></Route>
        </Routes>
        <Footer/>
      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
