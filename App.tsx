import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './component/Form2';
import Form from './component/Form3'; 
import Up from "./component/Upload";

function App() {
  return (

   
    <Router>
      <Routes> 
        <Route path="/" element={<Login />} />
        <Route path="/up" element={<Up/>} />
        <Route path="/Form3" element={<Form />} />
      </Routes>
    </Router>
  );
}

export default App;
