import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import HalakList  from './HalakList';
import HalakDetails from './HalakDetails';
import HalakEdit from './HalakEdit'; 


function App() {
  return (
   <Router>
    <Routes>
    <Route path="/" element={<HalakList />} />
    <Route path="/hal/:id" element={<HalakDetails />} />
    <Route path="/halak/modositas/:id" element={<HalakEdit />} />
    </Routes>
   </Router>
  );
}

export default App;
