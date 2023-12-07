import React from "react";
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';
import './App.css'; 
import { BrowserRouter ,Route, Routes} from 'react-router-dom';
import Home from './Components/Home';
import About from './Components/About';
import Services from './Components/Services';
import Contact from './Components/Contact';
import EditContact from './Components/EditContact';
import Login from "./Components/login";
import Banner from "./Components/Banner";

function App(){
const data = []
const itemPerPage = 10;
  

  return (
  <>
       
      <Navbar/>
    <BrowserRouter>
    <Routes>
    
    <Route path='/' element={<Sidebar/>}/>
    <Route path='/home' element={<Home/>}/>
    <Route path='/About' element={<About data={data} itemsPerPage={itemPerPage} />}/>
    <Route path='/Services' element={<Services/>}/>
    <Route path='/Contact' element={<Contact/>}/>
    <Route path="/editContact" element={<EditContact/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/Banner" element={<Banner/>}/>
    
    
    </Routes>
    </BrowserRouter>
    <Footer/>
  </>
  );
}

export default App;
