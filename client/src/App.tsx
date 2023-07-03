import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";
import Login from "./pages/Login";
import OptionChainComponent from './filter/Symbolfilter';
import ChartComponent from './components/ChartComponent';

function App() {
  return (
   <Router>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/options" element={<Options/>} />
      <Route path ="/filter" element={<OptionChainComponent/>} />
      <Route path ="/chart" element={<ChartComponent/>} />
     </Routes>
   </Router>
  );
}

export default App;
