import React from 'react';
import home1 from "../assets/home1.png";
import home2 from "../assets/home2.png";
import home3 from "../assets/home3.png";
import Navbar from "../components/Navbar";
import '../styles/homePage.css';

const Home  = () => {
    return(
        <div className="home-container">
            <Navbar/>
            <div className="container1">
                <img src={home1} alt="" className="home1" />
                <button className='browseOptions'><a href="/login">Browse Options</a></button>
            </div>
            <div className="container2">
                <img src={home2} alt="" className="home2" />
            </div>
            <div className="container3">
                <img src={home3} alt="" className="home3" />
            </div>
        </div>
    )
}

export default Home;