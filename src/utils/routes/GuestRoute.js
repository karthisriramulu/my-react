import React, { useContext } from 'react'
import { Redirect } from 'react-router-dom';
import AppContext from '../../store/AppContext'
import AnimatedRoute from './AnimatedRoute';

export default function GuestRoute({ children, ...rest }) {
    
    const [isLoggedIn] = useContext(AppContext);

    // if(isLoggedIn === null) return <Loading />

if(!isLoggedIn) return <AnimatedRoute {...rest}>{children}</AnimatedRoute>;

    return <AnimatedRoute>
                <Redirect to="/" />
        </AnimatedRoute>
}
