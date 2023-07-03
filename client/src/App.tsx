import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";
import Login from "./pages/Login";
import OptionChainComponent from './filter/Symbolfilter';


function App() {
  return (
   <Router>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/options" element={<Options/>} />
      <Route path ="/filter" element={<OptionChainComponent/>} />
     </Routes>
   </Router>
  );
}

export default App;
