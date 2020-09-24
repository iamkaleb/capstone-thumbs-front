import { Route, Redirect } from 'react-router-dom';
import React from 'react';
import useSimpleAuth from '../hooks/useSimpleAuth'
import Header from './Header'
import Login from './auth/Login'
import Register from './auth/Register'
import PollForm from './PollForm'
import Group from './Group'
import GroupSearch from './GroupSearch'

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
                    return <Redirect to='/group/1'/>
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

            <Route
                exact
                path='/poll'
                render={props => {
                    return <PollForm {...props} />
                }}
            />

            <Route
                exact
                path='/group/:groupId'
                render={props => {
                    return <Group {...props}/>
                }}
            />

            <Route
                exact
                path='/search/:searchTerm'
                render={props => {
                    return <GroupSearch {...props} />
                }}
            />

        </React.Fragment>
    )
}

export default ApplicationViews;