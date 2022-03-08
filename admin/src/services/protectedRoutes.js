import React from 'react';
import decode from "jwt-decode"
import { Route, Redirect } from 'react-router-dom';
import { authenticationService } from './authservice';



export const ProtectedAdminRoute = ({ component: Component, ...rest }) => {
    console.log("IN proted route");
    return (
        // console.log("in protected route");
        <Route {...rest} render={props => {
            const currentUser = authenticationService.currentUserValue;
            console.log("in protected route", currentUser);

            // if (!auth.isAuthenticated()) {
            if (!currentUser) {
                console.log(" not an user")
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/adminSignin', state: { from: props.location } }} />
            } else {
                if (decode(currentUser.token).exp * 1000 < new Date().getTime()) {
                    console.log("token expire");
                    authenticationService.logout()
                    return <Redirect to={{ pathname: '/adminSignin', state: { from: props.location } }} />
                }
                if (currentUser?.isadmin) {
                    return <Component {...props} />
                } else {
                    <Redirect to={{ pathname: '/admindashboard', state: { from: props.location } }} />
                    // <Redirect to={{ pathname: '/adminSignin', state: { from: props.location } }} />
                }
            }
            // authorised so return component

        }} />
    )

}

// import { authenticationService } from '@/_services';
export const ProtectedRoute = ({ component: Component, ...rest }) => {
    return (
        // console.log("in protected route");
        <Route {...rest} render={props => {
            const currentUser = authenticationService.currentUserValue;
            console.log("in protected route", currentUser);

            // if (!auth.isAuthenticated()) {
            if (!currentUser) {
                // console.log(" not an user")
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            } else {
                if (decode(currentUser.token).exp * 1000 < new Date().getTime()) {
                    console.log("token expire");
                    authenticationService.logout()
                    return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
                }

                return <Component {...props} />

            }
            // authorised so return component

        }} />
    )

}

export const ProtectedDoctorRoute = ({ component: Component, ...rest }) => {
    return (
        // console.log("in protected route");
        <Route {...rest} render={props => {
            const currentUser = authenticationService.currentUserValue;
            console.log("in protected route", currentUser);

            // if (!auth.isAuthenticated()) {
            if (!currentUser) {
                console.log(" not an user")
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            } else {
                if (decode(currentUser.token).exp * 1000 < new Date().getTime()) {
                    console.log("token expire");
                    authenticationService.logout()
                    return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
                }
                if (currentUser.isDoctor) {
                    return <Component {...props} />
                } else {
                    <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
                    // <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
                }
            }
            // authorised so return component

        }} />
    )

}
export const ProtectedPatientRoute = ({ component: Component, ...rest }) => {
    return (
        // console.log("in protected route");
        <Route {...rest} render={props => {
            const currentUser = authenticationService.currentUserValue;
            console.log("in protected route", currentUser);

            // if (!auth.isAuthenticated()) {
            if (!currentUser) {
                console.log(" not an user")
                // not logged in so redirect to login page with the return url
                return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
            } else {
                if (decode(currentUser.token).exp * 1000 < new Date().getTime()) {
                    console.log("token expire");
                    authenticationService.logout()
                    return <Redirect to={{ pathname: '/sign-in', state: { from: props.location } }} />
                }
                if (!currentUser.isDoctor) {
                    return <Component {...props} />
                } else {
                    <Redirect to={{ pathname: '/dashboard', state: { from: props.location } }} />
                }
            }
            // authorised so return component

        }} />
    )

}