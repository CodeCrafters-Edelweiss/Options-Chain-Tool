import React from 'react';
import {useNavigate} from "react-router-dom";
import '../styles/homePage.css';
import {useColorMode} from "@chakra-ui/react";
import { createClient } from '@supabase/supabase-js'
import {
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
} from '@chakra-ui/react'


const Navbar = () => {
    const navigate = useNavigate();
    const {colorMode, toggleColorMode} = useColorMode();
    const supabase = createClient('https://fxfvtdqzhrxvphgmwdab.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZnZ0ZHF6aHJ4dnBoZ213ZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyNDQwNjksImV4cCI6MjAwMzgyMDA2OX0.osISLf5y3ftS-gpunBr1mWlPC3WLRHa3o4Or__Eos9w');

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut();
        error ? <Alert
            status='error'
            variant='subtle'
            flexDirection='column'
            alignItems='center'
            justifyContent='center'
            textAlign='center'
            height='200px'
        >
            <AlertIcon boxSize='40px' mr={0} />
            <AlertTitle mt={4} mb={1} fontSize='lg'>
                Error Occured!
            </AlertTitle>
            <AlertDescription maxWidth='sm'>
                Application is facing some issues. Try again !
            </AlertDescription>
        </Alert> :
            <Alert
                status='success'
                variant='subtle'
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                textAlign='center'
                height='200px'
            >
                <AlertIcon boxSize='40px' mr={0} />
                <AlertTitle mt={4} mb={1} fontSize='lg'>
                    Successfully Logged Out!
                </AlertTitle>
                <AlertDescription maxWidth='sm'>
                    Thank you for using this application.
                </AlertDescription>
            </Alert>
        navigate('/login');
    }

    return (
        <>
            <input type="checkbox" id="active" />
            {
                colorMode === 'dark' ?
            <label htmlFor="active" className="menu-btn"><span></span></label> :
                    <label htmlFor="active" className="menu-btn-dark"><span></span></label>
            }
            <label htmlFor="active" className="close"></label>
            <div className="wrapper">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/login">Login</a></li>
                    <li><a href="/options">Option Chain</a></li>
                    <li><a href="#" id="colorModeToggle" onClick={toggleColorMode}>Dark Mode</a></li>
                    <li><a href="#" onClick={handleLogout}>Logout</a></li>
                </ul>
            </div>
        </>
    )
}

export default Navbar;