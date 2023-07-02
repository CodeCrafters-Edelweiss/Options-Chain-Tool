import React, {useState,useEffect} from 'react';
import TableComp from '../components/TableComp';
import Navbar from '../components/Navbar';
import "../styles/options.css";

const Options = () => {
        return (
            <div>
                <Navbar/>
                <div className="options-container">
                    <TableComp/>
                </div>
            </div>
        );
};

export default Options;
