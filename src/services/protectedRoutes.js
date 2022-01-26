import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from './authservice';


// import auth from "../auth";

// import { authenticationService } from '@/_services';

export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return(
    // console.log("in protected route");
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        console.log("in protected route",currentUser);
        // if (!auth.isAuthenticated()) {
            if (!currentUser) {
                console.log(" not an user")
            // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            }
            return <Component {...props} />

        // authorised so return component
        
    }} />
    )
    
}