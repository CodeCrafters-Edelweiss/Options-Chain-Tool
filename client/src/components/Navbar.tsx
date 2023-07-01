import React from 'react';
import '../styles/homePage.css';

const Navbar = () => {

    return (
        <>
            <input type="checkbox" id="active" />
            <label htmlFor="active" className="menu-btn"><span></span></label>
            <label htmlFor="active" className="close"></label>
            <div className="wrapper">
                <ul>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/options">Option Chain</a></li>
                    <li><a href="/">Logout</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;