import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import useSimpleAuth from '../hooks/useSimpleAuth'
import Header from './Header'
import Public from './Public'
import Login from './auth/Login'
import Register from './auth/Register'

const ApplicationViews = props => {

    const { isAuthenticated } = useSimpleAuth()

    return (
        <React.Fragment>
            <Header {...props} />

            <Route
                exact 
                path='/' 
                render={props => {
                    if (isAuthenticated()) {
                    return <Public {...props} />
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