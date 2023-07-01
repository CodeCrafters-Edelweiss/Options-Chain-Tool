import React, {useState,useEffect} from 'react';
import TableComp from '../components/TableComp';
import Navbar from '../components/Navbar';
import "../styles/options.css";
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'

const supabase = createClient('https://fxfvtdqzhrxvphgmwdab.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ4ZnZ0ZHF6aHJ4dnBoZ213ZGFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODgyNDQwNjksImV4cCI6MjAwMzgyMDA2OX0.osISLf5y3ftS-gpunBr1mWlPC3WLRHa3o4Or__Eos9w')

const Options = () => {
    const [session, setSession] = useState<any>(null)

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
        return (<Auth supabaseClient={supabase} appearance={{ theme: ThemeSupa }} providers={['google', 'facebook', 'twitter']}/>)
    }
    else {
        return (
            <div>
                <Navbar/>
                <div className="options-container">
                    <TableComp/>
                </div>
            </div>
        );
    }
};

export default Options;
