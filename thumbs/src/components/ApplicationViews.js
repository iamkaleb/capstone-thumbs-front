import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import useSimpleAuth from '../hooks/useSimpleAuth'
import Public from './Public'
import Login from './auth/Login'
import Register from './auth/Register'

const ApplicationViews = () => {

    const { isAuthenticated } = useSimpleAuth()

    return (
        <React.Fragment>

            <Route
                exact 
                path='/' 
                render={props => {
                    if (isAuthenticated()) {
                    return <Public />
                } else {
                    return <Redirect to='/login' />
                }}}
            />

            <Route
                exact
                path='/login'
                render={props => {
                    return <Login />
                }}
            />

            <Route
                exact
                path='/register'
                render={props => {
                    return <Register />
                }}
            />



        </React.Fragment>
    )
}

export default ApplicationViews;