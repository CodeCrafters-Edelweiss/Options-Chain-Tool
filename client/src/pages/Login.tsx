import React, {useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared';
import {AbsoluteCenter} from "@chakra-ui/react";
import { Box } from '@chakra-ui/react';

const supabase = createClient('https://fxfvtdqzhrxvphgmwdab.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZnZ0ZHF6aHJ4dnBoZ213ZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyNDQwNjksImV4cCI6MjAwMzgyMDA2OX0.osISLf5y3ftS-gpunBr1mWlPC3WLRHa3o4Or__Eos9w');

const Login = () => {
    const navigate = useNavigate();
    const [session, setSession] = useState<any>(null);

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (!session) {
        return (
            <div className="container" style={{width:"100vw",height:"100vh", background:" #2A2A2D"}}>
                <AbsoluteCenter axis='both' style={{width:"28vw",background:"black",borderRadius:"25px",padding:"5vh 5vw", backdropFilter:'blur(5px)'}}>
            <Auth supabaseClient={supabase} appearance={{
                theme: ThemeSupa,
                variables: {
                    default: {
                        colors: {
                            brand: 'green',
                            brandAccent: 'darkgreen',
                        },
                    },
                }, }} providers={['google', 'facebook', 'twitter']} theme='dark' localization={{
                variables: {
                    sign_in: {
                        email_label: 'Email Password',
                        password_label: 'Password',
                    },
                },
            }}/>
                </AbsoluteCenter>
            </div>
                )
    }
    else {
        navigate('/options');
    }
}

export default Login;