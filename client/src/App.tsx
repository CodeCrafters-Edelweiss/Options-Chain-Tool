import React from 'react';
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Options from "./pages/Options";

function App() {
  return (
   <Router>
     <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/options" element={<Options/>} />
     </Routes>
   </Router>
  );
}

export default App;
